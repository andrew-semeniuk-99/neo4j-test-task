import Neo4J from '@/db/neo4j.js';

const getUserByUsername = async (username) => {
  const session = Neo4J.getDriver().session();

  try {
    const result = await session.run('MATCH (u:User {username: $username}) RETURN u', { username });

    return result.records[0]?.get('u') || null;
  } catch (e) {
    console.error('Error getUserByUsername:', e);

    throw e;
  } finally {
    await session.close();
  }
};

const getUserFollowers = async (username) => {
  const session = Neo4J.getDriver().session();

  try {
    const result = await session.run(
      ` MATCH (f:User)-[:FOLLOWS]->(u:User {username: $username})  RETURN f`,
      { username },
    );

    return result.records.map((record) => record.get('f').properties.username);
  } catch (e) {
    console.error('Error getUserFollowers:', e);

    throw e;
  } finally {
    await session.close();
  }
};

const getUserByMinFollowers = async (minFollowers) => {
  const session = Neo4J.getDriver().session();

  try {
    const result = await session.run(
      `
      MATCH (u:User)<-[:FOLLOWS]-(f)
      WITH u, COUNT(f) AS fCount
      WHERE fCount >= $minFollowers
      RETURN u, fCount
      `,
      { minFollowers },
    );

    return result.records.map((record) => ({
      user: record.get('u').properties.username,
      count: record.get('fCount').low,
    }));
  } catch (e) {
    console.error('Error getUserByMinFollowers:', e);

    throw e;
  } finally {
    await session.close();
  }
};

const suggestFriends = async (username) => {
  const session = Neo4J.getDriver().session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {username: $username})-[:FOLLOWS]->(f:User)-[:FOLLOWS]->(s:User)
      WHERE NOT (u)-[:FOLLOWS]->(s) AND u <> s
      RETURN DISTINCT s
      `,
      { username },
    );

    return result.records.map((record) => record.get('s').properties.username);
  } catch (e) {
    console.error('Error suggestFriends:', e);

    throw e;
  } finally {
    await session.close();
  }
};

const findShortestWay = async (leftUser, rightUser) => {
  const session = Neo4J.getDriver().session();

  try {
    const result = await session.run(
      `
      MATCH p = shortestPath(
        (u1:User {username: $leftUser})-[:FOLLOWS*..15]-(u2:User {username: $rightUser})
      )
      RETURN [n IN nodes(p) | n.username] AS points
      `,
      { leftUser, rightUser },
    );

    if (!result.records.length) {
      return null;
    }

    return result.records[0].get('points');
  } catch (e) {
    console.error('Error findShortestWay:', e);

    throw e;
  } finally {
    await session.close();
  }
};

export default {
  suggestFriends,
  findShortestWay,
  getUserFollowers,
  getUserByUsername,
  getUserByMinFollowers,
};
