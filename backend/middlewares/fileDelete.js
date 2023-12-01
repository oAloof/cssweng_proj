const path = require('path')
const { google } = require('googleapis')
const { log } = require('console')

// Google Drive API settings
const KEYFILEPATH = path.join(__dirname, '../google_credentials.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

const deleteFile = async (fileId) => {
    try {
        const deletedFile = google.drive({
            version: 'v3',
            auth: auth
        }).files.delete({
            fileId: fileId
        })
        return (await deletedFile).data.fileId
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = { deleteFile }