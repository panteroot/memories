import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getPosts = createAsyncThunk('postSlice/getData', async(page) => {
    try {
        const { data } = await api.getPosts(page);   
        return data;
    } catch (e) {
        console.log(e)
    }
});

export const getPostsBySearch = createAsyncThunk('postSlice/getDataBySearch', async(searchQuery) => {
    try {
        const { data } = await api.getPostsBySearch(searchQuery);
        return data;
    } catch (e) {
        console.log(e)
    }
});

export const getPost = createAsyncThunk('postSlice/getOneData', async(id) => {
    try {
        const { data } = await api.getPost(id);
        return data;
    } catch (e) {
        console.log(e)
    }
});

export const createPost = createAsyncThunk('postSlice/createData', async(post) => {
    try {
        const { data } = await api.createPost(post);
        return data;
    } catch (e) {
        console.log(e)
    }
});

export const deletePost = createAsyncThunk('postSlice/deleteData', async(id) => {
    try {
        const { data } = await api.deletePost(id);
        return data;
    } catch (e) {
        console.log(e)
    }
});

export const updatePost = createAsyncThunk('postSlice/updateData', async(post) => {
    try {
        const { data } = await api.updatePost(post._id, post.postData);
        return data;
    } catch (e) {
        console.log(e)
    }
});

export const likePost = createAsyncThunk('postSlice/likePostData', async(id) => {
    try {
        const { data } = await api.likePost(id);
        return data;
    } catch (e) {
        console.log(e)
    }
});

