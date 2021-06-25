import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import AddImgForm from "./AddImgForm";
import { deleteCircleAC } from "../redux/actionCreators/circleAC";

function AdminCircles() {
  const dispatch = useDispatch();
  const circles = useSelector((state) => state.circles);
  const [searchItem, setSearchItem] = useState("");
  const [addForm, setAddForm] = useState(false);

  const deleteCircleHandler = (id) => {
    axios
      .delete(`/circle/delete/${id}`)
      .then((res) => circles.filter((el) => el._id !== res.data._id))
      .then((res) => dispatch(deleteCircleAC(res)));
  };

  const circleStartHandler = (el) => {
    if (el.connected_users.length < 2) {
      alert("Нельзя запустить круговорот в котором меньше двух человек");
    } else {
      const name = el.name;
      axios
        .post("/circle/start", { name })
        .then((res) => alert(res.data.message));
    }
  };

  return (
    <>
      <div className="Container">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchItem(e.target.value)}
        />

        {circles
          ?.filter((el) => {
            if (searchItem === "") {
              return el;
            } else if (
              el.name.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return el;
            }
          })
          .map((el) => {
            return (
              <div className="list" key={el._id}>
                <span className="circle">{el.name}</span>
                <span>{`  ${el.connected_users.length} пользователей  `}</span>
                <button onClick={() => deleteCircleHandler(el._id)}>X</button>
                <button onClick={() => circleStartHandler(el)}>
                  Запустить кругворот
                </button>
              </div>
            );
          })}
      </div>

      <button onClick={() => setAddForm(!addForm)}>
        {!addForm ? "Добавить кругворот" : "Закрыть"}
      </button>
      <p></p>
      {addForm && <AddImgForm circles={circles} />}
      <p></p>
    </>
  );
}

export default AdminCircles;
