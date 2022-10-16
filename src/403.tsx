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
			status="403"
			title="403"
			subTitle="对不起，您没有权限访问此页面。"
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