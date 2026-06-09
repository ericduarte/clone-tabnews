import database from "infra/database";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const versionData = await database.query("show server_version;");
  const databaseVersion = versionData.rows[0].server_version;
  const maxConnectionsData = await database.query("show max_connections");
  const maxConnections = maxConnectionsData.rows[0].max_connections;
  const currentConnectionsData = await database.query(
    "select count(*)::int from pg_stat_activity where datname = current_database()",
  );
  const currentConnections = currentConnectionsData.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(maxConnections, 10),
        opened_connections: parseInt(currentConnections, 10),
      },
    },
  });
}

export default status;
