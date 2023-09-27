import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Pusher from "pusher-js";

import './index.css'
import { StoreDataProvider } from './global/store.jsx'
import { PusherProvider } from './global/PusherContext.jsx'


const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,

});

ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreDataProvider>
      <PusherProvider pusher={pusher}>
        <App />
      </PusherProvider>
    </StoreDataProvider>
)
