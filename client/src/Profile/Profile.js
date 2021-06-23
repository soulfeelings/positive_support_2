import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import PortalToBody from '../Navigation/Portal';
import SituationForm from './SituationForm';
import React, { useEffect, useState } from "react";
import ProfileCircle from "./ProfileCircle";
import { profileStyles } from "./profilestyles.js";
import insertStyles from "../helpers/insertStyles";


function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => insertStyles(profileStyles), []);

  return currentUser ? (
    <>
      <div class="profile">
        <div class="container">
          <h2 className="profile_header">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
       <div class="picture"> <img src={currentUser.photo_url}></img></div>
          <p class='text'>text
          {currentUser.situation}</p>
          <div class='input_profile'>
            <SituationForm />
          </div>

        </div>
      </div>

      <div class="wrapper">
        {currentUser.connected_circles?.map((el) => {
          return (
            <ProfileCircle currentUser={currentUser} info={el} key={el._id} />
          );
        })}
      </div>
      <PortalToBody>
        <Navigation name="На главную" link="/"/>
      </PortalToBody>
    </>
  ) : null;
}

export default Profile;

