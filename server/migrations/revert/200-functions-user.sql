-- Revert itongue:200-functions-user from pg

BEGIN;

DROP VIEW "user_display", "user_with_relations", "records", "translation_with_relations";

DROP TYPE "user_language", "user_record", "record_translation", "expression_display";

DROP FUNCTION "get_similar_slugs", "insert_user";

COMMIT;
