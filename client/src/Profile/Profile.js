import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import PortalToBody from '../Navigation/Portal';
import SituationForm from './SituationForm';
import React, { useEffect, useState } from "react";
import ProfileCircle from "./ProfileCircle";
import { profileStyles } from "./profilestyles.js";
import insertStyles from "../helpers/insertStyles";
import BackgroundProfile from './Background/BackgroundProfile';


function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const circles = useSelector((state) => state.circles);
  const mycircles = circles.filter((c) => currentUser.connected_circles.includes(c._id));

  useEffect(() => insertStyles(profileStyles), []);

  return currentUser ? (
    <>
      <div className="profile">
        <div className="container">
          <h2 className="profile_header">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
       <div className="picture"> <img src={currentUser.photo_url}></img></div>
          <p className='text'>{currentUser.situation}</p>
          <div className='input_profile'>
            <SituationForm />
          </div>

        </div>
      </div>

      <div className="wrapper">
        {mycircles?.map((el) => {
          return (
            <ProfileCircle currentUser={currentUser} info={el} key={el._id} />
          );
        })}
      </div>
      <BackgroundProfile />
      <PortalToBody>
        <Navigation name="На главную" link="/"/>
      </PortalToBody>
    </>
  ) : null;
}

export default Profile;

