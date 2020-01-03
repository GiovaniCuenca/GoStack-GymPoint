import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      order: [['duration', 'DESC']],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "Plan doesn't exists" });
    }

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Please fill all the blanks in order to Create a new Plan',
      });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = req.body;

    const plan = await Plan.create({
      id,
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        error: 'Validation Failed, please check the information requested',
      });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({
        error: "Plan doesn't exists",
      });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const del = await Plan.findByPk(req.params.id);

    if (!del) {
      return res.status(404).json({
        error: "Plan doesn't exists",
      });
    }

    const { title } = await Plan.findByPk(id);

    await Plan.destroy({ where: { id } });

    return res.status(200).json({
      message: `Plano ${title} EXCLUÍDO com Sucesso`,
    });
  }
}

export default new PlanController();
