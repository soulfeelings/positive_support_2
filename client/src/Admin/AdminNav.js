import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminCircles from './AdminCircles';
import AdminUsers from './AdminUsers';

function AdminNav(props) {
  
  return (
    <>
      {/* {theme === 'circles' && <AdminCircles />}
      {theme === 'users' && <AdminUsers />} */}
      <div>
        <button >
          Круговороты
        </button>
        <button  >
          Пользователи
        </button>
        <button>Выйти</button>
      </div>
    </>
  );
}

export default AdminNav;
