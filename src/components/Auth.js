import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LoginForm from './LoginForm';
import SignForm from './SignForm';

const Auth = ({guardarToken}) => {
  const [logeado, guardarLogeado] = useState(true);

  const cambiarForm = () => {
    guardarLogeado(!logeado);
  };

  return (
    <View style={styles.view}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {logeado ? (
        <LoginForm
          cambiarForm={cambiarForm}
          guardarToken={guardarToken}
          guardarLogeado={guardarLogeado}
          logeado={logeado}
        />
      ) : (
        <SignForm
          cambiarForm={cambiarForm}
          guardarLogeado={guardarLogeado}
          logeado={logeado}
          guardarToken={guardarToken}
        />
      )}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 220,
    marginTop: 50,
    marginBottom: 50,
  },
});
