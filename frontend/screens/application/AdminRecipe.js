import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView,
  SectionList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class AdminRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      editingDetails: false,
      searchText: '',
      RecipeNameTxt: '',
      CookingTimeTxt: '',
      PrepTimeTxt: '',
      TotalTimeTxt: '',
      CaloriesTxt: '',
      RatingTxt: '',
      InstructionsTxt: '',
      ReviewTxt: '',
      recipeID: '',
      newRecipeNameTxt: '',
      newCookingTimeTxt: '',
      newPrepTimeTxt: '',
      newTotalTimeTxt: '',
      newCaloriesTxt: '',
      newRatingTxt: '',
      newInstructionsTxt: '',
      newReviewTxt: '',
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.containerHead}>
          <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
          </View>
          <View style={styles.containerBody}>
            <View style={styles.searchDef}>
              <TextInput
                style={styles.searchInput}
                placeholder='Search for User'
                onChangeText={(searchText) => this.setState({searchText})}
              />
              <Button
                onPress={this._loadRecipeDetails}
                color='#48BBEC'
                title='Search'
              />
            </View>
              <Text style={styles.txt}>Recipe Name:  {this.state.RecipeNameTxt} </Text>
              <Text style={styles.txt}>Cooking Time:  {this.state.CookingTimeTxt}</Text>
              <Text style={styles.txt}>Prep Time:  {this.state.PrepTimeTxt}</Text>
              <Text style={styles.txt}>Total Time:  {this.state.TotalTimeTxt}</Text>
              <Text style={styles.txt}>Calories:  {this.state.CaloriesTxt}</Text>
              <Text style={styles.txt}>Rating:  {this.state.RatingTxt}</Text>
              <Text style={styles.txt}>Instructions:  {this.state.InstructionsTxt}</Text>
              <Text style={styles.txt}>Review:  {this.state.ReviewTxt}</Text>
              <View style={{flex:1, flexDirection: 'column'}} >
                <View style={{flex:1, flexDirection: 'row'}} >
                  <Button title="Edit Recipe" onPress={this.editRecipeDetails}></Button>
                </View>
              </View>
            </View>
          </View>
      </ScrollView>
      )
    }
    if (this.state.editingDetails) {
      return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.containerHead}>
          <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
          </View>
          <View style={styles.containerBody}>
            <View style={styles.searchDef}>
              <TextInput
                style={styles.searchInput}
                placeholder='Search for Recipe'
                onChangeText={(searchText) => this.setState({searchText})}
              />
              <Button
                onPress={this._loadRecipeDetails}
                color='#48BBEC'
                title='Search'
              />
            </View>
              <Text style={styles.txt}>Recipe Name:  {this.state.RecipeNameTxt} </Text>
              <Text style={styles.txt}>Cooking Time:  {this.state.CookingTimeTxt}</Text>
              <Text style={styles.txt}>Prep Time:  {this.state.PrepTimeTxt}</Text>
              <Text style={styles.txt}>Total Time:  {this.state.TotalTimeTxt}</Text>
              <Text style={styles.txt}>Calories:  {this.state.CaloriesTxt}</Text>
              <Text style={styles.txt}>Rating:  {this.state.RatingTxt}</Text>
              <Text style={styles.txt}>Instructions:  {this.state.InstructionsTxt}</Text>
              <Text style={styles.txt}>Review:  {this.state.ReviewTxt}</Text>
              <View style={{flex:1, flexDirection: 'column'}} >
                <View style={{flex:1, flexDirection: 'row'}} >
                  <Button title="Edit Recipe" onPress={this.editRecipeDetails}></Button>
                </View>
                <TextInput style = {styles.txtInput} placeholder = "Recipe Name" onChangeText={(newRecipeNameTxt) => this.setState({newRecipeNameTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Cooking Time" onChangeText={(newCookingTimeTxt) => this.setState({newCookingTimeTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Prep Time" onChangeText={(newPrepTimeTxt) => this.setState({newPrepTimeTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Total Time" onChangeText={(newTotalTimeTxt) => this.setState({newTotalTimeTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Calories" onChangeText={(newCaloriesTxt) => this.setState({newCaloriesTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Rating" onChangeText={(newRatingTxt) => this.setState({newRatingTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Instructions" onChangeText={(newInstructionsTxt) => this.setState({newInstructionsTxt})} />
                <TextInput style = {styles.txtInput} placeholder = "Review" onChangeText={(newReviewTxt) => this.setState({newReviewTxt})} />
                <Button title="Save Changes" onPress={this.changeDetails}> </Button>
              </View>
            </View>
          </View>
      </ScrollView>
      )
    }
  }

  editRecipeDetails = () => {
    alert('Editing user details')
    this.setState({
      isLoading: false,
      editingDetails: true,
    })
  }

  changeDetails = () => {
    fetch('http://172.20.10.2:3001/alter_recipe_details', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            recipeID: this.state.recipeID,
            RecipeName: this.state.newRecipeNameTxt,
            CookingTime: this.state.newCookingTimeTxt,
            PrepTime: this.state.newPrepTimeTxt,
            TotalTime: this.state.newTotalTimeTxt,
            Calories: this.state.newCaloriesTxt,
            Rating: this.state.newRatingTxt,
            Instructions: this.state.newInstructionsTxt,
            Review: this.state.newReviewTxt,
          })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success == true) {
        alert(('Details changed'))
      }
      else {
        alert(('Passwords do not match'))
      }
    })
    .done();
  }

  _loadRecipeDetails = async () => {
    console.log(this.state.searchText)
    var recipeName = this.state.searchText
    console.log(recipeName)
    fetch(`http://172.20.10.2:3001/edit_recipe/${recipeName}`, {
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
      console.log(res)
      this.setState({
        dataSource: res,
        recipeID: res[0].idRecipe,
        RecipeNameTxt: res[0].Recipe_Name,
        CookingTimeTxt: res[0].Cooking_Time,
        PrepTimeTxt: res[0].Prep_Time,
        TotalTimeTxt: res[0].Total_Time,
        CaloriesTxt: res[0].Calories,
        RatingTxt: res[0].Rating,
        InstructionsTxt: res[0].Instructions,
        ReviewTxt: res[0].Review,
      })
    })
    .done();
  }
}

const styles = StyleSheet.create({
  containerHead: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#92ce33',
  },
  headTxt:{
    alignSelf:'center',
    justifyContent:'center',
    width:100,
    height:100,
    resizeMode: 'contain',
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
    backgroundColor: '#ffffff',
  },
  txt: {
    fontSize: 20,
    alignItems: 'center',
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
    borderRadius: 30,
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
  txtInput:{
    padding: 10,
    alignItems: 'center',
    justifyContent:'center',
    width: '80%',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 30,
    margin: 10
  },
});