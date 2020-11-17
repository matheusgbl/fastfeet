import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveryman from '../pages/Deliverymans';
import DeliverymanAdd from '../pages/Deliverymans/DeliveryManAdd';
import DeliverymanEdit from '../pages/Deliverymans/DeliveryManEdit';

import Order from '../pages/Orders';
import OrderAdd from '../pages/Orders/AddOrder';
import OrderEdit from '../pages/Orders/EditOrder';

import Recipient from '../pages/Recipients';
import RecipientAdd from '../pages/Recipients/AddRecipient';
import RecipientEdit from '../pages/Recipients/EditRecipient';

import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />;{/* DELIVERYMANS */}
      <Route path="/deliverymans" exact isPrivate component={Deliveryman} />
      <Route path="/deliveryman_create" component={DeliverymanAdd} isPrivate />
      <Route path="/deliveryman_edit" component={DeliverymanEdit} isPrivate />
      {/* ORDERS */}
      <Route path="/orders" component={Order} isPrivate />
      <Route path="/orders_create" component={OrderAdd} isPrivate />
      <Route path="/orders_edit/:id" component={OrderEdit} isPrivate />
      {/* PROBLEMS */}
      <Route path="/problems" component={Problems} isPrivate />
      {/* RECIPIENTS */}
      <Route path="/recipients" component={Recipient} isPrivate />
      <Route path="/recipient_create" component={RecipientAdd} isPrivate />
      <Route path="/recipient_edit" component={RecipientEdit} isPrivate />
    </Switch>
  );
}
