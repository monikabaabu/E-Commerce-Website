import { Sequelize } from "sequelize";
import sqlJsAsSqlite3 from "sql.js-as-sqlite3";
import fs from "node:fs";

const isUsingRDS =
  process.env.RDS_HOSTNAME &&
  process.env.RDS_USERNAME &&
  process.env.RDS_PASSWORD;

const dbType = process.env.DB_TYPE || "mysql";

const defaultPorts = {
  mysql: 3306,
  postgres: 5432,
};

const defaultPort = defaultPorts[dbType];

const sequelize = isUsingRDS
  ? new Sequelize({database: process.env.RDS_DB_NAME, username: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, host: process.env.RDS_HOSTNAME, port: process.env.RDS_PORT || defaultPort, dialect: dbType, logging: false,
  })
  : new Sequelize({dialect: "sqlite", dialectModule: sqlJsAsSqlite3, logging: false,
  });

export { sequelize };

if (!isUsingRDS) {
  sequelize.addHook("afterCreate", saveDatabaseToFile);
  sequelize.addHook("afterDestroy", saveDatabaseToFile);
  sequelize.addHook("afterUpdate", saveDatabaseToFile);
  sequelize.addHook("afterSave", saveDatabaseToFile);
  sequelize.addHook("afterUpsert", saveDatabaseToFile);
  sequelize.addHook("afterBulkCreate", saveDatabaseToFile);
  sequelize.addHook("afterBulkDestroy", saveDatabaseToFile);
  sequelize.addHook("afterBulkUpdate", saveDatabaseToFile);
}

export async function saveDatabaseToFile() {
  const dbInstance = await sequelize.connectionManager.getConnection();
  const binaryArray = dbInstance.database.export();
  const buffer = Buffer.from(binaryArray);

  fs.writeFileSync("database.sqlite", buffer);
}
