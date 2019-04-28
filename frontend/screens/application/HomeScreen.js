import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class App extends React.Component {
  _onPressButton(){
    color = 'red'
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <Text style={styles.headTxt}>Yum!</Text>
        {/* TODO: Fix the position of the user button */}
        <Button title="User" style={{justifyContent: 'flex-end'}} onPress={this._userProfile} type='clear'/>
      </View>
      {/* TODO: Sort out the buttons for the cupboard and recipes */}
        <View style={styles.containerBody}>
        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.txt}>My cupboard</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.txt}>Recipes</Text>  
        </TouchableOpacity>

          <Button title="Log Out" onPress={this._signOut} type='clear'/>
        </View>
      </View>
    );
  }
  
  // clears the async storage to revert the users authentication 
  _signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _userProfile = () => {
    
    fetch('http://192.168.1.214:3001/profile', {
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    })
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