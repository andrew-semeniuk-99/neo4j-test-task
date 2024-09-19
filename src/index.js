import fs from 'fs';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import routes from '@/routes/index.js';
import Neo4J from '@/db/neo4j.js';

dotenv.config();

Neo4J.initDriver({
  port: process.env.NEO4J_PORT,
  username: process.env.NEO4J_AUTH_USER,
  password: process.env.NEO4J_AUTH_PASS,
  host: process.env.NODE_ENV === 'production' ? 'neo4j' : 'localhost',
});

const app = express();

const swaggerDocument = JSON.parse(fs.readFileSync('./apidoc.json', 'utf8'));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api`, routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.EXPRESS_PORT ?? 3030, () => {
  console.log(`Server is ready`);
});

export default app;
