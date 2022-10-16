import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
// import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
// import reduxPromise from "redux-promise";
import global from "@src/redux/modules/global/reducer";
// import menu from "./modules/menu";
// import tabs from "./modules/tabs";
import auth from "@src/redux/modules/auth/reducer";
// import breadcrumb from "./modules/breadcrumb";

// create reducer
const reducer = combineReducers({
	global,
	// menu,
	// tabs,
	auth,
	// breadcrumb
});

// redux persist
// const persistConfig = {
// 	key: "redux-state",
// 	storage: storage
// };
// const persistReducerConfig = persistReducer(persistConfig, reducer);

// // redux middleWares
// const middleWares = [reduxThunk, reduxPromise];

// store
export const store = configureStore({
	reducer: reducer,
	// middleware: middleWares,
	devTools: true
});

// create persist store
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();