pool = require("../utils/db.js");


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
    async delOneGame(ID_game) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM game WHERE ID_game=?";
            const okPacket = await conn.query(sql, ID_game);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
     async addOneGame(gameId){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO game (game_id,game_name) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, gameID); // affectedRows, insertId
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
