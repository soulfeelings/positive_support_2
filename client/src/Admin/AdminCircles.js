import { useState } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import AddImgForm from './AddImgForm';

function AdminCircles() {
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
