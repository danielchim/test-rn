import React, { useState } from 'react';
import { View, Text, Avatar, Card, Button, ActionSheet, LoaderScreen, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import getApi from './../modules/Fetch';

const VocabCard = ({ vocab, translation, sentence }) => {
    // const card = GetData.forEach((categories)=> {
    return (
        <Card style={{ marginBottom: 10 }} onPress={() => { }}>
            <Card.Section
                bg-white
                content={[
                    { text: vocab, text20: true, grey10: true },
                    { text: translation, text50: true, grey50: true },
                    { text: sentence, text70: true, grey10: true }
                ]}
                style={{ padding: 20 }}
            />
            <Button
                text50
                link
                style={{ marginBottom: 20 }}
                label="Record"
                onPress={getApi.insertVocabs()}
            />

        </Card>
    );
}

const PractiseScreen = ({ navigation, route }) => {
    const { id } = route.params;
    const [vocabs, setVocabs] = useState([]);
    const [page, setPage] = useState(1);
    console.log(id);
    useFocusEffect(
        React.useCallback(() => {
            async function getData(id, pages) {
                getApi.getTopicVocabs(id, pages).then((result) => {
                    setVocabs(result.data.vocabList);
                    console.log(result.data.vocabList);
                });
            }
            getData(id, 1);
            return () => {
                console.log('vocab fetched');
            };
        }, [page])
    );

    return (
        <View useSafeArea={false} flex top paddingT-50 paddingB-20 paddingH-10 backgroundColor={"#F9F9FC"}>
            <View row spread top marginB-20>
                <Text h1>Practise</Text>
            </View>
            <ScrollView>
                {vocabs.length !== 0 ? vocabs.map(singleVocab => <VocabCard marginT-10 key={singleVocab.vocabId} vocab={singleVocab.vocab} translation={singleVocab.chineseTranslation} sentence={singleVocab.exampleSentence} />) : <Text centerv h1>It is empty</Text>}
            </ScrollView>

        </View>
    );
}

export default PractiseScreen;
