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

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      editingDetails: false,
      searchText: '',
      UsernameTxt: '',
      FirstNameTxt: '',
      SurnameTxt: '',
      EmailAddressTxt: '',
      PasswordTxt: '',
      userID: '',
      newUsername: '',
      newFirstName: '',
      newSurname: '',
      newEmail: '',
      newPassword: '',
      newPassword2: '',
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.containerHead}>
            <Text style={styles.headTxt}>Yum!</Text>
            <Button
              title="User"
              style={styles.txtButton}
              type="clear"
            />
          </View>
          <View style={styles.containerBody}>
            <View style={styles.searchDef}>
              <TextInput
                style={styles.searchInput}
                placeholder='Search for User'
                onChangeText={(searchText) => this.setState({searchText})}
              />
              <Button
                onPress={this._loadUserDetails}
                color='#48BBEC'
                title='Search'
              />
            </View>
              <Text style={styles.txt}>Username:  {this.state.UsernameTxt} </Text>
              <Text style={styles.txt}>First Name:  {this.state.FirstNameTxt}</Text>
              <Text style={styles.txt}>Surname:  {this.state.SurnameTxt}</Text>
              <Text style={styles.txt}>Email Address:  {this.state.EmailAddressTxt}</Text>
              <Text style={styles.txt}>Password:  {this.state.PasswordTxt}</Text>
              <View style={{flex:1, flexDirection: 'column'}} >
                <View style={{flex:1, flexDirection: 'row'}} >
                  <Button title="Edit User" onPress={this.editUserDetails}></Button>
                  <Button title="Delete User" onPress={this.deleteDetails}></Button>
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
            <Text style={styles.headTxt}>Yum!</Text>
            <Button
              title="User"
              style={styles.txtButton}
              type="clear"
            />
          </View>
          <View style={styles.containerBody}>
            <View style={styles.searchDef}>
              <TextInput
                style={styles.searchInput}
                placeholder='Search for User'
                onChangeText={(searchText) => this.setState({searchText})}
              />
              <Button
                onPress={this._loadUserDetails}
                color='#48BBEC'
                title='Search'
              />
            </View>
              <Text style={styles.txt}>Username:  {this.state.UsernameTxt} </Text>
              <Text style={styles.txt}>First Name:  {this.state.FirstNameTxt}</Text>
              <Text style={styles.txt}>Surname:  {this.state.SurnameTxt}</Text>
              <Text style={styles.txt}>Email Address:  {this.state.EmailAddressTxt}</Text>
              <Text style={styles.txt}>Password:  {this.state.PasswordTxt}</Text>
              <View style={{flex:1, flexDirection: 'column'}} >
                <View style={{flex:1, flexDirection: 'row'}} >
                  <Button title="Edit User" onPress={this.editUserDetails}></Button>
                  <Button title="Delete User" onPress={this.deleteDetails}></Button>
                </View>
                <TextInput style = {styles.txtInput} keyboardType = 'email-address' placeholder = "Email..." onChangeText={(newEmail) => this.setState({newEmail})} />
                <TextInput style = {styles.txtInput} placeholder = "First Name..." onChangeText={(newFirstName) => this.setState({newFirstName})} />
                <TextInput style = {styles.txtInput} placeholder = "Surname..." onChangeText={(newSurname) => this.setState({newSurname})} />
                <TextInput style = {styles.txtInput} placeholder = "Username..." onChangeText={(newUsername) => this.setState({newUsername})} />
                <TextInput secureTextEntry={true} style = {styles.txtInput} placeholder = "Password..." onChangeText={(newPassword) => this.setState({newPassword})} />
                <TextInput secureTextEntry={true} style = {styles.txtInput} placeholder = "Confirm Password..." onChangeText={(newPassword2) => this.setState({newPassword2})} />
                <Button title="Save Changes" onPress={this.changeDetails}> </Button>
              </View>
            </View>
          </View>
      </ScrollView>
      )
    }
  }

  editUserDetails = () => {
    alert('Editing user details')
    this.setState({
      isLoading: false,
      editingDetails: true,
    })
  }

  deleteDetails = () => {
    fetch('http://192.168.0.18:3001/delete_user', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            idUser: this.state.userID,
          })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success == true) {
        alert(('Details deleted'))
      }
      else {
        alert(('Could not delete user'))
      }
    })
    .done();
  }

  changeDetails = () => {
    fetch('http://192.168.0.18:3001/alter_details', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            userID: this.state.userID,
            emailAddress: this.state.newEmail,
            firstName: this.state.newFirstName,
            lastName: this.state.newSurname,
            username: this.state.newUsername,
            password: this.state.newPassword,
            password2: this.state.newPassword2,
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

  _loadUserDetails = async () => {
    var username = this.state.searchText
    fetch(`http://192.168.0.18:3001/profile/${username}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        dataSource: res,
        userID: res[0].idUser,
        UsernameTxt: res[0].Username,
        FirstNameTxt: res[0].First_Name,
        SurnameTxt: res[0].Surname,
        EmailAddressTxt: res[0].Email_Address,
        PasswordTxt: res[0].User_Password,
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
  txtInput:{
    padding: 10,
    alignItems: 'center',
    width: '60%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    margin: 10
  },
});