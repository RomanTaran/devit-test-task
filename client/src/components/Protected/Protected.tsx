import React from 'react'
import { Navigate } from 'react-router-dom'

import { useRecoilValue } from 'recoil'

import { authState } from '../../state'

export default function Protected({ children }: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState)

  if (!auth) {
    return <Navigate to='/login' replace />
  }
  return <>{children}</>
}
