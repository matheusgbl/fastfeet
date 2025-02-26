import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      where: { id },
      attributes: {
        exclude: ['avatar_id'],
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url', 'path'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async index(req, res) {
    const { q, page = 1 } = req.query;
    const { id } = req.params;

    if (id) {
      const deliveryman = await Deliveryman.findByPk(id, {
        attributes: ['id', 'name', 'email', 'avatar_id', 'createdAt'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      return res.json(deliveryman);
    }

    if (!q) {
      const deliveryman = await Deliveryman.findAll({
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
        order: [['id', 'ASC']],
        limit: 5,
        offset: (page - 1) * 5,
      });
      return res.json(deliveryman);
    }

    const deliveryman = await Deliveryman.findAll({
      where: {
        name: {
          [Op.iLike]: q,
        },
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['id', 'ASC']],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverymanExist = await Deliveryman.findByPk(id);

    if (!deliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    await Deliveryman.destroy({ where: { id } });

    return res.json({ message: 'Deliveryman has been deleted' });
  }
}

export default new DeliverymanController();
