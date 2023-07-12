import httpStatus from 'http-status';
import mongoose from "mongoose";
import Parser from 'rss-parser';
import logger from "../logger/logger";
import Article from "./article.model";
import ApiError from "../errors/ApiError";
import { IArticle, IArticleDoc, UpdateArticleBody } from "./article.interfaces";
import { IOptions } from "../paginate/paginate";

export const fetchArticlesFromRSS = async () => {
  const rssFeedUrl = 'https://www.espn.com/espn/rss/news';

  try {
    const parser = new Parser();
    const feed = await parser.parseURL(rssFeedUrl);

    for (const item of feed.items) {
      const article = new Article({
        title: item.title,
        pubDate: item.pubDate,
        image: item.enclosure?.url,
        contentSnippet: item.contentSnippet,
        url: item.link
      });

      await article.save();
      logger.info('Article was downloaded:', item.title);
    }
  } catch (error) {
    logger.error('Error downloading and saving articles', error);
  }
};

/**
 * Create an article
 * @param {IArticle} articleBody
 * @returns {Promise<IArticleDoc>}
 */
export const createArticle = async (articleBody: IArticle): Promise<IArticleDoc> => {
  // @ts-ignore
  return Article.create(articleBody);
};

/**
 * Query for articles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryArticles = async (filter: Record<string, any>, options: IOptions) => {
  // @ts-ignore
  const articles = await Article.paginate(filter, options);
  return articles
};

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getArticleById = async (id: mongoose.Types.ObjectId): Promise<IArticleDoc | null> => Article.findById(id);

/**
 * Update article by id
 * @param {mongoose.Types.ObjectId} articleId
 * @param {UpdateArticleBody} updateBody
 * @returns {Promise<IArticleDoc | null>}
 */
export const updateArticleById = async (
  articleId: mongoose.Types.ObjectId,
  updateBody: UpdateArticleBody
): Promise<IArticleDoc | null> => {
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  Object.assign(article, updateBody);
  await article.save();
  return article;
};

/**
 * Delete article by id
 * @param {mongoose.Types.ObjectId} articleId
 * @returns {Promise<IArticleDoc | null>}
 */
export const deleteArticleById = async (articleId: mongoose.Types.ObjectId): Promise<IArticleDoc | null> => {
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  await article.deleteOne();
  return article;
};

