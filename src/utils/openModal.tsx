import { ConfigProvider } from 'antd'
import React, { ReactNode } from 'react'
import * as ReactDOM from 'react-dom'
import zhCN from 'antd/lib/locale/zh_CN'
function openModal(MyModal:any, config: any) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  let currentConfig = {
    ...config,
    visible: true,
    onCancel: () => {
      if (config.onCancel) {
        config.onCancel()
      }
      close()
    },
    onOk: function() {
      if (config.onOk) {
        config.onOk(...arguments)
      }
      close()
    },
  }

  function render(props: any) {

    setTimeout(() => {

      ReactDOM.render(
        <ConfigProvider locale={zhCN}>
           <MyModal {...props} />
        </ConfigProvider>
          
        ,
        div
      )
    })
  }

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  function close() {
    render({
      ...currentConfig,
      visible: false,
      afterClose: destroy,
    })
  }

  render(currentConfig)
}

export default openModal