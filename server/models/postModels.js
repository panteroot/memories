import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    creator: String,
    creatorId: String,
    title: String,
    message: String,
    tags: [String],
    likes: {
        type: [String],
        default: []
    },
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const model = mongoose.model('Post', postSchema);

export default model;