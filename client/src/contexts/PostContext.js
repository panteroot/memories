import { createContext, useReducer, useState } from "react";

export const PostContext = createContext();

export const postReducer = (state, action) => {
    switch(action.type){
        case 'GET_POST':
            return {
                post: action.payload
            }

        case 'GET_POSTS':
            return {
                posts: action.payload.data,
                numberOfPages: action.payload.numberOfPages
            }

        case 'GET_POSTS_BY_SEARCH':
            return {
                posts: action.payload.data 
            }

        case 'CREATE_POST':
            return {
                posts: [ action.payload, ...state.posts ]
            }

        case 'DELETE_POST':
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id)
            } 
            
        case 'UPDATE_POST':
            return {
                posts: state.posts.map(post => post._id === action.payload._id? action.payload : post)
            }  

        default: 
            return state
    }
}

export const PostContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(postReducer, {
        posts: null,
        post: null,
        numberOfPages: null
    });

    const [ currentId, setCurrentId ] = useState(null);

    return (
        <PostContext.Provider value={{ ...state, dispatch, currentId, setCurrentId }}>
            { children }
        </PostContext.Provider>
    )
}