import { StyleSheet, Text, View } from "react-native"
import Icon from '@react-native-vector-icons/ionicons';

export const Loading = () => {
    return <View style={styles.loading}><Text>loading...</Text> </View>
}

const styles = StyleSheet.create({
      loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
  },}
);