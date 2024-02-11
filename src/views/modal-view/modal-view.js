import {mask} from 'vue-the-mask'

import ButtonRegular from '../../components/button-regular/ButtonRegular.vue'

export default {
  name: 'modal-view',

  directives: {mask},

  components: {
    ButtonRegular
  },

  props: {
    title: {
      type: String,
      default: 'Добавление пользователя'
    },

    textBtn: {
      type: String,
      default: 'Сохранить'
    },

    disabledBtn: {
      type: Boolean,
      default: false
    },

    headList: {
      type: Array
    }
  },

  data () {
    return {
      name: '',
      isFilledName: false,

      phone: '',
      isFilledPhone: false,

      headListData: [],
      curHeadList: [],
      openHeadList: false,

      headName: '',
      curHead: {}
    }
  },

  mounted () {
    this.headListData = this.headList
    this.curHeadList = this.headList
  },

  watch: {
    name (newName) {
      if (newName !== '') {
        this.isFilledName = true
      } else {
        this.isFilledName = false
      }
    },

    phone (newPhone) {
      if (newPhone !== '') {
        this.isFilledPhone = true
      } else {
        this.isFilledPhone = false
      }
    }
  },

  computed: {
    curHeadName () {
      if (this.curHead.name && this.curHead.name !== '') {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    clickButton () {
      this.$emit('onButtonClick')
    },

    cancel () {
      this.$emit('closeModal')
    },

    pressEnter () {
      document.querySelector('.modal-view-body__input-name').blur()
      document.querySelector('.modal-view-body__input-phone').blur()
    },

    pressEsc () {
      document.querySelector('.modal-view-body__input-name').blur()
      document.querySelector('.modal-view-body__input-phone').blur()
    },

    toggleHeadList () {
      this.openHeadList = !this.openHeadList
      this.headName = ''
    },

    cancelHeadName () {
      this.curHead = {}
    },

    cancelAndOpen () {
      this.cancelHeadName()
      this.toggleHeadList()
    },

    filterHeadName () {
      if (this.headName === '') {
        this.curHeadList = this.headListData
      } else {
        this.curHeadList = this.headListData.filter(head => (head.name.toLowerCase()).includes(this.headName.toLowerCase()))
      }
    },

    selectHead (head) {
      this.curHead = head
      this.$emit('updateHead', this.curHead.id)

      this.toggleHeadList()
    },

    updateName () {
      this.$emit('updateName', this.name)
    },

    updatePhone () {
      this.validatePhone()
    },

    validateName () {
      const regexStart = /^[a-zA-Zа-яА-Я0-9]/
      const regexRest = /[\w\W]*/

      if (!regexStart.test(this.name)) {
        this.name = ''
      } else {
        if (!regexRest.test(this.name)) {
          this.name = ''
        }
      }

      this.updateName()
    },

    validatePhone () {
      const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/

      if (!phoneRegex.test(this.phone)) {
        this.phone = ''
      }

      this.$emit('updatePhone', this.phone)
    }
  }
}
