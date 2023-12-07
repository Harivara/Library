import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import BackendApi from "../backend-api-calls"

const UserContext = createContext({
    user: null,
    loginUser: () => { },
    RegisterUser: ()=>{}
})
const useUser = () => useContext(UserContext);


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(user && user.role === 'admin')
    }, [user])

    useEffect(() => {
        BackendApi.user.getProfile().then(({ user, error }) => {
            if (error) {
                console.error(error)
            } else {
                setUser(user)
            }
        }).catch(console.error)
    }, [])

    const loginUser = async (username, password) => {
        const { user, error } = await BackendApi.user.login(username, password)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            console.log(user, 'check user login')
            setUser(user)
        }
    }
    const RegisterUser = async (username, password , name) => {
        const { user, error } = await BackendApi.user.register(username, password,name)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            console.log(user)

            setUser(user)
        }
    }
    // const ChangePassword = async (oldpassword, newpassword , confirmpassword) => {
        
    //     const { user, error } = await BackendApi.user.changepassword(oldpassword, newpassword , confirmpassword)
    //     if (error) {
    //         NotificationManager.error(error)
    //     } else {
    //         NotificationManager.success("Password changed in successfully")
    //         console.log(user)

    //         setUser(user)
    //     }
    // }

    const logoutUser = async () => {
        setUser(null)
        await BackendApi.user.logout()
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin, RegisterUser}}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }