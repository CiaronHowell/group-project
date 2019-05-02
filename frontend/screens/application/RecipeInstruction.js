import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  P,
  TouchableOpacity,
} from 'react-native';

export default class RecipeInstruction extends React.Component {
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
        <View style={styles.containerBody}>
        //Name of recipe
        <Text style={styles.txt}>My cupboard</Text>  
        
        //recipe description goes here
        <P style={styles.txt}>Search recipes</P>  


        </View>
      </View>
    );
  }
  _goToUserProfile = () => {
    this.props.navigation.navigate('UserScreen');
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
  }
});