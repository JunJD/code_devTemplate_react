export function AuthFlat(obj: { path: any; children: string | any[]; }, res:any[] = []) { // 默认初始结果数组为[]
	res.push(`/app/${obj.path}`); 
	if (obj.children && obj.children.length) {
	  for(const item of obj.children) {
		AuthFlat(item, res);
	  }
	}
	return res;
}