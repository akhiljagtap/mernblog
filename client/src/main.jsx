import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persiststore } from "./redux/store.js"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Theme from "./components/Theme.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persiststore}>

    <Provider store={store}>
      <Theme>
        <App />
      </Theme>

    </Provider>

  </PersistGate>

)


















