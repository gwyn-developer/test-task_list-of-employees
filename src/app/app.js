import MainView from '../views/main-view/MainView.vue'
import ModalView from '../views/modal-view/ModalView.vue'

export default {
  name: 'App',

  components: {
    MainView,
    ModalView
  },

  data () {
    return {
      showModal: false,

      employeeList: [
        {id: 1, name: 'Сергей', phone: '+7 (919) 126-18-52', childs: []},
        {id: 2, name: 'Ирина', phone: '+7 (912) 145-95-23', childs: []},
        {id: 3, name: 'Александр', phone: '+7 (954) 852-46-52', childs: []},
        {id: 4, name: 'Лидия', phone: '+7 (975) 845-23-36', childs: []},
        {
          id: 5,
          name: 'Иван',
          phone: '+7 (945) 684-87-98',
          childs: [
            {
              id: 10,
              name: 'Евгений',
              phone: '+7 (935) 857-56-98',
              childs: []
            }
          ]
        },
        {
          id: 6,
          name: 'Алёна',
          phone: '+7 (935) 478-56-98',
          childs: [
            {
              id: 7,
              name: 'Екатерина',
              phone: '+7 (935) 465-56-98',
              childs: [
                {
                  id: 8,
                  name: 'Андрей',
                  phone: '+7 (935) 465-56-78',
                  childs: []
                },
                {
                  id: 9,
                  name: 'Анатолий',
                  phone: '+7 (935) 465-56-87',
                  childs: []
                }
              ]
            }
          ]
        }
      ],
      employeeListByLS: [],

      headList: [],

      columnName: [['name', 'Имя'], ['phone', 'Телефон']],

      sortFlag: 1,

      newUser: {
        id: '',
        name: '',
        phone: '',
        childs: [],
        headId: null
      }
    }
  },

  created () {
    const savedData = localStorage.getItem('employeeList')
    if (savedData) {
      this.employeeList = JSON.parse(savedData)
      this.employeeListByLS = JSON.parse(savedData)
    } else {
      this.employeeListByLS = this.employeeList
      this.saveDataInLS(this.employeeListByLS)
    }

    this.getHeadList()
  },

  watch: {
    employeeList: {
      handler (newVal) {
        this.employeeListByLS = newVal
        this.saveDataInLS(newVal)

        this.getHeadList()
      },
      deep: true
    }
  },

  computed: {
    disabledBtnForModel () {
      if (this.newUser.id && this.newUser.name && this.newUser.phone) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    onAction (type) {
      if (type === 'add') {
        this.showModal = true
      }
      if (type === 'modal') {
        if (!this.newUser.headId) {
          this.employeeList.push({
            id: this.newUser.id,
            name: this.newUser.name,
            phone: this.newUser.phone,
            childs: this.newUser.childs
          })

          this.resetNewUser()
        } else {
          const newEmployee = {
            id: this.newUser.id,
            name: this.newUser.name,
            phone: this.newUser.phone,
            childs: this.newUser.childs
          }

          const targetId = this.newUser.headId

          this.addChildById(this.employeeList, targetId, newEmployee)
        }

        this.showModal = false
      }
    },

    closeModalView () {
      this.showModal = false
    },

    saveDataInLS (data) {
      localStorage.setItem('employeeList', JSON.stringify(data))
    },

    removeNonDigits (phone) {
      return phone.replace(/\D+/g, '')
    },

    sortList (field) {
      if (this.sortFlag === 1) {
        this.sortFlag = 2
        this.sortEmployeeList(this.employeeList, field)
      } else {
        this.sortFlag = 1
        this.reverseSortEmployeeList(this.employeeList, field)
      }
    },

    sortEmployeeList (list, field) {
      list.sort((a, b) => {
        if (field === 'name') {
          return a[field].localeCompare(b[field])
        } else if (field === 'phone') {
          const phoneA = this.removeNonDigits(a[field])
          const phoneB = this.removeNonDigits(b[field])
          return phoneA.localeCompare(phoneB)
        }
      })

      for (let item of list) {
        if (item.childs && item.childs.length > 0) {
          this.sortEmployeeList(item.childs, field)
        }
      }
    },

    reverseSortEmployeeList (list, field) {
      list.sort((a, b) => {
        if (field === 'name') {
          return b[field].localeCompare(a[field])
        } else if (field === 'phone') {
          const phoneA = this.removeNonDigits(a[field])
          const phoneB = this.removeNonDigits(b[field])
          return phoneB.localeCompare(phoneA)
        }
      })

      for (let item of list) {
        if (item.childs && item.childs.length > 0) {
          this.reverseSortEmployeeList(item.childs, field)
        }
      }
    },

    updateName (name) {
      this.newUser.name = name
      if (!this.newUser.id) {
        this.newUser.id = this.headList.length + 1
      }
    },

    updatePhone (phone) {
      this.newUser.phone = phone
      if (!this.newUser.id) {
        this.newUser.id = this.headList.length + 1
      }
    },

    updateHead (id) {
      this.newUser.headId = id
      if (!this.newUser.id) {
        this.newUser.id = this.headList.length + 1
      }
    },

    resetNewUser () {
      this.newUser = {
        id: '',
        name: '',
        phone: '',
        childs: [],
        headId: null
      }
    },

    extractHeads (employeeList) {
      const result = []

      function traverse (employees) {
        employees.forEach(employee => {
          result.push({ id: employee.id, name: employee.name })
          if (employee.childs) {
            traverse(employee.childs)
          }
        })
      }

      traverse(employeeList)
      return result
    },

    getHeadList () {
      this.headList = []

      this.headList = this.extractHeads(this.employeeList)

      this.headList.sort((a, b) => (a.name).localeCompare(b.name))
    },

    addChildById (arr, targetId, newChild) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === targetId) {
          arr[i].childs.push(newChild)
          this.resetNewUser()
        }
        if (arr[i].childs && arr[i].childs.length) {
          this.addChildById(arr[i].childs, targetId, newChild)
        }
      }
    }
  }
}
