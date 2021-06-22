import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { authFunction } from '../helpers/authFunction';
import Navigation from '../Navigation/Navigation';

function Profile(props) {
  console.log(1);
  const dispatch = useDispatch();
  const history = useHistory()
  const { secretId } = useParams();

  useEffect(() => {
    authFunction(secretId, dispatch)
      // history.push('/')
  }, [secretId, history, dispatch]);

  return (
    <div>
      ProfilePage
      {/* <Navigation name="Главная" link="/"/> */}
    </div>
  );
}

export default Profile;
