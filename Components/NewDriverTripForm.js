import * as React from 'react';
import {View, Button, StyleSheet, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Input} from 'react-native-elements';
import {Formik} from 'formik';
import JwtDecode from 'jwt-decode';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
const axios = require('axios'); // A promise-based HTTP client

function NewDriverTripForm() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const userid = JwtDecode(token).id;

  let addTrip = async (values, {resetForm}) => {
    /**
     * Solve the padding 0 problem.
     * https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
     * */
    function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    }

    let date = values.departureTime;

    const axiosConfig = {
      method: 'post',
      baseURL: 'http://10.0.2.2:3000',
      url: '/api/trips/driver',
      data: {
        userid: userid,
        pickupLocation: values.pickupLocation,
        destination: values.destination,
        price: values.price,
        departureTime:
          date.getFullYear() +
          '-' +
          pad(date.getMonth() + 1, 2) +
          '-' +
          pad(date.getDate(), 2) +
          ' ' +
          pad(date.getHours(), 2) +
          ':' +
          pad(date.getMinutes(), 2) +
          ':' +
          pad(date.getSeconds(), 2),
      },
    };

    try {
      let response = await axios(axiosConfig);

      resetForm({
        destination: '',
        pickupLocation: '',
        price: '',
        departureTime: new Date(Date.now()),
      });

      Alert.alert('Insertion Succeeded', response.data.message, [
        {
          text: 'OK',
          onPress: () => {
            dispatch({
              type: 'SET_MODAL_VISIBLE',
              payload: 0,
            });
            dispatch({
              type: 'REFRESH',
            });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Insertion Failed', error.response.data.message);
      console.log(error.response.message);
    }
  };

  const validationSchema = Yup.object().shape({
    price: Yup.number()
      .min(0, 'Price must be non-negative')
      .required('Required'),
    destination: Yup.string().max(100, 'Too Long!').required('Required'),
    pickupLocation: Yup.string().max(100, 'Too Long!').required('Required'),
  });

  return (
    <View style={{flexDirection: 'row', paddingTop: 10}}>
      <Formik
        initialValues={{
          destination: '',
          pickupLocation: '',
          price: '',
          departureTime: new Date(Date.now()),
        }}
        validationSchema={validationSchema}
        onSubmit={addTrip}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.container}>
            <Input
              labelStyle={styles.labelStyle}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label={'Destination'}
              onChangeText={handleChange('destination')}
              onBlur={handleBlur('destination')}
              value={values.destination}
              placeholder={'Please enter the destination...'}
              errorMessage={errors.destination}
            />
            <Input
              labelStyle={styles.labelStyle}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label={'Pickup Location'}
              onChangeText={handleChange('pickupLocation')}
              onBlur={handleBlur('pickupLocation')}
              value={values.pickupLocation}
              placeholder={'Please enter the pickup location...'}
              errorMessage={errors.pickupLocation}
            />
            <Input
              labelStyle={styles.labelStyle}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              label={'Price'}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              placeholder={'Please enter the price...'}
              errorMessage={errors.price}
            />
            <Text style={styles.textLabelStyle}>Departure Time</Text>
            <DatePicker
              date={values.departureTime}
              onDateChange={(value) => (values.departureTime = value)}
              minimumDate={new Date(Date.now())}
            />
            <View style={styles.rowContainer}>
              <View style={styles.midContainer}>
                <Button
                  onPress={() =>
                    dispatch({
                      type: 'SET_MODAL_VISIBLE',
                      payload: 0,
                    })
                  }
                  title="Cancel"
                />
              </View>
              <View style={styles.midContainer}>
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'stretch',
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'NanumSquareB',
    fontSize: 15,
    paddingVertical: 0,
  },
  labelStyle: {
    padding: 3,
    fontSize: 15,
  },
  textLabelStyle: {
    paddingBottom: 10,
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold',
  },
  rowContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  midContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 25,
    paddingRight: 25,
  },
});

export default NewDriverTripForm;
