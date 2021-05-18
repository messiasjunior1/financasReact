import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ExpenseItem({ data, deleteItem }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row'}}>
          <Text
            style={{ color: "#fff", fontWeight: "bold" }}
          >{data.desc}</Text>
      </View>
      <View>
      <Text
            style={{ color: "#fff", fontWeight: "bold", paddingRight: 10 }}
          >R$ {data.valor}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => deleteItem(data.key)}
        >
          <Icon name="trash-2" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#8732a8',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        justifyContent: 'space-between',
        height: 60,
        width: 350
        
    }
})