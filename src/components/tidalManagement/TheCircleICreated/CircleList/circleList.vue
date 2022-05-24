<template>
  <vxe-table border :data="tableData">
    <vxe-column type="radio" width="60"></vxe-column>
    <vxe-column field="role" title="Rolw"></vxe-column>
    <vxe-column field="age" title="Age"></vxe-column>
    <vxe-column field="num" title="Num"></vxe-column>
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