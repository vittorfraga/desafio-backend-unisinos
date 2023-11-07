/*const bcrypt = require("bcrypt");
const { userRepository } = require("../repository/userRepository");

async function createUser(name, email, password, userType) {
  const emailExists = await userRepository.emailAlreadyExists(email);

  if (emailExists) {
    return "O email já existe";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.insertUser(
    name,
    email,
    hashedPassword,
    userType
  );
  console.log(user);
  return user;
}

module.exports = {
  createUser,
};*/
/*const userService = require("./../services/userService");

createUserController = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    const user = await userService.createUser(name, email, password, userType);
    console.log(user);

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  createUserController,
};*/
/*
const userRepository = {
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
  },

  async emailAlreadyExists(value) {
    const result = await clientDb.query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE email =$1)`,
      [value]
    );
    return result.rows[0].exists;
  },
};

module.exports = {
  userRepository,
};
*/
