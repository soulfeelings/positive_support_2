import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import AdminCircles from './AdminCircles';
import AdminNav from './AdminNav';
import AdminUsers from './AdminUsers';

function AdminPage() {
  const user = useSelector((state) => state.currentUser);
  const history = useHistory();

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
