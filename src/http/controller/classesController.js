const makeClassesService = require("../../services/factories/makeClassesService");

const createClassController = async (req, res, next) => {
  const { discipline, teacherId, scheduleCode } = req.body;
  console.log(discipline, teacherId, scheduleCode);

  try {
    const classesService = makeClassesService();

    await classesService.createClass(discipline, teacherId, scheduleCode);

    return res.status(201).json({
      message: "Aula criada com sucesso!",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createClassController,
};
