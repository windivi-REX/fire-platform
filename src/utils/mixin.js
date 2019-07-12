import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'
export var AQJY_Mixin = {
  computed: {
    ...mapGetters([
      'examId',
      'machineNum',
      'currentMachineNo',
      'examEnabled',
      'examInfo',
      'canNext',
      'currentCandidateStatus',
      'total',
      'machineList',
      'queue',
      'machineReady',
      'machineExisted',
      'currentCandidate',
      'jobsEntity',
      'unitsEntity',
      'examQuestions',
      'printInfo'
    ])
  },
  methods: {
    generateTitle (title) {
      return generateTitle(title)
    }
  }
}
