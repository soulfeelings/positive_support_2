// import axios from 'axios';
// import { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { initAdminAC } from '../redux/actionCreators/adminAC';

// function AdminLogin(props) {
//   const dispatch = useDispatch()
//   const [nick, setNick] = useState('');
//   const [password, setPassword] = useState('');
//   const nickInput = useRef();
//   const passwordInput = useRef();

//   function submitHendler(e) {
//     e.preventDefault();
//     const nickName = nickInput.current.value;
//     const password = passwordInput.current.value;
//     axios
//       .post('http://localhost:4000/admin/login', { nickName, password })
//       .then((res) => dispatch(initAdminAC(res.data)))
//       .catch((err) => alert(err));
//   }

//   return (
//     <div className="main_container">
//       <div className="input_container">
//         <h3 className="title">Вход для администратора</h3>
//         <form className="form" onSubmit={submitHendler}>
//           <input
//             className="input"
//             ref={nickInput}
//             name="nickName"
//             type="text"
//             required={true}
//             placeholder={'введите nickname'}
//             value={nick}
//             onChange={(e) => setNick(e.target.value)}
//           />
//           <input
//             className="input"
//             ref={passwordInput}
//             name="password"
//             type="password"
//             required={true}
//             placeholder={'введите пароль'}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="button" type="submit">
//             ВХОД
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
