import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FinanceItem({ data }) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => deleteItem(data.key)}
        >
          <Icon name="trash" color="#000" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingRight: 15 }}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text
            style={{ color: "#000", paddingRight: 10, fontWeight: "bold" }}
          >{data.desc}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: '10',
        padding: 15,
        borderRadius: 10,
    }
})
