import React, { useState, useEffect, useRef } from "react";
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
import ExpenseItem from "./ExpenseItem";

export default function Expense() {
    const [uid, setUid] = useState('');

    async function loadUid() {
        await AsyncStorage.getItem("uid").then((value) => {
          setUid(value);
        });
      }
    useEffect(() => {
        loadUid();
      }, []);

  async function addExpense() {
    if (newExpense !== "") {
      let expenses = await firebase.database().ref("expenses");

      if (key !== "") {
        expenses.child(key).update({
          desc: newExpense,
          valor: newValue,
        });
        setKey = "";
      } else {
        let key = expenses.push().key;
        expenses.child(key).set({
          desc: newExpense,
          valor: newValue,
        });
        setNewExpense("");
        setNewValue("");
        Keyboard.dismiss();
      }
    }
  }

  async function deleteExpense(key) {
    await firebase.database().ref("expenses").child(key).remove();
  }

  const inputRef = useRef(null);

  const [newExpense, setNewExpense] = useState("");
  const [newValue, setNewValue] = useState("");
  const [expenses, setexpenses] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    async function loadExpense() {
      await firebase
        .database()
        .ref("expenses")
        .on("value", (snapshot) => {
          setexpenses([]);
          snapshot.forEach((item) => {
            let Expense = {
              key: item.key,
              desc: item.val().desc,
              valor: item.val().valor,
            };
            setexpenses((oldArray) => [...oldArray, Expense]);
          });
        });
    }

    loadExpense();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerExpense}>
        <TextInput
          style={styles.input1}
          placeholder="Digite a descrição"
          onChangeText={(texto) => setNewExpense(texto)}
          value={newExpense}
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
        <TouchableOpacity style={styles.buttonAdd} onPress={addExpense}>
          <Text style={styles.textButton}>Adicionar despesa</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ExpenseItem data={item} deleteItem={deleteExpense} />
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
  containerExpense: {
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
    marginBottom: 15
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
    marginRight: 5
  },
  textButton: {
    color: '#000',
    fontWeight: 'bold'
  }
});
