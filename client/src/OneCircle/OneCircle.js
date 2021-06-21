import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './OneCircle.css'

function OneCircle () {
  const {id} = useParams();
  const circle = useSelector((state) => state.circles.filter((c => c._id === id))[0]);
  console.log(circle);

  useEffect(() => {
    document.body.classList.add('homepage')
    console.log('Запрос к бд о круговороте ' + id)
  }, []);

  return (
    <div id="page-wrapper">

				<div id="header" style={{backgroundImage: `url(${circle.img})`}}>
						<div className="inner">
							<header>
								<h1><a href="index.html" id="logo">{circle.name}</a></h1>
								<hr />
								<p>Another fine freebie by HTML5 UP</p>
							</header>
							<footer>
								<a href="#banner" className="button circled scrolly">Start</a>
							</footer>
						</div>
				</div>

				<section id="banner">
					<header>
						<h2>Hi. You're looking at <strong>Helios</strong>.</h2>
						<p>
							A (free) responsive site template by <a href="http://html5up.net">HTML5 UP</a>.
							Built with HTML5/CSS3 and released under the <a href="http://html5up.net/license">CCA</a> license.
						</p>
					</header>
				</section>

		</div>
  );
}

export default OneCircle
