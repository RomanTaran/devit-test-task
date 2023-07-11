import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import * as articleService from './articles.service';
import { IOptions } from '../paginate/paginate';
import ApiError from "../errors/ApiError";

export const getArticles = catchAsync(async (req: Request, res: Response) => {
  const filterBlock = pick(req.query, ['title']);
  const filter = { title: { $regex: filterBlock.title, $options: 'i' } };
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await articleService.queryArticles(filter, options);
  res.send(result);
});

export const getArticle = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['articleId'] === 'string') {
    const article = await articleService.getArticleById(new mongoose.Types.ObjectId(req.params['articleId']));
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(article);
  }
});
export const createArticle = catchAsync(async (req: Request, res: Response) => {
  const article = await articleService.createArticle(req.body);
  res.status(httpStatus.CREATED).send(article);
});

export const updateArticle = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['articleId'] === 'string') {
    const article = await articleService.updateArticleById(new mongoose.Types.ObjectId(req.params['articleId']), req.body);
    res.send(article);
  }
});

export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['articleId'] === 'string') {
    await articleService.deleteArticleById(new mongoose.Types.ObjectId(req.params['articleId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
