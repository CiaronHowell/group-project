import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  ListView,
  ScrollView,
  FlatList,
  Text,
  SectionList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class SavedRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      viewingRecipe: false,
      viewIngredients: false,
      dataSource: {},
      recipeInfo: {},
      ingredientsInfo: {},
      RecipeID: '',
    };
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

  render() {
      if(this.state.isLoading) {
        return (
        <View style={styles.containerBody}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.fetchRecipes} activeOpacity={0.5}>
            <Text style={styles.txt}>Load Saved Recipes</Text>
            </TouchableOpacity>
        </View>
        )
      }
      if (this.state.viewingRecipe) {
        return (
          <View style={{flex: 1}}>
        <View style={styles.containerHead}>
          <Text style={styles.headTxt}>Yum!</Text>
        </View>
        <ScrollView>
          <View style={styles.containerBody}>
            <Text style = {styles.titleTxt}>{this.state.recipeInfo[0].Recipe_Name}</Text>
            <Text style = {styles.recipeTxt}>Cooking Time: {this.state.recipeInfo[0].Cooking_Time}</Text>
            <Text style = {styles.recipeTxt}>Prep Time: {this.state.recipeInfo[0].Prep_Time}</Text> 
            <Text style = {styles.recipeTxt}>Total Time: {this.state.recipeInfo[0].Total_Time}  </Text>
            <Text style = {styles.recipeTxt}>Calories: {this.state.recipeInfo[0].Calories} </Text>
            <Text style = {styles.recipeTxt}>Rating: {this.state.recipeInfo[0].Rating} </Text>
            <Text style = {styles.recipeTxt}>Instructions: {this.state.recipeInfo[0].Instructions} </Text>
            <Text style = {styles.recipeTxt}>Review: {this.state.recipeInfo[0].Review} </Text>
            <Button onPress={this._viewIngredients} title="View Ingredients" type='clear'/>
            <Button onPress={this._saveRecipe} title="Save Recipe" type='clear'/>
            <Button onPress={this._goBackToResults} title="Back" type='clear'/>
          </View>
          </ScrollView>
        </View>
        )
      }
      if (this.state.viewIngredients) {
        return (
          <View style={styles.mainContainer}>
          <ListView
     
            dataSource={this.state.ingredientsInfo}
     
            renderSeparator= {this.ListViewItemSeparator}
     
            renderRow={(rowData) =>
    
           <View style={{flex:1, flexDirection: 'column'}} >
             <Text style={styles.textViewContainer} >{rowData.Ingredient_Name}</Text>
           </View>
            }
          />
          <Button onPress={this._goBackToRecipe} title="Back" type='clear'/>
        </View>
          )
      }
      else {
        return (
          <View style={styles.mainContainer}>
          <ListView
    
            dataSource={this.state.dataSource}
    
            renderSeparator= {this.ListViewItemSeparator}
    
            renderRow={(rowData) =>
    
          <View style={{flex:1, flexDirection: 'column'}} >
            <TouchableOpacity style={styles.buttonStyle} onPress={() => {this.viewRecipe(rowData.idRecipe)}}>
            <Text style={styles.textViewContainer} >{rowData.Recipe_Name}</Text>
            </TouchableOpacity>
          </View>
            }
          />
        </View>
        )
      }
  }

  fetchRecipes = async () => {
    let idUser = await AsyncStorage.getItem('idUser');
    console.log(idUser)
    fetch(`http://localhost:3001/saved_recipes/${idUser}`, {
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
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        isLoading: false,
        viewIngredients: false,
        viewingRecipe: false,
        dataSource: ds.cloneWithRows(res),
      })
    })
    this.forceUpdate();
  }

  viewRecipe = (idRecipe) => {
    console.log(idRecipe)
    fetch(`http://192.168.0.18:3001/recipe/${idRecipe}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          idRecipe: idRecipe,
        })
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      this.setState({
        viewingRecipe: true,
        recipeInfo: res,
        RecipeID: idRecipe,
      })
    })
  }

  _viewIngredients = () => {
    fetch(`http://192.168.0.18:3001/ingredients/${this.state.RecipeID}`, {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            idRecipe: this.state.RecipeID,
          })
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        viewIngredients: true,
        viewingRecipe: false,
        ingredientsInfo: ds.cloneWithRows(res),
      })
    })
  }

  _goBackToRecipe = () => {
    this.setState({
      viewingRecipe: true,
      viewIngredients: false,
    })
  }

  _goBackToResults = () => {
    this.setState({
      viewingRecipe: false,
      isLoading: false,
    })
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
    color: '#000'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  buttonStyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#92ce33',
    height: 100,
    borderRadius: 25,
    margin: 20
  },
  textViewContainer: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 20,
    color: 'black',     
  },
  recipeTxt:{
    fontSize: 20,
    alignItems: 'flex-start',
    color: '#000',
  },
});