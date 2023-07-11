import axios, { AxiosResponse } from 'axios'

import { API_URL } from '../ constants'
import { IRegisterUser } from '../models/IRegisterUser'
import { AuthResponse } from '../models/response/AuthResponse'

export default class AuthService {
  static async login(data: IRegisterUser): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(`${API_URL}/auth/login`, data)
  }

  static async register(data: IRegisterUser): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(`${API_URL}/auth/register`, data)
  }

  static async logout(refreshToken: { refreshToken: string }): Promise<void> {
    return axios.post(`${API_URL}/auth/logout`, refreshToken)
  }
}
