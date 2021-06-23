import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile_circle from "./Profile_circle";
import { profileStyles } from "./profilestyles.js";
import insertStyles from "../helpers/insertStyles";
function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const [styled, setStyled] = useState(false);

  useEffect(() => insertStyles(profileStyles), []);

  // if (!styled) {
  //   return <>Loading</>;
  // }

  return currentUser ? (
    <>
      <div class="profile">
        <div class="container">
          <h2 className="profile_header">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <img src={currentUser.photo_url}></img>
          <p>{currentUser.situation}</p>
          <input />
        </div>
      </div>

      <div class="wrapper">
        {currentUser.connected_circles?.map((el) => {
          return (
            <Profile_circle currentUser={currentUser} info={el} key={el._id} />
          );
        })}
      </div>
    </>
  ) : null;
}

export default Profile;
