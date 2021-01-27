import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'http://localhost:8000', // url backendu
    timeout: 1000, // czas przez ktory wysylane sa zapytania do backendu
})

export { getAPI }
