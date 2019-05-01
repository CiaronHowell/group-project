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

export default class ForgottenUserDetails extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          dataSource: [],
          userData: {}
        };
      }

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
            <Text style={styles.txt}>Username: {this.state.userData.Username}</Text>
            <Text style={styles.txt}>First Name: {this.state.userData.First_Name}</Text>
            <Text style={styles.txt}>Surname: {this.state.userData.Surname}</Text>
            <Text style={styles.txt}>Email Address: {this.state.userData.Email_Address}</Text>
            <Button title="Get Info" onPress={this._searchRecipes} type='clear'/>
        </View>
      </View>
    );
  }

  _searchRecipes = async () => {
    try {
        const username = await AsyncStorage.getItem('username');
        if (username !== null) {
          console.log(username);
        }
      } catch (error) {
      }
    fetch(`http://192.168.0.18:3001/profile/${username}`, {
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        isLoading: false,
        dataSource: res
      })

      res.map(function(profile) {
          this.setState({ 
            userData: {
                Username: profile.Username,
                First_Name: profile.First_Name,
                Surname: profile.Surname,
                Email_Address: profile.Email_Address,
            }
          });
      })


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
  }
});
