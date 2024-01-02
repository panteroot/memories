import { Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { usePostContext } from "../../../useContext/usePostContext";
import { useAuthContext } from "../../../useContext/useAuthContext";
import { deletePost, likePost, getPost } from "../../../actions/actionPost";

const Post = ({ post }) => {
    const classes = useStyles();
    const { dispatch, setCurrentId } = usePostContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    // just check if no user or likes first before checking dbase likes
    const isLiked = (!user || post.likes.length === 0)? 
                        false 
                    : (post.likes.find(liker => liker === user?.data._id? true : false ));

    // for google login , user.data._id = user.sub (unique id for each google user, passed in localStorage)              
    const isCreator = user && user.data._id === post.creatorId? true : false;
    
    const Likes = () => {
        if(post.likes.length > 0){
            return isLiked?
                (
                    <>
                        <ThumbUpAltIcon fontSize="small"/> Like
                        { post.likes.length }
                    </>
                ) :
                (
                    <>
                        <ThumbUpAltOutlinedIcon fontSize="small"/> Like
                        { post.likes.length }
                    </>
                )
        }else{
            return (
                <>
                    <ThumbUpAltOutlinedIcon fontSize="small" /> Like
                </>
            )
        }
    }

    const handleDelete = async() => {
        const result = await deletePost(post._id);
        dispatch({ type: 'DELETE_POST', payload: result });
    }

    const handleLike = async() => {
        const result = await likePost(post._id);
        dispatch({ type: 'UPDATE_POST', payload: result });
    }

    const handleClick = () => {
        navigate(`/posts/${post._id}`);
    }

    const handleClickForEdit = (e) => {
        e.stopPropagation();
        setCurrentId(post._id); 
    }

    
    return(

        <Card className={classes.card} raised elevation={6}>
            <CardMedia 
                    className={classes.media} 
                    image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
                    title={post.title} 
            />

            <ButtonBase color="yellow" name="test" className={classes.cardAction} component="span" onClick={handleClick}>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.creator}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> 
                </div>

                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">
                        {post.tags.map(tag => `#${tag} `)}
                    </Typography>
                </div>

                <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                    {post.title}
                </Typography>

                <CardContent>
                    <Typography className={classes.message} variant="body2" color="textSecondary" component="p">
                        {post.message.split(' ').splice(0, 20).join(' ')}...
                    </Typography>
                </CardContent>
            </ButtonBase>

            { user &&
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={user && handleLike}>
                    <Likes/>
                </Button>

                { isCreator &&
                <>
                    <Button size="small" color="secondary" onClick={handleClickForEdit}>
                        <EditIcon fontSize="small"/> Edit
                    </Button>

                    <Button size="small" color="secondary" onClick={handleDelete}>
                        <DeleteIcon fontSize="small"/> Delete
                    </Button>
                </>
                }
            </CardActions>
            } 
        </Card>
    )
}

export default Post;