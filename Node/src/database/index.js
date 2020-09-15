import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Files from '../app/models/Files';
import Deliveryman from '../app/models/Deliveryman';
import Order from '../app/models/Order';
import OrderProblem from '../app/models/OrderProblem';

import databaseConfig from '../config/database';

const models = [OrderProblem, Order, User, Recipient, Files, Deliveryman];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
