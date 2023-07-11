import { IArticle } from '../IArticle'

export interface ArticlesResponse {
  limit: number
  page: number
  totalPages: number
  totalResults: number
  results: IArticle[]
}
