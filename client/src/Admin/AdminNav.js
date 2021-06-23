import { Link } from 'react-router-dom';


function AdminNav() {
  return (
    <div>
      <Link to="/admin/circles">Круговороты</Link>
      <Link to="/admin/users">Пользователи</Link>
    </div>
  );
}

export default AdminNav;
