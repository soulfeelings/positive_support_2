import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from './AdminNav';

function AdminCircles(props) {

  const circles = useSelector((state) => state.circles);
  const [searchItem, setSearchItem] = useState('');

  return (
    <>
    {/* <div>
       <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchItem(e.target.value)}
          />

          {circles
            .filter((el) => {
              if (searchItem === '') {
                return el;
              } else if (el.name.toLowerCase().includes(searchItem.toLowerCase())) {
                return el;
              }
            })
            .map((el, index) => {
              return (
                <div key={index}>
                  <p>{el.name}</p>
                  <button>X</button>
                </div>
              );
            })}
    </div> */}
    <AdminNav />
    </>
  );
}

export default AdminCircles;
