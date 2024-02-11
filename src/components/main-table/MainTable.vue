<template>
  <div class="table">
    <div
      v-for="employee in employeeList"
      :key="employee.id"
      :class="{'table-cell--indented': depth > 0}"
    >
      <div class="table-row">
        <div class="table-cell">
          <span
            v-if="haveChilds(employee)"
            @click="toggleChildren(employee)"
          >
            <span
              v-if="!employee.visible"
              class="table-cell__ico"
            >
              <i class="far fa-plus"></i>&#8192;
            </span>
            <span
              v-if="employee.visible"
              class="table-cell__ico"
            >
              <i class="far fa-minus"></i>&#8192;
            </span>
          </span>
          {{ employee.name }}
        </div>
        <div class="table-cell phone">{{ employee.phone }}</div>
      </div>
      <div v-if="employee.visible" class="table-row">
        <main-table :employeeList="employee.childs" :depth="depth +  1" />
      </div>
    </div>
  </div>
</template>

<script src="./main-table.js">
</script>

<style src="./MainTable.css">
</style>
