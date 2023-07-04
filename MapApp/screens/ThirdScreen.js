// Tab3Screen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function ThirdScreen(){
  const clearZones = () => {
    // Logic to clear the zones
  };

  return (
    <View style={styles.root}>
      {/* Map Component with zone drawing */}
      <Button title="Clear Zones" onPress={clearZones} />
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

export default ThirdScreen;
