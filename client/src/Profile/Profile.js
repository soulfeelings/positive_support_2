import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { authFunction } from '../helpers/authFunction';

function Profile(props) {

  const dispatch = useDispatch();
  const history = useHistory()
  const currentUser = useSelector(state => state.currentUser)
  const { secretId } = useParams();

  useEffect(() => {
    authFunction(secretId, dispatch)
      history.push('/')
  }, [secretId, dispatch]);

  return (
    <div>
      ProfilePage
    </div>
  );
}

export default Profile;
