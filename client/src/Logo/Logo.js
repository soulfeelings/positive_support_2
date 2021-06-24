import classes from "./Logo.module.css"

function Logo(props) {
  return (
    <div className={classes.logoDiv}>
      <img src="/photodraw.ru-13054.png" />
    </div>
  );
}

export default Logo;
