import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Test Task API Doc',
    description: 'Test Task API Doc',
  },
  host: 'localhost:3030/api',
};

const outputFile = './apidoc.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen()(outputFile, routes, doc);
