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

  componentDidMount() {
    fetch(`http://192.168.0.18:3001/saved_recipes/${idUser}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        isLoading: false,
        dataSource: res,
      })
    })
  }

  render() {
    return(
    <View style={styles.mainContainer}>
      <ListView
 
        dataSource={this.state.dataSource}
 
        renderSeparator= {this.ListViewItemSeparator}
 
        renderRow={(rowData) =>

       <View style={{flex:1, flexDirection: 'column'}} >
         <TouchableOpacity onPress={() => {this.viewRecipe(rowData.idRecipe)}}>
         <Text style={styles.textViewContainer} >{rowData.Recipe_Name}</Text>
         <Text style={styles.textViewContainer} >{'Total Time: ' + rowData.Total_Time}</Text>
         <Text style={styles.textViewContainer} >{'Calories: ' + rowData.Calories}</Text>
         <Text style={styles.textViewContainer} >{'Rating: ' + rowData.Rating}</Text>
         </TouchableOpacity>
       </View>
        }
      />
    </View>
    );
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