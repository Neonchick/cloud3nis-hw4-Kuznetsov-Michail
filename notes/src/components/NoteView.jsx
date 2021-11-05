import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { deleteNote } from "../modules/notes/actions";
import { connect } from 'react-redux';
import { selectNotes } from "../modules/notes/selectors";

class NoteView extends React.Component {

    constructor(props) {

        super(props);

        this.editNote = this.editNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    editNote = () => {
        this.props.navigation.navigate('EditNote', { note: this.props.note })
    }

    deleteNote = () => {
        this.props.deleteNote(this.props.note);
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
                        onPress={this.editNote}>
                        <Text style={styles.buttonText}>Открыть</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.deleteNote}>
                        <Text style={styles.buttonText}>Удалить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default connect(null, { deleteNote })(NoteView);

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