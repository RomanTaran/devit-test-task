import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import ArticleService from '../services/ArticleService'

export default function useDeleteArticle() {
  const queryClient = useQueryClient()
  const { mutate: deleteArticle } = useMutation((id: string) => ArticleService.deleteArticle(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError(error: any) {
      if (Array.isArray((error as any).response.data.error)) {
        ;(error as any).response.data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-center',
          }),
        )
      } else {
        toast.error((error as any).response.data.message, {
          position: 'top-center',
        })
      }
    },
  })
  return { deleteArticle }
}
