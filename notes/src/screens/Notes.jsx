import React from 'react';
import NoteView from '../components/NoteView';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default class Notes extends React.Component {

    emptyNote = {
        id: null,
        name: '',
        description: '',
        image: null,
    }

    constructor(props) {

        super(props);

        this.state = {

            notes: [],

        }

        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        this.props.navigation.navigate('CreateNote', { handleSaveNode: this.onNoteCreate, note: this.emptyNote })
                    }}>
                    <Text style={styles.addText}>Создать</Text>
                </TouchableOpacity>
            ),
        });

        this.onNoteCreate = this.onNoteCreate.bind(this);
        this.onNoteRedact = this.onNoteRedact.bind(this);
    }

    onNoteCreate(note) {
        var newNotes = Object.assign([], this.state.notes);
        newNotes.push(note);
        this.setState({ notes: newNotes });
    }

    onNoteRedact(note) {
        var newNotes = Object.assign([], this.state.notes);
        newNotes = newNotes.map((currentNote) =>
            (currentNote.id === note.id) ? note : currentNote
        );
        this.setState({ notes: newNotes });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.notes.length !== 0
                        ?
                        (
                            <FlatList
                                data={this.state.notes}
                                renderItem={({ item }) => <NoteView note={item} navigation={this.props.navigation} handleSaveNode={this.onNoteRedact} />}
                                extraData={this.state.notes}
                            />
                        )
                        :
                        <Text style={styles.noNotesText}>{"Записей нет"}</Text>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    noNotesText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },

    addButton: {
        backgroundColor: '#8A2BE2',
        borderRadius: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    addText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

})