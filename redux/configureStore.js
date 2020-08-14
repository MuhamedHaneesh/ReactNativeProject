import { createStore, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { InitialFeedback } from './forms';
import {favorites} from './favorites'
import {dishes} from './dishes';
import {comments} from './comments';
import {promotions} from './promotions';
import {leaders} from './leaders';
import {persistStore,persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native'
    
export const configureStore = () => {

    const config ={
        key:'root',
        storage:AsyncStorage,
        debug:true
    };

    const store = createStore(
        persistCombineReducers(config,{   
            dishes,
            comments,
            promotions,
            leaders,
            favorites
            // ...createForms({feedback: InitialFeedback})
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor =persistStore(store)
    return {persistor, store};
};