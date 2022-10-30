import { Layout, Segmented } from "antd";
import CollapseIcon from "./component/CollapseIcon";
import Fullscreen from "./component/Fullscreen";
import "./index.less";
import { SegmentedValue } from "antd/lib/segmented";
import Icon from "@src/page/component/Icon";

const handleModelBackground = (value: SegmentedValue) => {
	const body = document.body as HTMLElement;
	if(value !== 'baitianmoshi'){
		body.setAttribute("style", "filter: invert( 80% )")
	}else{
		body.setAttribute("style", "")
	}
}
const LayoutHeader = () => {
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				
			</div>
			<div className="header-lr">
						<Segmented
						  size="large"
						  defaultValue='baitianmoshi'
						  onChange={handleModelBackground}
						  options={[
						    {
						      value: 'baitianmoshi',
						      icon:   <Icon icon="icon-baitianmoshi" />,
						    },
						    {
						      value: 'heiyemoshi',
						      icon:   <Icon icon="icon-heiyemoshi" />,
						    },
						  ]}
						/>
				<Fullscreen/>
				<div className="avatar">
					me
				</div>
			</div>
		</Header>
	);
};

export default LayoutHeader;