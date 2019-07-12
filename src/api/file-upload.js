import request from '@/utils/request'
// 图片上传
export function uploadImg(params) {
    return request({
      url: '/common/file/uploadImg',
      method: 'post',
      params,
    })
  }
