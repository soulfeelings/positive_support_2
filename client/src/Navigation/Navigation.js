import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css'

function Navigation ({name, link}) {
  const history = useHistory();
  
  useEffect(() => {
    console.log(history);
  }, [history])

  return (
    <div className={classes.navWrapper}>
      <Link to={link}>{name}</Link>
    </div>
  );
}

export default Navigation
