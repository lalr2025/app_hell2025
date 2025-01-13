import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';

type LocationCoords = {
  latitude: number;
  longitude: number;
};

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert("Permissão negada!");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Latitude: {location?.latitude || "Desconhecida"}</Text>
      <Text>Longitude: {location?.longitude || "Desconhecida"}</Text>
      <Button title="Obter Localização" onPress={getLocation} />
    </View>
  );
}
