import { type ReactNode } from 'react'
import { useAuth } from './context/AuthProvider'
import { Navigate } from 'react-router-dom'

interface ProtectedProps {
    children: ReactNode
    authentication: boolean
}

const Protected = ({ children, authentication = true }: ProtectedProps) => {
    
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    if (!authentication && user) {
        return <Navigate to="/dashboard" replace />;
    }

    if (authentication && !user) {
      return <Navigate to="/" replace />;
    }

    return <> { children }</>
}

export default Protected;