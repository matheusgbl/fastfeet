import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Letters, Image } from './styles';
import { createLetterAvatar } from '../../util/letters';

export default function Avatar({ size, name, avatar }) {
  const profile = useSelector((state) => state.deliveryman.profile);
  const letters = createLetterAvatar(name);

  return (
    <Container size={size}>
      <Letters size={size}>{letters}</Letters>
      {avatar && avatar.url && (
        <Image
          size={size}
          source={{
            uri: `http://192.168.15.2:3333/files/${profile.avatar.path}`,
          }}
        />
      )}
    </Container>
  );
}
