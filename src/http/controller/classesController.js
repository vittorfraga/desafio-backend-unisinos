const makeClassesService = require("../../services/factories/makeClassesService");

const createClassController = async (req, res, next) => {
  const { discipline, teacherId, scheduleCode } = req.body;

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

const listAllClassesController = async (req, res, next) => {

  try {
    const classesService = makeClassesService();

    const classes = await classesService.listAllClasses();

    return res.status(200).json({
      message: "Classes cadastradas.",
      classes: classes
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const listClassesByTeacherIdController = async (req, res, next) => {
  const { TeacherId } = req.body;
  try {
    const classesService = makeClassesService();

    const classes = await classesService.listClassesByTeacherId(TeacherId);

    return res.status(200).json({
      message: `Econtrando com sucesso classes do id de professor ${TeacherId}`,
      classes: classes
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const listClassesByStudentIdController = async (req, res, next) => {
  const { StudentId } = req.body;
  try {
    const classesService = makeClassesService();

    const classes = await classesService.listClassesByTeacherId(StudentId);

    return res.status(200).json({
      message: `Econtrando com sucesso classes do id de aluno ${StudentId}`,
      classes: classes
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const listClassByIdController = async (req, res, next) => {
  const { ClassId } = req.body;
  try {
    const classesService = makeClassesService();

    const classe = await classesService.listClassById(ClassId);

    return res.status(200).json({
      message: `Econtrando com sucesso a classe de id ${StudentId}`,
      classes: classe
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = {
  createClassController,
  listAllClassesController,
  listClassesByTeacherIdController,
  listClassesByStudentIdController,
  listClassByIdController
};

