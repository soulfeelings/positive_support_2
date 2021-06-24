import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import Logo from '../Logo/Logo';
import AdminCircles from './AdminCircles';
import AdminNav from './AdminNav';
import AdminUsers from './AdminUsers';

function AdminPage() {
  const user = useSelector((state) => state.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (user.admin === false) {
      alert('Вы не являетесь администратором!');
      history.push('/');
    }
  }, [user]);

  return (
    <>
      <div style={{position: 'absolute', top: 10, left: 10, zIndex: 100000}}>
        <Logo />
      </div>
      <Switch>
        <Route path="/admin/circles" children={<AdminCircles />}/>
        <Route path="/admin/users" children={<AdminUsers />}/>
      </Switch>
      <AdminNav />
    </>
  );
}

export default AdminPage;
