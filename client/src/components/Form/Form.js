import { Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { usePostContext } from "../../useContext/usePostContext";
import { useAuthContext } from "../../useContext/useAuthContext";
import { createPost, updatePost, getPost } from "../../actions/actionPost";

const Form = () => {
    const classes = useStyles();
    const { dispatch, currentId, setCurrentId } = usePostContext();
    const { user } =  useAuthContext();
    const [postData, setPostData] = useState({
        title: '',
        creator: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    useEffect(() => {  
        const loadPost = async() => {
            const result = await getPost(currentId);
            setPostData(result);
        }
        
        loadPost();   

    }, [currentId]);


    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!currentId){
            const result = await createPost(postData)
            dispatch({ type: 'CREATE_POST', payload: result });
        }else{
            const result = await updatePost(currentId, postData );
            dispatch({ type: 'UPDATE_POST', payload: result });
        }
        handleClear();
    }

    const handleClear = () => {
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
        setCurrentId(null);
    }

    const handleChange = (e) => {
        setPostData({...postData, [e.target.name]: e.target.value});
    }

    if(!user){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Pls sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    
    return (
        <Paper className={classes.paper} elevation={6}>
            <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId? 'Editing' : 'Creating' } Memory</Typography>
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={postData?.title}
                    onChange={handleChange}
                />
                <TextField
                    name="message"
                    label="Message"
                    variant="outlined"
                    fullWidth
                    required
                    value={postData?.message}
                    onChange={handleChange}
                />
                <TextField
                    name="tags"
                    label="Tags (separate by comma)"
                    variant="outlined"
                    fullWidth
                    required
                    value={postData?.tags}
                    onChange={e => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    fullWidth
                >Submit
                </Button>
                <Button 
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={handleClear}
                >Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;