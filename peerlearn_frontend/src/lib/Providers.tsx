"use client"

import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
// import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            {children}
            {/* </PersistGate> */}
        </Provider>
    )
}

export default Providers