import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initAllUsersAC, updateUserAC } from '../redux/actionCreators/userActionCreators';

function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/getUsers')
      .then((res) => dispatch(initAllUsersAC(res.data)));
  }, [dispatch]);

  function banUserHandler(userId, isBan) {
    axios
      .post('http://localhost:4000/admin/banUser', { userId, isBan })
      .then((res) => users.map((el) => (el._id === res.data._id ? res.data : el)))
      .then((res) => dispatch(updateUserAC(res)));
  }

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e) => setSearchItem(e.target.value)} />
      {users
        ?.filter((el) => {
          if (searchItem === '') {
            return el;
          } else if (el.name.toLowerCase().includes(searchItem.toLowerCase())) {
            return el;
          }
        })
        .map((el) => {
          return (
            <div key={el._id}>
              <span>{el.name}</span>
              <button onClick={() => banUserHandler(el._id, el.isBan)}>
                {' '}
                {el.isBan ? 'Разблокировать' : 'Заблокировать'} пользователя
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default AdminUsers;
