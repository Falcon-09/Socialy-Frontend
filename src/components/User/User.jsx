import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { ChatRoute } from "../../Routes/ChatRoute";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = async () => {

    const chatExists = await axios.get(ChatRoute+`find/${user._id}/${person._id}`);
    
    if(!chatExists.data){
      await axios.post(ChatRoute,{
        senderId: user._id,
        receiverId: person._id,
        text: ""
      })
    }

    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);

    if(following){
      console.log(ChatRoute+`${user._id}/${person._id}`);
      await axios.delete(ChatRoute+`${user._id}/${person._id}`);
    }
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            publicFolder + person.profilePicture !== publicFolder
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.firstname}{person.lastname}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
