import React from 'react';
import { Navigate, NonIndexRouteObject, useRoutes } from 'react-router-dom';
import Login from '@src/page/Login';
import App from '@src/App';

export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	key?: string;
}

export interface RouteObject {
	caseSensitive?: boolean;
	children?: RouteObject[];
	element?: React.ReactNode;
	index?: boolean;
	path?: string;
	meta?: MetaProps;
	isLink?: string;
}

const metaRouters: never[] = []
// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/app",
		element: <App />,
		// meta: {
		// 	requiresAuth: false,
		// 	title: "主页",
		// 	key: "login"
		// }
	},
	{
		path: "/login",
		element: <Login />,
		// meta: {
		// 	requiresAuth: false,
		// 	title: "登录页",
		// 	key: "login"
		// }
	},
	// ...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

const Router = () => {
	const routes = useRoutes(rootRouter as NonIndexRouteObject[]);
	return routes;
};

export default Router;