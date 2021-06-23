import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfileCircle({ info, currentUser }) {
  const dispatch = useDispatch();
  const goout = (id) => {
    console.log(id);
    fetch(`http://localhost:4000/circle/unfollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser,
        id,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(1);
        console.log(body);
        dispatch({ type: "CIRCLE_GO_OUT", payload: body.circle._id });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="item">
      <h3>{info.name}</h3>
      {/* <img class="picture" src={info.img}></img> */}
      <button className="profile_button" onClick={() => goout(info._id)}>
        ВЫЙТИ
      </button>
    </div>
  );
}
export default ProfileCircle;
