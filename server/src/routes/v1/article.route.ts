import express, { Router } from 'express';
import { articleController } from '../../modules/articles';
import { auth } from "../../modules/auth";

const router: Router = express.Router();

router
  .route('/')
  .post(auth(), articleController.createArticle)
  .get(articleController.getArticles);

router
  .route('/:articleId')
  .get(auth(), articleController.getArticle)
  .patch(auth(), articleController.updateArticle)
  .delete(auth(), articleController.deleteArticle);

export default router;

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Articles CRUD
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create an article
 *     description: Only registered users can create other users.
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - pubDate
 *               - image
 *               - contentSnippet
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *               pubDate:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: url
 *               contentSnippet:
 *                 type: string
 *               url:
 *                 type: string
 *                 format: url
 *             example:
 *               title: fake title
 *               pubDate: fake publication date
 *               image: image url
 *               contentSnippet: fake article content
 *               url: fake url
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Article'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all articles
 *     description: Every user can retrieve all articles.
 *     tags: [Article]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: search articles by title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of title:desc/asc
 *         default: title:asc
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 9
 *         description: Maximum number of articles
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 9
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get an article
 *     description: Only registered users can get article.
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Article'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an article
 *     description: Only registered users can update article.
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               pubDate:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: It must be an image url
 *               contentSnippet:
 *                 type: string
 *               url:
 *                 type: string
 *                 description: It must be an url for article
 *             example:
 *               title: fake title
 *               pubDate: fake publication date
 *               image: image url
 *               contentSnippet: fake content
 *               url: fake url
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Article'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an article
 *     description: Only registered user can delete articles.
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
