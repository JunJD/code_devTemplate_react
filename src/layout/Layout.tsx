import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout, message } from "antd";
// import { getAuthorButtons } from "@/api/modules/login";
import { RootState, useDispatch, useSelector } from "@src/redux";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import {
	LoginOutlined
  } from '@ant-design/icons';
import "./index.less";
import { setMenuList, updateCollapse } from "@src/redux/modules/menu/reducer";
import myRequest from "@src/utils/myAxios";
import { setAuthRouter } from "@src/redux/modules/auth/reducer";
import { getCookie } from "@src/utils/cookie";

const { Sider, Content } = Layout;

function AuthFlat(obj: { key: any; children: string | any[]; }, res:any[] = []) { // 默认初始结果数组为[]
	res.push(`/app/${obj.key}`); 
	if (obj.children && obj.children.length) {
	  for(const item of obj.children) {
		AuthFlat(item, res);
	  }
	}
	return res;
}

const LayoutIndex = () => {
	const dispatch = useDispatch();
	const { isCollapse } = useSelector((state: RootState) => state.menu);
	useEffect(()=>{
		const user_name = getCookie('userName') ? getCookie('userName'):''
		myRequest( 'menu/get', { user_name } ).then(res=>{
		  if(res.success){
		  	dispatch(setMenuList(res.result.data))
			const AuthRouter = res.result.data.map((item:any)=>AuthFlat(item)).flat(Infinity)
		  	dispatch(setAuthRouter(AuthRouter))
		  }
		})
	  },[])


	// // 获取按钮权限列表
	// const getAuthButtonsList = async () => {
	// 	const { data } = await getAuthorButtons();
	// 	dispatch(setAuthButtons(data!));
	// };

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true));
				if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false));
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		// getAuthButtonsList();
	}, []);
	
	const handleLoginOut = () => {
		message.success('登出')
	}

	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			<Sider  width={220} collapsed={isCollapse}  theme="dark" >
				<div style={{display:'flex',flexDirection: "column",height:"100%",justifyContent: "space-between"}}>
					<div>
						<div className="logo" />
						<LayoutMenu></LayoutMenu>
					</div>
					<div  className="loginOut" onClick={handleLoginOut}>
						<LoginOutlined /><span className={isCollapse? 'dispalyNone':''} ><span>LoginOut</span></span>
					</div>
				</div>
				
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				{/* <LayoutTabs></LayoutTabs> */}
				<Content>
					{/* TransitionGroup 会导致 useEffect 加载两次 && 使用路由懒加载第一次进入没有动画，所以暂时不用过渡动画了 */}
					{/* <TransitionGroup className="content"> */}
					{/* exit：表示退出当前页面的时候是否有动画 */}
					{/* <CSSTransition key={pathname} timeout={200} classNames="fade" exit={false}> */}
					<Outlet></Outlet>
					{/* </CSSTransition> */}
					{/* </TransitionGroup> */}
				</Content>
				{/* <LayoutFooter></LayoutFooter> */}
			</Layout>
		</section>
	);
};

export default LayoutIndex;