import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: ''
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('isAdmin');
      console.log(value)
      this.setState({
        isAdmin: value
      })
      if (value !== null) {
      }
    } catch (error) {
    }
  };

  render() {
    {this._retrieveData()}
    if (this.state.isAdmin == 'true') {
      return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <View style={{flex: 1, flexDirection:'row'}}>
        <Button title="Admin" stlye={styles.txtButton} onPress={this._goToAdminPage} type='clear'/>
        <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
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
  else {
    return (
    <View style={{flex: 1}}>
    <View style={styles.containerHead}>
      <View style={{flex: 1, flexDirection:'row'}}>
      <Image source = {require('../Yum.png')} style = {styles.headTxt2}/>
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
}
  
  // clears the async storage to revert the users authentication 
  _signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _goToAdminPage = () => {
    this.props.navigation.navigate('AdminPage');
  }

  _goToCupboard = async() => {
    // checking that the user id has been set
    let userID = await AsyncStorage.getItem('idUser');
    console.log(userID);
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
    width:50,
    height:50,
    resizeMode:'contain',
  },
  headTxt2:{
    flex:8,
    alignSelf:'flex-end',
    justifyContent:'flex-end',
    width:50,
    height:50,
    resizeMode:'contain',
    marginLeft: 75
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