import React from 'react'
import * as icons from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_3734296_gtlqa7xvafn.js',
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript
        '//at.alicdn.com/t/c/font_3709432_1q91aos9764.js' //各行业
        /**
         * icon-lanling-siji 焊工行业
         * icon-lanling-dingyue 报纸行业
         * icon-lanling-ershoujiaoyi 二手交易行业
         * icon-lanling-jixiezulin 机械租赁行业
         * icon-lanling-gongchang 工厂行业
         * icon-lanling-jianzhu 建筑行业
         * icon-lanling-xiangji 摄影行业
         * icon-lanling-wuliu 物流行业
         * icon-lanling-baoxian 保险行业
         * icon-lanling-xiaogong 小工行业
         * icon-lanling-jixie 机械行业
         * ...
         */
      ],
});
const Icon = (props: { icon: string }) => {
    const { icon } = props;
    const antIcon: { [key: string]: any } = icons;

    if(!antIcon[icon]){
        return <IconFont type={icon} />
    }
    return React.createElement(icon?antIcon[icon]:antIcon["ExclamationOutlined"]);
};

export default Icon