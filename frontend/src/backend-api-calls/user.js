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
        return res.data
    },

    logout : async ()=>{
        const res = await fetch("http://localhost:4000/api/v1/logoutuser", {method:"GET"})
        return res.json()
    }
};

export default userApi;