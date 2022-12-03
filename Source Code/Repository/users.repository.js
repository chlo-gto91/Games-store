pool = require("../Repository/db.js");

module.exports = {
  async getOneClient(username) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT ID_client,client_name,client_age,lastname,phone,client_role,mail_address FROM client WHERE client_name = ? "; // must leave out the password+hash
      const rows = await conn.query(sql, username);
      conn.end();

      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  
  async areValidCredentials(username, client_password) {
    try {
      let conn = await pool.getConnection(); //client_name ?
      let sql = "SELECT * FROM client WHERE lastname = ? AND client_password COLLATE utf8mb4_general_ci  = sha2(concat(client_created, ?), 224) COLLATE utf8mb4_general_ci "; 
      // TODO: better salt+pw hash - COLLATE usually not needed
      const rows = await conn.query(sql, [username, client_password]);
      conn.end();

      if (rows.length == 1 && rows[0].lastname === username) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}; 