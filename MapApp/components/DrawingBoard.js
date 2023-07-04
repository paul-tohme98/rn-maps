import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

const DrawingBoard = forwardRef((props, ref) => {
  const [currentPoints, setCurrentPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const path = useRef(null);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        path.current = "";
      },
      onPanResponderMove: (event, gestureState) => {
        const newPoint = {
          x: gestureState.moveX,
          y: gestureState.moveY
        };
        setCurrentPoints([...currentPoints, newPoint]);
        if (path.current === "") {
          path.current = `M${newPoint.x},${newPoint.y}`;
        } else {
          path.current += `L${newPoint.x},${newPoint.y}`;
        }
      },
      onPanResponderRelease: () => {
        setLines(lines => [...lines, path.current]);
        setCurrentPoints([]);
      }
    })
  ).current;

  // Expose the clearBoard function to the parent component
  useImperativeHandle(ref, () => ({
    clearBoard: () => {
      setCurrentPoints([]);
      setLines([]);
    }
  }));

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={styles.svg}>
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
