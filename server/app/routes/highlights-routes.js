const express = require("express");

const highlightsController = require("../controllers/highlights-controller");

const router = express.Router();

/**
 * @swagger
 * /best/users/{limit}:
 *  get:
 *      tags: 
 *        - Highlights
 *      summary: Users with more records
 *      description:
 *        Get users with more iRecords, limiting results by passing INTEGER in path
 *      parameters:
 *        - name: limit
 *          description: number of results
 *          in: path
 *          type: integer
 *          required: true
 *          example: 3
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/BestUsers"
 *          '404':
 *              description: Not Found
 */
router.get("/users/:limit(\\d+)", highlightsController.getBestUsers);

/**
 * @swagger
 * /best/translations/{limit}:
 *  get:
 *      tags: 
 *        - Highlights
 *      summary: Translations with more records
 *      description:
 *        Get translations with more iRecords, limiting results by passing INTEGER in path
 *      parameters:
 *        - name: limit
 *          description: number of results
 *          in: path
 *          type: integer
 *          required: true
 *          example: 4
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/BestTranslations"
 *          '404':
 *              description: Not Found
 */
router.get("/translations/:limit(\\d+)", highlightsController.getBestTranslations);

/**
 * @swagger
 * /best/lastirecords/{limit}:
 *  get:
 *      tags: 
 *        - Highlights
 *      summary: Last iRecords
 *      description:
 *        Get last iRecords, limiting results by passing INTEGER in path
 *      parameters:
 *        - name: limit
 *          description: number of results
 *          in: path
 *          type: integer
 *          required: true
 *          example: 4
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/Records"
 *          '404':
 *              description: Not Found
 */
router.get("/lastirecords/:limit(\\d+)", highlightsController.getLastiRecords);

module.exports = router;