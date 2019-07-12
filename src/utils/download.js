import axios from 'axios'
import {
  getToken
} from './auth'
import {
  Message
} from 'element-ui'

const defaultDownloadGetOption = {
  method: 'get',
  url: '',
  params: {
    paramStartTime: '',
    paramEndTime: ''
  },
  headers: {
    token: getToken()
  },
  responseType: 'blob'
}

export function downloadFile(params) {
  axios({
      ...defaultDownloadGetOption,
      url: process.env.VUE_APP_API + params.url,
      params: {
        paramStartTime: params.paramStartTime,
        paramEndTime: params.paramEndTime
      }
    })
    .then(res => {
      download(res.data)
      Message({
        message: '文件已成功导出',
        type: 'success',
        duration: 2 * 1000
      })
    })
    .catch(error => {
      console.log(error)
    })
}

function download(data) {
  if (!data) {
    return
  }
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const date = new Date().toLocaleDateString()
  link.setAttribute('download', `${date}.xlsx`)
  document.body.appendChild(link)
  link.click()
}

export function downloadFileIE(params) {
  window.open(`${process.env.VUE_APP_API}${params.url}?token=${getToken()}`)
}
