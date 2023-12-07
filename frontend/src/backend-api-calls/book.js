import axios from "axios";
import axiosPrivate from "../api/axios";

const bookApi = {
    getAllBooks: async () => {
        const res = await fetch("http://localhost:4000/api/v1/getAllbooks", { method: "GET" });
        return res.json();
    },
    getUserBooks: async () => {
      const res = await axiosPrivate.get("/v1/getuserbooks")
      return res.data
    },

    getBookByid: async (id) =>{
        const res = await axiosPrivate.get(`/v1/getbookdetails/${id}`)
        return res.data
    },
    updateBookByid: async (id, data) => {
      console.log(data, 'mod gud')
        const res = await fetch(`http://localhost:4000/api/v1/admin/updatebook/${id}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
        const updated=await res.json()
        console.log(updated)
        return updated
      },
      createBook: async (data) => {
        const res = await fetch("http://localhost:4000/api/v1/admin/createbook", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
        return res.json()
      },
      deleteBook: async (id)=>{
        const token = localStorage.getItem('token')
        const res= await axiosPrivate.delete(`/v1/admin/deletebook/${id}`, { withCredentials: true })
        return res.data
      }
      
};

export default bookApi;
