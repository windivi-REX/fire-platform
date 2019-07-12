import request from '@/utils/request';
// 考试平均分数
export function getAvgScore(params) {
  return request({
    url: '/aqpx/statistics/avgScore',
    method: 'get',
    params,
  });
}
// 考核总人数
export function getHeadcount(params) {
  return request({
    url: '/aqpx/statistics/headcount',
    method: 'get',
    params,
  });
}
// 考核通过人数
export function getPassNumber(params) {
  return request({
    url: '/aqpx/statistics/passNumber',
    method: 'get',
    params,
  });
}
// 考核通过率
export function getPassRate(params) {
    return request({
      url: '/aqpx/statistics/passRate',
      method: 'get',
      params,
    });
}
// 一次性通过考核人数
export function getFirstTimePassNum(params) {
    return request({
      url: '/aqpx/statistics/firstTimePassNum',
      method: 'get',
      params,
    });
}
// 人均考试时间
export function getAvgTimeConsuming(params) {
    return request({
      url: '/aqpx/statistics/avgTimeConsuming',
      method: 'get',
      params,
    });
}
