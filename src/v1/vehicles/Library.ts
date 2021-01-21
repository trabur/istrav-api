import axios from 'axios'

export default class Vehicles {
  constructor(config: any) {
    if (config.host) { this.host = config.host }
  }
  endpoint = 'vehicles'
  version = 'v1'
  host = 'http://localhost:3000'

  all = () => {
    let that = this
    return axios
      .get(`${this.host}/api/${this.version}/${this.endpoint}`, {})
      .then(function (response) {
        console.log('all', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('all', that.endpoint, error)
        return error
      })
  }
  
  save = (params: any) => {
    let that = this
    return axios
      .post(`${this.host}/api/${this.version}/${this.endpoint}`, {
        params: params
      })
      .then(function (response) {
        console.log('save', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('save', that.endpoint, error)
        return error
      })
  }
  
  get = (id: string) => {
    let that = this
    return axios
      .post(`${this.host}/api/${this.version}/${this.endpoint}`, {
        params: {
          id: id
        }
      })
      .then(function (response) {
        console.log('get', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('get', that.endpoint, error)
        return error
      })
  }

  update = (id: string, params: any) => {
    let that = this
    return axios
      .put(`${this.host}/api/${this.version}/${this.endpoint}/${id}`, {
        params: params
      })
      .then(function (response) {
        console.log('update', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('update', that.endpoint, error)
        return error
      })
  }

  remove = (id: string) => {
    let that = this
    return axios
      .delete(`${this.host}/api/${this.version}/${this.endpoint}/${id}`)
      .then(function (response) {
        console.log('remove', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('remove', that.endpoint, error)
        return error
      })
  }
}

