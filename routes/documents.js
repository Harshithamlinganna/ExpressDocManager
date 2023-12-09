const { Router } = require('express')
const documentModel = require('../models/documentModel')

const router = Router()

//Retrieve all Documents
router.get('/', async (req, res) => {
    try{
        const documents = await documentModel.retrieveAllDocuments()
        res.render('list', {documents})
    }catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})


// Render the create document view
router.get('/create', (req, res) => {
    try{
        res.render('create')
    }catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
    
})


//Create the document
router.post('/', async(req, res) =>{
    try{
        await documentModel.createDocuments(req)
        res.redirect('/documents')
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})


// Seeing the full details of an existing document by id
router.get("/:documentId", async (req, res) => {
    try{
        const document = await documentModel.retrieveDocumentById(req.params.documentId);
        
        if (document) {
            res.render('details', {document})
        } else {
            res.status(404).send('Document doesn\'t exist') // Send a 404 status for not found
        }
    }catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})


// Render the edit document view
router.get("/:documentId/edit", async (req, res) => {
    try{
        const document = await documentModel.retrieveDocumentById(req.params.documentId);
        
        if (document) {
            res.render('edit', { document })
        } else {
            res.status(404).send('Document doesn\'t exist')
        }
    }catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
});


//Edit the existing data
router.post("/:documentId/edit", async(req, res)=>{
    try{
        const updatedDocument =  await documentModel.updateDocument(req)
        
        if (updatedDocument) {
            res.redirect('/documents')
        } else {
            res.status(404).send('Document doesn\'t exist')
        }
    }catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }   
})


//Render the delete document view
router.get('/:documentId/delete', async(req, res) =>{
    try{
        const document = await documentModel.retrieveDocumentById(req.params.documentId)
        res.render('delete', {document})
    }catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    } 
})


// Delete a document
router.post('/:documentId/delete', async (req, res) => {
    try {
      await documentModel.deleteDocument(req.params.documentId)
      res.redirect('/documents');
    } catch (err) {
      console.error(err);   
      res.status(500).send('Internal Server Error')
    }
})


module.exports = router