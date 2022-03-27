import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Card,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";

export default function Home() {
  const [eventInfo, setEventInfo] = useState({
    col: [
      {
        _id: "Id",
        name: "Name",
        location: "Location",
        contacts: "Contacts",
        sms: "SMS",
        email: "Email",
      },
    ],
    info: [],
  });

  const auth = getAuth();

  const events = eventInfo.info;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header>Welcome Back "User Name"</Header>
      <Text
        style={{
          color: "blue",
          fontSize: 15,
          color: "#9a9fa1",
          fontWeight: "bold",
          textDecorationLine: "underline",
        }}
      >
        Your Current Events:
      </Text>
      <ScrollView>
        <View>
          {events.map((x) => (
            <TouchableOpacity
              style={styles.cards}
              key={x._id}
              onPress={() =>
                navigation.navigate("editEvent", {
                  Name: x.name,
                  Location: x.location,
                  ID: x._id,
                  Contacts: x.contacts,
                  SMS: x.sms,
                  Email: x.email,
                })
              }
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#7FAF66",
                  fontWeight: "bold",
                }}
              >
                {x.name}
                {"\n"}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#7FAF66",
                }}
              >
                Location: {x.location}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#7FAF66",
                }}
              >
                Date:
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("addEvent")}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {" "}
              <MaterialCommunityIcons
                name="plus-circle-outline"
                color={"#ffd508"}
                size={50}
              />{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
            </Text>
            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",

    backgroundColor: "#efefef",
    padding: 10,
  },
  top: {
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    margin: 5,
  },
  add: {
    margin: 5,
    padding: 7,
  },
  noConts: {
    color: "#C1BEBE",
    margin: 20,
  },
  cards: {
    width: 220,
    height: 280,
    borderRadius: 20,
    backgroundColor: "white",

    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
});
