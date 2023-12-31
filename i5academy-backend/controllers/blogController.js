const express = require('express'),
    router = express.Router()

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './upload/thumb',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadThumb = multer({
    storage: storage
})

const blogService = require("../service/blogService")

router.get('/class?', async (req, res) => {
    console.log('k');
    // let name = req.params.cName.replace(/%20/g, ' ')
    console.log(req.query);
    const response = await blogService.getByClass(req.query.c)
    res.send(response)
})

router.get('/addc', async (req, res) => {
    console.log('run c');
    const result = await blogService.getCat()
    return res.send(result)
})


router.get('/:id', async (req, res) => {
    const blog = await blogService.getBlogById(req.params.id)
    if(blog.length === 0) res.status(404).send("Here Nothing found!")
    else
    res.send(blog)
})

router.get('/', async (req, res) => {
    const blog = await blogService.getAllBlogs()
    if(blog.length === 0) res.status(404).send("here 2 Nothing found!")
    else
    res.send(blog)
})

router.delete('/:id', async (req, res) => {
    const blog = await blogService.deleteById(req.params.id)
    if(blog === 0) res.status(404).send("Post not found!")
    else res.send("Deleted " + blog + " successfully!")
})


router.post('/', async (req, res) => {
    console.log("Here ----- --")
    console.log(req.body)
    const added = await blogService.addOrEditBlog(req.body)
    res.status(201).send("Added Success fully")
})

router.post('/upload', uploadThumb.single('thumb'), (req, res) => {
    console.log(req.file.filename);
    res.json(
        {
            status: '201',
            thumb_url: `http://localhost:3000/thumb/${req.file.filename}`
        }
        )
    })
    
router.put('/:id', async (req, res) => {
    const {affectedrows} = await blogService.addOrEditBlog(req.body, req.params.id)
    // if(affectedrows !== 0) res.status(404).send("Something went wrong!")
    // else
    console.log(affectedrows);
    res.status(201).send("Patch work done!")
})

router.post('/add', async (req, res) => {
    const result = await blogService.addCat(req.body)
    res.status('201').send("Added Successfully!")
})


router.delete('/delc/:name', async (req, res) => {
    console.log(req.params.name);
    const resp = await blogService.delCat(req.params.name)
    if(resp === 0) res.status(404).send("Post not found!")
    else res.send("Deleted successfully!")
})


module.exports = router