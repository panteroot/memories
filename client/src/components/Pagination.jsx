import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import useStyles from "./styles";
import { usePostContext } from "../useContext/usePostContext";
import { getPosts } from "../actions/actionPost";

const Paginate = ({ page }) => {
    const classes = useStyles();
    const { posts, numberOfPages, dispatch } = usePostContext();

    useEffect(() => {
        const loadPosts = async() => {
            if(page){
                const result = await getPosts(page);
                dispatch({ type: 'GET_POSTS', payload: result });
            }      
        }

        return() => loadPosts();
        
    }, [page]);

    return (
        <Pagination
            classes = {{ ul: classes.ul }}
            count = {numberOfPages}
            page = {Number(page) || 1}
            variant = "outlined"
            renderItem={(item) => (
                <PaginationItem { ...item } component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;