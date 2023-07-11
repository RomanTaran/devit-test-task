import { atom } from 'recoil'

export const searchState = atom<string>({
  key: 'searchState',
  default: '',
})

export const sortByState = atom<string>({
  key: 'sortByState',
  default: 'title:asc',
})

export const authState = atom<string | boolean | null>({
  key: 'authState',
  default: localStorage.getItem('auth'),
})
