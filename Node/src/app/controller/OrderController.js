import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewOrder from '../jobs/NewOrder';
import Queue from '../../lib/Queue';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exist.' });
    }

    const { id } = await Order.create({
      product,
      deliveryman_id,
      recipient_id,
    });

    await Queue.add(NewOrder.key, {
      deliveryman,
      recipient,
      product: req.body.product,
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
      signature_id: Yup.number(),
      canceled_at: Yup.string(),
      start_date: Yup.string(),
      end_date: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    const updateOrder = await order.update(req.body);

    return res.json(updateOrder);
  }

  async index(req, res) {
    const { product, page = 1 } = req.query;

    const orders = product
      ? await Order.findAll({
          where: {
            product: {
              [Op.iLike]: `%${product}%`,
            },
          },
          attributes: [
            'id',
            'product',
            'start_date',
            'end_date',
            'canceled_at',
          ],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'number',
                'city',
                'state',
                'zipcode',
              ],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'url', 'path'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'url', 'path'],
            },
          ],
        })
      : await Order.findAll({
          attributes: [
            'id',
            'product',
            'start_date',
            'end_date',
            'canceled_at',
          ],
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'number',
                'city',
                'state',
                'zipcode',
              ],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'url', 'path'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'url', 'path'],
            },
          ],
        });

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const order = await Order.findOne({
      where: {
        id,
      },
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
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
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['created_at']],
      limit: 3,
      offset: (page - 1) * 3,
    });

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findOne({
      where: { id: req.params.id, canceled_at: null },
    });

    if (!order) {
      return res.status(400).json({
        error: 'This order does not exist or is already been cancelled.',
      });
    }

    order.canceled_at = new Date();

    await order.save();

    return res.status(200).json(order);
  }
}

export default new OrderController();
