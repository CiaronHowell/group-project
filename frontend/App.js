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

// Screen imports
import SignUpScreen from './screens/authentication/SignUpScreen';
import HomeScreen from './screens/application/HomeScreen';
//import SearchScreen from './screens/application/SearchScreen';
// end of screen imports

class LoginScreen extends React.Component {
  // Adds a title to the top of the screen
  static navigationOptions = {
    title: 'Please sign in',
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

          <TextInput style = {styles.txt} placeholder = "Enter Username..." onChangeText={(username) => this.setState({username})} 
            value={this.state.username}
          />
          <TextInput secureTextEntry={true} style = {styles.txt} placeholder = "Enter Password..." onChangeText={(password) => this.setState({password})} 
            value ={this.state.password}
          />
     
          <Button title="Register!" onPress={this._goToSignUp} />
          {/* TODO: Sort out a forgotten login page */}
          <Button title="Forgotten Login details" onPress={this._onPressButton} type='clear'/>
          {/*TODO: Change the login button back to calling the login method*/}
          <Button title="Login" onPress={this._skipLogin} style = {styles.login} />
        </View>
      </View>
    );
  }

  // This will change the screen to the signup page
  _goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  _skipLogin = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}
  }

  // TODO: Comment this method
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

// Checks the auth of the user
// TODO: WE NEED TO DECIDE WHETHER WE WANT TO DO IT THIS WAY
// IF NOT, TELL ME AND I'LL TAKE THIS OUT AND SORT IT OUT
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

// Creates a navigation stack specifically for the app
const AppNav = createStackNavigator({
  Home: HomeScreen,
  SignUp: SignUpScreen,
});

// Creates a navigation stack for a user that isn't authorised yet
const AuthNav = createStackNavigator({ 
  Login: LoginScreen, 
  SignUp: SignUpScreen,
});

// Creating the application container for the navigation stacks
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNav,
    Auth: AuthNav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

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