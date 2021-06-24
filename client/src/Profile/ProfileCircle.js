import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStateAC } from "../redux/actionCreators/updateStateAC";
import axios from "axios";

function ProfileCircle({ info, currentUser }) {
  const dispatch = useDispatch();
  const unfollowHandler = (id) => {
    axios
      .post("http://localhost:4000/circle/unfollow", {
        currentUser,
        id,
      })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => alert(err));
  };
  return (
    <div className="item">
      <h3>{info.name}</h3>
      {/* <img class="picture" src={info.img}></img> */}
      <button
        className="profile_button"
        onClick={() => unfollowHandler(info._id)}
      >
        ВЫЙТИ
      </button>
    </div>
  );
}
export default ProfileCircle;
