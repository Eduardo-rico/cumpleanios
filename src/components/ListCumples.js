import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import BarraDeAcciones from './BarraDeAcciones';
import CumpleForm from './CumpleForm';
import AsyncStorage from '@react-native-community/async-storage';
import URLHOST from '../../utils/constantes';
import moment from 'moment';
import axios from 'axios';
import ListWrapper from './ListWrapper';
import {set} from 'mongoose';

const ListCumples = ({guardarToken}) => {
  const [mostrarLista, guardarMostrarLista] = useState(true);
  const [cargando, guardarCargando] = useState(true);
  const [cumples, guardarCumples] = useState([]);

  useEffect(() => {
    const traerCumples = async () => {
      try {
        const token = await AsyncStorage.getItem('@token_kumple');
        const respuesta = await axios({
          url: `${URLHOST}/cumple`,
          method: 'get',
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        guardarCumples(respuesta.data);
        guardarCargando(false);
      } catch (error) {
        guardarCargando(true);
      }
    };
    traerCumples();
  }, [cargando, mostrarLista]);

  return (
    <View style={styles.container}>
      {mostrarLista ? (
        <>
          {cargando ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <ListWrapper cumples={cumples} guardarCargando={guardarCargando} />
          )}
        </>
      ) : (
        <CumpleForm
          guardarCargando={guardarCargando}
          cargando={cargando}
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
