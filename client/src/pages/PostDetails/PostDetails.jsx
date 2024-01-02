import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useSWR from "swr";


import useStyles from "./styles";

const PostDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const url = `https://memories-h9eg.onrender.com/posts/${id}`;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: post, error, isLoading } = useSWR(url, fetcher);

  if (error) return <p>Error loading data</p>;
  if (isLoading) return <div>loading...</div>;

  const handleClickOpenPost = (_id) => {
    navigate(`/posts/${_id}`);
  }

  if(!post) return null;

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id );

  return (

        <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography> 
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>

          {/* <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} /> */}
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        
        {/* {recommendedPosts && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">You might also like:</Typography>
            <Divider/>
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={handleClickOpenPost} key={_id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              ))}

            </div>
          </div>
        )} */}
      </div>

  )
}

export default PostDetails
