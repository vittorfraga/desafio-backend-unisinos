require("dotenv").config();

const app = require("./app");
const clientDb = require("./config/DbConnection");

const server = app.listen(4030, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await clientDb.end();
    console.log("Conexão com o banco de dados encerrada");
    server.close(() => {
      console.log("Servidor encerrado");
      process.exit(0);
    });
  } catch (error) {
    console.error("Erro ao encerrar conexão com o banco de dados:", error);
    process.exit(1);
  }
});
