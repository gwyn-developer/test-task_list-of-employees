<template>
  <div id="app">
    <main-view
      textBtn="Добавить"
      :disabledBtn="false"
      @onButtonClick="onAction('add')"
      :columnName="columnName"
      :employeeList="employeeList"
      :sortFlag="sortFlag"
      @sortList="sortList"
    />

    <modal-view
      v-if="showModal"
      textBtn="Сохранить"
      :disabledBtn="disabledBtnForModel"
      @onButtonClick="onAction('modal')"
      title="Добавление пользователя"
      :headList="headList"
      @updateName="updateName"
      @updatePhone="updatePhone"
      @updateHead="updateHead"
      @closeModal="closeModalView"
    />
  </div>
</template>

<script src="./app.js">
</script>

<style src="./App.css">
</style>
