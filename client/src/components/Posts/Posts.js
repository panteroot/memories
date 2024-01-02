import { Grid, CircularProgress } from "@mui/material";

import useStyles from "./styles";
import Post from "./Post/Post";
import { usePostContext } from "../../useContext/usePostContext";

const Posts = () => {
    const classes = useStyles();
    const { posts } = usePostContext();
    
    return (
        posts.length === 0? <CircularProgress /> : 
        (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map(post => 
                        (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                                <Post post={post} />
                            </Grid>
                        )
                    )
                }  
            </Grid>
        )  
    )
}

export default Posts;