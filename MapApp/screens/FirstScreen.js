// FirstScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVER_ADDR } from '../server_path';
import { Ionicons } from '@expo/vector-icons';
import DrawingBoard from '../components/DrawingBoard';

function FirstScreen({ navigation }) {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const drawingBoardRef = useRef(null);

  const clearMap = () => {
    if (drawingBoardRef.current) {
      drawingBoardRef.current.clearBoard();
    }
  };

  async function savePointsToDatabase(points) {
    console.log("Points from save points", points);
    try {
      await axios.post(`http://${SERVER_ADDR}/insert-points/`, points);
      console.log('Points saved successfully');
      const newLines = points.map((point) => `L${point.x},${point.y}`).join('');
      setLines([...lines, newLines]);
    } catch (error) {
      console.error('Error saving points:', error);
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
  },
  drawingContainer: {
    flex: 1,
    width: '100%',
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
