import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function FinanceItem({ data, deleteItem }) {
  return (
    <View style={styles.container}>
      <View style={{ paddingRight: 15}}>
          <Text
            style={{ color: "#fff", paddingRight: 10, fontWeight: "bold" }}
          >R$ {data.desc}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => deleteItem(data.key)}
        >
          <Icon name="trash" color="#fff" size={25} />
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
        marginBottom: 15
    }
})
