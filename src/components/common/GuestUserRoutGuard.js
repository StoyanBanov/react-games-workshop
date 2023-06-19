import { Navigate, Outlet } from "react-router-dom"

export const GuestUserRouteGuard = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to={'/login'} replace /> : <Outlet />
}