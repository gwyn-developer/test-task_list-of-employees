<template>
  <div
    class="modal-view"
    @click.self="cancel"
    role="dialog"
  >
    <div class="modal-view-wrapper">
      <div class="modal-view-container">
        <div class="modal-view-header">
          <div class="modal-view-header__title">
            {{ title }}
          </div>
          <div
            class="modal-view-header__close"
            @click="cancel"
          >
            ✖
          </div>
        </div>

        <div class="modal-view-body">
          <form class="modal-view-body__group">
            <div class="modal-view-body__form">
              <div class="modal-view-body__group-label">
                Имя
              </div>
              <div class="modal-view-body__group-row">
                <input
                  class="modal-view-body__input modal-view-body__input-name"
                  :class="{'modal-view-body__input_unfilled': !isFilledName}"
                  type="text"
                  title="Заполнить имя"
                  placeholder="Введите имя"
                  autocomplete="off"
                  id="name"
                  v-model="name"
                  @input="validateName"
                  @change="updateName(name)"
                  @keydown.enter="pressEnter"
                  @keydown.esc ="pressEsc"
                >
              </div>
            </div>

            <div class="modal-view-body__form">
              <div class="modal-view-body__group-label">
                Телефон
              </div>
              <div class="modal-view-body__group-row">
                <input
                  class="modal-view-body__input modal-view-body__input-phone"
                  :class="{'modal-view-body__input_unfilled': !isFilledPhone}"
                  type="text"
                  title="Заполнить телефон"
                  placeholder="+7 (***) ***-**-**"
                  autocomplete="off"
                  id="phone"
                  v-model="phone"
                  v-mask="'+7 (###) ###-##-##'"
                  @change="updatePhone(phone)"
                  @keydown.enter="() => { pressEnter(); validatePhone(); }"
                  @keydown.esc="() => { pressEsc(); validatePhone(); }"
                >
              </div>
            </div>

            <div class="modal-view-body__string string-head">
              <div class="modal-view-body__group-label">
                Начальник
              </div>

              <div
                v-if="curHeadName"
                class="modal-view-body__group-head string-head"
              >
                <div
                  class="modal-view-body__headname"
                  @click="cancelAndOpen"
                >
                  {{ curHead.name}}
                </div>
                <div
                  class="modal-view-body__close"
                  title="Удалить начальника"
                  @click="cancelHeadName"
                >
                  ✕
                </div>
              </div>

              <div
                v-if="!curHeadName"
                class="modal-view-body__group-head-search"
                title="Выбрать руководителя отдела"
                @click="toggleHeadList"
              >
                <div class="modal-view-body__search-title">Выбрать из списка</div>
                <div>↓</div>
              </div>

              <div
                class="modal-view-body__search-popup"
                :class="{ 'modal-view-body__search-popup-view': openHeadList }"
              >
                <div class="modal-view-body__search-popup-content">
                  <div class="finder-box">
                    <div class="finder-box-layout">
                      <div class="finder-box-layout-tbody">
                        <div class="finder-box-layout-tr">
                          <div class="finder-box-left-column">
                            <div class="finder-box-search">
                              <input
                                class="finder-box-search-textbox"
                                type="text"
                                title="Найти сотрудника"
                                placeholder="введите имя сотрудника"
                                autocomplete="off"
                                id="headName"
                                v-model="headName"
                                @input="filterHeadName"
                              >
                            </div>

                            <div class="finder-box-content">
                              <div
                                v-for="head in curHeadList"
                                :key="head.id"
                                class="finder-box-item"
                                @click="selectHead(head)"
                              >
                                {{ head.name }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-view-footer">
          <button-regular
            :text="textBtn"
            :disabled="disabledBtn"
            @click="clickButton"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./modal-view.js">
</script>

<style src="./ModalView.css">
</style>
