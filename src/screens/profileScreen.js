import React from 'react';
import "./profileScreen.css"
import Nav from '../Nav';


function ProfileScreen() {
  return (
    <div className='profileScreen'>

          <Nav />
    
<div className='profileScreenBody'>
    <h1>Edit Profile</h1>
    <div className='profileScreen_info'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'/>
        </div> 


</div>
      </div>
  )
}

export default ProfileScreen;