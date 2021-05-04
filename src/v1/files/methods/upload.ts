import AWS from "aws-sdk"
import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

var accessKeyId =  process.env.AWS_ACCESS_KEY
var secretAccessKey = process.env.AWS_SECRET_KEY

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
})

var s3 = new AWS.S3()

export default function (config: any, appRepo: any) {
  return async function (req: Request, res: Response, next) {
    // params
    let es = { 
      arguements: {
        appId: undefined,
        token: undefined,
        folder: undefined
      },
      payload: {},
      serverAt: null
    }
    es.arguements = req.body
    console.log('params', es.arguements)

    // authentication
    let decoded: any = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)
    
    // check if memberId from token is the owner to provided appId
    const app = await appRepo.findOne({
      select: ["id"],
      where: {
        id: es.arguements.appId,
        ownerId: decoded.memberId
      }
    })
    if (!app) {
      // end
      es.payload = {
        success: false,
        reason: 'memberId from token is not the owner to provided appId or app does not exist'
      }
      es.serverAt = Date.now()
      res.json(es)
    }

    // perform
    let sampleFile
    let uploadPath

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile
    uploadPath = `${app.id}/${es.arguements.folder}/${sampleFile.name}`

    const params = {
      Bucket: 'istrav', // pass your bucket name
      Key: uploadPath, // folder and file name
      Body: sampleFile.data
    }
    console.log('params', params)
    s3.upload(params, function(s3Err, data) {
      if (s3Err) throw s3Err
      console.log(`File uploaded successfully at ${data.Location}`)

      // end
      es.payload = {
        success: true,
        data: data
      }
      es.serverAt = Date.now()
      res.json(es)
    })
    // {"arguements":{"appId":"999b73b4-708b-47db-8569-af1e4953a7b4","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImRkNmUwMjlmLTViODctNDc1My1iMGQ4LTQ0YmQ2ZWE5MTFjNiIsImVtYWlsIjoidHJhdmlzLmJ1cmFuZHRAZ21haWwuY29tIiwiaWF0IjoxNjE3NDk0NjQ2fQ.KSRYzNOUKI1lEINnYOrOQYueAcCI--w3_GPs-B4cmYQ","folder":"something/another"},"payload":{"success":true,"data":{"ETag":"\"e203cd8ad605a367ffba4536022dfa06\"","Location":"https://istrav.s3.amazonaws.com/999b73b4-708b-47db-8569-af1e4953a7b4/something/another/haha.png","key":"999b73b4-708b-47db-8569-af1e4953a7b4/something/another/haha.png","Key":"999b73b4-708b-47db-8569-af1e4953a7b4/something/another/haha.png","Bucket":"istrav"}},"serverAt":1617568802470}
  }
}