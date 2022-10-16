import React, {useEffect,useState} from 'react'
import './FollowersCard.css'

import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";

import { Followers } from '../../Data/FollowersData'
const FollowersCard = () => {

  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
        <h3>People that you may know</h3>

        {persons. map((person, id)=>{
            if(person._id!==user._id)
            return(
               <User person={person} key={id}/>
            )
        })}
    </div>
  )
}

export default FollowersCard