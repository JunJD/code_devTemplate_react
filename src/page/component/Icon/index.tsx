import React from 'react'
import * as icons from '@ant-design/icons'

const Icon = (props: { icon: string }) => {
    const { icon } = props;
    const antIcon: { [key: string]: any } = icons;
    
    return React.createElement(icon?antIcon[icon]:antIcon["ExclamationOutlined"]);
};

export default Icon