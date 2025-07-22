import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

export const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermissions();
  }, []);

  return {
    hasPermission
  };
};
