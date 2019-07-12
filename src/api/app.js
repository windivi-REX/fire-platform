import request from '@/utils/request';
export const testCardNo = '510902199302033201';
export const testExamId = 25;
export function getExamInfo() {
  return request({
    url: '/api/exam',
    method: 'get',
  });
}

export function postArrangeCandidate(params) {
  const defaultTest = {
    address: '成都',
    born: '1997-01-01',
    cardNo: testCardNo,
    examId: testExamId,
    name: '布鲁斯杨',
    police: '中国',
    userLifeBegin: '24h',
    userLifeEnd: '24h',
    nation: '汉',
    photoBase64: 'data:image',
    sex: '1',
  };
  params = { ...defaultTest, ...params };
  return request({
    url: `/api/exam/savePeople`,
    method: 'post',
    params,
  });
}

export function postArrangeCandidateTwo(
  params = {
    address: '成都',
    born: '1997-01-01',
    cardNo: '51300119930530003x',
    examId: 1,
    name: 'JayceYang',
    police: '中国',
    userLifeBegin: '24h',
    userLifeEnd: '24h',
    nation: '汉',
    photoBase64: 'data:image',
    sex: '1',
  },
) {
  return request({
    url: '/examMachine/jump',
    method: 'post',
    params,
  });
}

// 下一位
export function nextExamineeReady(params) {
  const { examId, machineNo } = params;
  return request({
    url: `/examMachine/callNext/${examId}/${machineNo}`,
    method: 'post',
  });
}
// 暂停考试
export function pauseExaminee(params) {
  const { examId, machineNo } = params;
  return request({
    url: `/examMachine/pause/${examId}/${machineNo}`,
    method: 'post',
  });
}

export function postCheckCandidate(params) {
  const defaultTest = { cardNo: testCardNo, examId: testExamId };
  params = { ...defaultTest, ...params };
  const { cardNo, examId } = params;
  return request({
    url: `/api/exam/checkPeople`,
    method: 'post',
    params: { cardNo, examId },
  });
}

export function getCandidateInfo(params) {
  if (params.examId && params.machineNo) {
    return request({
      url: `/api/exam/getPeopleInfo`,
      method: 'get',
      params,
    });
  }
}
export function updateCandidateInfo(params) {
  if (params.examId && params.machineNo && params.peopleId) {
    return request({
      url: `/api/exam/updatePeopleInfo/${params.id}`,
      method: 'post',
      params,
    });
  }
}
export function fetchQuestionsInfo(params) {
  return request({
    url: `/api/exam/getExamQuestionForPeople/${params.peopleId}`,
    method: 'get',
    params,
  });
}

export function postExamResult(params) {
  return request({
    url: `/api/exam/validateExam`,
    method: 'post',
    params,
  });
}

export function getCandidateExamResult(
  params = {
    cardNo: testCardNo,
  },
) {
  return request({
    url: `/aqpx/grade/ID-Number`,
    method: 'get',
    params,
  });
}
