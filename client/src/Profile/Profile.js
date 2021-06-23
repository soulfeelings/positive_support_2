import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { authFunction } from '../helpers/authFunction';

function Profile(props) {

  const currentUser = useSelector((state) => state.currentUser)
  console.log("PRO");
  return (
    <div>
      ProfilePage {currentUser.name}
    </div>
  );
}

export default Profile;
