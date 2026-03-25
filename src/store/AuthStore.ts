import {create} from 'zustand'

type UseRole = 'admin' | 'manager'

interface User{
  name:string,
  email:string,
  role:UseRole
}

interface AuthState {
  token:string | null,
  user:User | null,
  isAuthenticated:boolean,
  login:(email:string, password:string) => Promise<void>,
  logout:() => void
}

const getTokenFromLocalStorage = localStorage.getItem('authToken')
const getUserFromLocalStorage = () =>{
  const rawUser = localStorage.getItem('authUser')
  return rawUser ? JSON.parse(rawUser) : null
}

export const useAuthStore = create<AuthState>(set =>({
  token: getTokenFromLocalStorage,
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getTokenFromLocalStorage,
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if(!email || !password){
      throw new Error('Email and password are required')
    }
    const fakeToken = 'fake-jwt-token'
    const fakeUser = {
      name: 'John Doe',
      email,
      role: 'admin' as UseRole
    }
    localStorage.setItem('authToken', fakeToken)
    localStorage.setItem('authUser', JSON.stringify(fakeUser))
    set({
      token: fakeToken,
      user: fakeUser,
      isAuthenticated: true
    })
  },
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    set({
      token: null,
      user: null,
      isAuthenticated: false
    })
  }
}));
