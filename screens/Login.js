import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import firebase from '../src/firebaseConfig';
import { useNavigation } from '@react-navigation/core';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [user, setUser] = useState('');
  const navigation = useNavigation();


  const pressHandler = () => {
      navigation.navigate('Registro');
  }


  async function saveUser(nomeUsuario){
    setUser(nomeUsuario);
    await AsyncStorage.setItem('nome', nomeUsuario);
  }

  async function saveUid(userId){
    setUid(userId);
    await AsyncStorage.setItem('uid', userId);
  }


  

  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value) => { 
      firebase.database().ref('usuarios').child(value.user.uid)
        .on('value', (snapshot) => {
          let nomeUsuario = snapshot.val().nome;
          let userId = value.user.uid;
          saveUid(userId);
          saveUser(nomeUsuario);
          navigation.navigate('Inicial');
        })      
      return;
    })
    .catch(() => {
          alert('Algo errado aconteceu!');
          return;
    })


    setEmail('');
    setPassword('');
  }


  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        autoCompleteType='email'
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setEmail(texto) }
        value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setPassword(texto) }
        value={password}
      />

      <TouchableOpacity
      style={styles.buttonStyle1}
                  onPress={logar}
      >
        <Text style={styles.textButton}>Logar</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.buttonStyle}
                        onPress={pressHandler}
      >
          <Text>
          Ainda não possui uma conta? Clique aqui!
          </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop: 30,
    flex:1,
    margin: 30,
    justifyContent: 'center'
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: "#8732a8",
    height: 40,
    fontSize: 17,
    borderRadius: 10,
  },
    buttonStyle: {
        paddingTop: 16,
        alignItems: 'center'
    },

    buttonStyle1: {
      backgroundColor: "#8732a8",
      alignItems: "center",
      padding: 15,
      borderRadius: 15,
      marginBottom: 15,
      height: 60,
      width: 325,
    },
    textButton: {
     color: '#fff',
     fontWeight: 'bold',
     fontSize: 20
    }
});