import { Layout } from "antd";
// import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./component/CollapseIcon";
// import BreadcrumbNav from "./components/BreadcrumbNav";
// import AssemblySize from "./components/AssemblySize";
// import Language from "./components/Language";
// import Theme from "./components/Theme";
import Fullscreen from "./component/Fullscreen";
import "./index.less";

const LayoutHeader = () => {
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
			</div>
			<div className="header-lr">
				<Fullscreen/>
				<div className="avatar">
					me
				</div>
			</div>
		</Header>
	);
};

export default LayoutHeader;