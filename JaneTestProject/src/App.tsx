import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './AppNavigator';
import reducers from './reducers';

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
};

export default App