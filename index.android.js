/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ListView,
  Linking
} from 'react-native';
import { Container, Header, Body, Title, Content, Card, CardItem, Left, Thumbnail, Text, Right, Button, Icon } from 'native-base'
const mockUrl = 'http://rallycoding.herokuapp.com/api/music_albums';

export default class Project02 extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  loadJSONData() {

    fetch(mockUrl, { method: "GET" })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseData) });

      })
      .done(() => {


      });


  }
  componentWillMount() {
    this.loadJSONData();
  }
  renderRow(rowData) {
    return (
      <Card style={{ margin: 10 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: rowData.thumbnail_image }} />
            <Body>
              <Text>{rowData.title}</Text>
              <Text note>{rowData.artist}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Body>
            <Image source={{ uri: rowData.image }} style={{ resizeMode: 'cover', alignSelf: 'stretch', height: 200 }} />
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Button onPress={()=>Linking.openURL(rowData.url)}  block>
              <Icon name="md-basket"/>
              <Text>Buy Now!!!</Text>
            </Button>
            </Body>
        </CardItem>
      </Card>
    );
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Project 02</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Project02', () => Project02);
