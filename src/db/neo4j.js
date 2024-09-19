import neo4j from 'neo4j-driver';

let driver;

const getDriver = () => driver;

const initDriver = async ({ port, username, password, host = 'neo4j' }) => {
  try {
    driver = neo4j.driver(`bolt://${host}:${port}`, neo4j.auth.basic(username, password));

    await driver.verifyConnectivity();

    console.log('DB is connected');
  } catch (e) {
    console.log('Error initDriver:', e);
  }
};

export default { initDriver, getDriver };
