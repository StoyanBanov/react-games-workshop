import { Navigate, Outlet } from "react-router-dom"

export const LoggedUserRouteGuard = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
}