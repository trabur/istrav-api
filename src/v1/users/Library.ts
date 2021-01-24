import axios from 'axios'
import version from '../version.json'

export default class Users {
  constructor(config: any) {
    if (config.host) { this.host = config.host }
  }
  endpoint = 'users'
  host = 'http://localhost:3000'

  all = () => {
    let that = this
    return axios
      .get(`${this.host}/api/${version}/${this.endpoint}`, {})
      .then(function (response) {
        console.log('all', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('all', that.endpoint, error)
        return error
      })
  }
  
  register = (params: any) => {
    let that = this
    return axios
      .post(`${this.host}/api/${version}/${this.endpoint}`, {
        params: params
      })
      .then(function (response) {
        console.log('register', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('register', that.endpoint, error)
        return error
      })
  }
  
  login = (params: any) => {
    let that = this
    return axios
      .post(`${this.host}/api/${version}/${this.endpoint}/login`, {
        params: params
      })
      .then(function (response) {
        console.log('login', that.endpoint, response.data)
        return response.data
      })
      .catch(function (error) {
        console.log('login', that.endpoint, error)
        return error
      })
  }

  get = (id: string) => {
    let that = this
    return axios
      .get(`${this.host}/api/${version}/${this.endpoint}/${id}`)
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
      .put(`${this.host}/api/${version}/${this.endpoint}/${id}`, {
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
      .delete(`${this.host}/api/${version}/${this.endpoint}/${id}`)
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

