import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { IArticle } from '../models/IArticle'
import ArticleService from '../services/ArticleService'

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    pubDate: yup.string().required('Publication date is required'),
    image: yup.string().required('Image URL is required'),
    contentSnippet: yup.string().required('Content is required'),
    url: yup.string().required('URL is required'),
  })
  .required()

export default function useEditArticle(id: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { mutate: editArticle } = useMutation(
    (articleData: IArticle) => ArticleService.editArticle(articleData),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['article'] })
        navigate('/dashboard')
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
    },
  )
  const onSubmit = (data: IArticle) => {
    editArticle({ id, ...data })
  }

  return { handleSubmit, onSubmit, register, errors, navigate }
}
