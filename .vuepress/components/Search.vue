<template>
  <div>
    <input
      v-model="value"
      type="text"
      placeholder="请输入内容"
      autofocus
      @keyup.enter="onSearch"
    />
    <button @click="onSearch">搜索</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      const { value } = this;
      window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + value, "_blank");
      this.value = "";
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  width: 500px;
  line-height: 32px;
  height: 32px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 13px;
  padding-right: 30px;
}
input:focus {
  border-color: #5f9ea0;
  outline: 0;
}
button {
  border-color: transparent;
  background-color: transparent;
  color: inherit;
  border-top: 0;
  border-bottom: 0;
  color: #5f9ea0;
  background: #eff5f6;
  border-color: #bfd8d9;
  font-size: 13px;
  display: inline-block;
  padding: 0 15px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  transition: 0.1s;
  outline: 0;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
}
button:hover {
  background: #5f9ea0;
  border-color: #5f9ea0;
  color: #fff;
}
</style>
