import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {validateEmail} from '../../utils/validations';
import URLHOST from '../../utils/constantes';
import axios from 'axios';

const LoginForm = ({cambiarForm, guardarToken, guardarLogeado, logeado}) => {
  const [usuario, guardarUsuario] = useState({
    email: '',
    password: '',
  });

  const [errorForm, guardarError] = useState({});

  const guardarEnDispositivo = async (respuesta) => {
    await AsyncStorage.setItem('@token_kumple', respuesta.data.token);
    await AsyncStorage.setItem(
      '@token_user',
      JSON.stringify({
        email: usuario.email,
        password: usuario.password,
      }),
    );
  };

  const obtenerAcceso = async () => {
    try {
      const respuesta = await axios({
        url: `${URLHOST}/login`,
        method: 'post',
        data: {
          email: usuario.email,
          password: usuario.password,
        },
      });
      if (!respuesta.data.token) {
        throw new Error('No se encontró el usuario');
      }
      guardarEnDispositivo(respuesta);
      guardarToken(respuesta.data.token);
    } catch (error) {
      guardarError({
        email: true,
        password: true,
      });
      console.log(error);
      guardarLogeado(!logeado);
    }
  };

  // useLayoutEffect(() => {
  //   const iniciarSesionConStorage = async () => {
  //     try {
  //       const usuarioStorage = await AsyncStorage.getItem('@token_user');
  //       if (usuarioStorage) {
  //         const usuariotemp = await JSON.parse(usuarioStorage);
  //         guardarUsuario({
  //           email: usuariotemp.email,
  //           password: usuariotemp.password,
  //         });

  //         obtenerAcceso();
  //       }
  //     } catch (error) {
  //       guardarError({
  //         email: true,
  //         password: true,
  //       });
  //       console.log(error);
  //     }
  //   };
  //   iniciarSesionConStorage();
  // }, []);

  const iniciarSesion = () => {
    let errors = {};
    if (!usuario.email || !usuario.password) {
      if (!usuario.email) {
        errors.email = true;
      }
      if (!usuario.password) {
        errors.password = true;
      }
    } else if (!validateEmail(usuario.email)) {
      errors.email = true;
    } else {
      obtenerAcceso();
    }
    guardarError(errors);
  };

  return (
    <>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#969696"
        style={[styles.input, errorForm.email && styles.errorInput]}
        onChange={(e) => {
          guardarUsuario({...usuario, email: e.nativeEvent.text});
        }}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        style={[styles.input, errorForm.password && styles.errorInput]}
        secureTextEntry={true}
        onChange={(e) => {
          guardarUsuario({...usuario, password: e.nativeEvent.text});
        }}
      />

      <TouchableOpacity onPress={iniciarSesion}>
        <Text style={styles.textbtn}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <TouchableOpacity onPress={cambiarForm}>
          <Text style={styles.textbtn2}>Regístrate!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginForm;

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
