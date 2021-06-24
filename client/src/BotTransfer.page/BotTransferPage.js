import Logo from "../Logo/Logo";
import classes from "./BotTransfer.module.css";
import bgimg from "./images/bg.jpg";

function BotTransferPage() {
  function handleClicK() {
    window.location = "https://t.me/positive_support_bot";
  }

  return (
    <div className={classes.wrapper}>
      <Logo />
      <div
        className={classes.bg}
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>
      <div className={classes.main}>
        <header id="header">
          <button className={classes.button} onClick={() => handleClicK()}>
            Зарегистрируйтесь через чат бот
          </button>
        </header>
      </div>
    </div>
  );
}

export default BotTransferPage;
