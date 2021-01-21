import axios from 'axios'

export default class Vehicles {
  constructor(host) {
    this.host = host
  }
  this.host

  allVehicles() {
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
  
  saveVehicle(params) {
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
  
  vehicleById(id) {
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
}

