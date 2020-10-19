import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props{
    title: string;
    showX?: boolean;
}

export default function Header({title, showX = true}: Props)
{
    const navigation = useNavigation();

    function navigateToHomepage()
    {
        navigation.navigate('OrphanagesMap');
    }
    return(
        <View style={styles.container}>
            <BorderlessButton>
                <Feather name="arrow-left" size={24} color="#15bcd6" onPress={navigation.goBack}/>
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
            {showX ? (
                <BorderlessButton>
                    <Feather name="x" size={24} color="#ff669d" onPress={navigateToHomepage}/>
                </BorderlessButton>
            ) : (
                <View />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 24,
        backgroundColor: '#F9FAFC',
        borderBottomWidth: 1,
        borderColor: '#3de3f0',
        paddingTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    title:{
        fontFamily: 'Nunito_600SemiBold',
        color: '#8FA7B3',
        fontSize: 16
    }
});