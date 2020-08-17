import React from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import Cumple from './Cumple';

const ListWrapper = ({cumples, guardarCargando}) => {
  return (
    <>
      <ScrollView style={styles.scrollView}>
        {cumples.map((item) => (
          <Cumple
            cumple={item}
            key={item._id}
            guardarCargando={guardarCargando}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default ListWrapper;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 80,
    width: '100%',
  },
});
