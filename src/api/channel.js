import request from '@/utils/request'
export const getChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getChannelList = (data) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params: data
  })
}
