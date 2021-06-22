import React, { useEffect, useState } from 'react';
import AdminLogin from '../Admin/AdminLogin';
import AdminPage from '../Admin/AdminPage';
// import insertStyles from '../helpers/insertStyles';
import { botTransferPageStyles } from './BotTransferPageStyles';
// import './BotTransfer.css';

function BotTransferPage() {
  const [admin, setAdmin] = useState(false);
  console.log(admin);
  function handleClicK() {
    window.location = 'https://t.me/positive_support_bot';
  }

  useEffect(() => {
    const $style = document.createElement('style');
    document.head.appendChild($style);
    $style.innerHTML = botTransferPageStyles;
    const bg = document.getElementById('bg');
    bg.style.background = '#348cb2 url("static/media/bg.74789351.jpg") bottom left repeat-x';
    return () => document.head.removeChild($style);
  }, []);

  return (
    <div className="is-preload">
      <div id="wrapper">
        <div id="bg"></div>
        <div id="overlay"></div>
        <div id="main" style={{ height: '100%' }}>
          <header id="header">
            {admin ? (
              <AdminLogin />
            ) : (
              <button onClick={() => handleClicK()}>Зарегистрируйтесь через чат бот</button>
            )}

            <button onClick={() => setAdmin(!admin)}>Я администратор</button>
          </header>
        </div>
      </div>
    </div>
  );
}

export default BotTransferPage;
