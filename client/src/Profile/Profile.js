import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { authFunction } from '../helpers/authFunction';
import Navigation from '../Navigation/Navigation';

function Profile(props) {

  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>
      ProfilePage {currentUser.name}
    </div>
  );
}

export default Profile;
