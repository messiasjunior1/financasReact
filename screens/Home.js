import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/core';
import firebase from '../src/firebaseConfig';

export default function Home() {
  const [user, setUser] = useState("");
  const [uid, setUid] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadUid();
  }, []);

  async function loadUid() {
    await AsyncStorage.getItem("uid").then((value) => {
      setUid(value);
    });
  }
  async function loadUser() {
    await AsyncStorage.getItem("nome").then((value) => {
      setUser(value);
    });
  }

  async function sair() {
    await firebase.auth().signOut();
    AsyncStorage.clear();
    setUser('');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.buttonSair}
          onPress={() => {sair()}}
        >
          <Icon name="log-out" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 30}}>
        <Text style={styles.textUser}>
          Olá {user} !
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("Receitas");
          }}
        >
          <Text style={styles.textButton}>Acessar receitas</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("Despesas");
          }}
        >
          <Text style={styles.textButton}>Acessar despesas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textUser: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#8732a8",
  },
  buttonStyle: {
    backgroundColor: "#8732a8",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    height: 60,
    width: 350,
  },
  buttonSair: {
    backgroundColor: "#8732a8",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    height: 60,
    width: 60,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
});
