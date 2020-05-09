module.exports = {
  index: "SELECT * FROM records",
  read: "SELECT * FROM records WHERE id = $1",
  create: "INSERT INTO records (first_name, last_name, dna) values ($1, $2, $3) RETURNING *",
  delete: "DELETE FROM records WHERE id = $1"
}