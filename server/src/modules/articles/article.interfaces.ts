import { Document } from 'mongoose';

export interface IArticle {
  title: string;
  pubDate: string;
  image: string;
  contentSnippet: string;
  url: boolean;
}

export interface IArticleDoc extends IArticle, Document {
}

export type UpdateArticleBody = Partial<IArticle>;

