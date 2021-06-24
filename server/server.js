import http from 'http';
import dotenv from './utils/dotenv.js';
import app from './app.js';


const PORT = process.env.PORT || 4000;
const server = http.createServer(app);


const start = () => {
  try {
    server.listen(PORT, () => {
      console.log(`======== SERVER STARTED AT ${PORT} ========`);
    });
  } catch (error) {
    console.log("server error");
    setTimeout(() => {
      start()
    }, 2000);
  }
};

start();
