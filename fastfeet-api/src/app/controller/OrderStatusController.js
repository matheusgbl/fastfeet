import { Op } from 'sequelize';
import * as Yup from 'yup';
import { getHours, parseISO, endOfDay, startOfDay } from 'date-fns';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class OrderStatusController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { order_id, deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman)
      return res.status(400).json({ error: 'Deliveryman not found' });

    const order = await Order.findByPk(order_id);

    if (!order) return res.status(400).json({ error: 'Delivery not found' });

    const { start_date } = req.body;

    if (order.canceled_at || order.end_date || order.start_date)
      return res.status(400).json({ error: 'Order closed' });

    const parsedStart = parseISO(start_date);

    const hour = getHours(parsedStart);

    if (hour <= 8 || hour >= 18)
      return res
        .status(400)
        .json({ error: 'The start date must be between 08:00 and 18:00' });

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(parsedStart), endOfDay(parsedStart)],
        },
        end_date: null,
      },
    });

    if (deliveries.length >= 5)
      return res
        .status(400)
        .json({ error: 'Deliveryman already has 5 deliveries on the day.' });

    const updated = await order.update(req.body);

    return res.json(updated);
  }
}
export default new OrderStatusController();
