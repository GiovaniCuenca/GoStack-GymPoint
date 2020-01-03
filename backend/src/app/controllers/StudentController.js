import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const { q, page = 1 } = req.query;

    const student = q
      ? await Student.findAll({
          where: { name: { [Op.iLike]: `%${q}%` } },
          order: ['id'],
          limit: 10,
          offset: (page - 1) * 10,
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        })
      : await Student.findAll({
          order: ['id'],
          limit: 10,
          offset: (page - 1) * 10,
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        });

    return res.json(student);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }

    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const del = await Student.findByPk(req.params.id);

    if (!del) {
      return res.status(404).json({
        error: "Student doesn't exists",
      });
    }
    await Student.destroy({ where: { id: del.id } });

    return res.status(200).json({
      message: `Student succesfully DELETED`,
    });
  }
}

export default new StudentController();
