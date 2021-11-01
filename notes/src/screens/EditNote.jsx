import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, Image, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default class EditNote extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            name: this.props.route.params.note.name,
            description: this.props.route.params.note.description,
            image: this.props.route.params.note.image,
            loading: false,
            hasMediaLibraryPermissions: false,
        }

        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onSave}>
                    <Text style={styles.buttonText}>Сохранить</Text>
                </TouchableOpacity>
            ),
        });

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Извините, приложению нужно разрешение на доступ к камере, чтобы загрузить изображение! Добавте разрешение приложению в настройках.');
            } else {
                this.setState({ hasMediaLibraryPermissions: true });
            }
        })();

        this.pickImage = this.pickImage.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    pickImage = async () => {
        if (this.state.hasMediaLibraryPermissions) {
            this.setState({ loading: true });
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                this.setState({ image: result.uri, loading: false });
            }
        } else {
            alert('Извините, приложению нужно разрешение на доступ к камере, чтобы загрузить изображение! Добавте разрешение приложению в настройках.');
        }
    };

    onSave = () => {

        var id;
        if (this.props.route.params.note.id !== null) {
            id = this.props.route.params.note.id
        } else {
            id = Date.now()
        }

        console.log(id);

        this.props.route.params.handleSaveNode({
            id: id,
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
        })

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.nameText}
                    placeholder='Название'
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    value={this.state.name}
                    onChangeText={text => { this.setState({ name: text }) }}
                />
                <TextInput
                    style={styles.descriptionText}
                    placeholder='Описание'
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                    value={this.state.description}
                    multiline={true}
                    onChangeText={text => { this.setState({ description: text }) }}
                />
                {this.state.image && (
                    <Image style={styles.image} source={{ uri: this.state.image }} />
                )}
                {
                    this.state.loading && (<ActivityIndicator style={styles.activityIndicator} size="large" />)
                }
                <View style={styles.buttonСontainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.pickImage}>
                        <Text style={styles.buttonText}>Изменить изображение</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },

    buttonСontainer: {
        flex: 1,
        alignItems: 'center',
    },

    image: {
        height: 300,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 5,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 15,
        borderRadius: 20,
        backgroundColor: '#121212',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    descriptionText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 5,
        borderRadius: 20,
        backgroundColor: '#121212',
        color: 'white',
        fontSize: 16,
        minHeight: 200,
        textAlignVertical: 'top'
    },

    activityIndicator: {
        marginTop: 10,
        marginBottom: 5,
    }

})