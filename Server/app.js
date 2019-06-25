import express from 'express';
import authenticationRouter from './routes/authentication.routes';
import propertyRouter from './routes/property.routes';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to my Property-Pro Lite Endpoints' Page");
});
app.use('/api/v1/auth/', authenticationRouter);
app.use('/api/v1/property/', propertyRouter);

const port = process.env.PORT || 3000;

const appServer = app.listen(port, console.log(`App running on port ${port}`));

export default appServer;
