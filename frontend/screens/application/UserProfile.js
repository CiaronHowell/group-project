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
            <Text style={styles.txt}>"Username"</Text>
            <Text style={styles.txt}>"FirstName"</Text>
            <Text style={styles.txt}>"Surname"</Text>
            <Text style={styles.txt}>"EmailAddress</Text>
        </View>
      </View>
    );
  }

  _searchRecipes = () => {
    fetch('http://localhost:3001/profile/Scoggins', {
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
          })
    })
    .then((response) => response.json())
    .then((res) => {
      alert('Pulling user profile')
      this.setState({
        isLoading: false,
        dataSource: res
      })

      res.map(function(profile) {
        fetchProfile.dataSource.push ({
          // the various attributes. e.g.
          // "recipeID": recipe.recipeID
          "Username": profile.Username,
          "FirstName": profile.First_Name,
          "Surname": profile.Surname,
          "EmailAddress": profile.EmailAddress,
        })
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
