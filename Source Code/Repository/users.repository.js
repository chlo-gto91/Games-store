pool = require("../utils/db.js");

module.exports = {
  async getOneUser(clientname) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT ID_client,client_name,client_age,lastname,phone,mail_address FROM client WHERE client_name = ? "; // must leave out the password+hash
      const rows = await conn.query(sql, clientname);
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
  
  async areValidCredentials(clientname, client_password) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM client WHERE client_name = ? AND client_password COLLATE utf8mb4_general_ci  = sha2(concat(user_created, ?), 224) COLLATE utf8mb4_general_ci "; 
      // TODO: better salt+pw hash - COLLATE usually not needed
      const rows = await conn.query(sql, [username, password]);
      conn.end();

      if (rows.length == 1 && rows[0].user_name === username) {
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