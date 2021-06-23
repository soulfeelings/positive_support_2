import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { authFunction } from '../helpers/authFunction';
import Navigation from '../Navigation/Navigation';
import PortalToBody from '../Navigation/Portal';

function Profile(props) {

  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>
      ProfilePage {currentUser.name}
      <PortalToBody>
        <Navigation name="На главную" link="/"/>
      </PortalToBody>
    </div>
  );
}

export default Profile;
