import { IUser } from '../IUser'

export interface AuthResponse {
  tokens: {
    access: {
      expires: string
      token: string
    }
    refresh: {
      expires: string
      token: string
    }
  }
  user: IUser
}
