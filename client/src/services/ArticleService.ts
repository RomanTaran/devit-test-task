import axios, { AxiosResponse } from 'axios'

import { API_URL } from '../ constants'
import $api from '../http'
import { IArticle } from '../models/IArticle'
import { ArticlesResponse } from '../models/response/ArticleResponse'

export default class ArticleService {
  static async getArticles(
    page: number,
    searchValue: string,
    sortBy: string,
  ): Promise<AxiosResponse<ArticlesResponse>> {
    return axios.get(`${API_URL}/articles` as string, {
      params: {
        limit: 9,
        page: page,
        title: searchValue,
        sortBy: sortBy,
      },
    })
  }

  static async getArticle(id: string): Promise<AxiosResponse<IArticle>> {
    return $api.get(`${API_URL}/articles/${id}` as string)
  }

  static async createArticle(data: IArticle): Promise<AxiosResponse<IArticle>> {
    return $api.post(`${API_URL}/articles` as string, data)
  }
  static async editArticle(data: IArticle): Promise<AxiosResponse<IArticle>> {
    return $api.patch(`${API_URL}/articles/${data.id}` as string, data)
  }

  static async deleteArticle(id: string): Promise<AxiosResponse<void>> {
    return $api.delete(`${API_URL}/articles/${id}` as string)
  }
}
