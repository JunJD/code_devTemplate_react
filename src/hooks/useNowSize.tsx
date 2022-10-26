import React, { useEffect, useState } from "react";

const useNowSize = () => {
    const [nowSize, setNowSize] = useState(document.body.clientWidth / 1920)

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				setNowSize(document.body.clientWidth / 1920);
			})();
		};
	};

    useEffect(() => {
		listeningWindow();
	}, []);
    return [ nowSize ]
}

export default useNowSize