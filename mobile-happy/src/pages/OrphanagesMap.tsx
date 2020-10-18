import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/MapMarker.png';
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap()
{
    const navigation = useNavigation()
    function navigateToDetails()
    {
        navigation.navigate("OrphanageDetails");
    }

    return(
        <View style={styles.container}>
        <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map} 
            initialRegion={{
            latitude: -10.9137696,
            longitude: -37.0466949,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
            }}
        >
            <Marker calloutAnchor={{x:2.7, y:0.8}} icon={mapMarker} coordinate={{latitude:-10.9137696, longitude: -37.0466949}}>
            <Callout tooltip onPress={navigateToDetails}>
                <View style={styles.calloutView}>
                    <Text style={styles.calloutText}>Eae beleza</Text>
                </View>
            </Callout>
            </Marker>
        </MapView>
        <View style={styles.footer}>
            <Text style={styles.footerText}>2 orfanatos encontrados</Text>
            <TouchableOpacity style={styles.createOphanageButton} onPress={() => {}}>
            <Feather name="plus" size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutView: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText: {
      color: '#0089A5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      borderRadius: 20,
      backgroundColor: "#FFF",
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 3
    },
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
    createOphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15C3D6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  