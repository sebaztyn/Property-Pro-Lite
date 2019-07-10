import express from 'express';
import cors from 'cors';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import authenticationRouter from './routes/authentication.routes';
import swaggerDocument from '../swagger.json';


const app = express();
const logger = debug(`pro-lite-server`);
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send("Welcome to my Property-Pro Lite Endpoints' Page");
});
app.use('/api/v1/auth/', authenticationRouter);

const port = process.env.PORT || 3000;

const appServer = app.listen(port, logger(`App running on port ${port}`));

export default appServer;
