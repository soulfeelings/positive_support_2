import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { authFunction } from '../helpers/authFunction';
import { useDispatch, useSelector } from "react-redux";
import Profile_circle from './Profile_circle';

function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);
  console.log(currentUser)
  const dispatch = useDispatch();

  const history = useHistory()
  const { secretId } = useParams();

  useEffect(() => {
    authFunction(secretId, dispatch)
      history.push('/profile')
  }, [secretId, history, dispatch]);

  return currentUser ? (

<>

<div style={{color: 'blue'}}>
  <div>
      {currentUser.firstName}
      {currentUser.lastName}
      <img src={currentUser.photo_url}></img>
      <br/>
  </div>
     {currentUser.connected_circles?.map(el=> {

       return <Profile_circle currentUser={currentUser} info={el} key={el._id} />

    })}

</div>
  </>

  ) : null
  }

export default Profile;


