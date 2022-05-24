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
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "0",
          age: 28,
          amount: 888,
          address: "test abc",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "1",
          age: 22,
          amount: 666,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "1",
          age: 32,
          amount: 89,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "0",
          age: 23,
          amount: 1000,
          address: "test abc",
        },
        {
          id: 10005,
          name: "Test5",
          role: "Develop",
          sex: "0",
          age: 30,
          amount: 999,
          address: "Shanghai",
        },
      ],
    };
  },
};
</script>