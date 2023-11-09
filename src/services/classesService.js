const DuplicateTeacherClass = require("./errors/duplicateTeacherClassError");
const UserTypeError = require("./errors/userTypeError");
const UserNotFoundError = require("./errors/userNotFoundError");
const ProfessorAvailabilityError = require("./errors/ProfessorAvailabilityError");
const UnknownScheduleCode = require("./errors/unknownScheduleCode");
const UnauthorizedPermissionError = require("./errors/unauthorizedPermissionError");

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
}

module.exports = ClassesService;
