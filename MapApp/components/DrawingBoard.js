import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { View, PanResponder, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";

const DrawingBoard = forwardRef((props, ref) => {
  const [currentPoints, setCurrentPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const path = useRef("");

  const { width, height } = Dimensions.get('window');
  const svgWidth = width;
  const svgHeight = height * 0.9; // Adjust height to 90% of screen height

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        path.current = "";
      },
      onPanResponderMove: (event, gestureState) => {
        const x = gestureState.moveX * (svgWidth / width); // Scale the X coordinate
        const y = gestureState.moveY * (svgHeight / height); // Scale the Y coordinate

        const newPoint = {
          x,
          y
        };
        setCurrentPoints([...currentPoints, newPoint]);
        if (path.current === "") {
          path.current = `M${x},${y}`;
        } else {
          path.current += `L${x},${y}`;
        }
      },
      onPanResponderRelease: () => {
        setCurrentPoints([]);
        setLines([...lines, path.current]);
        path.current = "";
      }
    })
  ).current;

  useEffect(() => {
    const points = extractPoints();
    if (points.length !== 0) {
      sendDataToParent(points);
    }
    // console.log("Points:", points);
  }, [lines]);

  const extractPoints = () => {
    return lines.map((line) => {
      const points = [];
      const regex = /([0-9.-]+),([0-9.-]+)/g;
      let match;
      while ((match = regex.exec(line))) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        points.push({ x, y });
      }
      return points;
    });
  };

  const sendDataToParent = (points) => {
    if (props.onData) {
      props.onData(points);
    }
  };

  // Expose the clearBoard function to the parent component
  useImperativeHandle(ref, () => ({
    clearBoard: () => {
      setCurrentPoints([]);
      setLines([]);
    }
  }));

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={styles.svg} width={svgWidth} height={svgHeight}>
        {lines.map((line, index) => (
          <Path key={index} d={line} stroke="black" strokeWidth="4" fill="green" />
        ))}
        {currentPoints.length > 0 && (
          <Path d={path.current} stroke="red" strokeWidth="4" fill="green" />
        )}
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  svg: {
    backgroundColor: "lightgray",
    width: "100%",
    height: "100%"
  }
});

export default DrawingBoard;
