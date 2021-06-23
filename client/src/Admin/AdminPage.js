import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import AddImgForm from './AddImgForm';
import AdminCircles from './AdminCircles';
import AdminNav from './AdminNav';
import AdminUsers from './AdminUsers';

function AdminPage(props) {
  const dispatch = useDispatch();
  const circles = useSelector((state) => state.circles);
  const user = useSelector((state) => state.currentUser);
  const history = useHistory();

  const [searchItem, setSearchItem] = useState('');
  const [addForm, setAddForm] = useState(false);

  const deleteCircleHandler = (id) => {
    axios.delete(`http://localhost:4000/circle/delete/${id}`).then((res) => console.log(res.data));
  };

  useEffect(() => {
    if (user.admin === false) {
      alert('Вы не являетесь админимтстратором!');
      history.push('/');
    }
  }, [user]);

  return (
    <>
      <Switch>
        <Route path="/admin/circles" children={<AdminCircles />} />
        <Route path="/admin/users" children={<AdminUsers />} />
      </Switch>
      <AdminNav />
    </>
  );
}

export default AdminPage;
