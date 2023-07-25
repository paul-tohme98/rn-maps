// SVGDrawBoard.js
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { Svg, Path, G, Circle, Text } from "react-native-svg";

const SVGDrawBoard = ({ points }) => {
  const [startPoint, setStartPoint] = useState({ x: points[0]?.x, y: points[0]?.y });
  const [endPoint, setEndPoint] = useState(null);
  const [circlePosition, setCirclePosition] = useState({ x: points[0]?.x, y: points[0]?.y });

  useEffect(() => {
    console.log("Start point:", startPoint);
    console.log("End point:", endPoint);
  }, [startPoint, endPoint, circlePosition]);

  const panResponderRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => {
      // Check if the touch is within the circle
      const { moveX, moveY } = gestureState;
      const distanceFromCircleCenter = Math.sqrt(
        Math.pow(moveX - circlePosition.x, 2) +
        Math.pow(moveY - circlePosition.y, 2)
      );
      return distanceFromCircleCenter <= 10; // Adjust the value as needed to match the circle's radius
    },
    onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        const { moveX, moveY } = gestureState;
        const x = moveX * (svgWidth / width); // Scale the X coordinate
        const y = moveY * (svgHeight / height); // Scale the Y coordinate
        setStartPoint({ x: x, y: y });
        setCirclePosition({ x: x, y: y }); // Set the initial position of the circle
        setEndPoint(null); // Reset the end point when a new touch starts
      },
      onPanResponderMove: (event, gestureState) => {
        const { moveX, moveY } = gestureState;
        const x = moveX * (svgWidth / width); // Scale the X coordinate
        const y = moveY * (svgHeight / height); // Scale the Y coordinate
        setCirclePosition({ x: x, y: y }); // Update the position of the circle as you move your finger
        setEndPoint({ x: x, y: y }); // Set the end point continuously as you move your finger
      },
      onPanResponderRelease: () => {
        // Action to perform when the drag & drop ends
        // console.log("Start point:", startPoint);
        // console.log("End point:", endPoint);
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
              <Text x={startPoint.x} y={startPoint.y} fill="white">
                Start (x: {startPoint.x.toFixed(2)}, y: {startPoint.y.toFixed(2)})
              </Text>
              <Text x={endPoint.x} y={endPoint.y} fill="white">
                End (x: {endPoint.x.toFixed(2)}, y: {endPoint.y.toFixed(2)})
              </Text>
            </>
          )}
          <Circle
            cx={circlePosition.x}
            cy={circlePosition.y}
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
    backgroundColor: "gray",
    alignSelf: "stretch", // Expand to fill available space
  },
});

export default SVGDrawBoard;