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
        <Tab.Navigator>
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