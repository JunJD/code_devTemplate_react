import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const NotAuth = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate(`/${process.env.REACT_APP_homePath}`);
	};
	return (
		<div style={{backgroundColor:"#ffffff",height:"100%"}}>
		<Result
			status="404"
			title="404"
			subTitle="对不起，您访问的页面不存在。"
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
		</div>
	);
};

export default NotAuth;