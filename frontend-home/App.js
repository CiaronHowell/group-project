import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  _onPressButton(){
    color = 'red'
  }

  render() {


    return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <Text style={styles.headTxt}>Yum!</Text>
        <Button style={{justifyContent: 'flex-end'}} onPress={this._onPressButton} title="User" type='clear'/>
      </View>
        <View style={styles.containerBody}>
        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.txt}>My cupboard</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.txt}>Recipes</Text>  
        </TouchableOpacity>

          <Button onPress={this._onPressButton} title="log out" type='clear'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHead:{
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#00ea13', 
    

  },
  headTxt:{
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold',
  },

  containerBody: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  txt:{
    fontSize: 20,
    alignItems: 'center',

  },

  buttonStyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#00ea13',
    height: 120,
    borderRadius: 25,
    margin: 25
  }

});
