import React from 'react';
import {Button} from 'antd'
import MentionsInput, { DataSourceObject } from '@src/page/component/mentionsInput';
function MentionsInputDemo() {

  const data:DataSourceObject[]=[ 
    {value:'10', label:"扬尼斯·阿德托昆博" },
    {value:'11', label:"卢卡·东契奇"},
    {value:'12', label:"乔尔·恩比德"},
    {value:'13', label:"尼古拉·约基奇"},
    {value:'14', label:"帕斯卡尔·西亚卡姆"},
    {value:'15', label:"克里斯塔普斯·波尔津吉斯"},
    {value:'16', label:"艾尔·霍福德"},
    {value:'17', label:"尼古拉·武切维奇"}, 
    {value:'18', label:"鲁迪·戈贝尔"},
    {value:'19', label:"本·西蒙斯"},
] 

const handleFetch = (query: string) => {
  return new Promise<DataSourceObject[]>(resolve=>{
    setTimeout(() => {
      console.log(query,'<===这是值')
      const result = data.filter(item=>{
        if( !query ) return true
        return item.label?.includes(query) || item.value?.includes(query)
      })
      resolve(result) // 模拟一下异步请求
    }, 500);
  })
}
  return (
        <MentionsInput
          fetchSuggestions={ handleFetch } // 异步请求数据
          placeholder='这是input 提及框，尝试键入“@”'
          size="large" // 尺寸
          onSelect={(item)=>{console.log(item)}} // 选择数据
          // data={data} // 数据
          // ...reseProps // 其他props
          // renderOption={()={return ...}} // 自定义渲染列表
          // value={value} // 输入框的值
        />
  );
}
export default MentionsInputDemo;
