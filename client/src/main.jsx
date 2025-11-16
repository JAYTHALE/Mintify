import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import reduxStore from './redux/store.js'
import { CartProvider } from './components/User/CardContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </React.StrictMode>,
)
