/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './routes/router';

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routers);

const port = process.env.PORT || 3000;

// when a random route is inputed
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Book app', });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;
