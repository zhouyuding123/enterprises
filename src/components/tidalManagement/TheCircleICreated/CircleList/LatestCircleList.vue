<template>
  <vxe-table border :data="tableData">
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column field="nickname" title="nickname"></vxe-column>
    <vxe-column field="sex" title="Sex"></vxe-column>
    <vxe-column field="age" title="Age"></vxe-column>
    <vxe-column field="date12" title="Date"></vxe-column>
    <vxe-column field="region" title="Region"></vxe-column>
    <vxe-column field="rate" title="Rate"></vxe-column>
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