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

          <TextInput style = {styles.txt} placeholder = "Enter Username..." onChangeText={(text) => this.setState({text})} />
          <TextInput secureTextEntry={true} style = {styles.txt} placeholder = "Enter Password..." onChangeText={(text) => this.setState({text})} />
     
          <Button onPress={this._onPressButton} title="Forgotten Login details" type='clear'/>
          <Button onPress={this._onPressButton} style = {styles.login} title="Login"/>
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

  },

  login:{
    padding: 10,
    margin: 50,
    alignItems: 'stretch',

  }

  

});
