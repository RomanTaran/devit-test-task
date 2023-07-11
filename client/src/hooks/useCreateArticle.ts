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
    image: yup.string().url().required('Image URL is required'),
    contentSnippet: yup.string().required('Content is required'),
    url: yup.string().url().required('URL is required'),
  })
  .required()

export default function useCreateArticle() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { mutate: createArticle } = useMutation(
    (articleData: IArticle) => ArticleService.createArticle(articleData),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['articles'] })
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
    createArticle(data)
  }

  return { handleSubmit, onSubmit, register, errors, navigate }
}
