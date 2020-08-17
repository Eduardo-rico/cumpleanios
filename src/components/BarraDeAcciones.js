import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const BarraDeAcciones = ({guardarToken, guardarMostrarLista, mostrarLista}) => {
  const logout = async () => {
    try {
      await AsyncStorage.setItem('@token_kumple', '');
      guardarToken('');
    } catch (error) {
      console.log(error);
      guardarToken('');
    }
  };

  return (
    <View style={styles.viewFooter}>
      <View style={styles.viewClose}>
        <Text style={styles.text} onPress={logout}>
          Cerrar Sesión
        </Text>
      </View>
      <View style={styles.viewApp}>
        <Text
          style={styles.text}
          onPress={() => guardarMostrarLista(!mostrarLista)}>
          {mostrarLista ? 'Nueva Fecha' : 'Cancelar'}
        </Text>
      </View>
    </View>
  );
};

export default BarraDeAcciones;

const styles = StyleSheet.create({
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  viewClose: {
    backgroundColor: '#820000',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  viewApp: {
    backgroundColor: '#1ea1f2',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
