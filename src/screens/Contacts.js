import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Card,
  ScrollView,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";

const url = "http://9356-2600-6c63-647f-979d-518-2a01-e11f-514a.ngrok.io";

export default function Contacts() {
  const [contactInfo, setContactInfo] = useState({
    col: [
      {
        _id: "Id",
        full_name: "Name",
        phone: "Phone",
        email: "Email",
      },
    ],
    info: [],
  });

  useEffect(() => {
    axios
      .get(
        "http://bc12-2600-6c63-647f-979d-8dea-21b0-6f9f-42f.ngrok.io/contacts"
      )
      .then((response) => {
        setContactInfo((table) => {
          const contactsCall = { ...table };
          response.data.map((d) => {
            contactsCall.info = [...contactsCall.info, d];
          });
          return contactsCall;
        });
      });
  }, []);

  const contacts = contactInfo.info;

  const navigation = useNavigation();

  const sortedList = contacts.sort((a, b) =>
    b.full_name.localeCompare(a.full_name)
  );

  /*useEffect(() => {
    const getContacts = () => {
      const data = axios.get(
        "http://eb54-2600-6c63-647f-979d-8c69-3391-84b3-f619.ngrok.io/contacts"
      );
      setFetchedData(data);
    };
    getContacts();
  }, []);
  console.log("data: ", fetchedData);*/

  /*useEffect(() => {
    axios
      .post(
        "http://fffe-2600-6c63-647f-979d-19f0-8c46-b5a-e0f9.ngrok.io/contacts/add",
        {
          full_name: "tyler",
          phone: "985-254-2454",
          email: "tyrr@mail.com",
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  });*/

  //  {fetchedData.data ? <Text>{fetchedData.data.full_name}</Text> : null}
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Contacts</Text>

        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate("addContact")}
        >
          <Text>
            {" "}
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={"#7FAF66"}
              size={30}
            />{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <ScrollView>
        <View style={{ flexDirection: "column-reverse", textAlign: "left" }}>
          {contacts.map((x) => (
            <TouchableOpacity
              style={styles.names}
              key={x._id}
              onPress={() =>
                navigation.navigate("editContact", {
                  FullName: x.full_name,
                  Phone: x.phone,
                  Email: x.email,
                  ID: x._id,
                })
              }
            >
              <Text
                style={{
                  color: "blue",
                  fontSize: 25,
                  color: "#7FAF66",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                <Text>
                  {" "}
                  <MaterialCommunityIcons
                    name="human-greeting"
                    color={"#9a9fa1"}
                    size={20}
                  />{" "}
                </Text>
                {x.full_name}
              </Text>
            </TouchableOpacity>
          ))}
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
  contacts: {
    flex: 1,
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
  names: {
    paddingLeft: 10,
    backgroundColor: "white",
    width: 300,
    height: 45,
    margin: 10,
    paddingTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  noConts: {
    color: "#C1BEBE",
    margin: 110,
  },
});