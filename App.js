import React from 'react';
import Main from './components/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore'
// import { registerRootComponent } from 'expo';
import {PersistGate} from 'redux-persist/es/integration/react'
import {Loading} from  './components/LoadingComponent'

const {persistor,store} =configureStore();

export default class App extends React.Component {
  render(){
    return(
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor} >
          <NavigationContainer>
              <Main />
        </NavigationContainer>
       </PersistGate>
    </Provider>)
  }
}
// registerRootComponent(App);