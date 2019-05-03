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
  Image,
} from 'react-native';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          dataSource: {},
          UsernameTxt: '',
          FirstNameTxt: '',
          SurnameTxt: '',
          EmailAddressTxt: '',
        };
      }

  render() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
      <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
      </View>
        <View style={styles.containerBody}>
            <Text style={styles.txt}>Username: {this.state.UsernameTxt} </Text>
            <Text style={styles.txt}>First Name: {this.state.FirstNameTxt}</Text>
            <Text style={styles.txt}>Surname: {this.state.SurnameTxt}</Text>
            <Text style={styles.txt}>Email Address: {this.state.EmailAddressTxt}</Text>
            <Button title="Get Info" onPress={this._loadProfile} type='clear'/>
        </View>
      </View>
    );
  }

  _loadProfile = async () => {
    var username = ""
    try {
        username = await AsyncStorage.getItem('username');
        if (username !== null) {
          console.log(username);
        }
      } catch (error) {
      }
    fetch(`http://172.20.10.2:3001/profile/${username}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        isLoading: false,
        dataSource: res,
        UsernameTxt: res[0].Username,
        FirstNameTxt: res[0].First_Name,
        SurnameTxt: res[0].Surname,
        EmailAddressTxt: res[0].Email_Address,
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
    backgroundColor:'#92ce33', 
    

  },
  headTxt:{
    alignSelf:'center',
    justifyContent:'center',
    width:100,
    height:100,
    resizeMode: 'contain',
  },
  

  containerBody: {
    flex: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  txt:{
    padding: 20,
    alignItems: 'center',
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10
  }
});
