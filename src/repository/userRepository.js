const clientDb = require("../config/DbConnection");

class UserRepository {
  async insertUser(name, email, password, userType) {
    try {
      const query = `
        INSERT INTO public.users (name, email, password, user_type_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const values = [name, email, password, userType];
      const result = await clientDb.query(query, values);

      return result.rows[0];
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }

  async emailAlreadyExists(value) {
    const result = await clientDb.query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE email =$1)`,
      [value]
    );
    return result.rows[0].exists;
  }

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await clientDb.query(query, [email]);

    return result.rows[0];
  }

  async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await clientDb.query(query, [id]);

    return result.rows[0];
  }
}

module.exports = UserRepository;
