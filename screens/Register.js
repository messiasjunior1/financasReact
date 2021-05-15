import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import firebase from '../src/firebaseConfig';

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    loadUser();
  }, []);

  

  async function saveUser(nomeUsuario){
    setUser(nomeUsuario);
    await AsyncStorage.setItem('nome', nomeUsuario);
  }

  async function loadUser(){
    await AsyncStorage.getItem('nome')
    .then((value) => {
      setUser(value);
    });
  }

  async function cadastrar(){

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value) => {
      firebase.database().ref('usuarios').child(value.user.uid).set({
        nome: name
      })
      alert('Usuário criado com sucesso!');
      saveUser(name);
      return;
    })
    .catch((error) => {
      alert('Algo errado aconteceu!');
      return;
    })

    setEmail('');
    setPassword('');
    setName('');
   }

  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value) => { 
      firebase.database().ref('usuarios').child(value.user.uid)
        .on('value', (snapshot) => {
          let nomeUsuario = snapshot.val().nome;
          saveUser(nomeUsuario);
        })      
      return;
    })
    .catch(() => {
          alert('Algo errado aconteceu!');
          return;
    })

    setEmail('');
    setPassword('');
    setName('')
  }

  async function sair(){
    await firebase.auth().signOut();
    AsyncStorage.clear();
    setUser('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={(nome) => setName(nome) }
        value={name}
      />

      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setEmail(texto) }
        value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setPassword(texto) }
        value={password}
      />
      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />
      <TouchableOpacity style={styles.buttonStyle}
      onPress={() => {
        navigation.navigate('Login')}}
      >
          <Text>
          Já possui uma conta? Clique aqui!
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
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    height: 45,
    fontSize: 17
  },
  buttonStyle: {
    paddingTop: 16,
    alignItems: 'center'
}
});