import axios from 'axios'

export default class Vehicles {
  constructor(host: any) {
    this.host = host
  }
  host = ''

  all = () => {
    return axios
      .get(`${this.host}/api/v1/vehicles`, {})
      .then(function (response) {
        console.log('allVehicles', response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('allVehicles', error)
        return error
      })
  }
  
  save = (params: any) => {
    return axios
      .post(`${this.host}/api/v1/vehicles`, {
        params: params
      })
      .then(function (response) {
        console.log('saveVehicle', response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('saveVehicle', error)
        return error
      })
  }
  
  get = (id: string) => {
    return axios
      .post(`${this.host}/api/v1/vehicles`, {
        params: {
          id: id
        }
      })
      .then(function (response) {
        console.log('vehicleById', response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('vehicleById', error)
        return error
      })
  }

  update = (id: string, params: any) => {
    return axios
      .put(`${this.host}/api/v1/vehicles/${id}`, {
        params: params
      })
      .then(function (response) {
        console.log('updateVehicle', response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('updateVehicle', error)
        return error
      })
  }

  remove = (id: string) => {
    return axios
      .delete(`${this.host}/api/v1/vehicles/${id}`)
      .then(function (response) {
        console.log('deleteVehicle', response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('deleteVehicle', error)
        return error
      })
  }
}

