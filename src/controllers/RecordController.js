const db = require("../database/connection");

module.exports = {
  async index(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM records");
      return res.json(rows);
    } catch (err) {
      return res.json(err.message);
    }
  }
}