
const mongoose = require('mongoose');
const uuid = require('uuid')

mongoose.connect('mongodb://127.0.0.1:27017/DocumentMangement')

const documentSchema = mongoose.Schema({
    documentId: String,
    title: String,
    contents: String,
    lastUpdated: { type: Date, default: Date.now }  
})


const Document = mongoose.model('Document', documentSchema);


//Listing the documents currently stored in the database
const retrieveAllDocuments = async() =>{
    const listOfDocuments = await Document.find().exec()
    return listOfDocuments
}


//Creating a new document
const createDocuments = async (req, res) => {
    const documentId = uuid.v4()
    const {title, contents} = req.body
    console.log("name and conents", title, contents)
    const newDocument = new Document({
        documentId,
        title,
        contents
    })
    await newDocument.save()
}


//Seeing the full details of an existing document
const retrieveDocumentById = async (documentId) => {
    const document = await Document.findOne({documentId: documentId})
    return document   
}


//Edit the existing document
const updateDocument = async (req) => {
    const documentId = req.params.documentId
    const { title, contents } = req.body

    // Check if the user has made any changes to title or contents
    const document = await Document.findOne({ documentId })

    if (document && (document.title !== title || document.contents !== contents)) {
        // If changes are made, update the lastUpdated field
        const lastUpdated = new Date();
        const updatedDocument = await Document.findOneAndUpdate(
            { documentId },
            {
                $set: {
                    title,
                    contents,
                    lastUpdated
                }
            },
            { new: true }
        );

        return updatedDocument
    } else {
        // If no changes were made, return the existing document
        return document
    }
}


//Delete the document
const deleteDocument = async(documentId) => {
   await Document.deleteOne({documentId}) 
}


module.exports ={
    retrieveAllDocuments,
    createDocuments, 
    retrieveDocumentById,
    updateDocument,
    deleteDocument
}