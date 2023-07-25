// SVGDrawBoard.js
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { Svg, Path, G, Circle, Text } from "react-native-svg";

const SVGDrawBoard = ({ points }) => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const panResponderRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setStartPoint(null);
        setEndPoint(null);
      },
      onPanResponderMove: (event, gestureState) => {
        const { moveX, moveY } = gestureState;
        if (!startPoint) {
          setStartPoint({ x: moveX, y: moveY });
        } else {
          setEndPoint({ x: moveX, y: moveY });
        }
      },
      onPanResponderRelease: () => {
        // Action to perform when the drag & drop ends
        console.log("Start point:", startPoint);
        console.log("End point:", endPoint);
      },
    })
  ).current;

  const { width, height } = Dimensions.get("window");
  const svgWidth = width;
  const svgHeight = height;

  // Convert the points array into an SVG path string
  const pathData = points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      // Scale the X and Y coordinates to match the SVG dimensions
      const scaledX = (point.x / width) * svgWidth;
      const scaledY = (point.y / height) * svgHeight;
      return `${command}${scaledX} ${scaledY}`;
    })
    .join(" ");

  return (
    <View style={styles.container} {...panResponderRef.panHandlers}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <Path d={pathData} fill="green" stroke="black" strokeWidth="2" />
        <G>
          {startPoint && endPoint && (
            <>
              {/* Draw a line between start and end points */}
              <Path
                d={`M${startPoint.x} ${startPoint.y} L${endPoint.x} ${endPoint.y}`}
                stroke="red"
                strokeWidth="4"
              />
              {/* Show coordinates of start and end points */}
              <Text x={startPoint.x} y={startPoint.y} fill="blue">
                Start: {startPoint.x}, {startPoint.y}
              </Text>
              <Text x={endPoint.x} y={endPoint.y} fill="blue">
                End: {endPoint.x}, {endPoint.y}
              </Text>
            </>
          )}
          <Circle
            cx={startPoint?.x || 50}
            cy={startPoint?.y || 50}
            r={10}
            fill="red"
            {...panResponderRef.panHandlers}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch", // Expand to fill available space
  },
});

export default SVGDrawBoard;
