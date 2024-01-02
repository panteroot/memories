import axios from "axios";

const API = axios.create({ baseURL: "https://memories-h9eg.onrender.com" });

API.interceptors.request.use(req => {
    if(localStorage.getItem('user')){
        const token = JSON.parse(localStorage.getItem('user')).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});


export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (post) => API.post('/posts', post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const likePost = (id) => API.patch(`/posts/likepost/${id}`);

export const userSignup = (user) => API.post('/user/signup', user);
export const userLogin = (user) => API.post('/user/login', user);