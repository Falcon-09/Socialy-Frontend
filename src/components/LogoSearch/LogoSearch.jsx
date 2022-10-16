import React from 'react'
import Logo from '../../img/logo.svg'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'
const LogoSearch = () => {
  return (
   <div className="LogoSearch">
       <img className='Logoset' src={Logo} alt="" />
       <div className="Search">
           <input type="text" placeholder='#Search' />
           <div className="s-icon">
               <UilSearch/>
           </div>
       </div>
   </div>
  )
}

export default LogoSearch