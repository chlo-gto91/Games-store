pool = require("../utils/db.js");


module.exports = {
    getBlankClient(){
        return {
            "id_client": 0,
            "client_created": 0,
            "client_age": 0,
            "client_name": 0,
            "lastname": 0,
            "phone": 0,
            "list_sale": 0,
            "mail_address": 0,
            "client_role" : 0,
            "client_password": 0
        };
    },
    async getAllClient(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM client";
            const rows = await conn.query(sql);
            conn.end()
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
            const rows = await conn.query(sql, [ID_client]); //crochet si sql entre id_client
            conn.end()
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
            const okPacket = await conn.query(sql, [ID_client]);
            conn.end()
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneClient(){  //comment  creer un ID alors qu'il s'incrémente seul ?
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO client (client_id) VALUES (NULL) ";
            const okPacket = await conn.query(sql, []); // affectedRows, insertId
            conn.end()
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
     async editOneClient(clientID, clientAge, clientName, clientLastname, clientPhone, clientListSale, clientMail_addresse){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE client SET client_age=?, client_name=?, lastname=?, phone=?, list_sale=?, mail_addresse=?, client_password=?  WHERE ID_client=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [clientAge, clientName, clientLastname, clientPhone, clientListSale, clientMail_addresse, clientPassword,clientID]);
            conn.end()
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
    
}
