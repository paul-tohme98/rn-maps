import { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVER_ADDR } from '../server_path';
import { Ionicons } from '@expo/vector-icons';
import DrawingBoard from '../components/DrawingBoard';

function FirstScreen() {
  const [points, setPoints] = useState([]);
  const drawingBoardRef = useRef(null);

  const clearMap = () => {
    if (drawingBoardRef.current) {
      drawingBoardRef.current.clearBoard();
    }
  };

  const connection = async () => {
    try {
      const res = await axios.get(`http://${SERVER_ADDR}`);
      console.log("Connection successfully established!", res);
    } catch (error) {
      console.log("Failed to connect:", error);
    }
  };
  

  async function savePointsToDatabase(points){
    console.log("Points from save points", points);
    try {
      // const data = JSON.parse(points[0]);
      // console.log('Parsed JSON:', data);
      await axios
        .post(`http://${SERVER_ADDR}/insert-points/`, points)
        .then((response) => {
          console.log('Points saved successfully', response);
        })
        .catch((error) => {
          console.error('Error saving points:', error);
        });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const handleSetPoints = (data) => {
    setPoints(data);
  };

  const handleSavePoints = () => {
    console.log("Saving...");
    console.log(points);
    savePointsToDatabase(points);
  };
  
  useEffect(() => {
    console.log("Points to JSON: ",points);
  })

  return (
    <View style={styles.root}>
      <View style={styles.drawingContainer}>
        <DrawingBoard ref={drawingBoardRef} onData={handleSetPoints} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSavePoints}>
          <Ionicons name="save" size={48} color="blue" />
        </TouchableOpacity>
        <Button title="Clear Map" onPress={clearMap} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  drawingContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10%',
    marginHorizontal: '10%',
  },
});

export default FirstScreen;
