const db = require("../database/connection");
const queries = require("../database/queries");

module.exports = {
  async index(req, res) {
    try {
      const { rows } = await db.query(queries.index);
      return res.json(rows);
    } catch (err) {
      return res.json(err.message);
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query(queries.read, [id]);

      if (rows.length === 0)
        return res.status(404).json({ "message": "Record not found" });

      return res.json(rows);
    } catch (err) {
      return res.json(err.message);
    }
  },

  // Create operation //
  async create(req, res) {
    try {
      const { firstName, lastName, dna } = req.body;
      const { rows } = await db.query(queries.create, [firstName, lastName, dna]);
      return res.json(rows);
    } catch (err) {
      return res.json(err.message);
    }
  },

  // Delete operation (Dev tool) //
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { rowCount } = await db.query(queries.delete, [id]);

      if (rowCount === 0)
        return res.status(404).json({ "message": "Record not found" });

      return res.status(200).json({ "message": "success" });
    } catch (err) {
      return res.json(err.message);
    }
  }
}