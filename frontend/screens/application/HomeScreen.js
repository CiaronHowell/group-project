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
        <Button title="User"  style={styles.txtButton} onPress={this._goToUserProfile} type='clear'/>
        </View>
      </View>
      {/* TODO: Sort out the buttons for the cupboard and recipes */}
        <View style={styles.containerBody}>
        <TouchableOpacity style={styles.buttonStyle} onPress={this._goToCupboard} activeOpacity={0.5}>
        <Text style={styles.txt}>My cupboard</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this._goToSearchRecipe} activeOpacity={0.5}>
        <Text style={styles.txt}>Search recipes</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={this._goToSavedRecipe} activeOpacity={0.5}>
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

  _goToCupboard = async () => {
    let username = ""
    let idUser = ""
    try {
        username = await AsyncStorage.getItem('username');
        if (username !== null) {
          console.log(username);
        }
    } catch (error) {
      console.log(error);
    }

    fetch(`http://192.168.0.18:3001/home/${username}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    })
    .then((response) => response.json())
    .then((res) => {
          try {
            console.log('Stored ID')
            var userID = JSON.stringify(res[0].idUser);
            AsyncStorage.setItem('idUser', userID);
          } catch (error) {
            console.log(error.message);
          } 
    })
    .done();

    try {
      idUser = await AsyncStorage.getItem('idUser');
      console.log(idUser);
    } catch (error) {
      console.log(error)
    }
    this.props.navigation.navigate('CupboardPage');
  }

  _goToSearchRecipe = () => {
    this.props.navigation.navigate('RecipeScreen');
  }

  _goToSavedRecipe = () => {
    this.props.navigation.navigate('SavedRecipes');
  }

  _goToUserProfile = () => {
    this.props.navigation.navigate('UserProfile');
  }
}

const styles = StyleSheet.create({
  containerHead:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#92ce33', 
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#92ce33',
    height: 100,
    borderRadius: 25,
    margin: 20
  }
});