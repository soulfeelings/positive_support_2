import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStateAC } from "../redux/actionCreators/updateStateAC";
import axios from "axios";
import classes from './Profile.module.css'

function ProfileCircle({ info, currentUser }) {
  const dispatch = useDispatch();
  const unfollowHandler = (id) => {
    axios
      .post("/circle/unfollow", {
        currentUser,
        id,
      })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => alert(err));
  };
  return (
    <div className={classes.item}>
      <h3>{info.name}</h3>
      <button className={classes.button}  style={{opacity: 0.8}} onClick={() => unfollowHandler(info._id)}>
        Выйти
      </button>
    </div>
  );
}
export default ProfileCircle;
