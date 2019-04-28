import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class ForgottenUserDetails extends React.Component {
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

          <TextInput style = {styles.txt} placeholder = "Enter Email..." onChangeText={(text) => this.setState({text})} />
         
          <Button onPress={this._onPressButton} title="Send Email" type='clear'/>
        </View>
      </View>
    );
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

  }
  

});
