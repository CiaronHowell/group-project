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
        <View style={{flex: 1, flexDirection:'row'}}>
        <Text style={styles.headTxt}>Yum!</Text>
        <Button title="User"  style={styles.txtButton} onPress={this._onPressButton} type='clear'/>
        </View>
      </View>
      {/* TODO: Sort out the buttons for the cupboard and recipes */}
        <View style={styles.containerBody}>
        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.txt}>My cupboard</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this._goToSearchRecipe} activeOpacity={0.5}>
        <Text style={styles.txt}>Search recipes</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.txt}>Saved recipes</Text>  
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

  _goToSearchRecipe = () => {
    this.props.navigation.navigate('App');
    this.props.navigation.navigate('RecipeScreen');
  }
}

const styles = StyleSheet.create({
  containerHead:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#00ea13', 
  },
  headTxt:{
    flex:8,
    alignSelf:'flex-end',
    justifyContent:'flex-end',
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 125
  },
  txtButton:{
    flex:2,
    alignSelf:'center',
    justifyContent:'center',
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
    height: 100,
    borderRadius: 25,
    margin: 20
  }
});