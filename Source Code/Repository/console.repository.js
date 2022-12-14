pool = require("../Repository/db.js");


module.exports = {
    getBlankConsole(){
        return {
            "ID_console": 0,
            "stockage": 0,
            "console_name": 0,
            "console_color": 0,
            "console_price": 0,
            "console_stock": 0
        };
    },
    async getAllConsole(){
        try{
            let conn = await pool.getConnection();// await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "SELECT * FROM console";
            const rows = await conn.query(sql);
            conn.end();// release() method is used to release the memory used by an object
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
    async getConsoleByName(name){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM console WHERE upper(console_name) like upper(?)";
            const rows = await conn.query(sql, name);
            conn.end()
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
            let conn = await pool.getConnection(); // await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "SELECT * FROM console WHERE stockage  <= ? ORDER BY stockage";
            const rows = await conn.query(sql, stockage); // query is used to retrieve an element or a set of elements from the DOM (Document Object Model) based on a specified CSS selector. 
            //This method is typically used to access and manipulate elements in the DOM, such as changing their styles or adding event listeners.
            conn.release(); // release() method is used to release the memory used by an object
            console.log("ROWS FETCHED: "+rows.length); // display
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
            conn.release(); // release() method is used to release the memory used by an object
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
            let conn = await pool.getConnection();// await is used to pause the execution of the current async function 
            //until the promise is resolved. This allows the function to wait for an asynchronous operation to complete before continuing.
            let sql = "INSERT INTO console (ID_console) VALUES (NULL) "; //console ?
            const okPacket = await conn.query(sql); // affectedRows, insertId
            conn.release();// release() method is used to release the memory used by an object
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
    },

    
    async editConsoleStock(console_name){
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE console_stock=? WHERE console_name=?";
            const okPacket = await conn.query(sql, this.getStockOfAGame(console_name)-1, console_name); // exemples_bought should be 1 but in case someone wants to buy 2 games
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}
