import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import AddImgForm from './AddImgForm';
import {deleteCircleAC} from '../redux/actionCreators/circleAC'

function AdminCircles() {
  const dispatch = useDispatch()
  const circles = useSelector((state) => state.circles);
  const [searchItem, setSearchItem] = useState('');
  const [addForm, setAddForm] = useState(false);


  const deleteCircleHandler = (id) => {
    axios.delete(`http://localhost:4000/circle/delete/${id}`)
    .then(res => circles.filter(el => el._id !== res.data._id))
    .then(res => dispatch(deleteCircleAC(res)))
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Search..." onChange={(e) => setSearchItem(e.target.value)} />

        {circles?.filter((el) => {
            if (searchItem === '') { return el } 
            else if (el.name.toLowerCase().includes(searchItem.toLowerCase())) { return el }
            }).map((el) => {
              return (
                <div key={el._id}>
                  <span>{el.name}</span>
                  <button onClick={() => deleteCircleHandler(el._id)}>X</button>
                </div>
              );
            })}
      </div>

      <button onClick={() => setAddForm(!addForm)}>
        {!addForm ? 'Добавить кругворот' : 'Закрыть'}
      </button>
      <p></p>
      {addForm && <AddImgForm circles={circles} />}
      <p></p>
    </>
  );
}

export default AdminCircles;
