import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { order, deliveryman, problem } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'One of your deliveries has been cancelled.',
      template: 'cancellation',
      context: {
        id: order.id,
        deliveryman: deliveryman.name,
        delivery_id: order.id,
        product: order.product,
        description: problem.description,
      },
    });
  }
}

export default new CancellationMail();
