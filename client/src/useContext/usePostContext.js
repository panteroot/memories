import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export const usePostContext = () => {
    const context = useContext(PostContext);
    if(!context)
        throw Error('usePostContext must be inside PostContextProvider (check your index.js)');

    return context;
}