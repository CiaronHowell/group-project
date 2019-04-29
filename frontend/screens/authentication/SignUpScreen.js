import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up'
  };

  _onPressButton(){
    color = 'red'
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <Text style={styles.headTxt}>Yum!</Text>
      </View>
        <View style={styles.containerBody}>

          <TextInput style = {styles.txt} keyboardType = 'email-address' placeholder = "Email..." onChangeText={(emailAddress) => this.setState({emailAddress})} />
          <TextInput style = {styles.txt} placeholder = "First Name..." onChangeText={(firstName) => this.setState({firstName})} />
          <TextInput style = {styles.txt} placeholder = "Surname..." onChangeText={(lastName) => this.setState({lastName})} />
          <TextInput style = {styles.txt} placeholder = "Create Username..." onChangeText={(username) => this.setState({username})} />
          <TextInput secureTextEntry={true} style = {styles.txt} placeholder = "Create Password..." onChangeText={(password) => this.setState({password})} />
          <TextInput secureTextEntry={true} style = {styles.txt} placeholder = "Re-enter Password..." onChangeText={(password2) => this.setState({password2})} />
     
          <Button onPress={this.register} title="Sign up" type='clear'/>
          <Button onPress={this._onPressButton} style = {styles.login} title="Already a user?"/>
        </View>
      </View>
    );
  }
  constructor(props) {
    super(props);
    this.state = {emailAddress: '', firstName: '', lastName: '', username: '', password: '', password2: ''}
  }

  register = () => {
    fetch('http://192.168.1.214:3001/register', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            emailAddress: this.state.emailAddress,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
          })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success == true) {
        alert(('User created successfully'))
      }
      else {
        alert(('Passwords do not match'))
      }
    })
    .done();
  }
}

const styles = StyleSheet.create({
  containerHead:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#08a312', 
    

  },
  headTxt:{
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold'
  },

  containerBody: {
    flex: 8,
    backgroundColor: '#fff3f2',
    alignItems: 'center',
    justifyContent: 'center'
  },

  txt:{
    padding: 10,
    alignItems: 'center',
    width: '60%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    margin: 10

  },

  login:{
    padding: 10,
    margin: 50,
    alignItems: 'stretch',

  }

  

});
