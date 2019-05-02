import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  ListView,
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
      dataSource: {},
      recipeInfo: {},
      ingredientsInfo: {},
      RecipeID: '',
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    fetch(`http://192.168.0.18:3001/saved_recipes/${idUser}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success == true) {
        alert(('Recipe saved'))
      }
      else {
        alert(('Recipe not saved'))
      }
    })
  }

  render() {
    if (this.state.isLoading) {
      return(
      <View style={styles.mainContainer}>
        <ListView
  
          dataSource={this.state.dataSource}
  
          renderSeparator= {this.ListViewItemSeparator}
  
          renderRow={(rowData) =>

        <View style={{flex:1, flexDirection: 'column'}} >
          <Text style={styles.textViewContainer} >{rowData.Recipe_Name}</Text>
        </View>
          }
        />
      </View>
      );
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
          <Button onPress={this._goBackToSavedRecipes} title="Back" type='clear'/>
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
  }

  _goBackToRecipe = () => {
    this.setState({
      viewingRecipe: true,
      viewIngredients: false,
    })
  }

  _goBackToSavedRecipes = () => {
    this.setState({
      viewingRecipe: false,
      viewIngredients: false,
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

}

const styles = StyleSheet.create({
  containerHead: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#00ea13',
  },
  textViewContainer: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 20,
    color: '#fff',     
  },
  headTxt: {
    flex: 8,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 125,
  },
  txtButton: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerBody: {
    padding:25,
    flex: 8,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  txt: {
    fontSize: 20,
    alignItems: 'center',
  },
  titleTxt:{
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#000',
  },
  recipeTxt:{
    fontSize: 20,
    alignItems: 'flex-start',
    color: '#000',
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
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});