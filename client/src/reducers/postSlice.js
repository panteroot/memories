import { createSlice } from "@reduxjs/toolkit";
import { 
    getPosts, getPostsBySearch, getPost, 
    createPost, deletePost, updatePost, likePost 
} from "../thunks/postThunk";

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        posts: [],
        post: undefined,
        isLoading: true
    },
    reducers: {
        start_loading(state) {
            state.isLoading = true
        },
        end_loading(state) {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                // state.posts = action.payload
                state.posts = { 
                    data: action.payload.data, 
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages
                }
                state.isLoading = false
            })
            .addCase(getPostsBySearch.pending, (state, action) => {
                state.isLoading = true
                state.post = action.payload
            })
            .addCase(getPostsBySearch.fulfilled, (state, action) => {
                // state.posts = action.payload
                state.posts = {
                    data: action.payload
                }
                state.isLoading = false
            })
            .addCase(getPost.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.post = action.payload
                state.isLoading = false
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.data = [ ...state.posts.data, action.payload ]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts.data = state.posts.data.filter(post => post._id !== action.payload._id)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts.data = state.posts.data.map(post => post._id === action.payload._id? action.payload: post)
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts.data = state.posts.data.map(post => post._id === action.payload._id? action.payload: post)
            })
    }
});

export default postSlice.reducer;

export const { start_loading, end_loading } = postSlice.actions;