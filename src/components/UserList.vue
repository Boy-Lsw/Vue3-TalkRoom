<script setup lang="ts">
import { watch, reactive } from 'vue'

const props = defineProps(['isEnterRoom'])
const emits = defineEmits(['getTalkMessages'])

interface User {
  username: string
  avatar: string
}
const dataList1 = [
  { username: 'test1', avatar: 'tset1avatar' },
  { username: 'test2', avatar: 'tset2avatar' },
  { username: 'test3', avatar: 'tset3avatar' }
]
const dataList2 = [
  { username: 'test1', avatar: 'tset1avatar' },
  { username: 'test2', avatar: 'tset2avatar' }
]

const curUserList = reactive<User[]>(dataList1)
const roomUserList = reactive<User[]>(dataList2)

const setCurrentChater = (curChater: string) => {
  emits('getTalkMessages', curChater)
}

watch(
  () => props.isEnterRoom,
  (cur, old) => {
    console.log(cur, old)
  }
)
</script>

<template>
  <div class="userList-box" v-if="!props.isEnterRoom">
    <div v-for="item in curUserList" :key="item.username" class="userBox">
      <el-avatar
        :src="item.avatar"
        @click="setCurrentChater(item.username)"
      ></el-avatar>
      <p>{{ item.username }}</p>
    </div>
  </div>

  <div class="userList-box" v-else>
    <div v-for="item in roomUserList" :key="item.username" class="userBox">
      <el-avatar :src="item.avatar"></el-avatar>
      <p>{{ item.username }}</p>
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
