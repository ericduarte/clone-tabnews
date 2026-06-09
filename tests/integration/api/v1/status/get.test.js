test("GET to api/v1/status responds with 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.updated_at).toBeDefined();

  const parsedDate = new Date(responseBody.updated_at).toISOString();
  expect(parsedDate).toEqual(responseBody.updated_at);

  const version = responseBody.dependencies.database.version;
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(version).toBe("16.0");

  const maxConnections = parseInt(
    responseBody.dependencies.database.max_connections,
    10,
  );
  expect(maxConnections).toBeDefined();
  expect(maxConnections).toBe(100);

  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  const currentConnections = parseInt(
    responseBody.dependencies.database.opened_connections,
    10,
  );
  expect(currentConnections).toBe(1);
});
