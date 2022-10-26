import React, { useEffect, useState } from "react";

const useNowSize = () => {
    const [nowSize, setNowSize] = useState(document.body.clientWidth / Number(process.env.REACT_APP_SCREENWIDTH))

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				setNowSize(document.body.clientWidth / Number(process.env.REACT_APP_SCREENWIDTH));
			})();
		};
	};

    useEffect(() => {
		listeningWindow();
	}, []);
    return [ nowSize ]
}

export default useNowSize