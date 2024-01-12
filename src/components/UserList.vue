<script setup lang="ts">
import { watch, reactive } from 'vue'
import useUserStore from '@/store/user';

const userStore = useUserStore()

interface RoomUsers {
  list: string[]
}
interface UserData {
  avatar: string
  username: string
  id: string
  password: string
}
interface RoomUserData {
  list: UserData[]
}
interface Props {
  allUsers: UserData[]
  otherUsers: UserData[]
  isEnterRoom: boolean
  roomUsers: RoomUsers
}

const props = defineProps<Props>()
const emits = defineEmits(['getTalkMessages'])

// const otherUsers = reactive<UserData[]>([])
const roomUserList = reactive<RoomUserData>({ list: [] })

const setCurrentChater = (curChater: string) => {
  userStore.updateCurChater(curChater)
  emits('getTalkMessages')
}

watch(
  () => props.roomUsers.list,
  (cur) => {
    console.log(cur)
    const result = props.allUsers.filter((item) => cur.includes(item.username))
    roomUserList.list = result
  }
)
</script>

<template>
  <div class="userList-box" v-if="!props.isEnterRoom">
    <div v-for="item in props.otherUsers" :key="item.username" class="userBox">
      <el-avatar
        :src="item.avatar"
        @click="setCurrentChater(item.username)"
      ></el-avatar>
      <p>{{ item.username }}</p>
    </div>
  </div>

  <div class="userList-box" v-else>
    <div v-for="item in roomUserList.list" :key="item.username" class="userBox">
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
