const stream = require('stream')
const multer = require('multer')
const path = require('path')
const { google } = require('googleapis')

const storage = multer.memoryStorage()

// Create file filters 
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Only images are allowed'), false)
    }
}

const uploadImage = multer({storage: storage, fileFilter: imageFileFilter})

// Google Drive API settings
const KEYFILEPATH = path.join(__dirname, '../../google_credentials.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

const gDriveFolderId = '1LRHuY5uNuXqFZEvnQnkleex2DiKXEwKE' // the folder id of the google drive folder where product images will be stored

const uploadFile = async (file) => {
    const bufferStream = new stream.PassThrough()
    bufferStream.end(file.buffer)

    try {
        // Upload the file to google drive
        const uploadedFile = await google.drive({
                version: 'v3',
                auth: auth
            }).files.create({
                media: {
                    mimeType: file.mimetype,
                    body: bufferStream
                },
                requestBody: {
                    name: file.originalname,
                    parents: [gDriveFolderId]
                },
                fields: "id, name"
            })
            
            // Update the file name with its unique file id
            const fileId = uploadedFile.data.id
            const updatedFile = await google.drive({
                version: 'v3',
                auth: auth
            }).files.update({
                fileId: fileId,
                requestBody: {
                    name: fileId
                },
                fields: "id"
            })
            return updatedFile.data.id
    } catch (err) {
        console.log(err)
        return
    }
}

module.exports = { uploadImage, uploadFile }
