import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useSWR from "swr";
import { useEffect,useState } from "react";


import useStyles from "./styles";
import { usePostContext } from "../../useContext/usePostContext";

const PostDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts } = usePostContext();
  const { id } = useParams();
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const post = location.state;


  // const url = `http://localhost:5000/posts/${id}`;
  // const fetcher = (url) => fetch(url)
  //   .then((res) => posts.filter(post => post._id !== res.json()._id));

  // const { data: recommendedPosts, error, isLoading } = useSWR(url, fetcher);

  // if (error) return <p>Error loading data</p>;
  // if (isLoading) return <div>loading...</div>;

  useEffect(() => {
    if(posts){
      const newPosts = posts.filter(post => post._id !== id);
      setRecommendedPosts(newPosts);
    }
    
  }, [posts]);

  const handleClickOpenPost = (_id) => {
    navigate(`/posts/${_id}`, { state: post });
  }

  if(!post) return null;

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id );

  return (
    <Paper style={{ marginTop: `calc(2% + 70px)`, padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => handleClickOpenPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>

      //   <div className={classes.card} style={{ paddingTop: `calc(2% + 70px)` }} >
      //   <div className={classes.section}>
      //     <Typography variant="h3" component="h2">{post.title}</Typography>
      //     <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography> 
      //     <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
      //     <Typography variant="h6">Created by: {post.name}</Typography>
      //     <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>

      //     {/* <Divider style={{ margin: '20px 0' }} />
      //     <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
      //     <Divider style={{ margin: '20px 0' }} />
      //     <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
      //     <Divider style={{ margin: '20px 0' }} /> */}
      //   </div>
      //   <div className={classes.imageSection}>
      //     <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
      //   </div>
        
      //   {recommendedPosts && (
      //     <div className={classes.section}>
      //       <Typography gutterBottom variant="h5">You might also like:</Typography>
      //       <Divider/>
      //       <div className={classes.recommendedPosts}>
      //         {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
      //           <div style={{ margin: '20px', cursor: 'pointer' }} onClick={handleClickOpenPost} key={_id}>
      //             <Typography gutterBottom variant="h6">{title}</Typography>
      //             <Typography gutterBottom variant="subtitle2">{name}</Typography>
      //             <Typography gutterBottom variant="subtitle2">{message}</Typography>
      //             <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
      //             <img src={selectedFile} width="200px" />
      //           </div>
      //         ))}

      //       </div>
      //     </div>
      //   )}
      // </div>

  )
}

export default PostDetails
