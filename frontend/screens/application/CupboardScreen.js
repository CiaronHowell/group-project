import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  SectionList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class CupboardScreen extends React.Component {
  _onPressButton() {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.containerHead}>
          <Text style={styles.headTxt}>Yum!</Text>
          <Button
            title="User"
            style={styles.txtButton}
            onPress={this._goToUserProfile}
            type="clear"
          />
        </View>
        <View style={styles.containerBody}>
          <View style={styles.searchDef}>
            <TextInput
              style={styles.searchInput}
              placeholder='Add an Ingredient'
            />
            <Button
              color='#48BBEC'
              title='Add'
              onPress={this.addIngredient}
            />
          </View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumbnail} source={{}} />
            <View style={styles.listContainer}>
              <SectionList
                sections={[
                  {title: 'D', data: ['Devin']},
                  {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  _goToUserProfile = () => {
    this.props.navigation.navigate('UserProfile');
  }

  addIngredient = () => {
    
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
});