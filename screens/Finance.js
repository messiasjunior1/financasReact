import React, { useState, useEffect, useRef} from "react";
import firebase from '../src/firebaseConfig';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import FinanceItem from './FinanceItem'
import Icon from "react-native-vector-icons/Feather";

export default function Finance({ data, deleteItem, editItem }) {
  async function addBalance() {
    if (newBalance !== "") {
      let balances = await firebase.database().ref("balances");
      let key = balances.push().key;
      balances.child(key).set({
        desc: newBalance,
      });

      setNewBalance('');
      Keyboard.Dismiss();
    }
  }
  const inputRef = useRef(null);

  const [newBalance, setNewBalance] = useState('');
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    async function loadBalance() {
        setBalances([]);
        await firebase.database().ref('balances').on('value', (snapshot) => {
            snapshot.forEach((item) => {
                let balance = {
                    key: item.key,
                    desc: item.val().desc,
                    valor: item.val().valor
                };
                setBalances(oldArray => [...oldArray, balance]);
            })
        });
    }

    loadBalance();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.containerBalance}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma receita"
          onChangeText={(texto) => setNewBalance(texto)}
          value={newBalance}
          ref={inputRef}
        ></TextInput>
        <TouchableOpacity>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      data={balances}
      keyExtractor={item => item.key}
      renderItem={ ({ item }) => (
          <FinanceItem data={item}/>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  containerBalance: {
      flexDirection: 'row'
  },
  buttonAdd: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      backgroundColor: '#aaa',
      paddingLeft: 11,
      paddingRight: 11,
      amrginleft: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000'
  }
});
