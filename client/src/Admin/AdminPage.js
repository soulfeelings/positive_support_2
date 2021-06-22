import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminLogin from './AdminLogin';

function AdminPage(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const circles = useSelector((state) => state.circles);
  const [searchItem, setSearchItem] = useState('');
  console.log(currentUser);


  return (
    <>
      {/* {currentUser.admin ? ( */}
        <div>
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
        </div>
      {/* ) : (
        <AdminLogin />
      )} */}
    </>
  );
}

export default AdminPage;
