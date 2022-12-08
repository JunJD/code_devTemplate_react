import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer,FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER } from "redux-persist";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
// import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
// import reduxPromise from "redux-promise";
import global from "@src/redux/modules/global/reducer";
import menu from "@src/redux/modules/menu/reducer";
// import tabs from "./modules/tabs";
import auth from "@src/redux/modules/auth/reducer";
import storage from "redux-persist/lib/storage";
// import breadcrumb from "./modules/breadcrumb";

// create reducer
const reducer = combineReducers({
	global,
	menu,
	// tabs,
	auth,
	// breadcrumb
});

// redux persist
const persistConfig = {
	key: "redux-state",
	storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// // redux middleWares
// const middleWares = [reduxThunk, reduxPromise];

// store
export const store = configureStore({
	reducer: persistReducerConfig,
	// middleware: middleWares,
	middleware: getDefaultMiddleware({
		serializableCheck: {
		  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	  }),
	devTools: true
});

// create persist store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();