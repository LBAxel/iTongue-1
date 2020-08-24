const client = require("../db/index");
const { getFromCache, setInCache, clearFromCache } = require("./actions");
const { regex, expirationTimes, generateKey } = require("../utils/redis-utils");

/**
 * Query type definition
 * @typedef {Object} Query
 * @property {string} Query.name Name of the query used for genreate Redis key
 * @property {string} Query.text SQL query text to be passed to PG client
 * @property {Array} [values] SQL query values if any
 */

module.exports = {

  /**
   * Manage redis cache
   * 
   * @param {Query} params
   * SQL request object. Must provide a name property (string value) wich must follow this pattern:
   * 
   * \<( CREATE | READ | UPDATE | DELETE )>-\<ENTITY>-[ {ID} | {SLUG} ]
   * 
   * @example
   * // create-language
   * // read-translations
   * // update-user-jhon-doe
   * // delete-expression-345
   * 
   * @returns {Promise<Array>} Results from Redis or Postgres
   */
  async query(queryParams) {

    const key = generateKey(queryParams.name);
    const { isCreate, isRead, isMutation } = regex;

    if (isCreate.test(queryParams.name)) {
      const results = await client.query(queryParams);
      return results.rows[0];
    }

    if (isRead.test(queryParams.name)) {
      return this.getSet(queryParams, key);
    }
    
    if (isMutation.test(queryParams.name)) {
      return this.mutate(queryParams);
    }

  },

  /**
   * Get/Set from/in cache
   * @param {Query} query Query object
   * @param {String} key Generated Redis key 
   */
  async getSet(query, key) {

    // Check if query provides any value
    if(!query.values) {
      // If not, we do not get/set in cache
      const results = await client.query(query);
      return results.rows;
    }
    
    // Serve results from Redis if any
    const chachedResults = await getFromCache(key);
    console.log("chachedResults", chachedResults)
    if (chachedResults) return chachedResults[0];
    
    // Serve results Postgres if any
    const freshResults = await client.query(query);
    if (!freshResults.rowCount) return null;
    
    // Save results in Redis if any with optional expiration time
    setInCache(key, freshResults.rows, expirationTimes.day);

    return freshResults.rows[0];
  },

  /**
   * Cleans cache entries based mutation
   * @param {Query} query Query object
   */
  async mutate(query) {

    const mutation = await client.query(query);
    if (!mutation.rowCount) throw Error(query.name + ": unable to mutate");
    
    // Clear user's slug cached key if exist
    const { isUserMutation } = regex;
    if(isUserMutation.test(query.name)) {
      const userId = parseInt(query.name.replace( /^\D+/g, ''), 10);
      const userSlug = await client.query('SELECT "slug" FROM "user" WHERE "id" = $1', [userId]);
      if (userSlug.rowCount) {
        const slugName = "select-user-" + userSlug.rows[0].slug;
        const slugKey = generateKey(slugName);
        clearFromCache(slugKey);
      }
    }

    // Clear cache entry relatives to the mutation
    const selectName = query.name.replace(/^(\w+)/, "select");
    const selectKey = generateKey(selectName);
    clearFromCache(selectKey);
    
    return mutation.rows[0];
  },
};