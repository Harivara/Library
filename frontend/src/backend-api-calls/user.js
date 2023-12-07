import axios from 'axios'
import axiosPrivate from '../api/axios';

const userApi = {
    getProfile: async () => {
        const res = await axiosPrivate.get("/v1/me/details")
        return res.data;
    },

    login: async (email, password)=>{
        const res = await axiosPrivate.post("/v1/loginuser", {
            email: email,
            password: password
        })
        console.log(res)
        localStorage.setItem('token', res.data.token);

        return res.data
    },

    logout : async ()=>{
        const res = await axiosPrivate.get("/v1/logoutuser", {method:"GET"})
        return res.data
    },

    register : async(email,password,name)=>{
        const res= await axiosPrivate.post("/v1/createuser",{
            email:email,
            password:password,
            name:name
        })
        return res.data
    },
   
    reserveBook: async (bookId) => {
        try {
            const response = await axiosPrivate.put(`/v1/reservebook/${bookId}`);
                console.log("tried")
            return response.data; 
        } catch (error) {
            // Handle errors here
            if (error.response) {
                console.error("Error response from server:", error.response.data);
                throw new Error(error.response.data); 
            } else if (error.request) {
                console.error("No response received:", error.request);
                throw new Error("No response from the server"); 
            } else {
                console.error("Error setting up the request:", error.message);
                throw new Error(error.message); 
            }
        }
    },
    unreserveBook: async (bookId) => {
        try {
            const response = await axiosPrivate.put(`/v1/unreservebook/${bookId}`);
                console.log("tried")
            return response.data; 
        } catch (error) {
            // Handle errors here
            if (error.response) {
                console.error("Error response from server:", error.response.data);
                throw new Error(error.response.data); 
            } else if (error.request) {
                console.error("No response received:", error.request);
                throw new Error("No response from the server"); 
            } else {
                console.error("Error setting up the request:", error.message);
                throw new Error(error.message); 
            }
        }
    },

  
};
    
    // .unreserveBook(book._id, user._id)



export default userApi;