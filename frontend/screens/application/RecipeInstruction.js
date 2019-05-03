import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  P,
  TouchableOpacity,
  Image,
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
        <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
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
    backgroundColor:'#92ce33', 
  },
  headTxt:{
    alignSelf:'center',
    justifyContent:'center',
    width:100,
    height:100,
    resizeMode: 'contain',
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
  }
});