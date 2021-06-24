import { useEffect, useRef } from 'react'
import classes from './BackgroundProfile.module.css'
import bg1 from './images/bg01.jpg'
import bg2 from './images/bg02.jpg'
import bg3 from './images/bg03.jpg'

function BackgroundProfile () {
  const bg = useRef();
  

  useEffect(() => {
    const time = 2000
    const bgimgs = bg.current.querySelectorAll('.bgimg');
    const generator = imgReturner(bgimgs);
    let previous = generator.next().value;

    previous.classList.add(classes.visible);
    previous.classList.add(classes.top);

    const idInterval = setInterval(() => {
      previous.classList.remove(classes.top);
      const current = generator.next().value;
      current.classList.add(classes.visible);
      current.classList.add(classes.top);
      
      setTimeout(() => {
        previous.classList.remove(classes.visible);
        previous = current;
      }, time/2)
    }, time);

    return () => clearInterval(idInterval)
  }, []);

  function* imgReturner(bgimgs) {
    let i = 0;
    while (true) {
      yield bgimgs[i];
      
      i++;

      if(i === bgimgs.length) {
        i = 0;
      }
    }
  }

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
