const express = require("express");

const adminMiddleware = require("../middlewares/admin-middleware");
const ownerMiddleware = require("../middlewares/owner-middleware");
const validator = require("../middlewares/validator");
const fileUploadMiddleware = require("../middlewares/file-upload-middleware");
const userSchema = require("../schemas/user-schema");
const loginFormSchema = require("../schemas/login-form-schema");
const recordSchema = require("../schemas/record-schema");
const userController = require("../controllers/user-controller");

const router = express.Router();

// TODO évaluer pour chaque route la pertinence du middleware validator

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns a list of users
 *     description: List of **users** with detail about their activity on the app
 *     responses:
 *       "200":
 *         description: A JSON array of user objects with their records and languages nested in it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Registration form submission. Returns the primary key of the newly created user if no error occurs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewUser"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/NewUser"
 *     responses:
 *       "201":
 *         description: Success. Id of the newly created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       $ref: "#/components/schemas/PrimaryKey"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "409":
 *         $ref: "#/components/responses/Conflict"
 */
router.route("/").get(userController.showAll).post(validator(userSchema), userController.create);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User authentication
 *     description: Login form submission. Returns the logged user if the authentication process succeeds.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginForm"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/LoginForm"
 *     responses:
 *       "200":
 *         description: Success. An object containing the access token, the refresh token and the logged user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       $ref: "#/components/schemas/JWT"
 *                     refreshToken:
 *                       $ref: "#/components/schemas/JWT"
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post("/login", validator(loginFormSchema), userController.login);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: User profile
 *     description: Information about a user, his records and languages
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          $ref: "#/components/schemas/PrimaryKey"
 *        required: true
 *        description: Primary key of the user to get.
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the user activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/NotFound"
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: User profile edition
 *     description: Profile edit form submission. Modification possiblities include the learned and taught languages, password, name, custom slug, and bio
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          $ref: "#/components/schemas/PrimaryKey"
 *        required: true
 *        description: Primary key of the user to get.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdatedUser"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/UpdatedUser"
 *     responses:
 *       "200":
 *         description: Success. An object containing the new access token and refresh token taking into account the amendments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       $ref: "#/components/schemas/JWT"
 *                     refreshToken:
 *                       $ref: "#/components/schemas/JWT"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: User account deletion
 *     description: User account deletion. This operation requires administrator rights.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          $ref: "#/components/schemas/PrimaryKey"
 *        required: true
 *        description: Primary key of the user to get.
 *     responses:
 *       "204":
 *         description: Success. An empty object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router
  .route("/:id(\\d+)")
  .get(userController.showOne)
  .post(ownerMiddleware, validator(userSchema), userController.editProfile)
  .delete(adminMiddleware, userController.deleteOne);

/**
 * @swagger
 * /users/{slug}:
 *   get:
 *     tags:
 *       - Users
 *     summary: User profile
 *     description: Information about a user, his records and languages
 *     parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          $ref: "#/components/schemas/Slug"
 *        required: true
 *        description: Slug of the user to get.
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the user activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/NotFound"
 */
router.get("/:slug([a-z\\d]+(?:-[a-z\\d]+)*)", userController.showOne);

router.post("/:id(\\d+)/slug", ownerMiddleware, validator(userSchema), userController.updateSlug);

router.post("/:id(\\d+)/language", ownerMiddleware, userController.addLanguage);

router.delete(
  "/:id(\\d+)/language/:languageId(\\d+)/:role",
  ownerMiddleware,
  userController.removeLanguage
);

router.post(
  "/:id(\\d+)/avatar",
  ownerMiddleware,
  fileUploadMiddleware("avatar"),
  userController.updateAvatar
);

router.post(
  "/:id(\\d+)/record",
  ownerMiddleware,
  fileUploadMiddleware("record"),
  validator(recordSchema),
  userController.addRecord
);

router.delete("/:id/record/:recordId", ownerMiddleware, userController.removeRecord);

module.exports = router;
