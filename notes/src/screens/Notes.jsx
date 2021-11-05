import React from 'react';
import NoteView from '../components/NoteView';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { selectNotes, selectIsLoaded } from "../modules/notes/selectors";
import { connect } from 'react-redux';
import { ThemeProvider } from '@react-navigation/native';
import { loadNotes } from "../modules/notes/actions";

class Notes extends React.Component {

    emptyNote = {
        id: null,
        name: '',
        description: '',
        image: null,
    }

    constructor(props) {
        super(props);

        if (!this.props.isLoaded) {
            this.props.loadNotes();
        }

        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        this.props.navigation.navigate('CreateNote', { note: this.emptyNote })
                    }}>
                    <Text style={styles.addText}>Создать</Text>
                </TouchableOpacity>
            ),
        });
    }

    render() {
        let notes = this.props.notes.notes;
        return (
            <View style={styles.container}>
                {
                    notes.size !== 0
                        ?
                        (
                            <FlatList
                                data={Array.from(notes.values())}
                                renderItem={({ item }) => <NoteView note={item} navigation={this.props.navigation} />}
                                keyExtractor={ (item) => item.id.toString() }
                            />
                        )
                        :
                        <Text style={styles.noNotesText}>{"Записей нет"}</Text>
                }
            </View>
        );
    }

}

const mapStateToProps = state => ({
    notes: selectNotes(state),
    isLoaded: selectIsLoaded(state)
})

export default connect(mapStateToProps, { loadNotes })(Notes)

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