import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router-dom'

import { RecoilRoot } from 'recoil'

import Articles from './components/Articles'
import CreateArticle from './components/CreateArticle'
import Dashboard from './components/Dashboard'
import EditArticle from './components/EditArticle'
import Login from './components/Login'
import MainBar from './components/MainBar'
import Protected from './components/Protected'
import SignUp from './components/SignUp'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <MainBar />
        <Routes>
          <Route path='/' element={<Articles />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/dashboard'
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path='/dashboard/:id'
            element={
              <Protected>
                <EditArticle />
              </Protected>
            }
          />
          <Route
            path='/dashboard/create'
            element={
              <Protected>
                <CreateArticle />
              </Protected>
            }
          />
        </Routes>
      </QueryClientProvider>
      <Toaster />
    </RecoilRoot>
  )
}
