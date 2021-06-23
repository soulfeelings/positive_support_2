import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import PortalToBody from '../Navigation/Portal';
import SituationForm from './SituationForm';

function Profile(props) {

  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>
      ProfilePage {currentUser.name}
      <br/>
      <SituationForm />
      <PortalToBody>
        <Navigation name="На главную" link="/"/>
      </PortalToBody>
    </div>
  );
}

export default Profile;
