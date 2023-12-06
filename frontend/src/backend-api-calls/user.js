import axios from 'axios'

const userApi = {
    getProfile: async () => {
        const res = await axios.get("http://localhost:4000/api/v1/me/details")
        return res.data;
    },

    login: async (email, password)=>{
        const res = await axios.post("http://localhost:4000/api/v1/loginuser", {
            email: email,
            password: password
        })
        console.log(res)
        localStorage.setItem('token', res.data.token)
        return res.data
    },

    logout : async ()=>{
        const res = await fetch("http://localhost:4000/api/v1/logoutuser", {method:"GET"})
        return res.json()
    },

    register : async(username,password,name)=>{
        const res= await axios.get("http://localhost:4000/api/v1/logoutuser",{
            username:username,
            password:password,
            name:name
        })
        return res.data
    },
   
    reserveBook: async (bookId, userId) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/reservebook/${bookId}`, { userId });
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