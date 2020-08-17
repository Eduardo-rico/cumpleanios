import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Logout = ({guardarToken}) => {
  const logout = async () => {
    try {
      const token = await AsyncStorage.setItem('@token_kumple', '');
      guardarToken('');
    } catch (error) {
      console.log(error);
      guardarToken('');
    }
  };
  return (
    <View>
      <Text>salir mai</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
