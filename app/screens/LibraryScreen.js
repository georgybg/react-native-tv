import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class LibraryScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{textAlign:"center", color:"#000"}}>Library</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
