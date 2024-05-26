import axios from 'axios'
const baseUrl = '/api/persons' // you can use a relative base URL because any GET request to the address before this relative base URL will be handled by the backend code

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