<template>
  <div class="main-view">
    <div class="main-view-btn">
      <button-regular
        :text="textBtn"
        :disabled="disabledBtn"
        @click="clickButton"
      />
    </div>

    <div class="main-view-table">
      <div class="table-row">
        <div class="table-cell table-cell__head name">
          {{ columnName[0][1] }}
          <i
            title="сортировать"
            class="fad fa-sort-alt ico-sort"
            :class="{
                'ico-sort__not-active': clickedIco != columnName[0][0],
                'ico-sort__reverse': (clickedIco == columnName[0][0] && sortFlag == 1),
            }"
            :id="columnName[0][0]"
            @click="sort"
          />
        </div>
        <div class="table-cell table-cell__head phone">
          {{ columnName[1][1] }}
          <i
            title="сортировать"
            class="fad fa-sort-alt ico-sort"
            :class="{
                'ico-sort__not-active': clickedIco != columnName[1][0],
                'ico-sort__reverse': (clickedIco == columnName[1][0] && sortFlag == 1),
            }"
            :id="columnName[1][0]"
            @click="sort"
          />
        </div>
      </div>

      <main-table
        :employeeList="employeeList"
      />
    </div>
  </div>
</template>

<script src="./main-view.js">
</script>

<style src="./MainView.css">
</style>
