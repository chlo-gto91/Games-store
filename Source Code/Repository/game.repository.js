pool = require("../Repository/db.js");


module.exports = {
    getBlankGame(){
        return {
            "id_game": 0,
            "price": 0,
            "game_description": 0,
            "game_name": 0,
            "category": 0,
            "game_stock": 0
        };
    },
    async getAllGame(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game";
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
    async getGameByName(name){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game WHERE upper(game_name) like upper(?)";
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
    async getAllCategory(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT category FROM game GROUP BY category";
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
    async getAllGameStock(){
        try{
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game";
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

    async getOneGame(ID_game){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game WHERE ID_game =? ";
            const rows = await conn.query(sql, ID_game);
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

    async getOneGameAndEditor(ID_game){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game INNER JOIN editor ON game.ID_editor=editor.editor_ID WHERE ID_game =? ";
            const rows = await conn.query(sql, ID_game);
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
    async getAllGameByCategory(category_game){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game WHERE category =?  ORDER BY price";
            const rows = await conn.query(sql, category_game);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getAllGameByEditor(Editor){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM game WHERE ID_editor =?  ORDER BY price";
            const rows = await conn.query(sql, Editor);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    },
    async getGameByPrice(price_game){
        try{
            let conn = await pool.getConnection();
            let sql  = "SELECT * FROM game WHERE price <= ? ORDER BY price";
            const rows = await conn.query(sql, price_game);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    },

    async getStockOfAGame(game_name){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT game_stock FROM game WHERE game_name =? ";
            const stock = await conn.query(sql, game_name);
            conn.end();
            console.log("The stock is "+stock);
            return stock;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async delOneGame(game_ID) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM have WHERE ID_game=?"; //delete have because it contains also ID_game
            sql = "DELETE FROM game WHERE ID_game=?";
            const okPacket = await conn.query(sql, game_ID);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneGame(editor_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO game (game_id,ID_editor) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, editor_ID); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneGame(gameId, gamePrice, gameDescription, gameName, gameCategory, gameStock){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE game SET price=?, game_description=?, game_name=?, category=?, game_stock=? WHERE ID_game=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [gamePrice, gameDescription, gameName, gameCategory, gameStock, gameId]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async editGameStock(game_name, exemples_bought){
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE game_stock=? WHERE game_name=?";
            const okPacket = await conn.query(sql, this.getStockOfAGame(game_name)-exemples_bought, game_name); // exemples_bought should be 1 but in case someone wants to buy 2 games
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
