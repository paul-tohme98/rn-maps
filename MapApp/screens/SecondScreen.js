// Tab2Screen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import SVGDrawBoard from '../components/SVGDrawBoard';
import { SERVER_ADDR } from '../server_path';

const api = axios.create({
  baseURL: `http://${SERVER_ADDR}`,
});

function SecondScreen() {
  const [points, setPoints] = useState([]);

  async function fetchPoints() {
    try {
      const res = await api.get('/get-maps/points');
      const dataPoints = res?.data?.points || [];
      console.log('fetch points ', dataPoints);
      setPoints(dataPoints);
      console.log('Points fetched successfully', dataPoints);
    } catch (error) {
      console.error('Error fetching points in screen 2:', error);
    }
  }

  useEffect(() => {
    fetchPoints()
      .then((res) => {
        console.log("Points re-rendered : ", points);
      })
      .catch((error) => {
        console.error('Error fetching points in screen 2:', error);
      });
  }, [points]);

  return (
    <View style={styles.root}>
      {/* Map Component with draggable pin */}
        <SVGDrawBoard points={points} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SecondScreen;
