export default {
  name: 'main-table',

  props: {
    employeeList: Array,
    depth: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      childrenVisible: false
    }
  },

  methods: {
    toggleChildren (employee) {
      this.$set(employee, 'visible', !employee.visible)
    },

    haveChilds (user) {
      if (user.childs && user.childs.length) {
        return true
      } else {
        return false
      }
    }
  }
}
