const { Pool } = require("pg");

const connectionString =
  "postgres://ibvlxmbi:9GZMt4avxAGiF4AqTaSl7z6qZ9ihY-nW@silly.db.elephantsql.com/ibvlxmbi";

const clientDb = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = clientDb;
