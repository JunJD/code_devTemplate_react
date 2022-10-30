import myRequest from "@src/utils/myAxios";
import { Avatar, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less'
import Icon from "@src/page/component/Icon";
const RoleManagement = () => {
    const [ loading, steLoading ] = useState(false)
    const [ roleData, setRoleData ] = useState<any[]>([])
    useEffect(()=>{
        steLoading(true)
        myRequest('role/get/all',{}).then(
            res => {
                res.success && setRoleData(res.result.data.map((item: { id: any; label: any; description: any; })=>(
                    {
                        key: item.id + item.label,
                        title: item.label,
                        description: item.description
                    }
                )))
                steLoading(false)
            }
        )
    }, [])
    return (
        <div className="roleMContainer">
                    <Card
                        style={{ width: 300, marginTop: 16,color: '#444fff', cursor: "pointer" }}
                    >
                        <div style={{fontSize:'60px',textAlign:'center',color:'#444fff'}}><Icon icon="PlusOutlined"/></div>
                    </Card>
            { roleData.map(item=>{
                return (
                    <Card
                        style={{ width: 300, marginTop: 16 }}
                        actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={item.title}
                            description={item.description}
                        />
                        </Skeleton>
                    </Card>
                )
            }) }
        </div>
    )
}

export default RoleManagement