<template>
  <vxe-table :data="tableData">
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column field="content"></vxe-column>
    <vxe-column field="sex" title="Sex"></vxe-column>
    <vxe-column field="age" title="Age"></vxe-column>
    <vxe-column field="date12" title="Date"></vxe-column>
  </vxe-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>