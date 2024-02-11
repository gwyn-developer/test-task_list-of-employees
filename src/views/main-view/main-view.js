import ButtonRegular from '../../components/button-regular/ButtonRegular.vue'
import MainTable from '../../components/main-table/MainTable.vue'

export default {
  name: 'main-view',

  components: {
    ButtonRegular,
    MainTable
  },

  props: {
    textBtn: {
      type: String,
      default: 'Добавить'
    },

    disabledBtn: {
      type: Boolean,
      default: false
    },

    columnName: {
      type: Array
    },

    employeeList: {
      type: Array
    },

    sortFlag: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      clickedIco: 'name'
    }
  },

  methods: {
    clickButton () {
      this.$emit('onButtonClick')
    },

    sort (e) {
      this.$emit('sortList', e.target.id)
      this.clickedIco = e.target.id
    }
  }
}
