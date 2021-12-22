const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
let Post = require('../Schema/postSchema')
Post = mongoose.model('Post', Post)
const protect = require('../middleware/protect')

router.post('/posts', protect, (req, res) => {
    Post.find()
        .poppulate('postedBy', '_id name')
        .then(posts => {
            res.json({posts})
            .catch (err => {
                res.json({ err })
            })
        })
    }
)


router.post('/createpost',protect,(req,res)=>{
    const {title,body, url} = req.body 
    if(!title || !body, !url){
      return  res.status(422).json({error:"saare fields toh bharde dumb"})
    }
    // req.user.password = undefined
    const newPost = new Post({
        title,
        body,
        photo:url,
        postedBy:req.user
    })
    newPost.save().then(result=>{
        res.json({newPost:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router;