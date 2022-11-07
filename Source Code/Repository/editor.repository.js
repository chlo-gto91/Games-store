pool = require("../utils/db.js");


module.exports = {
    getBlankEditort(){
        return {
            "id_editor": 0,
            "editor_name": 0
        };
    },
    async getAllEditor(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM editor";
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
    async getOneEditor(ID_editor){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM editor WHERE ID_editor =? ";
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
    async delOneEditor(ID_editor) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM editor WHERE ID_editor=?";
            const okPacket = await conn.query(sql, ID_editor);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneEditor(editorId){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO editor (editor_id, editor) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, editorId); // affectedRows, insertId
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
