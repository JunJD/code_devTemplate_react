import React from 'react';
import { Navigate, NonIndexRouteObject, useRoutes } from 'react-router-dom';
import Login from '@src/page/Login';
import { LayoutIndex /*懒加载*/ } from '@src/layout/index'
import ErrorBoundary from '@src/page/ErrorBoundary';
import lazyLoad from './utils/lazyLoad';
import UserAdmin from '@src/page/AuthorityCenter/UserAdmin';
import MenuManagement from '@src/page/AuthorityCenter/MenuManagement';
export interface RouteObject extends  NonIndexRouteObject{
	label?:string,
	children?:RouteObject[]
}

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path:'/app',
		element:<LayoutIndex/>,
		errorElement:<ErrorBoundary/>,
		children:[
			{
				path: "/app/Home",
				element: lazyLoad(React.lazy(() => import("@src/page/Home"))),
				label:"主页"
			},
			{
				path: "/app/AuthorityCenter",
				label:"权限中心",
				children:[
					{
						path: "/app/AuthorityCenter/UserAdmin",
						element: <UserAdmin/>,
						label:"用户账户",
						handle:{
							requiresAuth: true
						}
					},
					{
						path: "/app/AuthorityCenter/MenuManagement",
						element: <MenuManagement/>,
						label:"菜单管理",
						handle:{
							requiresAuth: true
						}
					},
				]
			},
		]
	},
	{
		path: "/403",
		element: lazyLoad(React.lazy(() => import("@src/403")))
	},
	{
		path: "/404",
		element: lazyLoad(React.lazy(() => import("@src/404")))
	},
	
	{
		path: "/login",
		element: <Login />,
		label:'登录页面'
	},
	// ...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

const Router = () => {
	const routes = useRoutes( rootRouter );
	return routes;
};

export default Router;
