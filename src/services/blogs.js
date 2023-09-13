import axios from 'axios'



//KUN TESTATAAN FRONTENDIA JA BACKENDIA YHDESSA -> BACKEND SERVER ADDRESS
//http://localhost:3000/            Kayttoliittyma
//http://localhost:3000/api/notes   Kayttoliittyma
//http://localhost:3001/api/notes   Pelkka data
//http://localhost:3001/api/users   Pelkka data

//C:\Users\PC\bloglist-frontend> npm run dev
//http://localhost:5173/

const baseUrl = 'http://localhost:3001/api/blogs'

//const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


const delItem = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

/*
const delItem = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}
*/

export default { 
  getAll, create, update, delItem, setToken 
}
