import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

//Screens
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Loading from "../screens/utils/Loading";
import addContact from "../screens/addContact";
import addEvent from "../screens/addEvent";
import Contacts from "../screens/Contacts";
import editProfile from "../screens/editProfile";
import eventCard from "../screens/eventCard";
import Events from "../screens/Events";
import initialContactCreate from "../screens/initialContactCreate";
import initialProfileEdit from "../screens/initialProfileEdit";
import TermsAndConditions from "../screens/TermsAndConditions";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";

const firebaseConfig = {
  apiKey: "AIzaSyCP7zyTpXCD0HHdsqAuVCnQABEfEIVt0vk",
  authDomain: "new-react-example.firebaseapp.com",
  projectId: "new-react-example",
  storageBucket: "new-react-example.appspot.com",
  messagingSenderId: "928463695266",
  appId: "1:928463695266:web:f8c3df457bd98995d756fb"
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* where the screens go */}
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="addContact" component={addContact} />
      <MainStack.Screen name="addEvent" component={addEvent} />
      <MainStack.Screen name="Contacts" component={Contacts} />
      <MainStack.Screen name="editProfile" component={editProfile} />
      <MainStack.Screen name="eventCard" component={eventCard} />
      <MainStack.Screen name="Events" component={Events} />
      <MainStack.Screen name="initialContactCreate" component={initialContactCreate} />
      <MainStack.Screen name="initialProfileEdit" component={initialProfileEdit} />
      <MainStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          borderTopColor: "#c0c0c0",
          backgroundColor: "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Contacts" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Events" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="About" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
