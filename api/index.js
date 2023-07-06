const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const app = express();
const port = /* process.env.PORT ||  */3000;

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

routerApi(app);
const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    }
    else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})