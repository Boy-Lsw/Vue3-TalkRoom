<script setup lang="ts"></script>

<template>
  <div class="userList-box">
    <div class="userBox">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <p>namefhhhhhhhhhfhffghfghhfgggggggggggg</p>
      <!-- <p>name</p> -->
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
    <div class="userBox">
      <el-avatar />
      <p>name</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.userList-box {
  width: 35%;
  height: 100%;
  margin-right: 5px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f7f7f7;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.5);
  .userBox {
    position: relative;
    width: 90%;
    height: 20%;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
    span {
      position: absolute;
      left: 10%;
      height: 100px;
      width: 100px;
    }
    p {
      overflow-x: hidden;
      max-width: 135px;
      position: absolute;
      left: 50%;
      font-size: 20px;
      color: #e67f09;
      transition: color 0.5s;
      &:hover {
        cursor: default;
        color: red;
      }
    }
  }
}
</style>
