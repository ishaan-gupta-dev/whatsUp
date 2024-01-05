import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../slices/userSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Blocklist reducers -> we can not make persist store of these reducers.it means exclude reducers from persist store
let blockListReducers = [];

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// const storage =
//   typeof window !== 'undefined'
//     ? createWebStorage('local')
//     : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  // storage,
  storage: AsyncStorage,
  // whitelist: [], //Things you want to persist
  blacklist: blockListReducers, //Things you don't want to persist
};

const rootReducer = combineReducers({
  userReducer: userReducer,
});

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
