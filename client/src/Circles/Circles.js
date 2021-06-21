import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Circles.css";
import { Link } from "react-router-dom";

function Circles(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    fetch("http://localhost:4000/circle")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "INIT_CIRCLES", payload: { data } }));
  }, []);
  
  return (
    <div>
      <div id="main">
        <section id="banner" className="major">
          <div className="inner">
            <header className="major">
              <h2>ВЫБЕРИТЕ ТЕМУ</h2>
            </header>
          </div>
        </section>
        <section id="one" className="tiles">
          {users?.map((el) => (
            <article key={el._id}>

              <Link to={`/circle/${el._id}`}>
                {/* <span className="image">
                   <img src={el.img} alt="" /> 
                </span> */}
                <header className="major">
                  <h3>
                    {/* <Link to={`/circule/${el._id}`}>{el.name}</Link> */}
                    {el.name}
                  </h3>

                  <p>количество участников {0}</p>
                </header>
              </Link>

            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Circles;
