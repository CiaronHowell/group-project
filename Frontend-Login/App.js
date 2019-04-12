import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class App extends React.Component {
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

          <TextInput style = {styles.txt} placeholder = "Enter Username..." onChangeText={(username) => this.setState({username})} 
            value={this.state.username}
          />
          <TextInput secureTextEntry={true} style = {styles.txt} placeholder = "Enter Password..." onChangeText={(password) => this.setState({password})} 
            value ={this.state.password}
          />
     
          <Button onPress={this._onPressButton} title="Forgotten Login details" type='clear'/>
          <Button onPress={this.login} style = {styles.login} title="Login"/>
        </View>
      </View>
    );
  }
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}
  }

  login = () => {
    fetch('http://192.168.1.214:3001/login', {
        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
            })
    })
    .then((response) => response.json())
    .then((res) => {
        if(res.success == true && res.admin == true) {
          alert(('Logging in as admin'))
        }
        else if(res.success == true && res.admin == false) {
          alert(('Logging in as user'))
        }
        else {
          alert(('Incorrect Username or Password'));
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
    backgroundColor:'#00ea13', 
    

  },
  headTxt:{
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold'
  },

  containerBody: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  txt:{
    padding: 20,
    alignItems: 'center',
    width: '60%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    margin: 10

  },

  login:{
    padding: 10,
    margin: 50,
    alignItems: 'stretch',

  }

  

});
