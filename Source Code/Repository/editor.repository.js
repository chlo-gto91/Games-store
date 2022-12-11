pool = require("../Repository/db.js");


module.exports = {
    getBlankEditort(){
        return {
            "id_editor": 0,
            "editor_name": 0
        };
    },
    async getAllEditor(){
        try{
            let conn = await pool.getConnection();// await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "SELECT * FROM editor";
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
    async getOneEditor(ID_editor){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM editor WHERE ID_editor =? ";
            const rows = await conn.query(sql, ID_client);
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
    async getEditorByName(editor_name){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT editor_ID FROM editor WHERE editor_name =? ";
            const rows = await conn.query(sql, editor_name);
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
    async delOneEditor(ID_editor) {
        try {
            let conn = await pool.getConnection();// await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "DELETE FROM editor WHERE ID_editor=?";
            const okPacket = await conn.query(sql, ID_editor);// query is used to retrieve an element or a set of elements from the DOM (Document Object Model) based on a specified CSS selector. 
            //This method is typically used to access and manipulate elements in the DOM, such as changing their styles or adding event listeners.
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneEditor(editorName){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO editor (editor_id, editor_name) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, editorName); // affectedRows, insertId
            conn.end()
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneEditor(EditorId, EditorName){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE editor SET editor_name=? WHERE ID_editor=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [EditorName, EditorId]);
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
