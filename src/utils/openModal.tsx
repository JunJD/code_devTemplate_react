import React, { ReactElement, ReactNode } from 'react'
import * as ReactDOM from 'react-dom'

interface IConfig {
  onClose:()=>void
}

function openModal(MyModal:any, config:IConfig) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  let currentConfig = {
    ...config,
    visible: true,
    onClose: () => {
      if (config.onClose) {
        config.onClose()
      }
      close()
    },
  }

  function render(props:any) {
    // 单线程所以异步
    setTimeout(() => {
      ReactDOM.render(
        <MyModal {...props} />
        ,div
      )
    },0)
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
      afterClose:destroy
    })
  }

  render(currentConfig)
}

export default openModal