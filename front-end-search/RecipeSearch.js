import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, Button, ActivityIndicator, Image, Alert, YellowBox, Platform} from 'react-native';
import {Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import RecipeSearch from './RecipeSearch';

//DATABASE THING GOES HERE
function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      recipe: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}
//

export default class App extends React.Component<{}> {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
    };
  }

  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  _executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
      	this.setState({
      	  isLoading: false,
      	  message: 'Something bad happened ' + error
      }));
  };

  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      this.props.navigator.push({
      	title: 'Results',
      	component: SearchResults,
      	passProps: {listings: response.listings}
      });
    } else {
      this.setState({ message: 'Recipe not recognized.\n Please try again!'});
    }
  };

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('recipe_name', this.state.searchString, 1);
    this._executeQuery(query);
  };

  render() {
  	const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <Text style={styles.headTxt}>Yum!</Text>
        <Button style={{justifyContent: 'flex-end'}} onPress={this._onPressButton} title="User" type='clear'/>
      </View>
        <View style={styles.container}>
         <Text style={styles.txt}>Search for Recipe</Text>
        <View style={styles.searchDef}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Search for Recipe'/>
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Search'
          />
        </View>
      <Image source={require('./Resources/yum.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.txt}>{this.state.message}</Text>
      
        <MenuProvider style={{ flexDirection: "column", padding: 60 }}>
        <Menu onSelect={value => alert(`You Clicked : ${value}`)}>

          <MenuTrigger>
          <Text style={styles.filterTxt}>Filter</Text>
          </MenuTrigger>

          <MenuOptions>
            <MenuOption value={"Item1"}>
              <Text style={styles.txt}>Item1</Text>
            </MenuOption>
            <MenuOption value={"Item2"}>
              <Text style={styles.txt}>Item2</Text>
            </MenuOption>
            <MenuOption value={"Item3"}>
              <Text style={styles.txt}>Item3</Text>
            </MenuOption>
            <MenuOption value={"Item4"}>
              <Text style={styles.txt}>Item4</Text>
            </MenuOption>
            <MenuOption value={"Item5"}>
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
    backgroundColor:'#00ea13'
  },
  container: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 65
  },
  headTxt:{
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold'
  },
  txt:{
    fontSize: 20,
    alignItems: 'center'
  },
  searchDef: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
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
    color: '#48BBEC'
  },
  image: {
    padding: 4,
    width: 200,
    height: 200
  },
  filterTxt: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  }
});