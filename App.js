import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Button,
  View,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import URLHOST from './utils/constantes';
import Auth from './src/components/Auth';
import Logout from './src/components/Logout';
import ListCumples from './src/components/ListCumples';

const App = () => {
  const [usuario, guardarUsuario] = useState({});
  const [token, guardarToken] = useState('');
  const [localtoken, guardarLocalToken] = useState('');

  useEffect(() => {
    const obtenerAcceso = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('@token_user');
        const usr = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
        const tokn = await AsyncStorage.getItem('@token_kumple');
        guardarLocalToken(tokn);
        // console.log(tokn);
        // console.log(usr);
        // console.log(usuario);
        guardarUsuario(usr);
        if (usuario === {}) {
          if (!localtoken) {
            const login = await axios({
              url: `${URLHOST}/login`,
              method: 'post',
              data: {
                email: usr.email,
                password: usr.password,
              },
            });
            if (!login.data.token) {
              throw new Error('No se encontró el usuario');
            }
            guardarToken(login.data.token);
            await AsyncStorage.setItem('@token_kumple', login.data.token);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAcceso();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {token ? (
          <ListCumples guardarToken={guardarToken} />
        ) : (
          <Auth guardarToken={guardarToken} />
        )}
      </SafeAreaView>
    </>
  );
};

{
  /* <Logout guardarToken={guardarToken} /> */
}
export default App;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
