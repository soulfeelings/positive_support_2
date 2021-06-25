import axios from "axios";
// import './Circulation.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateStateAC } from "../redux/actionCreators/updateStateAC";
import { oneCircleStyles } from "./OneCircleStyles";
import { getFaces } from "../helpers/getFaces";
import insertStyles from "../helpers/insertStyles";
import classes from "./Circulation.module.css";
import PortalToBody from "../Navigation/Portal";
import Navigation from "../Navigation/Navigation";

function OneCircle() {
  const buttonStyle = { padding: "0 20px" };

  const circleId = useParams();
  const dispatch = useDispatch();

  const circles = useSelector((state) => state.circles);
  const currentUser = useSelector((state) => state.currentUser);

  const [currentCircle, setCurrentCircle] = useState({});
  const [isInCircle, setIsInCircle] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => insertStyles(oneCircleStyles), []);

  useEffect(() => {
    const circ = circles?.filter((el) => el._id === circleId.circleId)[0];
    setCurrentCircle(circ);
    currentUser.connected_circles?.includes(circ._id || circ)
      ? setIsInCircle(true)
      : setIsInCircle(false);
  }, [circles, circleId.circleId]);

  useEffect(() => {
    getFaces().then((res) => setUsers(res));
    document.body.classList.add("homepage");
  }, [dispatch]);

  const followHandler = (path) => {
    axios
      .post(`/circle/${path}`, {
        currentUser,
        id: circleId.circleId,
      })
      .then((res) => dispatch(updateStateAC(res.data)))
      .catch((err) => console.log(err, "+++"));
    setIsInCircle(!isInCircle);
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
      <style>
        {".imgDiv { background-image: url(https://4tololo.ru/sites/default/files/images/201304081907339225.jpg); height: 100%; width: 100%; position: absolute; top: 0; bottom: 0; background-size: cover; filter: brightness(0.5); background-position: center;"}
        </style>
      <div id="header" style={{ position: `relative` }} >
        <div style={{ backgroundImage: `url(${currentCircle.img})` }} className="imgDiv"></div>
        <div className="inner">
       
          <header>
            <h1>
              <a href="index.html" id="logo">
                {currentCircle.name}
              </a>
            </h1>
            <hr />
            
          </header>
          <footer>
            <a
              style={buttonStyle}
              className="button circled scrolly"
              onClick={() => followHandler(!isInCircle ? "follow" : "unfollow")}
            >
              {!isInCircle ? "Подключиться" : "Отключиться"}
            </a>
          </footer>
          
             
        </div>
       
      </div>
      <section id="banner">
        <div className={classes.circulation}>
          <img
            alt=""
            className={classes.circulation_img}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdeZ9vpR27khWeaQbiYd-1ARV-XtJ7JzWBw&usqp=CAU"
            // src={"/images/avatar.png"}
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
            Ты можешь присоединиться к теме <strong>"{currentCircle.name}"</strong>.
          </h2>
          <p className="onecircle_text">
            Мы все с вами учились. И если вспомнить, то бывали времена, когда тема {" "}
            <strong>"{currentCircle.name}"</strong> дается сложно. В такие моменты
            очень хочется ощущать себя не одиноким, ощущать поддержку, которая
            придаст сил справится с трудностями. В этом круговороте мы
            поддерживаем друг друга, чтобы учиться в приподнятом настроении,
            легко справлятся со сложностями. Подключайтесь!
          </p>
        </header>
      </section>
      <PortalToBody>
        <Navigation name="На главную" link="/" />
      </PortalToBody>
    </div>
  );
}

export default OneCircle;



// element.style {
//   background-image: url(https://4tololo.ru/sites/default/files/images/201304081907339225.jpg);
//   height: 100%;
//   width: 100%;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   background-size: cover;
//   filter: brightness(0.5);
// }
