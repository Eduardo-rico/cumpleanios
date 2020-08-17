import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BarraDeAcciones from './BarraDeAcciones';
import CumpleForm from './CumpleForm';

const ListCumples = ({guardarToken}) => {
  const [mostrarLista, guardarMostrarLista] = useState(true);
  return (
    <View style={styles.container}>
      {mostrarLista ? (
        <>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
          <Text>LA lista pue</Text>
        </>
      ) : (
        <CumpleForm
          mostrarLista={mostrarLista}
          guardarMostrarLista={guardarMostrarLista}
        />
      )}

      <BarraDeAcciones
        guardarToken={guardarToken}
        guardarMostrarLista={guardarMostrarLista}
        mostrarLista={mostrarLista}
      />
    </View>
  );
};

export default ListCumples;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
});
