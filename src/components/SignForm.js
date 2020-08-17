import axios from 'axios';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {validateEmail} from '../../utils/validations';
import URLHOST from '../../utils/constantes';

/* <Button
        title="Iniciar Sesión"
        color="#fff"
        onPress={() => cambiarForm()}
      /> */

const SignForm = ({cambiarForm, guardarToken}) => {
  const [registro, guardarRegistro] = useState({
    email: '',
    password: '',
    repetirPassword: '',
  });

  const [errorForm, guardarError] = useState({});

  const obtenerAcceso = async () => {
    try {
      // console.log(registro.email, registro.password);
      const respuesta = await axios({
        url: `${URLHOST}/signup`,
        method: 'post',
        data: {
          email: registro.email,
          password: registro.password,
        },
      });
      console.log(respuesta.data.mensaje);
      if (respuesta.status != '201') {
        throw new Error(
          `'No se ha podido crear el usuario, ${respuesta.data.mensaje} ${respuesta.data}'`,
        );
      }
      const login = await axios({
        url: `${URLHOST}/login`,
        method: 'post',
        data: {
          email: registro.email,
          password: registro.password,
        },
      });
      await AsyncStorage.setItem('@token_kumple', login.data.token);
      await AsyncStorage.setItem(
        '@token_user',
        JSON.stringify({
          email: registro.email,
          password: registro.password,
        }),
      );
      guardarToken(login.data.token);
      // console.log(login.data.token);
      //prueba3@gmail.com
    } catch (error) {
      guardarError({
        email: true,
        password: true,
        repetirPassword: true,
        mensaje: `Usuario en uso ${error.toString()}`,
      });
      console.log(error.toString());
    }
  };

  const registrarse = () => {
    let errors = {};
    guardarError(errors);
    if (!registro.email || !registro.password || !registro.repetirPassword) {
      if (!registro.email) {
        errors.email = true;
        errors.mensaje = 'No hay email';
      }
      if (!registro.password) {
        errors.password = true;
        errors.mensaje = 'No hay password o es menor a 3 caracteres';
      }
      if (!registro.repetirPassword) {
        errors.repetirPassword = true;
        errors.mensaje = 'No has repetido el password';
      }
    } else if (!validateEmail(registro.email)) {
      errors.email = true;
      errors.mensaje = 'El password está mal escrito o es inválido';
    } else if (registro.password !== registro.repetirPassword) {
      (errors.password = true), (errors.repetirPassword = true);
      errors.mensaje = 'El password está mal escrito o es inválido';
    } else if (registro.password.length <= 3) {
      (errors.password = true), (errors.repetirPassword = true);
      errors.mensaje = 'Repite el password';
    } else {
      obtenerAcceso();
    }
    guardarError(errors);
    console.log(errors);
  };

  return (
    <>
      {errorForm.mensaje ? (
        <Text style={{color: '#fff', marginBottom: 10, fontSize: 16}}>
          {errorForm.mensaje}
        </Text>
      ) : null}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#969696"
        style={[styles.input, errorForm.email && styles.errorInput]}
        onChange={(e) => {
          guardarRegistro({...registro, email: e.nativeEvent.text});
        }}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        style={[styles.input, errorForm.password && styles.errorInput]}
        secureTextEntry={true}
        onChange={(e) => {
          guardarRegistro({...registro, password: e.nativeEvent.text});
        }}
      />
      <TextInput
        placeholder="Repetir contraseña"
        placeholderTextColor="#969696"
        style={[styles.input, errorForm.repetirPassword && styles.errorInput]}
        secureTextEntry={true}
        onChange={(e) => {
          guardarRegistro({...registro, repetirPassword: e.nativeEvent.text});
        }}
      />
      <TouchableOpacity onPress={registrarse}>
        <Text style={styles.textbtn}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.login}>
        <TouchableOpacity onPress={cambiarForm}>
          <Text style={styles.textbtn2}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignForm;

const styles = StyleSheet.create({
  textbtn: {
    color: '#fff',
    fontSize: 19,
  },
  textbtn2: {
    color: '#fff',
    fontSize: 15,
  },
  input: {
    height: 50,
    color: 'white',
    width: '80%',
    marginBottom: 15,
    backgroundColor: '#1e3040',
    paddingHorizontal: 25,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  errorInput: {
    borderColor: '#940c0c',
    borderWidth: 2.5,
  },
});
