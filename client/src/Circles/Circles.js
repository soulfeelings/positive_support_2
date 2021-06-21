import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Circles.css";
import { Link } from "react-router-dom";

function Circles(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    fetch("http://localhost:4000/circles")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "INIT_CIRCLES", payload: { data } }));
  }, []);
  return (
    <div>
      <div id="main">
        <section id="banner" class="major">
          <div class="inner">
            <header class="major">
              <h2>ВЫБЕРИТЕ ТЕМУ</h2>
            </header>
          </div>
        </section>
        <section id="one" class="tiles">
          {users?.map((el) => (
            <article key={el._id}>
              <Link to={`/circule/${el._id}`}>
                <span class="image">
                  <img src={el.img} alt="" />
                </span>
                <header class="major">
                  <h3>
                    {/* <Link to={`/circule/${el._id}`}>{el.name}</Link> */}
                    {el.name}
                  </h3>

                  <p>количество участников {0}</p>
                </header>
              </Link>
            </article>
          ))}
          {/* <article>
            <span class="image">
              <img src="images/pic02.jpg" alt="" />
            </span>
            <header class="major">
              <h3>
                <a href="landing.html" class="link">
                  Tempus
                </a>
              </h3>
              <p>feugiat amet tempus</p>
            </header>
          </article>
          <article>
            <span class="image">
              <img src="images/pic03.jpg" alt="" />
            </span>
            <header class="major">
              <h3>
                <a href="landing.html" class="link">
                  Magna
                </a>
              </h3>
              <p>Lorem etiam nullam</p>
            </header>
          </article>
          <article>
            <span class="image">
              <img src="images/pic04.jpg" alt="" />
            </span>
            <header class="major">
              <h3>
                <a href="landing.html" class="link">
                  Ipsum
                </a>
              </h3>
              <p>Nisl sed aliquam</p>
            </header>
          </article>
          <article>
            <span class="image">
              <img src="images/pic05.jpg" alt="" />
            </span>
            <header class="major">
              <h3>
                <a href="landing.html" class="link">
                  Consequat
                </a>
              </h3>
              <p>Ipsum dolor sit amet</p>
            </header>
          </article>
          <article>
            <span class="image">
              <img src="images/pic06.jpg" alt="" />
            </span>
            <header class="major">
              <h3>
                <a href="landing.html" class="link">
                  Etiam
                </a>
              </h3>
              <p>Feugiat amet tempus</p>
            </header>
          </article>
          <article> */}
          {/* <span class="image">
              <img src="images/pic06.jpg" alt="" />
            </span>
            <header class="major">
              <h3>
                <a href="landing.html" class="link">
                  Etiam
                </a>
              </h3>
              <p>Feugiat amet tempus</p>
            </header>
          </article> */}
        </section>
      </div>
    </div>
  );
}

export default Circles;
