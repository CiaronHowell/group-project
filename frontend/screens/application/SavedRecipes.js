import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  ListView,
  FlatList,
  Text,
  SectionList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.fetchRecipes = this.fetchRecipes.bind(this)

    this.state = {
      isLoading: true,
      viewingRecipe: false,
      viewIngredients: false,
      dataSource: [],
      recipeInfo: {},
      ingredientsInfo: {},
      RecipeID: '',
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  async fetchRecipes() {
    let idUser = await AsyncStorage.getItem('idUser');
    console.log(idUser)
    fetch(`http://192.168.0.18:3001/saved_recipes/${idUser}`, {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            idUser: idUser,
          })
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      res.forEach((arrayItem) => {
        arrayItem.key = arrayItem.idRecipe.toString() ;
      });
      console.log(res)
      this.setState({
        isLoading: false,
        dataSource: res
      })
      console.log(this.state.dataSource)
    })
    this.forceUpdate();
  }

  render() {
      return (
          <FlatList 
            data={this.state.dataSource}
            renderItem={(item) => <Text style={styles.txt}>{item.Recipe_Name}</Text>}
          />
      )
  }
}


const styles = StyleSheet.create({
  containerHead:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#92ce33',
  },
  mainContainer :{
    justifyContent: 'center',
    flex:1,
    backgroundColor: '#ffffff',
    padding: 5,
  },
  headTxt:{
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold'
  },
  containerBody: {
    flex: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});