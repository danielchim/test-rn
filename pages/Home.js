import React, { useState } from 'react';
import { View, Text, Avatar, Card, Button, ActionSheet,LoaderScreen, Colors  } from 'react-native-ui-lib';
import { ScrollView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import getApi from './../modules/Fetch';

const avatarImage = require('../assets/avatar.jpg');
const cardImage = require('../assets/maxresdefault.jpg');

const CategoryCards = ({ navigation, title, imageSrc, catId }) => {
  // const card = GetData.forEach((categories)=> {
  return (
    <Card style={{ marginBottom: 10 }} onPress={() => navigation.push('Practise', { id: catId })}>
      <Card.Section imageSource={imageSrc ? { uri: `http://128.199.197.6:3000/${imageSrc}` } : cardImage} imageStyle={{ height: 180, width: '100%' }} />
      <Card.Section
        bg-white
        content={[
          { text: title, text50: true, grey10: true },
        ]}
        style={{ padding: 20 }}
      />
    </Card>
  );
}

const LoadingScreen = () => {
  return (
    <LoaderScreen color={Colors.blue30} message="Loading..." overlay />
  );
}
const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      })
      async function getData(type) {
        getApi.getCategories(type).then((result) => {
          console.log(result.data);
          setLoading(false);
          setCategories(result.data);
        });
      }
      getData(type);
      return () => {
        console.log('List fetched');
        console.log(loading);

      };
    }, [type])
  );
  if(loading){
    return(
      <View useSafeArea={true} flex top paddingT-50 paddingB-20 paddingH-20 backgroundColor={"#F9F9FC"}>
      <View row spread top marginB-20>
        <Text h1>Categories</Text>
        <Avatar source={avatarImage} />
      </View>
      <LoadingScreen></LoadingScreen>
    </View>
    );
  }

  return (
    <View useSafeArea={true} flex top paddingT-50 paddingB-20 paddingH-20 backgroundColor={"#F9F9FC"}>
      <View row spread top marginB-20>
        <Text h1>Categories</Text>
        <Avatar source={avatarImage} />
      </View>
      <Button
        absR={true}
        text60
        link
        style={{ marginBottom: 20 }}
        label="Filter"
        onPress={() => setShowActionSheet(true)}
      />
      <ScrollView>
        {categories.length !== 0 ? categories.map(category => <CategoryCards marginT-10 key={category.topicId} title={category.topic} imageSrc={category.iconUrl} navigation={navigation} catId={category.topicId} />) : <Text centerv h1>It is empty</Text>}
      </ScrollView>
      <ActionSheet
        title='Filter option'
        message='Message of action sheet'
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        useNativeIOS={false}
        options={[
          { label: 'All', onPress: () => setType("all") },
          { label: 'Dse', onPress: () => setType("dse") },
          { label: 'ITELS', onPress: () => setType("ielts") },
        ]}
        visible={showActionSheet}
        onDismiss={() => setShowActionSheet(false)}
      />
    </View>
  );
}

export default HomeScreen;
