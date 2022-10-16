import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { RootState, useDispatch, useSelector } from "@src/redux";
import { updateCollapse } from "@src/redux/modules/menu/reducer";

const CollapseIcon = () => {
	const dispatch = useDispatch();
	const { isCollapse } = useSelector((state: RootState) => state.menu);

	return (
		<div
			className="collapsed"
			onClick={() => {
                console.log(isCollapse)
				dispatch(updateCollapse(!isCollapse));
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

export default CollapseIcon;