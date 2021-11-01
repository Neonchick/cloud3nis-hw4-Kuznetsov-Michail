import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Notes extends React.Component {

    constructor(props) {

        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress = () => {
        this.props.navigation.navigate('EditNote', { handleSaveNode: this.props.handleSaveNode, note: this.props.note })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.note.name !== '' && (
                    <Text style={styles.nameText}>{this.props.note.name}</Text>
                )}
                {this.props.note.description !== '' && (
                    <Text style={styles.descriptionText}>{this.props.note.description}</Text>
                )}
                {this.props.note.image && (
                    <Image style={styles.image} source={{ uri: this.props.note.image }} />
                )}
                <View style={styles.buttonСontainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handlePress}>
                        <Text style={styles.buttonText}>Редактировать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    container: {
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#121212',
    },

    textContainer: {
        height: 30,
        justifyContent: 'center',
    },

    image: {
        height: 300,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 5,
    },

    buttonСontainer: {
        flex: 1,
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#8A2BE2',
        borderRadius: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    nameText: {
        marginBottom: 15,
        borderRadius: 20,
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },

    descriptionText: {
        marginBottom: 5,
        borderRadius: 20,
        color: 'white',
        fontSize: 16,
        textAlignVertical: 'top'
    },

})