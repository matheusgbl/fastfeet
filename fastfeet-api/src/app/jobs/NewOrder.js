import Mail from '../../lib/Mail';

class NewOrder {
  get key() {
    return 'NewOrder';
  }

  async handle({ data }) {
    const { order, product, deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'You Have a New Order',
      template: 'newOrder',
      context: {
        id: order.id,
        deliveryman: deliveryman.name,
        productName: product,
        recipientName: recipient.name,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientCity: recipient.city,
        recipientState: recipient.state,
        recipientZipCode: recipient.zipcode,
      },
    });
  }
}

export default new NewOrder();
