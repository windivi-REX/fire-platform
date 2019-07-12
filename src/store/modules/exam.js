const exam = {
  state: {
    examInfo: undefined,
    currentMachineNo: undefined, // 实际注册
    errorMsg: undefined,
    enabled: undefined,
    machineReady: undefined,
    canNext: undefined,
    existed: undefined,
    currentCandidate: {},
    currentCandidateStatus: null,
    unitsEntity: undefined,
    jobsEntity: undefined,
    questions: {}
  },
  mutations: {
    AFTER_EXAM_OVER (state) {
        debugger
      state.currentCandidate = {}
      state.questions = {}
      state.unitsEntity = undefined
      state.jobsEntity = undefined
      state.currentCandidateStatus = null
    },
    SET_CURRENTCANDIDATE_STATUS (state, status) {
      state.currentCandidateStatus = status
    },
    SET_EXAM_QUESTIONS (state, questions) {
      state.questions = Object.assign(state.questions, questions)
    },
    SET_CURRENTCANDIDATE_UNIT (state, unit) {
      const unitCopy = { ...unit }
      unitCopy.unitId = unitCopy.id
      delete unitCopy.id
      state.currentCandidate = Object.assign(state.currentCandidate, unitCopy)
    },
    SET_UNITS_ENTITY (state, entity) {
      state.unitsEntity = entity
    },
    SET_JOBS_ENTITY (state, entity) {
      state.jobsEntity = entity
    },
    SET_CANDIDATE_JOB (state, job) {
      for (const attr in job) {
        if (attr !== 'id') {
          state.currentCandidate[attr] = job[attr]
        } else if (attr === 'id') {
          state.currentCandidate['jobId'] = job[attr]
        }
      }
    },
    SET_CURRENT_CANDIDATE (state, currentCandidate) {
      if (currentCandidate.sex === '1') {
        currentCandidate.sex = '男'
      } else if (currentCandidate.sex === '0') {
        currentCandidate.sex = '女'
      } else {
        currentCandidate.sex = '未知'
      }
      currentCandidate.peopleId = currentCandidate.id
      currentCandidate.examId = state.examInfo.id
      currentCandidate.machineNo = state.currentMachineNo
      state.currentCandidate = Object.assign(
        state.currentCandidate,
        currentCandidate
      )
    },
    SET_MACHINE_ID (state, id) {
      state.currentMachineNo = id
    },
    SET_ERRORMSG_EXAM (state, errorMSg) {
      state.errorMSg = errorMSg
    },
    SET_ENABLED_EXAM (state, boolean) {
      state.enabled = boolean
    },
    SET_MACHINE_READY (state, boolean) {
      state.machineReady = boolean
    },
    SET_CANNEXT_CANDIDATE (state, boolean) {
      state.canNext = boolean
    },
    SET_EXISTED_MACHINE (state, boolean) {
      state.existed = boolean
    },
    EXAM_INFO_SET (state, obj) {
      state.examInfo = { ...obj }
    },
    RESET_EXAM (state, obj) {
      for (const attr in state) {
        state[attr] = undefined
      }
    }
  },
  actions: {}
}

export default exam
