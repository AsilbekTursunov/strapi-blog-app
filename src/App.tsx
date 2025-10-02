import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useAppSelector } from './hooks/useStoreSelector'
import FormPage from './pages/FormPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import PostDetails from './pages/PostDetails'
import ProfilePage from './pages/ProfilePage'
const App = () => {
  const { user } = useAppSelector((state) => state.user)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<PostDetails />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer />
    </div>
  )
}

export default App