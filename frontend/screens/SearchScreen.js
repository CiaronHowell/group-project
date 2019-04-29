import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";


export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSearchTextChanged() {
    color = 'red';
  }

  render() {
    return(
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <View style={{flex: 1, flexDirection:'row'}}>
        <Text style={styles.headTxt}>Yum!</Text>
        {/* TODO: Fix the position of the user button */}
        <Button title="User"  style={styles.txtButton} onPress={this._onPressButton} type='clear'/>
        </View>
      </View>
        <View style={styles.container}>
         <Text style={styles.txt}>Search for Recipe</Text>
        <View style={styles.searchDef}>
          <TextInput style={styles.searchInput} onChangeText={(text) => this.setState({text})} placeholder='Search for Recipe'/>
        <Button onPress={this._onSearchTextChanged} color='#48BBEC' title='Search'/>
        </View>
      
        <MenuProvider style={{ flexDirection: "column", padding: 60 }}>
        <Menu onSelect={alert('You Clicked menu')}>

          <MenuTrigger>
          <Text style={styles.filterTxt}>Filter</Text>
          </MenuTrigger>

          <MenuOptions>
            <MenuOption>
              <Text style={styles.txt}>Item1</Text>
            </MenuOption>
            <MenuOption>
              <Text style={styles.txt}>Item2</Text>
            </MenuOption>
            <MenuOption>
              <Text style={styles.txt}>Item3</Text>
            </MenuOption>
            <MenuOption>
              <Text style={styles.txt}>Item4</Text>
            </MenuOption>
            <MenuOption>
              <Text style={styles.txt}>Item5</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true}>
              <Text style={styles.txt}>Disabled Menu</Text>
            </MenuOption>
          </MenuOptions>

        </Menu>
      </MenuProvider>
      </View>
      </View>
      );
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
  container: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 65,
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
    flex:1,
  },
  txt:{
    fontSize: 20,
    alignItems: 'center',
  },
  searchDef: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  filterTxt: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  }
});