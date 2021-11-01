import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './src/screens/Notes';
import EditNote from './src/screens/EditNote';

export default class App extends React.Component {

    render() {
        const Stack = createNativeStackNavigator();

        return (
            <NavigationContainer>


                
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#121212',
                        },
                        headerTintColor :'white',
                    }}>
                    <Stack.Screen name="Notes" component={Notes} options={{title: "Список задач"}}/>
                    <Stack.Screen name="CreateNote" component={EditNote} options={{title: "Создание задачи"}}/>
                    <Stack.Screen name="EditNote" component={EditNote} options={{title: "Редактирование"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}
