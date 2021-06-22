import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import insertStyles from '../helpers/insertStyles';
import { oneCircleStyles } from './OneCircleStyles';
// import './OneCircle.css'

function OneCircle () {
  const {id} = useParams();
  const circle = useSelector((state) => state.circles.filter((c => c._id === id))[0]);
  console.log(circle);

  useEffect(() => insertStyles(oneCircleStyles), []);

  useEffect(() => {
    document.body.classList.add('homepage')
    console.log('Запрос к бд о круговороте ' + id)
  }, []);

  if(!circle) {
    return (<><p>Loading</p></>)
  }

  return (
    <div id="page-wrapper">

				<div id="header" style={{backgroundImage: `url(${circle.img})`}}>
						<div className="inner">
							<header>
								<h1><a href="index.html" id="logo">{circle.name}</a></h1>
								<hr />
								<p>Чтобы подключиться к круговороту - нажмите Start</p>
							</header>
							<footer>
								<a href="#banner" className="button circled scrolly">Start</a>
							</footer>
						</div>
				</div>

				<section id="banner">
					<header>
						<h2>Круговорот <strong>Учеба</strong>.</h2>
						<p>
							Мы все с вами учились. И если вспомнить, то бывали времена, когда учеба дается сложно. В такие моменты очень хочется ощущать себя не одиноким, ощущать поддержку, которая придаст сил справится с трудностями. В этом круговороте мы поддерживаем друг друга, чтобы учиться в приподнятом настроении, легко справлятся со сложностями. Подключайтесь
						</p>
					</header>
				</section>

		</div>
  );
}

export default OneCircle
