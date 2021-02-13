import '../styles/globals.css'
import { Provider } from 'react-redux'
import  {useStore, persistor} from '../src/redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'


function MyApp(props) {
  const { Component, pageProps } = props;
  const   store= useStore(props.initialReduxState);  
  return (
    <div>
       <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp
