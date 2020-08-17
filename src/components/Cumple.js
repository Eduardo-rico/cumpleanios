import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import URLHOST from '../../utils/constantes';

const Cumple = ({cumple, guardarCargando}) => {
  const {nombre, apellido, edad, diasAlCumple, fechaCumple} = cumple;
  const diaBonito = moment(fechaCumple).format('DDMM').slice(0, 2);
  const mesBonito = moment(fechaCumple).format('DDMM').slice(2);

  const MasInfo = () => {
    return (
      <>
        <Text style={styles.masinfo}>Tiene {edad} años</Text>
        <Text style={styles.masinfo}>
          Cumpleaños: {`El día ${diaBonito} del mes ${mesBonito}`}
        </Text>
        <Text style={styles.masinfo}>
          Dias para su cumpleños: {diasAlCumple + 1} días!
        </Text>
      </>
    );
  };

  const desactivarCumple = async (obj) => {
    const token = await AsyncStorage.getItem('@token_kumple');
    const eliminar = async () => {
      return new Promise((resolve) => {
        Alert.alert(
          'Eliminar cumpleaños',
          `Estás seguro de eliminar el cumpleaños de ${obj.nombre} ${obj.apellido}`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              onPress: () => {
                guardarCargando(true);
                const res = axios({
                  url: `${URLHOST}/cumple/eliminar/${obj._id}`,
                  method: 'put',
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                });
                if (res.status != 200) {
                  return new Error('Error al eliminar');
                }
                guardarCargando(false);
                // console.log(respuesta.status);
                resolve('Eliminar');
              },
            },
          ],
          {cancelable: false},
        );
      });
    };
    await eliminar();
  };

  return (
    <TouchableOpacity
      onPress={() => desactivarCumple(cumple)}
      style={[
        styles.card,
        diasAlCumple >= 150
          ? styles.pasado
          : diasAlCumple === 0
          ? styles.actual
          : styles.proximo,
      ]}>
      <View style={styles.container}>
        <Text style={styles.userName}>
          {nombre} {apellido}
        </Text>
        <MasInfo />
      </View>
    </TouchableOpacity>
  );
};

export default Cumple;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-between',

    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  pasado: {
    backgroundColor: '#820000',
  },
  proximo: {
    backgroundColor: '#1be1f5',
  },
  actual: {
    backgroundColor: '#559204',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',

    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    paddingVertical: 5,
    paddingBottom: 7,
  },
  masinfo: {
    padding: 5,
  },
});
