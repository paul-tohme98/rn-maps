// Tab1Screen.js
import {useRef} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DrawingBoard from '../components/DrawingBoard';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";


function FirstScreen(){
  const drawingBoardRef = useRef(null);

  const clearMap = () => {
    if (drawingBoardRef.current) {
      drawingBoardRef.current.clearBoard();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.drawingContainer}>
         <DrawingBoard ref={drawingBoardRef} />
        {/* <MapView style={styles.map} provider={PROVIDER_GOOGLE} /> */}
      {/* <Text style={styles.text}>Current latitude: {region.latitude}</Text>
    <Text style={styles.text}>Current longitude: {region.longitude}</Text> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Clear Map" onPress={clearMap} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  drawingContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: '10%',
    marginLeft: '50%',
  },
});

export default FirstScreen;
