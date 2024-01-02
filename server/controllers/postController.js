import mongoose from "mongoose";
import Post from "../models/postModels.js";

export const getPosts = async(req, res) => {
    try {
        const { page } = req.query;
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT; //starting index per page
        const total = await Post.countDocuments();
        
        const posts = await Post.find().sort({ createdAt: -1 }).limit(LIMIT).skip(startIndex); 
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const getPostsBySearch = async(req, res) => {
    try {
        const { searchQuery, tags } = req.query;

        const title = new RegExp(searchQuery, 'i');

        const posts = await Post.find({ $or: [ 
                        { title }, 
                        { tags: { $in: tags.split(',') }}
                    ]});

        res.status(200).json({ data: posts });   
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const getPost = async(req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const createPost = async(req, res) => {
    try {
        const post = new Post({ ...req.body, creatorId: req.userId, createdAt: new Date().toISOString() });
        await post.save();
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const deletePost = async(req, res) => {
    try {
        const { id: _id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).json({ error: 'Invalid id!' });

        const post = await Post.findOneAndDelete({ _id });
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const updatePost = async(req, res) => {
    try {
        const { id: _id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).json({ error: 'Invalid id!' });

        const post = await Post.findOneAndUpdate({ _id }, { ...req.body }, { new: true });
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const likePost = async(req, res) => {
    try {
        const { id: _id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).json({ error: 'Invalid id!' });

        const existingPost = await Post.findOne({ _id });

        const index = existingPost.likes.findIndex(id => id === String(req.userId));
        
        if(index === -1){ //to like
            existingPost.likes.push(req.userId);
        }else{ // to unlike
            existingPost.likes = existingPost.likes.filter(id =>  id !== String(req.userId));
        }

        const post = await Post.findOneAndUpdate({ _id }, existingPost, { new: true });
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}
