pool = require("../Repository/db.js");


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
            let conn = await pool.getConnection();// await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "SELECT * FROM client";
            const rows = await conn.query(sql);// query is used to retrieve an element or a set of elements from the DOM (Document Object Model) based on a specified CSS selector. 
            //This method is typically used to access and manipulate elements in the DOM, such as changing their styles or adding event listeners.
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
            const rows = await conn.query(sql, [ID_client]); //[] for sql
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
            let conn = await pool.getConnection();// await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "INSERT INTO client (id_client) VALUES (NULL) ";
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
     async editOneClient(clientID, clientAge, clientName, clientLastname, clientPhone, clientMail_addresse,clientPassword){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE client SET client_age=?, client_name=?, lastname=?, phone=?,  mail_address=?, client_password=?  WHERE ID_client=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [clientAge, clientName, clientLastname, clientPhone, clientMail_addresse, clientPassword,clientID]);
                        // query is used to retrieve an element or a set of elements from the DOM (Document Object Model) based on a specified CSS selector. 
            //This method is typically used to access and manipulate elements in the DOM, such as changing their styles or adding event listeners.
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
