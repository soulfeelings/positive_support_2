import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import insertStyles from "../helpers/insertStyles";
import { circlesStyles } from "./styles";

function Circles(props) {
  const dispatch = useDispatch();
  const circles = useSelector((state) => state.circles);
  
  const [styled, setStyled] = useState(false);

  useEffect(() => {
    setStyled(true);
    return insertStyles(circlesStyles);
  }, [])

  useEffect(() => {
    fetch("http://localhost:4000/circle")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "INIT_CIRCLES", payload: { data } }));
  }, [dispatch]);
  
  if(!styled) {
    return (<>Loading</>);
  }

  return (
    <div>
      <div id="main" style={{position: "unset"}}>
        <section id="banner" className="major">
          <div className="inner">
            <header className="major">
              <h2>ВЫБЕРИТЕ ТЕМУ</h2>
            </header>
          </div>
        </section>
        <section id="one" className="tiles">
          {circles?.map((el) => (
            <article key={el._id}>

              <Link to={`/circle/${el._id}`}>
                
                <header className="major">
                  <h3>
                    {/* <Link to={`/circule/${el._id}`}>{el.name}</Link> */}
                    {el.name}
                  </h3>

                  <p>количество участников {el.connected_users?.length}</p>
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
