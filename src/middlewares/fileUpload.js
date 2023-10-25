const stream = require('stream')
const multer = require('multer')
const path = require('path')
const { google } = require('googleapis')

const upload = multer()

const KEYFILEPATH = path.join(__dirname, '../../google_credentials.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

const gDriveFolderId = '1LRHuY5uNuXqFZEvnQnkleex2DiKXEwKE'
