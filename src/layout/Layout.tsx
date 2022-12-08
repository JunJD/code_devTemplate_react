import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout, message } from "antd";
import { RootState, useDispatch, useSelector } from "@src/redux";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import { LoginOutlined } from '@ant-design/icons';

import { setMenuList, updateCollapse } from "@src/redux/modules/menu/reducer";
import myRequest from "@src/utils/myAxios";
import { setAuthRouter } from "@src/redux/modules/auth/reducer";
import { getCookie } from "@src/utils/cookie";
import "./index.less";
import { AuthFlat } from "@src/utils/authFlat";
const { Sider, Content } = Layout;


const LayoutIndex = () => {
	const dispatch = useDispatch();
	const { isCollapse } = useSelector((state: RootState) => state.menu);
	useEffect(()=>{
		const user_name = getCookie('userName') ? getCookie('userName'):''
		myRequest( 'menu/get', { user_name } ).then(res=>{
		  if(res.success){
		  	dispatch(setMenuList(res.result.data.map((item: { path: any; })=>({...item,key:item.path}))))
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
		<>
		<section className="container">
			
			<Sider  width={220} collapsed={isCollapse}  theme="light" >
				<div style={{display:'flex',flexDirection: "column",height:"100%",justifyContent: "space-between"}}>
					<div>
						<div className="logo" />
						<LayoutMenu></LayoutMenu>
					</div>
					<div>

					<div  className="loginOut" onClick={handleLoginOut}>
						<LoginOutlined /><span className={isCollapse? 'dispalyNone':''} ><span>LoginOut</span></span>
					</div>
					</div>
				</div>
				
			</Sider>
			<Layout >
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
		</>
	);
};

export default LayoutIndex;