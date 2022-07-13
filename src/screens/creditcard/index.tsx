import {Text} from '@react-native-material/core';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import CreditCardForm from '../../components/CreditCardForm';

const CreditCardScreen = () => {
  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.scrollviewContainer}
      contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.title}>Credit Card Screen</Text>
      <CreditCardForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  scrollviewContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    padding: 10,
  },
});

export default CreditCardScreen;
