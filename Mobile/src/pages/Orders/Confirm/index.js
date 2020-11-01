import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import api from '../../../services/api';

import Background from '../../../components/Background';

import {
  Container,
  HeaderBackground,
  Camera,
  CameraWrapper,
  CameraButton,
  CameraButtonWrapper,
  ConfirmButton,
  Preview,
  CancelButtonWrapper,
  CancelButton,
} from './styles';

export default function Confirm({ route, navigation }) {
  const profile = useSelector((state) => state.deliveryman.profile);
  const { id } = route.params;
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <Background>
        <Container>
          <HeaderBackground />
        </Container>
      </Background>
    );
  }

  if (hasPermission === false) {
    return (
      <Background>
        <Container>
          <HeaderBackground />
          <Text>Sem acesso a camera</Text>;
        </Container>
      </Background>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.4, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPicture(data.uri);
    }
  };

  const HandleConfirm = async () => {
    try {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpeg',
        uri: picture,
        name: picture.split('/').pop(),
      });

      const response = await api.post('files', data);

      const signature_id = response.data.id;

      await api.put(`deliveryman/${profile.id}/status/${id}`, {
        end_date: new Date(),
        signature_id,
      });

      Alert.alert('Successfully delivered!');

      navigation.navigate('Deliveries');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(picture);
      Alert.alert('Failed to confirm delivery.');
    }
  };

  return (
    <Background>
      <Container>
        <HeaderBackground />
        <CameraWrapper>
          {!picture ? (
            <Camera
              ref={cameraRef}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              style={{ flex: 1 }}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              captureAudio={false}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <CameraButtonWrapper>
                  <CameraButton onPress={() => takePicture()}>
                    <Icon name="photo-camera" size={29} color="#fff" />
                  </CameraButton>
                </CameraButtonWrapper>
              </View>
            </Camera>
          ) : (
            <>
              <Preview source={{ uri: picture }} />
              <CancelButtonWrapper>
                <CancelButton onPress={() => setPicture(null)}>
                  <Icon name="cancel" size={29} color="#fff" />
                </CancelButton>
              </CancelButtonWrapper>
            </>
          )}
        </CameraWrapper>
        <ConfirmButton onPress={() => HandleConfirm()}>Enviar</ConfirmButton>
      </Container>
    </Background>
  );
}
