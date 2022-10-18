import React, {useState} from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import { useSelector } from "react-redux";
import { IconName } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faOutlineHeart} from '@fortawesome/free-regular-svg-icons'
import { likePost } from '../../api/PostsRequests'


const Post = ({data}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () =>{
    likePost(data._id, user._id);
    setLiked((prev)=>!prev)
    liked? setLikes((prev)=>prev-1):setLikes((prev)=>prev+1) 
  }

  return (
    <div className="Post">
        <img
        src={data.image ? "https://socialy-backend.herokuapp.com/images/" + data.image : ""}
        alt=""
        />
        <div className="postReact">
            <div onClick={handleLike}>
            {liked?<FontAwesomeIcon className='her1' icon={faHeart}/> : <FontAwesomeIcon className='her2' icon={faOutlineHeart}/> }
            </div>
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post