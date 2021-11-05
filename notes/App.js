import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './src/screens/Notes';
import EditNote from './src/screens/EditNote';
import rootReducer from './src/modules/reducer';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./src/modules/sagas";

export default class App extends React.Component {

    render() {

        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            rootReducer,
            applyMiddleware(sagaMiddleware)
        )

        const Stack = createNativeStackNavigator();

        window.store = store;
        sagaMiddleware.run(rootSaga);

        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#121212',
                            },
                            headerTintColor: 'white',
                        }}>
                        <Stack.Screen name="Notes" component={Notes} options={{ title: "Список задач" }} />
                        <Stack.Screen name="CreateNote" component={EditNote} options={{ title: "Создание задачи" }} />
                        <Stack.Screen name="EditNote" component={EditNote} options={{ title: "Редактирование" }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

}
