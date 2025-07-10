// App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen'
import { RootStackParamList } from './src/types/navigation' // ✅ Correct import

const Stack = createNativeStackNavigator<RootStackParamList>() // ✅ Use generic for type safety

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Projects" component={HomeScreen} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
