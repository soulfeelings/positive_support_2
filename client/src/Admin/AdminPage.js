import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCirlesAC, initCirlesAC } from '../redux/actionCreators/circleAC';
import AddImgForm from './AddImgForm';
import AdminNav from './AdminNav';

function AdminPage(props) {
  const dispatch = useDispatch()
  const circles = useSelector((state) => state.circles);

  const [searchItem, setSearchItem] = useState('');
  const [addForm, setAddForm] = useState(false);

  const deleteCircleHandler = (id) => {
    axios.delete(`http://localhost:4000/circle/delete/${id}`)
    .then(res => console.log(res.data));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchItem(e.target.value)}
        />

        {circles?.filter((el) => {
          if (searchItem === "") {
            return el;
          } else if (el.name.toLowerCase().includes(searchItem.toLowerCase())) {
            return el;
          }
        }).map((el, index) => {
            return (
              <div key={el._id}>
                <span>{el.name}</span>
                <button onClick={() => deleteCircleHandler(el._id)}>X</button>
              </div>
            );
          })}
      </div>
      <button onClick={() => setAddForm(!addForm)}> {!addForm ? "Добавить кругворот"  : "Закрыть" } </button>
      <p></p>
      {addForm && <AddImgForm circles={circles}/>}
      <p></p>
      <AdminNav />
    </>
  );
}

export default AdminPage;
