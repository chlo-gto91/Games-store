pool = require("../utils/db.js");


module.exports = {
    getBlankClient(){
        return {
            "id_client": 0,
            "age": 0,
            "client_name": 0,
            "surname": 0,
            "phone": 0,
            "list_sale": 0,
            "mail_adress": 0
        };
    },
    async getAllClient(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM client";
            const rows = await conn.query(sql);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneClient(ID_client){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM client WHERE ID_client =? ";
            const rows = await conn.query(sql, ID_client);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            if (rows.length == 1){
                return rows[0];
            }else{
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async delOneClient(ID_client) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM client WHERE ID_client=?";
            const okPacket = await conn.query(sql, ID_client);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneClient(clientId){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO client (client_id, client_name) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, clientId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
}
