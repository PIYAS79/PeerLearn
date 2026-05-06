// import { configureStore } from "@reduxjs/toolkit"
// import baseApi from "./api/baseApi";
// import timeLineReducer from './features/timeLineSlice';
// import authReducer from './features/authSlice';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'


// const persistConfig = {
//     key: 'auth',
//     storage
// }

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);


// export const store = configureStore({
//     reducer: {
//         [baseApi.reducerPath]: baseApi.reducer,
//         timeline: timeLineReducer,
//         auth: persistedAuthReducer,
//     },
//     devTools: true,
//     middleware: getDefaultMiddleware => getDefaultMiddleware({
//         serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//         }
//     }).concat(baseApi.middleware),
// })



// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch



import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import { baseApi } from "./api/baseApi";
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;