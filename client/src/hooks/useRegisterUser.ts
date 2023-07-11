import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'

import { IRegisterUser } from '../models/IRegisterUser'
import { AuthResponse } from '../models/response/AuthResponse'
import { authState } from '../state'

const schema = yup
  .object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  })
  .required()

export default function useRegisterUser(authService: any) {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authState)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { mutate: registerUser } = useMutation((userData: IRegisterUser) => authService(userData), {
    onSuccess(data: AxiosResponse<AuthResponse>) {
      localStorage.setItem('auth', JSON.stringify(data.data.tokens.refresh.token));
      localStorage.setItem('token', JSON.stringify(data.data.tokens.access.token))
      setAuth(true)
      toast.success('Success!!!')
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
  })
  const onSubmit = (data: IRegisterUser) => {
    registerUser(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  return { handleSubmit, onSubmit, register, errors }
}
