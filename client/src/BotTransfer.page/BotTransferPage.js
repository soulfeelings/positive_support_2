import React from 'react';
// import './BotTransfer.css'

function BotTransferPage(props) {
  function handleClicK() {
    console.log("123");
    window.location = "https://t.me/positive_support_bot";

  }

  	window.onload = function() { document.body.classList.remove('is-preload'); }
  return (
    <div class="is-preload">





		<div id="wrapper">
			<div id="bg"></div>
			<div id="overlay"></div>
			<div id="main">


					<header id="header">

             <button
             onClick={() => handleClicK()}
             >

          Зарегистрируйтесь через чат бот
        </button>


					</header>


			</div>
		</div>


    </div>
  );
}

export default BotTransferPage;
