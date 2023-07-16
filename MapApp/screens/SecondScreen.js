// Tab2Screen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import SVGDrawBoard from '../components/SVGDrawBoard';
import { SERVER_ADDR } from '../server_path';


function SecondScreen(){

  const [points, setPoints] = useState([]);

  const handleDrag = () => {
    // Logic to handle pin drag
  };

  async function fetchPoints() {
    console.log("Points from save points", points);
    try {
      const res = await axios.get(`http://${SERVER_ADDR}/get-maps/points`);
      console.log("fetch points ", res.data.points);
      setPoints(res.data.points);
      console.log('Points fetched successfully', res.data.points);
    } catch (error) {
      console.error('Error saving points:', error);
    }
  };

  useEffect(() => {
    try{
      fetchPoints();
    }
    catch(err){
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.root}>
      {/* Map Component with draggable pin */}
      <SVGDrawBoard points={points} />
      <Text>Pin Position: X, Y</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

export default SecondScreen;
