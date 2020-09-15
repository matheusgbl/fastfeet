import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { name, page = 1 } = req.query;

    const recipient = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'state',
        'city',
        'zipcode',
      ],
      order: [['created_at']],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(recipient);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zipcode',
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.number().required('O CEP é obrigatório.'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { recipientId } = req.params;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    await recipient.destroy();

    return res.json();
  }
}

export default new RecipientController();
