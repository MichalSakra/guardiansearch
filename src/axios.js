import axios from "axios"


const instance = axios.create({
    baseURL: "https://content.guardianapis.com"
})

export default instance