import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import axios from 'axios';
import { SERVER_ADDR } from '../server_path';

function DrawnShape() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Fetch points from MongoDB using Axios or your preferred HTTP library
    axios.get(`http://${SERVER_ADDR}`)
      .then(response => {
        const fetchedPoints = response.data.points;
        setPoints(fetchedPoints);
      })
      .catch(error => {
        console.error('Error fetching points from MongoDB:', error);
      });
  }, []);

  const renderShape = () => {
    // Render the shape using the fetched points
    if (points.length > 0) {
      const pathData = points.map(point => `L${point.x},${point.y}`).join(' ');
      const shapePath = `M${points[0].x},${points[0].y} ${pathData}`;

      return <Path d={shapePath} stroke="black" strokeWidth={2} fill="none" />;
    }

    return null;
  };

  return (
    <View>
      <Svg>
        {renderShape()}
      </Svg>
    </View>
  );
}

export default DrawnShape;
