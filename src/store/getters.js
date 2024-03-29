const getters = {
  hasShutDown: state => state.app.hasShutDown,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  printStatus: state => state.print.status,
  printInfo: state => state.print.printInfo,
  examSocket: state => state.examSocket.socket.instance,
  queueSocket: state => state.queueSocket.socket.instance,
  examId: state => (state.exam.examInfo ? state.exam.examInfo.id : null),
  machineNum: state =>
    state.exam.examInfo ? state.exam.examInfo.machineNum : null,
  currentMachineNo: state => state.exam.currentMachineNo,
  errorMsgExam: state => state.exam.errorMsg,
  examEnabled: state => state.exam.enabled,
  machineReady: state => state.exam.machineReady,
  canNext: state => state.exam.canNext,
  machineExisted: state => state.exam.existed,
  machineList: state => state.queue.machineList,
  queue: state => state.queue.queue,
  nowTime: state => state.queue.nowTime,
  errorMsgQueue: state => state.queue.errorMsgQueue,
  examInfo: state => state.exam.examInfo,
  total: state => state.queue.total,
  currentCandidate: state => state.exam.currentCandidate,
  currentCandidateStatus: state => state.exam.currentCandidateStatus,
  jobsEntity: state => (state.exam.jobsEntity ? state.exam.jobsEntity : null),
  unitsEntity: state =>
    state.exam.unitsEntity ? state.exam.unitsEntity : null,
  examQuestions: state => state.exam.questions,
  queueReady: state => state.queue.ready,
  queueConnectExam: state => state.queue.connectExam
}
export default getters
