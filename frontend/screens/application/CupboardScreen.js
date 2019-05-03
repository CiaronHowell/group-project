import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  ListView,
  ScrollView,
  Text,
  TextInput,
  Image,
  SectionList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class CupboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      viewingInventory: false,
      viewIngredients: false,
      dataSource: {},
      ingredients: {},
      ingredientsInfo: {},
      RecipeID: '',
      searchText: '',
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
      <View style={{ flex: 1 }}>
        <View style={styles.containerHead}>
        <Image source = {require('../Yum.png')} style = {styles.headTxt}/>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.searchDef}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(searchText) => this.setState({searchText})} placeholder='Search for Ingredient'
            />
            <Button
              color='#48BBEC'
              title='Search'
              onPress={this.searchIngredient}
            />
          </View>
          <Button title='View Inventory' onPress={this.viewInventory} />
        </View>
        <View style={styles.mainContainer}>
    </View>
      </View>
    );
    }
    if (this.state.viewingInventory) {
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
                onChangeText={(searchText) => this.setState({searchText})} placeholder='Search for Ingredient'
              />
              <Button
                color='#48BBEC'
                title='Search'
                onPress={this.searchIngredient}
              />
            </View>
            <Button title='View Inventory' onPress={this.viewInventory} />
          </View>
          <View style={styles.mainContainer}>
          </View>
          
          <ListView
   
          dataSource={this.state.dataSource}
   
          renderSeparator= {this.ListViewItemSeparator}
   
          renderRow={(rowData) =>
  
         <View style={{flex:1, flexDirection: 'column'}} >
           <TouchableOpacity style={styles.buttonStyle}>
           <Text style={styles.textViewContainer} >{rowData.Ingredient_Name}</Text>
           </TouchableOpacity>
           <Button title="Delete item" onPress={() => {this.deleteIngredient(rowData.idIngredients)}}></Button>
         </View>
          }
        />
        </View>
        </ScrollView>
      )
    }
    if (this.state.viewIngredients) {
      return (
        <View style={styles.mainContainer}>
        <ListView
   
          dataSource={this.state.ingredients}
   
          renderSeparator= {this.ListViewItemSeparator}
   
          renderRow={(rowData) =>
  
         <View style={{flex:1, flexDirection: 'column'}} >
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {this.addIngredient(rowData.idIngredients)}}>
           <Text style={styles.textViewContainer} >{rowData.Ingredient_Name}</Text>
           </TouchableOpacity>
         </View>
          }
        />
        <Button onPress={this._goBackToInventory} title="Back" type='clear'/>
      </View>
        )
    }
  }

  _goToUserProfile = () => {
    this.props.navigation.navigate('UserProfile');
  }

  _goBackToInventory = () => {
    this.setState({
      viewingInventory: true,
      viewIngredients: false,
    })
  }

  deleteIngredient = async (idIngredient) => {
    let idUser = await AsyncStorage.getItem('idUser');
    fetch(`http://172.20.10.2:3001/delete_ingredient`, {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            idUser: idUser,
            idIngredient: idIngredient
          })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success == true) {
        alert('Deleted ingredient')
      }
      this.setState({
        isLoading: true,
        viewingInventory: false,
        viewIngredients: false,
      })
    })
  }

  addIngredient = async (idIngredient) => {
    let idUser = await AsyncStorage.getItem('idUser');
    fetch(`http://172.20.10.2:3001/add_ingredient`, {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            idUser: idUser,
            idIngredient: idIngredient
          })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success == true) {
        alert('Added ingredient')
      }
    })
  }

  searchIngredient = () => {
    fetch(`http://172.20.10.2:3001/search_ingredients`, {
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
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        isLoading: false,
        viewingInventory: false,
        viewIngredients: true,
        ingredients: ds.cloneWithRows(res),
      })
    })
  }

  viewInventory = async () => {
    let idUser = await AsyncStorage.getItem('idUser');
    console.log(idUser)
    fetch(`http://172.20.10.2:3001/inventory/${idUser}`, {
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
        viewingInventory: true,
        isLoading: false,
        dataSource: ds.cloneWithRows(res),
      })
    })
    this.forceUpdate();
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
  textViewContainer: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 20,
    color: 'black',     
  },
  buttonStyle: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#92ce33',
    borderRadius: 25,
    margin: 20
  }
});