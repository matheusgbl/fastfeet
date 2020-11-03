import React, { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import {
  Container,
  HeaderBackground,
  CameraWrapper,
  CameraButton,
  ConfirmButton,
  CameraButtonWrapper,
  CancelButton,
  Preview,
  CancelButtonWrapper,
} from './styles';

export default function Confirm({ route, navigation }) {
  const { id } = route.params;

  const cameraRef = useRef(null);
  const [file, setFile] = useState(null);

  async function handleTakePhoto() {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };

      const dataPhoto = await cameraRef.current.takePictureAsync(options);

      setFile(dataPhoto);
    }
  }

  async function handleTakePhotoAgain() {
    setFile(null);
  }

  async function handleSubmit() {
    const dataFile = new FormData();

    dataFile.append('files', {
      type: 'image/jpg',
      uri: file.uri,
      name: 'signature_id',
    });

    const response = await api.post('/files', dataFile);

    try {
      await api.put(`order/${id}`, {
        end_date: new Date(),
        signature_id: response.data.id,
      });

      Alert.alert('Sucessfully delivered!');

      navigation.navigate('Dashboard');
    } catch (err) {
      console.log(file);
      Alert.alert('Failed to delivery this order!');
    }
  }

  return (
    <Background>
      <Container>
        <HeaderBackground />
        <CameraWrapper>
          {!file ? (
            <RNCamera
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
                  <CameraButton onPress={handleTakePhoto}>
                    <Icon name="photo-camera" size={29} color="#fff" />
                  </CameraButton>
                </CameraButtonWrapper>
              </View>
            </RNCamera>
          ) : (
            <>
              <Preview source={{ uri: file.uri }} />
              <CancelButtonWrapper>
                <CancelButton onPress={handleTakePhotoAgain}>
                  <Icon name="close" size={42} color="#ddd" />
                </CancelButton>
              </CancelButtonWrapper>
            </>
          )}
        </CameraWrapper>
        <ConfirmButton onPress={handleSubmit}>Send</ConfirmButton>
      </Container>
    </Background>
  );
}
