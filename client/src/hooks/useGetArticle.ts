import { useQuery } from 'react-query'

import ArticleService from '../services/ArticleService'

export default function useGetArticle(articleId: string) {
  return useQuery(['article', articleId], () => ArticleService.getArticle(articleId))
}
