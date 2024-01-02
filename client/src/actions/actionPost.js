import * as api from "../api";

export const getPosts = async(page) => {
    try {
        const { data } = await api.getPosts(page);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const getPostsBySearch = async(searchQuery) => {
    try {
        const { data } = await api.getPostsBySearch(searchQuery);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const getPost = async(id) => {
    try {
        const { data } = await api.getPost(id);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const createPost = async(post) => {
    try {
        const { data } = await api.createPost(post);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const deletePost = async(id) => {
    try {
        const { data } = await api.deletePost(id);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const updatePost = async(id, post) => {
    try {
        const { data } = await api.updatePost(id, post);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const likePost = async(id) => {
    try {
        const { data } = await api.likePost(id);
        return data;
    } catch (e) {
        console.log(e);
    }
}