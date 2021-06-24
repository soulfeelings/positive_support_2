import classes from './BackgroundProfile.module.css'

export default function animationIntervalBG(bg) {
  const time = 5000
  const bgimgs = bg.current.querySelectorAll('.bgimg');
  const generator = imgReturner(bgimgs);
  let previous = generator.next().value;

  previous.classList.add(classes.visible);
  previous.classList.add(classes.top);

  return setInterval(() => {
    previous.classList.remove(classes.top);
    const current = generator.next().value;
    current.classList.add(classes.visible);
    current.classList.add(classes.top);
    
    setTimeout(() => {
      previous.classList.remove(classes.visible);
      previous = current;
    }, time/2)
  }, time);
}

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
