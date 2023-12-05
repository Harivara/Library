import { Navigate } from "react-router-dom"
import { useUser } from "../../context/user-contex"


export const WithAdminProtector = ({ children }) => {
    const { isAdmin } = useUser()
    if (isAdmin) {
        return children
    }
    return <Navigate to="/" replace />
}