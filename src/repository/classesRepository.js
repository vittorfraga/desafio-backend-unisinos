const clientDb = require("../config/DbConnection");

class ClassesRepository {
  async createClass(discipline, scheduleCode, professorId) {
    try {
      const query = `
        INSERT INTO public.classes (discipline, schedule_code, professor_id)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      const values = [discipline, scheduleCode, professorId];
      const result = await clientDb.query(query, values);

      return result.rows[0];
    } catch (error) {
      console.error("Erro ao cadastrar aula:", error);
      throw error;
    }
  }

  async countClassesOnDay(professorId, dayCode) {
    try {
      const query = `
            SELECT COUNT(*) AS total_classes
            FROM public.classes
            WHERE professor_id = $1
            AND SUBSTRING(schedule_code::text, 1, 1) = $2;
        `;

      const values = [professorId, dayCode];
      const result = await clientDb.query(query, values);

      return result.rows[0].total_classes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkDuplicateDayAndTurn(professorId, dayCode, scheduleCode) {
    try {
      const query = `
        SELECT COUNT(*) AS total_duplicates
        FROM public.classes
        WHERE professor_id = $1
        AND SUBSTRING(schedule_code::text, 1, 1) = $2
        AND schedule_code = $3;
      `;

      const values = [professorId, dayCode, scheduleCode];
      const result = await clientDb.query(query, values);

      return result.rows[0].total_duplicates;
    } catch (error) {
      console.error("Erro ao verificar duplicatas de dia e turno:", error);
      throw error;
    }
  }

  async checkScheduleCode(scheduleCode) {
    const query = `SELECT * FROM schedule WHERE code = $1`;
    const result = await clientDb.query(query, [scheduleCode]);

    return result.rows[0];
  }

  async findClassById(id) {
    const query = `SELECT * FROM classes WHERE id = $1`;
    const result = await clientDb.query(query, [id]);

    return result.rows[0];
  }

  async listAllClasses() {
    const query = `SELECT * FROM classes`;
    const result = await clientDb.query(query, [id]);

    return result.rows;
  }

  async listClassesByTeacherId(teacherId) {
    const query = `SELECT * FROM classes AS c join users AS u on c.professor_id = u.id WHERE u.id = $1`;
    const result = await clientDb.query(query, [teacherId]);

    return result.rows;
  }

  async listClassesByStudentId(studentId) {
    const query = `SELECT * 
    FROM enrollment AS e 
    JOIN classes AS c ON e.classes_id = c.id
    JOIN users AS e.student_id = u.id
    WHERE u.id = $1`;
    const result = await clientDb.query(query, [studentId]);

    return result.rows;
  }
}

module.exports = ClassesRepository;
