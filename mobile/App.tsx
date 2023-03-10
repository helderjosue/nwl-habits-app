import "./src/lib/dayjs";
import React from "react";
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/loading';
import { Home } from './src/screens/Home';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  //check if the fonts are loaded on the app 
  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }
  return (
    <>
      <Home />
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
    </>
  );
}
