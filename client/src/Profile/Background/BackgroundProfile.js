import { useEffect, useRef } from 'react'
import animationIntervalBG from './animation'
import classes from './BackgroundProfile.module.css'
import bg1 from './images/bg01.jpg'
import bg2 from './images/bg02.jpg'
import bg3 from './images/bg03.jpg'

function BackgroundProfile () {
  const bg = useRef();
  
  useEffect(() => {
    const idInterval = animationIntervalBG(bg)
    return () => clearInterval(idInterval)
  }, []);

  return (
    <div className={classes.bg} ref={bg}>
        <div className={classes.blackPaper}></div>
        <div className={`bgimg ${classes.bgImage}`} style={{backgroundImage: `url(${bg1})`}}></div>
        <div className={`bgimg ${classes.bgImage}`} style={{backgroundImage: `url(${bg2})`}}></div>
        <div className={`bgimg ${classes.bgImage}`} style={{backgroundImage: `url(${bg3})`}}></div>
    </div>
  );
}

export default BackgroundProfile
