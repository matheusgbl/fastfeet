import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import DeliverymanController from './app/controller/DeliverymanController';
import SessionController from './app/controller/SessionController';
import SessionDeliverymanController from './app/controller/SessionDeliverymanController';
import FilesController from './app/controller/FilesController';
import ShowController from './app/controller/ShowController';
import UserController from './app/controller/UserController';
import OrderController from './app/controller/OrderController';
import OrderProblemController from './app/controller/OrderProblemController';
import OrderStatusController from './app/controller/OrderStatusController';
import OrderShowController from './app/controller/OrderShowController';
import RecipientController from './app/controller/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('files'), FilesController.store);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/sessiondeliveryman', SessionDeliverymanController.store);

routes.get('/orders/:deliverymanId', ShowController.index);
routes.get('/deliveryman/:deliverymanId/orders', ShowController.index);

routes.put('deliveryman/:deliveryman_id/orders/:id', OrderController.update);

routes.get('/order/:id', OrderShowController.show);

routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/orders/problems/:id', OrderProblemController.store);
routes.get('/problems', OrderProblemController.index);
routes.get('/orders/problems/:id', OrderProblemController.show);
routes.delete('/problems/:problemId', OrderProblemController.delete);

routes.put(
  '/orders/problems/:id/cancel-delivery',
  OrderProblemController.update
);

routes.put(
  '/deliveryman/:deliveryman_id/status/:order_id',
  OrderStatusController.update
);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.delete('/orders/:id', OrderController.delete);

export default routes;
