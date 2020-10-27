import * as Yup from 'yup';

import OrderProblem from '../models/OrderProblem';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import Queue from '../../lib/Queue';
import Order from '../models/Order';

import CancellationMail from '../jobs/CancellationMail';
import Recipient from '../models/Recipient';

class OrderProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { id } = req.params;
    const { description } = req.body;

    const orderExist = await Order.findOne({
      where: { id },
    });

    if (!orderExist) {
      return res.status(400).json({
        error: 'This order does not exist, or has been already delivered.',
      });
    }

    const problem = await OrderProblem.create({
      description,
      order_id: id,
    });

    return res.json(problem);
  }

  async index(req, res) {
    const { page = 1 } = req.params;

    const orderProblems = await OrderProblem.findAll({
      attributes: ['id', 'description'],
      order: [['created_at']],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(orderProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const problems = await OrderProblem.findAll({
      where: { id },
    });

    return res.json(problems);
  }

  async update(req, res) {
    const { id } = req.params;

    const problem = await OrderProblem.findByPk(id, {
      attributes: ['id', 'order_id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'complement',
                'house',
                'zipcode',
                'city',
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
                  attributes: ['id', 'name', 'path', 'url'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!problem) return res.status(400).json({ error: 'Problem not found' });

    const { order_id } = problem;

    const order = await Order.findByPk(order_id);

    if (!order) return res.status(400).json({ error: 'Order not found' });

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(CancellationMail.key, {
      problem,
    });

    return res.json(order);
  }

  async delete(req, res) {
    const { problemId } = req.params;
    const orderProblem = await OrderProblem.findByPk(problemId);

    if (!orderProblem) {
      return res.status(400).json({ error: 'Problem does not exists.' });
    }

    const order = await Order.findByPk(orderProblem.order_id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists.' });
    }

    order.canceled_at = new Date();

    order.save();

    return res.json(order);
  }
}

export default new OrderProblemController();
