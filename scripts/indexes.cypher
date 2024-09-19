MATCH (n)
DETACH DELETE n;

CREATE (alice:User {username: 'alice', name: 'Alice', age: 30});
CREATE (bob:User {username: 'bob', name: 'Bob', age: 25});
CREATE (carol:User {username: 'carol', name: 'Carol', age: 27});
CREATE (dave:User {username: 'dave', name: 'Dave', age: 22});
CREATE (eve:User {username: 'eve', name: 'Eve', age: 35});

MATCH (alice:User {username: 'alice'}), (bob:User {username: 'bob'})
CREATE (alice)-[:FOLLOWS]->(bob);

MATCH (bob:User {username: 'bob'}), (carol:User {username: 'carol'})
CREATE (bob)-[:FOLLOWS]->(carol);

MATCH (carol:User {username: 'carol'}), (dave:User {username: 'dave'})
CREATE (carol)-[:FOLLOWS]->(dave);

MATCH (dave:User {username: 'dave'}), (eve:User {username: 'eve'})
CREATE (dave)-[:FOLLOWS]->(eve);

MATCH (alice:User {username: 'alice'}), (carol:User {username: 'carol'})
CREATE (alice)-[:FOLLOWS]->(carol);

MATCH (bob:User {username: 'bob'}), (eve:User {username: 'eve'})
CREATE (bob)-[:FOLLOWS]->(eve);

MATCH (carol:User {username: 'carol'}), (alice:User {username: 'alice'})
CREATE (carol)-[:FOLLOWS]->(alice);
