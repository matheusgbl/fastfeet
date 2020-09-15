import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Files from '../models/Files';

class OrderShowController {
  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'created_at',
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
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: Files,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(order);
  }
}

export default new OrderShowController();
