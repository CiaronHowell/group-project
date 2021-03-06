import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StyleSheet,
  ScrollView,
  ListView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";


export default class SearchScreen extends React.Component {
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
    if (this.state.isLoading) {
    return (
      <View style={{flex: 1}}>
      <View style={styles.containerHead}>
        <View style={{flex: 1, flexDirection:'row'}}>
        <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
        </View>
      </View>
        <View style={styles.containerBody}>
         <Text style={styles.txt}>Search for Recipe</Text>
        <View style={styles.searchDef}>
          <TextInput style={styles.searchInput} onChangeText={(searchText) => this.setState({searchText})} placeholder='Search for Recipe'/>
        <Button onPress={this._searchRecipes} color='#48BBEC' title='Search'/>
        </View>
        <Button onPress={this._searchMatchedRecipes} style={{ flexDirection: "column", padding: 60 }} color='#48BBEC' title='Search using cupboard'/>
        
      </View>
      </View>
      
      );
    }
    if (this.state.viewingRecipe) {
      return (
        <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerHead}>
        <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
      </View>
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
         <Text style={styles.textViewContainer} >{'Total Time: ' + rowData.Total_Time}</Text>
         <Text style={styles.textViewContainer} >{'Calories: ' + rowData.Calories}</Text>
         <Text style={styles.textViewContainer} >{'Rating: ' + rowData.Rating}</Text>
         </TouchableOpacity>
       </View>
        }
      />
      <Button onPress={this._goBackToSearch} title="Back" type='clear'/>
    </View>
      )
    }
  }

  _goToUserProfile = () => {
    this.props.navigation.navigate('UserProfile');
  }

  _goBackToSearch = () => {
    this.setState({
      isLoading: true,
      viewingRecipe: false
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

  _searchMatchedRecipes = async () => {
    let idUser = await AsyncStorage.getItem('idUser')


    fetch(`http://172.20.10.2:3001/matched_recipes/${idUser}`, {
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
        dataSource: ds.cloneWithRows(res[0]),
      })
    })
  }

  _searchRecipes = () => {
    fetch('http://172.20.10.2:3001/recipesearch', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            searchText: this.state.searchText,
          })
    })
    .then((response) => response.json())
    .then((res) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(res),
      })
    })
    .done();
  }

  _viewIngredients = () => {
    fetch(`http://172.20.10.2:3001/ingredients/${this.state.RecipeID}`, {
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
    fetch(`http://172.20.10.2:3001/recipe/${idRecipe}`, {
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

  _saveRecipe = async () => {
    idUser = await AsyncStorage.getItem('idUser');
    console.log(idUser)
    fetch(`http://172.20.10.2:3001/save_recipe`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          idUser: idUser,
          idRecipe: this.state.RecipeID,
        })
    })
    .then((response) => response.json())
    .then((res) => {
      if(res.success == true) {
        alert('Recipe saved to inventory');
      }
      else {
        alert('Save unsuccessful');
      }
    })
  }

}

const styles = StyleSheet.create({
  mainContainer :{
    justifyContent: 'center',
    flex:1,
    backgroundColor: '#ffffff',
    padding: 5,
  },
  textViewContainer: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 20,
    color: 'black',     
  },
  containerHead:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#92ce33',
  },
  containerBody: {
    flex: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 65,
  },
  headTxt:{
    alignSelf:'center',
    justifyContent:'center',
    width:100,
    height:100,
    resizeMode: 'contain',
  },
  txtButton:{
    flex:1,
  },
  txt:{
    fontSize: 20,
    alignItems: 'center',
    color: '#000',
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
  },
  buttonStyle: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#92ce33',
    borderRadius: 25,
    margin: 20
  }
});