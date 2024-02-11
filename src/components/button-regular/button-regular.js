export default {
  name: 'button-regular',

  props: {
    text: {
      type: String
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    click () {
      this.$emit('click')
    }
  }
}
