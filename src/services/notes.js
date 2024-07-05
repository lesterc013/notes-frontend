import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting)) // Returns another promise that has the response.data as its value
}

const create = async (newObject, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// export default {
//   getAll: getAll,
//   create: create,
//   update: update
// }

// Since the names of the keys and assigned variables are same, can write the object definition more compact:

export default {getAll, create, update}