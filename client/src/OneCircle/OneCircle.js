import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import insertStyles from '../helpers/insertStyles';
import { oneCircleStyles } from './OneCircleStyles';
import { getFaces } from '../helpers/getFaces';
import axios from 'axios';
import { initOneCircleAC } from '../redux/actionCreators/circleAC';
import { updateStateAC } from '../redux/actionCreators/updateStateAC';
import classes from './Circulation.module.css';
import PortalToBody from '../Navigation/Portal';
import Navigation from '../Navigation/Navigation';

function OneCircle() {
  const buttonStyle = {padding: "0 20px"}

  const circleId = useParams();
  const dispatch = useDispatch();
  const currentCircle = useSelector((state) => state.currentCircle);
  const currentUser = useSelector((state) => state.currentUser);
  const [isInCircle, setIsInCircle] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => insertStyles(oneCircleStyles), []);

  useEffect(() => {
    getFaces().then((res) => setUsers(res));
    document.body.classList.add('homepage');
    axios
      .post('http://localhost:4000/circle/getCurrent', circleId)
      .then((res) => dispatch(initOneCircleAC(res.data)))
      .then((data) =>
        data.payload.connected_users?.includes(currentUser?._id)
          ? setIsInCircle(true)
          : setIsInCircle(false)
      );
  }, [dispatch, currentUser, circleId]);

  const followHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/circle/follow', {
        currentUser,
        id: currentCircle._id,
      })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => alert(err));
    setIsInCircle(true);
  };

  const unfollowHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/circle/unfollow', {
        currentUser,
        id: currentCircle._id,
      })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => alert(err));
    setIsInCircle(false);
  };

  if (!currentCircle) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }

  return (
    <div id="page-wrapper">
      <div id="header" style={{ backgroundImage: `url(${currentCircle.img})` }}>
        <div className="inner">
          <header>
            <h1>
              <a href="index.html" id="logo">
                {currentCircle.name}
              </a>
            </h1>
            <hr />
            <p>Чтобы подключиться к круговороту - нажмите кнопку</p>
          </header>
          <footer>
            {!isInCircle ? (
              <a
                style={buttonStyle}
                href="#banner"
                className="button circled scrolly"
                onClick={followHandler}
              >
                Подключиться
              </a>
            ) : (
              <a
                style={buttonStyle}
                href="#banner"
                className="button circled scrolly"
                onClick={unfollowHandler}
              >
                Отключиться
              </a>
            )}
          </footer>
        </div>
      </div>

      <section id="banner">
        <div className={classes.circulation}>
          <img
            alt=""
            className={classes.circulation_img}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdeZ9vpR27khWeaQbiYd-1ARV-XtJ7JzWBw&usqp=CAU"
            src={currentUser.photo_url}
          />
          <div className={classes.container_users}>
            <div className={classes.sub_container_users}>
              {users?.map((el, i) => (
                <div key={Date.now() + i} className={classes.block}>
                  <div className={classes.square}>
                    <img alt="" className={classes.square} src={el} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <header className={classes.description_circle}>
          <h2>
            Ты можешь присоединиться к <strong>{currentCircle.name}</strong>.
          </h2>
          <p>
            Мы все с вами учились. И если вспомнить, то бывали времена, когда
            учеба дается сложно. В такие моменты очень хочется ощущать себя не
            одиноким, ощущать поддержку, которая придаст сил справится с
            трудностями. В этом круговороте мы поддерживаем друг друга, чтобы
            учиться в приподнятом настроении, легко справлятся со сложностями.
            Подключайтесь
          </p>
        </header>
      </section>
      <PortalToBody>
        <Navigation name="На главную" link="/"/>
      </PortalToBody>
    </div>
  );
}

export default OneCircle;
