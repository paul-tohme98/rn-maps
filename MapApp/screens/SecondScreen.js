// Tab2Screen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SecondScreen(){
  const handleDrag = () => {
    // Logic to handle pin drag
  };

  return (
    <View style={styles.root}>
      {/* Map Component with draggable pin */}
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
