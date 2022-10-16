import { RouteObject } from "react-router-dom";

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
interface Imeta {
	requiresAuth: false | undefined,
	title: string,
	key: string
}
interface fRouteObject {
	meta:Imeta
}
type IRouteObject = Partial<RouteObject & fRouteObject>
 export const searchRoute = (path: string, routes: any[] = []): IRouteObject => {
	let result: RouteObject = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};