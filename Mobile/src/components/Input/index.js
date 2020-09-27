import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, InputText } from './styles';

function Input({ icon, style, ...rest }, ref) {
  return (
    <Container styled={style}>
      {icon && <Icon name={icon} size={20} color="#999" />}
      <InputText ref={ref} {...rest} />
    </Container>
  );
}

export default forwardRef(Input);
