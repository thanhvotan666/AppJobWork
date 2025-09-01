import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function Uploading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tính năng này chưa sẵn sàng sử dụng.</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>KÍCH HOẠT</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
   button: {
    backgroundColor: 'gray',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center', 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});