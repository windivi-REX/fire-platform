import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'
export var AQJY_Mixin = {
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    generateTitle (title) {
      return generateTitle(title)
    }
  }
}
