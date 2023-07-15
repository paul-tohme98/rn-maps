// AppNavigator.js
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


function App(){
  return(
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'red', // Define the active icon color
            inactiveTintColor: 'blue', // Define the inactive icon color
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              // Customize the icon color based on whether it is focused (pressed) or not
              let iconColor = focused ? 'red' : 'blue';
              
              if (route.name === "Maps") {
                return <MaterialCommunityIcons name="google-maps" size={24} color={iconColor} />;
              }
              // Add more cases for other icons

              return null;
            },
          })}
        >
          <Tab.Screen 
            name="Maps" 
            component={FirstScreen} 
            options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
              ),
            }}  
          />
          <Tab.Screen 
            name="Target" 
            component={SecondScreen} 
            options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pushpin" size={24} color="blue" />
              ),
            }}  
            />
          <Tab.Screen 
            name="Edit" 
            component={ThirdScreen} 
            options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="cut" size={24} color="blue" />
              ),
            }}  
            />
      </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;