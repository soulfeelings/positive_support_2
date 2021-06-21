import './Circle.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';
import { initOneCircleAC } from '../redux/actionCreators/circleAC';
import { updateStateAC } from '../redux/actionCreators/updateStateAC';

function Circle(props) {
  const circleId = useParams();
  const dispatch = useDispatch();
  const currentCircle = useSelector((state) => state.currentCircle);
  const currentUser = useSelector((state) => state.currentUser);
  const [isInCircle, setIsInCircle] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    setUsers([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]); //переписать
    axios
      .post('http://localhost:4000/circle/getCurrent', circleId)
      .then((res) => dispatch(initOneCircleAC(res.data)))
      .then((data) =>
        data.payload.connected_users.includes(currentUser?._id)
          ? setIsInCircle(true)
          : setIsInCircle(false),
      );
  }, [dispatch, currentUser, circleId]);

  const followHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/circle/follow', { currentUser, id: currentCircle._id })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => alert(err));
    setIsInCircle(true);
  };

  const unfollowHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/circle/unfollow', { currentUser, id: currentCircle._id })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => alert(err));
    setIsInCircle(false);
  };

  return (
    <div className="circulation_div">
      <div className="circulation_header">
        <img
          alt=""
          className="header_img"
          src="http://sun9-70.userapi.com/QRcZxpUghpRmS-3Ul0aym55N-R-dphqw7cEVbQ/GOuyg5cI2GE.jpg"
          // src={circle.img}
        />
      </div>
      <div className="circultion_info">
        <p variant="body1" color="primary">
          {currentCircle?.name}
        </p>
        <span variant="body1" color="primary">
          {currentCircle?.connected_users ? (
            <p> В круговороте {currentCircle?.connected_users.length} человек </p>
          ) : (
            <p> В круговороте никого нет</p>
          )}
        </span>
      </div>
      <div className="circulation">
        <img
          alt=""
          className="circulation_img"
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdeZ9vpR27khWeaQbiYd-1ARV-XtJ7JzWBw&usqp=CAU"
          src={currentCircle?.img}
        />
        <div className="container_users">
          <div className="sub_container_users">
            {users?.map((el, i) => (
              <div key={Date.now() + i} className="block">
                <div className="square">
                  <img
                    alt=""
                    className="square"
                    src="https://wl-adme.cf.tsp.li/resize/728x/jpg/d8f/395/cf4c0d577d815b936cc1fb36db.jpg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isInCircle ? (
        <button variant="outlined" className="classes.button" onClick={followHandler}>
          Попасть в круговорот
        </button>
      ) : (
        <button variant="outlined" className="classes.button" onClick={unfollowHandler}>
          Покинуть круговорот
        </button>
      )}
    </div>
  );
}

export default Circle;
