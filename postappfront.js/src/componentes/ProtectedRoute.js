import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexto/AuthContext'

export function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}
