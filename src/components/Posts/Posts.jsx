import React,{useEffect} from 'react'
import { getTimelinePosts } from "../../actions/PostsAction";
import './Posts.css'
import { PostsData } from '../../Data/PostsData'
import { useSelector, useDispatch } from "react-redux";
import Post from '../Post/Post'
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch(); 
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if(!posts) return "no posts"
  if(params.id) posts = posts.filter((post)=>post.userId===params.id)
  return (
    <div className="Posts">
        {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  )
}

export default Posts