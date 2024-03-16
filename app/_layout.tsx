import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Gotham: require("../assets/fonts/Gotham-Font/GothamMedium.ttf"),
    GothamBold: require("../assets/fonts/Gotham-Font/GothamBold.ttf"),
    GothamLight: require("../assets/fonts/Gotham-Font/GothamLight.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const user = await AsyncStorage.getItem("user");
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Error while checking login status:", error);
      }
    }
    checkLoginStatus();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product" />
          <Stack.Screen name="[single]" />
        </>
      ) : (
        <Stack.Screen name="login" />
      )}
    </Stack>
  );
}
