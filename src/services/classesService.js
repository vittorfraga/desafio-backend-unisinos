const { differenceInDays, parse } = require("date-fns");

const DuplicateTeacherClass = require("./errors/duplicateTeacherClassError");
const UserTypeError = require("./errors/userTypeError");
const UserNotFoundError = require("./errors/userNotFoundError");
const ProfessorAvailabilityError = require("./errors/ProfessorAvailabilityError");
const UnknownScheduleCode = require("./errors/unknownScheduleCode");

class ClassesService {
  constructor(classesRepository, usersRepository) {
    this.classesRepository = classesRepository;
    this.usersRepository = usersRepository;
  }

  async createClass(discipline, teacherId, scheduleCode) {
    const teacher = await this.usersRepository.findById(teacherId);

    if (!teacher) {
      throw new UserNotFoundError();
    }

    if (teacher.user_type_id !== 3) {
      throw new UserTypeError();
    }

    const scheduleCodeExists = await this.classesRepository.checkScheduleCode(
      scheduleCode
    );

    if (!scheduleCodeExists) {
      throw new UnknownScheduleCode();
    }

    const dayCode = scheduleCode.toString().charAt(0);
    const isAvailable = await this.checkAvailability(
      teacherId,
      dayCode,
      scheduleCode
    );

    if (!isAvailable) {
      throw new ProfessorAvailabilityError();
    }

    const totalDuplicates =
      await this.classesRepository.checkDuplicateDayAndTurn(
        teacherId,
        dayCode,
        scheduleCode
      );

    if (totalDuplicates > 0) {
      throw new DuplicateTeacherClass();
    }

    const classCreated = await this.classesRepository.createClass(
      discipline,
      scheduleCode,
      teacherId
    );

    return classCreated;
  }

  async checkAvailability(teacherId, dayCode) {
    const totalClasses = await this.classesRepository.countClassesOnDay(
      teacherId,
      dayCode
    );
    return totalClasses < 2;
  }

  async createClassEnrollment(classId, studentId) {
    const classEnrollment = await this.classesRepository.findClassById(classId);
    if (!classEnrollment) throw new ClassNotFoundError();

    const student = await this.usersRepository.findById(studentId);
    if (!student) throw new UserNotFoundError();
    if (student.user_type_id !== 2) throw new UserTypeError();

    const classEnrollmentCreated =
      await this.classesRepository.createClassEnrollment(classId, studentId); //TODO - implementar o metodo createClassEnrollment no repository, controller e rota
    return classEnrollmentCreated;
  }

  async listClassesByStudentId(studentId) {
    const student = await this.usersRepository.findById(studentId);
    if (!student) throw new UserNotFoundError();
    if (student.user_type_id !== 2) throw new UserTypeError();

    const classes = await this.classesRepository.listClassesByStudentId(
      studentId
    ); //TODO - implementar o metodo listClassesByStudentId no repository, controller e rota
    return classes;
  }

  async listClassesByTeacherId(teacherId) {
    const teacher = await this.usersRepository.findById(teacherId);
    if (!teacher) throw new UserNotFoundError();
    if (teacher.user_type_id !== 3) throw new UserTypeError();

    const classes = await this.classesRepository.listClassesByTeacherId(
      teacherId
    ); //TODO - implementar o metodo listClassesByTeacherId no repository, controller e rota
    return classes;
  }

  async cancelEnrrolment(classId, studentId) {
    const classEnrollment = await this.classesRepository.findClassById(classId); //TODO - implementar o metodo findClassById no repository, controller e rota
    if (!classEnrollment) throw new ClassNotFoundError();

    const student = await this.usersRepository.findById(studentId);
    if (!student) throw new UserNotFoundError();
    if (student.user_type_id !== 2) throw new UserTypeError();

    const currentDate = new Date();
    const enrollmentDate = parse(
      classEnrollment.created_at,
      "yyyy-MM-dd HH:mm:ss.SSSSSS",
      new Date()
    );

    const daysDifference = differenceInDays(currentDate, enrollmentDate);

    if (daysDifference > 7) {
      throw new TimeExpiredForCancelEnrollmentError(); // TODO - implementar o erro TimeExpiredForCancelEnrollmentError
    }

    const classEnrollmentDeleted =
      await this.classesRepository.cancelEnrrolment(classId, studentId); //TODO - implementar o metodo no repository, controller e rota
    return classEnrollmentDeleted;
  }

  async listAllClasses() {
    const classes = await this.classesRepository.listAllClasses(); //TODO - implementar o metodo no repository, controller e rota
    return classes;
  }
}

module.exports = ClassesService;
