import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import URLHOST from '../../utils/constantes';

const CumpleForm = ({
  mostrarLista,
  guardarMostrarLista,
  guardarCargando,
  cargando,
}) => {
  const [datePickerVisible, guardarDatePickerVisible] = useState(false);
  const [cumple, guardarCumple] = useState({});
  const [error, guardarError] = useState({});

  const esconderPicker = () => {
    guardarDatePickerVisible(false);
  };

  const confirmarFecha = (date) => {
    const fechaCumple = date;
    fechaCumple.setHours(0);
    fechaCumple.setMinutes(0);
    fechaCumple.setSeconds(0);

    guardarCumple({...cumple, fechaCumple});

    esconderPicker();
  };

  const mostrarPicker = () => {
    guardarDatePickerVisible(true);
  };

  const cambiando = (e, type) => {
    guardarCumple({...cumple, [type]: e.nativeEvent.text});
  };

  const guardar = () => {
    let errors = {};
    if (!cumple.nombre || !cumple.apellido || !cumple.fechaCumple) {
      if (!cumple.nombre) errors.nombre = true;
      if (!cumple.apellido) errors.apellido = true;
      if (!cumple.fechaCumple) errors.fechaCumple = true;
    } else {
      crearCumple();
      guardarMostrarLista(!mostrarLista);
    }
    guardarError(errors);
  };

  const crearCumple = async () => {
    try {
      const token = await AsyncStorage.getItem('@token_kumple');
      guardarCargando(!cargando);
      const res = await axios({
        url: `${URLHOST}/cumple/crear`,
        method: 'post',
        data: cumple,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      guardarCargando(!cargando);
      if (res.status != 201) {
        return new Error('Error al crear el cumple');
      }
      // console.log(respuesta.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#969696"
          style={[styles.input, error.nombre && {borderColor: '#940c0c'}]}
          onChange={(e) => cambiando(e, 'nombre')}
        />
        <TextInput
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          style={[styles.input, error.apellido && {borderColor: '#940c0c'}]}
          onChange={(e) => cambiando(e, 'apellido')}
        />

        <View
          style={[
            styles.input,
            styles.picker,
            error.fechaCumple && {borderColor: '#940c0c'},
          ]}>
          <Text
            onPress={mostrarPicker}
            style={{
              color: cumple.fechaCumple ? '#fff' : '#969696',
              fontSize: 18,
            }}>
            {cumple.fechaCumple
              ? moment(cumple.fechaCumple).format('L')
              : 'Fecha de nacimiento'}
          </Text>
        </View>
        <TouchableOpacity onPress={guardar}>
          <Text style={styles.boton}>Guardar Cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        onConfirm={confirmarFecha}
        mode="date"
        onCancel={esconderPicker}
      />
    </>
  );
};

export default CumpleForm;

const styles = StyleSheet.create({
  picker: {
    justifyContent: 'center',
  },
  boton: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 50,
    color: 'white',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
