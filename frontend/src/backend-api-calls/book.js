import axios from "axios";

const bookApi = {
    getAllBooks: async () => {
        const res = await fetch("http://localhost:4000/api/v1/getAllbooks", { method: "GET" });
        return res.json();
    },
    getBookByid: async (id,token) =>{
        const res = await axios.get(`http://localhost:4000/api/v1/getbookdetails/${id}`,{
          headers: {
            Authorization: `Bearer ${token}` 
        }
        })
        return res.data
    },
    updateBookByid: async (id, data) => {
        const res = await fetch(`http://localhost:4000/api/v1/admin/updatebook/${id}}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
        return res.json()
      },
      createBook: async (data) => {
        const res = await fetch("http://localhost:4000/api/v1/admin/createbook", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
        return res.json()
      },
};

export default bookApi;
