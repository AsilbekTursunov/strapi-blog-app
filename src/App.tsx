import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostDetails from './pages/PostDetails'
import Footer from './components/Footer'
import ProfilePage from './pages/ProfilePage'
import { useAppSelector } from './hooks/useStoreSelector'
import FormPage from './pages/FormPage'
const App = () => {
  const { user } = useAppSelector((state) => state.user)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<PostDetails />} />
        <Route path="/profile/:id" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App