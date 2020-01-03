import { Op } from 'sequelize';
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: "Student doesn't exists" });
    }

    const studentCheckinsCount = await Checkin.findAll({
      where: { student_id },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'student_id', 'created_at'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    if (studentCheckinsCount == 0) {
      return res.status(400).json({ error: 'Student without any Checkins' });
    }

    return res.json(studentCheckinsCount);
  }

  async store(req, res) {
    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: "Student doesn't exists" });
    }

    const toDate = new Date();

    const checkinsPerWeek = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfWeek(toDate), endOfWeek(toDate)],
        },
      },
    });

    if (!(checkinsPerWeek.length < 5)) {
      return res.status(400).json({
        error: "You've reached your maximum amount of checkins per week.",
      });
    }

    const checkinsPerDay = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(toDate), endOfDay(toDate)],
        },
      },
    });

    if (!(checkinsPerDay == 0)) {
      return res.status(400).json({
        error: "You've reached your maximum amount of daily checkins.",
      });
    }

    await Checkin.create({ student_id });

    return res.json({ message: 'Have a good Workout' });
  }
}

export default new CheckinsController();
