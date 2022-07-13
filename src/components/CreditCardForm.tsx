import {ErrorMessage, Formik, FormikErrors, FormikHelpers} from 'formik';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from '@react-native-material/core';
import {
  isCardNumberAmexInvalid,
  isCardNumberDiscoverInvalid,
  isCardNumberMasterInvalid,
  isCardNumberValid,
  isCardNumberVisaInvalid,
  isCvvValid,
  isExpirationDateFuture,
  isExpirationDateValid,
  isNameValid,
} from '../helpers/validators';
import {mask} from 'react-native-mask-text';

interface IFormValues {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  firstName: string;
  lastName: string;
}

const CreditCardForm = () => {
  const submit = (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    const errors: FormikErrors<IFormValues> = {};

    if (isCardNumberVisaInvalid(values.cardNumber)) {
      errors.cardNumber = 'Visa card number invalid';
    } else if (isCardNumberMasterInvalid(values.cardNumber)) {
      errors.cardNumber = 'Mastercard card number invalid';
    } else if (isCardNumberAmexInvalid(values.cardNumber)) {
      errors.cardNumber = 'American Express card number invalid';
    } else if (isCardNumberDiscoverInvalid(values.cardNumber)) {
      errors.cardNumber = 'Discover card number invalid';
    } else if (!isCardNumberValid(values.cardNumber)) {
      errors.cardNumber = 'Card number invalid';
    }

    if (!isExpirationDateValid(values.expirationDate)) {
      errors.expirationDate = 'Expiration date invalid';
    } else if (!isExpirationDateFuture(values.expirationDate)) {
      errors.expirationDate = 'Expiration date should be in the future';
    }

    if (!isCvvValid(values.cvv, values.cardNumber)) {
      errors.cvv = 'Security code invalid';
    }

    if (!isNameValid(values.firstName)) {
      errors.firstName = 'First name invalid';
    }

    if (!isNameValid(values.lastName)) {
      errors.lastName = 'Last name invalid';
    }

    actions.setErrors(errors);

    if (Object.values(errors).length === 0) {
      console.log(values);
      Alert.alert('Credit card fields are valid!');
    }
  };

  const initialValues: IFormValues = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
        <View style={styles.container}>
          <TextInput
            onChangeText={handleChange('cardNumber')}
            onBlur={handleBlur('cardNumber')}
            value={values.cardNumber}
            label="Card number"
            variant="outlined"
            inputContainerStyle={styles.input}
            keyboardType={'number-pad'}
            maxLength={16}
          />
          <Text style={styles.textError}>
            <ErrorMessage name="cardNumber" />
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputLine}>
              <TextInput
                onChangeText={text => {
                  const formattedDate = mask(text, '99/99');
                  setFieldValue('expirationDate', formattedDate);
                }}
                onBlur={handleBlur('expirationDate')}
                value={values.expirationDate}
                label="MM/YY"
                variant="outlined"
                inputContainerStyle={styles.input}
                keyboardType={'number-pad'}
                maxLength={5}
              />
              <Text style={styles.textError}>
                <ErrorMessage name="expirationDate" />
              </Text>
            </View>

            <View style={[styles.inputLine, styles.inputLineRight]}>
              <TextInput
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                value={values.cvv}
                label="Security code"
                variant="outlined"
                inputContainerStyle={styles.input}
                keyboardType={'number-pad'}
                maxLength={4}
              />
              <Text style={styles.textError}>
                <ErrorMessage name="cvv" />
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputLine}>
              <TextInput
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                label="First name"
                variant="outlined"
                inputContainerStyle={styles.input}
                keyboardType={'default'}
                maxLength={255}
              />
              <Text style={styles.textError}>
                <ErrorMessage name="firstName" />
              </Text>
            </View>

            <View style={[styles.inputLine, styles.inputLineRight]}>
              <TextInput
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                label="Last name"
                variant="outlined"
                inputContainerStyle={styles.input}
                keyboardType={'default'}
                maxLength={255}
              />
              <Text style={styles.textError}>
                <ErrorMessage name="lastName" />
              </Text>
            </View>
          </View>
          <Button style={styles.button} onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
  input: {
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  inputLine: {
    flex: 0.5,
    width: '100%',
  },
  inputLineRight: {
    marginLeft: 15,
  },
  textError: {
    color: 'red',
    fontSize: 12,
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
});

export default CreditCardForm;
