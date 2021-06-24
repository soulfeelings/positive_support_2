import { useEffect } from 'react';
// import insertStyles from '../helpers/insertStyles';
import { botTransferPageStyles } from './BotTransferPageStyles';
import classes from './BotTransfer.module.css';
import bgimg from './images/bg.jpg';

function BotTransferPage() {

  function handleClicK() {
    window.location = 'https://t.me/positive_support_bot';
  }

  useEffect(() => {
    // const $style = document.createElement('style');
    // document.head.appendChild($style);
    // $style.innerHTML = botTransferPageStyles;
    // const bg = document.getElementById('bg');
    // bg.style.background = '#348cb2 url("static/media/bg.74789351.jpg") bottom left repeat-x';
    // return () => document.head.removeChild($style);
  }, []);

  return (
      <div className={classes.wrapper}>
        <div className={classes.bg} style={{backgroundImage: `url(${bgimg}) bottom left`}}></div>
        <div className={classes.main} style={{ height: '100%' }}>
          <header id="header">
              <button onClick={() => handleClicK()}>Зарегистрируйтесь через чат бот</button>
          </header>
        </div>
    </div>
  );
}

export default BotTransferPage;
