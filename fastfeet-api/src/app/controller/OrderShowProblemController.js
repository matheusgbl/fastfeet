import OrderProblem from '../models/OrderProblem';

class OrderShowProblemController {
  async index(req, res) {
    const { id } = req.params;

    const orderProblem = OrderProblem.findAll({
      where: { id },
      attributes: ['id', 'description', 'created_at'],
    });

    return res.json(orderProblem);
  }
}

export default new OrderShowProblemController();
