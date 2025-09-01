
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Loading } from '../../components/loading';
import { ProfileScreenMethod } from '../Logins/method';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState<'index'|'method'>('method');

  if (loading) {
    return <Loading/>
  }

  if (screen === 'method') {
    return (<ProfileScreenMethod/>)
  }

  if (screen === 'index') {
    return (<></>)
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  benefits: {
    marginBottom: 24,
  },
  benefit: {
    fontSize: 16,
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});