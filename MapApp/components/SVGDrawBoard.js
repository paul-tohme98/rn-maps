import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

const SVGDrawBoard = ({ points }) => {
  // Convert the points array into an SVG path string
  const pathData = points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command}${point.x} ${point.y}`;
    })
    .join(' ');

  useEffect(() => {
    console.log("From SVGDrawingBoard : ", points);
    console.log("Path Data : ", pathData);
  })

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 400 400">
        <Path d={pathData} fill="green" stroke="black" strokeWidth="2" />
      </Svg>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch', // Expand to fill available space
  },
});

export default SVGDrawBoard;
