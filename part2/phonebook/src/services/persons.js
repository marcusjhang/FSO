import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data) 
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data) // returns the person object that was created
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data) // returns the person object that was updated
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const personService = { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove
}

export default personService;