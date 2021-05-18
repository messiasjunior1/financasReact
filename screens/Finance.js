import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../src/firebaseConfig";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import FinanceItem from "./FinanceItem";

export default function Finance() {
  const [uid, setUid] = useState("");

  async function loadUid() {
    await AsyncStorage.getItem("uid").then((value) => {
      setUid(value);
    });
  }

  useEffect(() => {
    loadUid();
  }, []);

  async function addBalance() {
    if (newBalance !== "" || newValue !== "") {
      let balances = await firebase.database().ref('balances');
      let key = balances.push().key;
      balances.child(key).set({
        desc: newBalance,
        valor: newValue,
      });
      setNewBalance("");
      setNewValue("");
      Keyboard.dismiss();
    }
  }

  async function deleteFinance(key) {
    await firebase.database().ref('balances').child(key).remove();
  }

  const inputRef = useRef(null);

  const [newBalance, setNewBalance] = useState("");
  const [newValue, setNewValue] = useState("");
  const [balances, setBalances] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    async function loadBalance() {
      await firebase
        .database()
        .ref("balances")
        .on("value", (snapshot) => {
          setBalances([]);
          snapshot.forEach((item) => {
            let balance = {
              key: item.key,
              desc: item.val().desc,
              valor: item.val().valor,
            };
            setBalances((oldArray) => [...oldArray, balance]);
          });
        });
    }

    loadBalance();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerBalance}>
        <TextInput
          style={styles.input1}
          placeholder="Digite a descrição"
          onChangeText={(texto) => setNewBalance(texto)}
          value={newBalance}
          ref={inputRef}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite uma receita"
          onChangeText={(texto) => setNewValue(texto)}
          value={newValue}
          ref={inputRef}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonAdd} onPress={addBalance}>
          <Text style={styles.textButton}>Adicionar receita</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={balances}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <FinanceItem data={item} deleteItem={deleteFinance} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  containerBalance: {
    flexDirection: "row",
  },
  buttonAdd: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 355,
    backgroundColor: "#cb87e6",
    paddingLeft: 11,
    paddingRight: 11,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8732a8",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginBottom: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: "#8732a8",
    height: 40,
    fontSize: 17,
    borderRadius: 10,
  },
  input1: {
    flex: 1,
    marginBottom: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: "#8732a8",
    height: 40,
    fontSize: 17,
    borderRadius: 10,
    marginRight: 5,
  },
  textButton: {
    color: "#000",
    fontWeight: "bold",
  },
});
