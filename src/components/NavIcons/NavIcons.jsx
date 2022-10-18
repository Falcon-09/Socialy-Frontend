import React from "react";


import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome} from '@fortawesome/free-solid-svg-icons'
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
      <FontAwesomeIcon className="ic1" style={{width: '1.5rem',
    height: '1.5rem',
    color: '#3b5998'}} icon={faHome} />
      </Link>
      <UilSetting />
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;