pool = require("../Repository/db.js");


module.exports = {
    getBlankConsole(){
        return {
            "id_console": 0,
            "stockage": 0,
            "console_name": 0,
            "console_color": 0,
            "console_price": 0,
            "console_stock": 0
        };
    },
    async getAllConsole(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM console";
            const rows = await conn.query(sql);
            conn.release();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getAllColor(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT console_color FROM console GROUP BY console_color";
            const rows = await conn.query(sql);
            conn.release();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getConsoleByPrice(price_console){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM console WHERE console_price <= ? ORDER BY console_price";
            const rows = await conn.query(sql, price_console);
            conn.release();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getConsoleByStockage(stockage){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM console WHERE stockage  <= ? ORDER BY stockage";
            const rows = await conn.query(sql, stockage);
            conn.release();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneConsole(ID_console){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM console WHERE ID_console =? ";
            const rows = await conn.query(sql, ID_console);
            conn.release();
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
    async delOneConsole(IDconsole) {
        try {
            let conn = await pool.getConnection();
            // let sql = "DELETE FROM buy WHERE ID_console=?";//delete buy because it contains also ID_console
            let sql = "DELETE FROM console WHERE ID_console=?";
            const okPacket = await conn.query(sql, IDconsole);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneConsole(){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO console (console_id) VALUES (NULL) "; //console ?
            const okPacket = await conn.query(sql); // affectedRows, insertId
            conn.release();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneConsole(consoleId, consoleStockage, consoleName, consoleColor, consolePrice, consoleStock){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE console SET stockage=?, console_name=?, console_color=?, console_price=?, console_stock=? WHERE ID_console=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [consoleStockage, consoleName, consoleColor, consolePrice, consoleStock, consoleId]);
           conn.release();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
}
