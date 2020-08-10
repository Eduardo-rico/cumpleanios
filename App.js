import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import axios from 'axios';
import URLHOST from './utils/constantes';

const obtenerAcceso = async () => {
  try {
    const respuesta = await axios({
      url: `URLHOST/${login}`,
    });
    console.log(respuesta);
  } catch (error) {}
};

const App = () => {
  useEffect(() => {
    obtenerAcceso();
  }, []);

  return (
    <SafeAreaView>
      {' '}
      {/* Un view pero dentro de lo que el dispositivo sí muestra */}
      <Text>Eduardo</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
