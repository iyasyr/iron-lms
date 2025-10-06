import { httpClient } from './http'

export interface User {
  id: number
  email: string
  fullName: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
}

export interface AuthResponse {
  token: string
  user: User
}

class AuthAPI {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>('/auth/login', credentials)
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>('/auth/register', userData)
  }

  async validateToken(): Promise<User> {
    return httpClient.get<User>('/auth/me')
  }
}

export const authAPI = new AuthAPI()
