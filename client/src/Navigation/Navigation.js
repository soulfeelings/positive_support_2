import { Link } from 'react-router-dom';
import classes from './Navigation.module.css'

function Navigation ({name, link}) {

  return (
    <div className={classes.navWrapper}>
      <Link className={classes.link} to={link}>{name}</Link>
    </div>
  );
}

export default Navigation
