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
import FinanceItem from "./FinanceItem";

export default function Finance() {
  async function addBalance() {
    if (newBalance !== "") {
      let balances = await firebase.database().ref("balances");

      if (key !== "") {
        balances.child(key).update({
          desc: newBalance,
        });
        setKey = "";
      } else {
        let key = balances.push().key;
        balances.child(key).set({
          desc: newBalance,
        });
        setNewBalance("");
        Keyboard.dismiss();
      }
    }
  }

  async function deleteFinance(key) {
    await firebase.database().ref("balances").child(key).remove();
  }

  /* function editBalance(item) {
    setBalances(item.desc);
    setKey(item.key);
    inputRef.current.focus();
  }  */

  const inputRef = useRef(null);

  const [newBalance, setNewBalance] = useState("");
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
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite uma receita"
          onChangeText={(texto) => setNewBalance(texto)}
          value={newBalance}
          ref={inputRef}
        ></TextInput>
        <TouchableOpacity style={styles.buttonAdd} onPress={addBalance}>
          <Text>+</Text>
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
    backgroundColor: "#fff",
    paddingLeft: 11,
    paddingRight: 11,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8732a8",
  },
  input: {
    flex: 1,
    marginBottom: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: "#8732a8",
    height: 40,
    fontSize: 17,
    borderRadius: 10,
  },
});
