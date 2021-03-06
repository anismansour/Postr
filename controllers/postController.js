// require model
const Post = require('../models/Post.js')

module.exports = {

    index: (req, res) =>{

        Post.find({}).populate("user").exec((err, allDemPosts)=> {

        res.json(allDemPosts)
        })

    },

    show: (req, res) =>{
        Post.findById(req.params.id, (err, thatPost) => {
            if(err) return res.json({ success: false })
            res.json(thatPost)
        })
    },
    
    new: (req, res) =>{
    },

    create: (req, res) =>{
        var newPost = new Post(req.body)
        newPost.user = req.user
        newPost.save((err, savedPost)=>{
        if(err) return res.json({ success: false })
        // res.json({ success: true, message: "post created.", post: savedPost })
        res.redirect("/")
        })
    },
    
    edit: (req, res) =>{
    },

    update: (req, res) =>{
        Post.findByIdAndUpdate(req.params.postId, req.body, { new: true}, (err, updatedPost)=>{
            res.redirect("/")
        })
    },

    destroy: (req, res) =>{
        Post.findByIdAndRemove(req.params.postId, (err) =>{
        if(err) return res.json({ success: false })
        res.json({ success: true, message: "post deleted." })
        console.log("im here")
         //res.redirect("/")
        })
    }
} 