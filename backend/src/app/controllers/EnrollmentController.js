import * as Yup from 'yup';
import { startOfDay, parseISO, addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import EnrollmentMail from '../jobs/EnrollmentMail';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollment = await Enrollment.findAll({
      where: { canceled_at: null },
      order: [['createdAt', 'ASC']],
      attributes: [
        'id',
        'student_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Please fill all the information in order to create a Enroll a new Student',
      });
    }

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(404).json({ error: "Plan doesn't exists" });
    }

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({ error: "Student doesn't exists" });
    }

    const checkUserAlreadyEnrolled = await Enrollment.findOne({
      where: { student_id, canceled_at: null },
    });

    if (checkUserAlreadyEnrolled) {
      return res
        .status(401)
        .json({ error: 'Student already enrolled in another Plan' });
    }

    const configureStartDate = startOfDay(parseISO(start_date));
    const configureEndDate = addMonths(parseISO(start_date), plan.duration);
    const planFinalValue = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date: configureStartDate,
      end_date: configureEndDate,
      price: planFinalValue,
    });

    const enrollmentConfirmation = await Enrollment.findByPk(enrollment.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration'],
        },
      ],
    });

    await Queue.add(EnrollmentMail.key, {
      enrollmentConfirmation,
    });

    return res.json(enrollment);
  }

  async show(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          "Please fill all the information in order to Update a Studen'ts Enrollment.",
      });
    }

    const enrollmentId = await Enrollment.findByPk(req.params.id);

    if (!enrollmentId) {
      return res.status(404).json({ error: "Enrollment doesn't exists" });
    }

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(404).json({ error: "Plan doesn't exists" });
    }

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({ error: "Student doesn't exists" });
    }

    const configureStartDate = startOfDay(parseISO(start_date));
    const configureEndDate = addMonths(parseISO(start_date), plan.duration);
    const planFinalValue = plan.duration * plan.price;

    const enrollment = await enrollmentId.update({
      student_id,
      plan_id,
      start_date: configureStartDate,
      end_date: configureEndDate,
      price: planFinalValue,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({
        error: "Enrollment doesn't exists",
      });
    }

    enrollment.canceled_at = new Date();

    await enrollment.save();

    await Queue.add(CancellationMail.key, {
      enrollment,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
