import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import {PasswordSchema} from './validators/passwordSchema';

const App = () => {
  const [password, setPassword] = useState('');
  const [isGeneratedPassword, setIsGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number): void => {
    let charList = '';
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChar = 'abcdefghijklmnopqurstuvwxyz';
    const numberChar = '0123456789';
    const symbolChar = "!@#$%^&*()_+=-':><?/.,";

    if (uppercase) charList += upperCaseChar;
    if (lowercase) charList += lowerCaseChar;
    if (numbers) charList += numberChar;
    if (symbols) charList += symbolChar;

    if (!charList) return;
    const result = createPassword(charList, passwordLength);

    setPassword(result);
    setIsGenerated(true);
  };

  const createPassword = (
    characterList: string,
    passwordLength: number,
  ): string => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characterList.length);
      result += characterList.charAt(charIndex);
    }
    return result;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <Text style={styles.heading}>Password Generator</Text>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            generatePasswordString(+values.passwordLength);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <View>
              <View style={[styles.flex, {marginBottom: 25}]}>
                <View>
                  <Text style={[styles.text]}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength ? (
                    <Text style={styles.textError}>
                      {errors.passwordLength}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  style={[styles.inputBox]}
                  keyboardType="numeric"
                  placeholder="8"
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.text]}>Include Lowercase Letters</Text>
                <BouncyCheckbox
                  isChecked={lowercase}
                  onPress={() => setLowercase(pre => !pre)}
                />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.text]}>Include Uppercase Letters</Text>
                <BouncyCheckbox
                  fillColor="#FFC0CB"
                  isChecked={uppercase}
                  onPress={() => setUppercase(pre => !pre)}
                />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.text]}>Include Numbers</Text>
                <BouncyCheckbox
                  fillColor="yellowgreen"
                  isChecked={numbers}
                  onPress={() => setNumbers(pre => !pre)}
                />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.text]}>Include Symbols</Text>
                <BouncyCheckbox
                  fillColor="#808080"
                  isChecked={symbols}
                  onPress={() => setSymbols(pre => !pre)}
                />
              </View>
              <TouchableOpacity
                disabled={!isValid}
                onPress={() => handleSubmit()}
                style={[styles.generateBtn]}>
                <Text
                  style={[
                    styles.text,
                    {color: '#D9D9D9', fontWeight: '700', fontSize: 15},
                  ]}>
                  Generate Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPassword('');
                  setIsGenerated(false);
                  handleReset();
                }}
                style={[styles.resetBtn]}>
                <Text style={[styles.text, {fontWeight: '700', fontSize: 15}]}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        {isGeneratedPassword ? (
          <View style={styles.generatedPass}>
            <Text selectable style={{color: 'black'}}>
              {password}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    // backgroundColor: '#D9D9D9',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 25,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    textAlignVertical: 'center',
  },
  inputBox: {
    borderWidth: 1,
    width: 50,
    textAlign: 'center',
    borderRadius: 5,
    height: 40,
    fontSize: 15,
    borderColor: '#dadada',
    padding: 5,
  },
  generateBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#407BFF',
    paddingVertical: 10,
    marginVertical: 25,
    borderRadius: 3,
  },
  resetBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dadada',
    paddingVertical: 10,
    borderRadius: 3,
  },
  generatedPass: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 25,
    backgroundColor: '#F5F5DC',
    paddingVertical: 20,
    borderRadius: 10,
  },
  textError: {
    color: 'red',
  },
});
