import { Grow, Container, Grid, Paper, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";

import useStyles from "./styles";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import Pagination from "../../components/Pagination";
import { usePostContext } from "../../useContext/usePostContext";
import { getPosts, getPostsBySearch } from "../../actions/actionPost";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([]);
    const {posts, dispatch} = usePostContext();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const handleChangeTags = (tags) => {
        setTags(tags);
    }

    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (tagToDel) => setTags(tags.filter(t => t !== tagToDel));

    const handleSearchPost = async() => {
        if(searchTerm.trim() || tags.length > 0){
            const result = await getPostsBySearch({ search: searchTerm, tags: tags.join(',') });
            navigate(`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(',')}`);
        }else{
            navigate("/");
        }
    }

    useEffect(() => {
        const loadPosts = async() => {
            const result = await getPosts(page);
            dispatch({ type: 'GET_POSTS', payload: result });
        }

        return() => loadPosts();

    }, [dispatch]);
    

    if(!posts) return null;

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.paper} elevation={6}>
                            <TextField 
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={searchTerm}                           
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MuiChipsInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                fullWidth
                                onAddChip={handleAddChip}
                                onDeleteChip={handleDeleteChip}
                                label="Search Tags"
                                variant="outlined"
                                onChange={handleChangeTags}
                            />
                        </Paper>

                        <br/>
                        <Button 
                            className={classes.searchButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={handleSearchPost}
                        >Search
                        </Button>
                        <br/><br/>

                        <Form />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;