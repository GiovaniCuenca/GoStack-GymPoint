import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import HelpOrderQuestionMail from '../jobs/HelpOrderQuestionMail';
import HelpOrderReplyMail from '../jobs/HelpOrderReplyMail';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (student) {
      const questionsByStudentId = await HelpOrder.findAll({
        where: { student_id },
        order: [['createdAt', 'ASC']],
        limit: 10,
        offset: (page - 1) * 20,
      });

      return res.json(questionsByStudentId);
    }

    const questionUnanswered = await HelpOrder.findAll({
      where: { answer: null },
      order: [['createdAt', 'ASC']],
      limit: 10,
      offset: (page - 1) * 20,
    });

    return res.json(questionUnanswered);
  }

  async show(req, res) {
    const { page = 1 } = req.query;

    const help = await HelpOrder.findAll({
      where: { answer: null },
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(help);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Question field empty' });
    }

    const student_id = req.params.id;
    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({ error: "Student doesn't exists" });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    const helpOrderConfirmation = await HelpOrder.findByPk(helpOrder.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(HelpOrderQuestionMail.key, {
      helpOrderConfirmation,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Answer field empty' });
    }

    const helpOrderId = req.params.id;

    const checkOrderExists = await HelpOrder.findOne({
      where: { id: helpOrderId },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!checkOrderExists) {
      return res.status(404).json({ error: "Help Order doesn't exists" });
    }

    if (checkOrderExists.answer !== null) {
      return res.status(404).json({ error: 'Help Order already Asnwered' });
    }

    const { answer } = req.body;
    const toDate = new Date();

    const response = await checkOrderExists.update({
      answer,
      answer_at: toDate,
    });

    await Queue.add(HelpOrderReplyMail.key, {
      response,
    });

    return res.json(response);
  }
}

export default new HelpOrderController();
