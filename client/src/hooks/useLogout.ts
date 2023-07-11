import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { useSetRecoilState } from 'recoil'

import AuthService from '../services/AuthService'
import { authState } from '../state'

export default function useLogout(handleCloseUserMenu: () => void) {
  const setAuth = useSetRecoilState(authState)
  const refreshToken = JSON.parse(localStorage.getItem('auth') as string)
  const navigate = useNavigate()

  const { mutate: logoutUser } = useMutation(
    (refreshToken: { refreshToken: string }) => AuthService.logout(refreshToken),
    {
      onSuccess() {
        localStorage.removeItem('auth')
        navigate('/login')
        setAuth(false)
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
  const handleClick = () => {
    logoutUser({ refreshToken: refreshToken })
    handleCloseUserMenu()
  }
  return { handleClick }
}
