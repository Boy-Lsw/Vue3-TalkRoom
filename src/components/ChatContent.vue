<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import useUserStore from '@/store/user'

const userStore = useUserStore()

interface Message {
  sender: string
  sendTime: string
  content: string
  id: number
  receiver: string
}
interface CurMessage {
  list: Message[]
}
interface Props {
  isEnterRoom: boolean
  roomId: string
  messageList: Message[]
  curChater: string
}

const props = defineProps<Props>()

// interface RoomMessage {
//   sender: string,
//   sendTime: string,
//   content: string
// }
// const roomMessages = reactive<RoomMessage[]>([])

const isTalking = ref(false)

const messages = reactive<CurMessage>({ list: [] })

const sendMessage = (e: any) => {
  console.log(e)
}

const getDom = () => {
  const contentBox = document.querySelector('.content-box .content .messages')
  return contentBox
}
defineExpose({ getDom })

watch(
  () => props.messageList,
  (cur) => {
    isTalking.value = true
    messages.list = cur
  }
)
</script>

<template>
  <div class="content-box" v-if="!props.isEnterRoom">
    <h1 class="noMessage" v-if="!isTalking">点击左侧用户列表开始聊天</h1>
    <div class="content" v-else>
      <span class="title">与{{ props.curChater }}的私人房间</span>
      <div class="messages">
        <div
          v-for="item in messageList"
          :key="item.id"
          :class="`information-box ${
            item.sender == userStore.username ? 'toOther' : 'toMe'
          }`"
        >
          <span class="name">{{ item.sender }}</span>
          <span class="time">{{ item.sendTime }}</span>
          <span class="information">{{ item.content }}</span>
        </div>
      </div>
      <div class="sender">
        <el-input placeholder="说点什么..."></el-input>
        <el-button type="primary" size="large">发送</el-button>
      </div>
    </div>
  </div>

  <div class="content-box" v-else>
    <div class="content">
      <span class="title">房间号:{{ props.roomId }}</span>
      <div class="messages">
        <div class="tips">tipsTest</div>
        <div class="information-box toMe">
          <span class="name">liao</span>
          <span class="time">10:24:35</span>
          <span class="information">
            nihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihao</span
          >
        </div>
        <div class="information-box toMe">
          <span class="name">liao</span>
          <span class="time">10:24:35</span>
          <span class="information">nihaonihonihao</span>
        </div>
        <div class="information-box toOther">
          <span class="name">liao</span>
          <span class="time">10:24:35</span>
          <span class="information"> nihaonihaoni </span>
        </div>
        <div class="information-box toOther">
          <span class="name">liao</span>
          <span class="time">10:24:35</span>
          <span class="information">
            nihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihao
          </span>
        </div>
      </div>
      <div class="sender">
        <el-input placeholder="说点什么..."></el-input>
        <el-button type="primary" size="large" @click="sendMessage"
          >发送</el-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content-box {
  width: 65%;
  height: 100%;
  background-color: #f7f7f7;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.5);
  .noMessage {
    font-style: italic;
    position: absolute;
    left: 65%;
    top: 50%;
    transform: translate(-50%, -70%);
    opacity: 0.5;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
      flex: 0 0 1;
      text-align: center;
      padding: 20px;
      font-weight: bold;
      font-size: 25px;
      color: #168cec;
    }
    .messages {
      flex: 9;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      // .tips{
      //   text-align: center;
      //   color: #707070;
      // }
      .information-box {
        display: flex;
        flex-direction: column;
        // border: 1px solid black;
        margin-bottom: 10px;
        padding: 0 20px 0 20px;
        :nth-child(1) {
          padding: 2px 10px;
          font-size: 16px;
          font-weight: 500;
          line-height: 20px;
          color: #515151;
        }
        :nth-child(2) {
          padding: 2px 10px;
          font-size: 12px;
          color: #515151;
        }
        :nth-child(3) {
          width: fit-content;
          margin: 2px;
          padding: 10px;
          max-width: calc(100% - 50px);
          font-size: 16px;
          color: #000000;
          background: rgb(255, 255, 255);
          border-radius: 0 15px 0 15px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          overflow-x: hidden;
        }
      }
      .toOther {
        align-items: flex-end;
        :last-child {
          border-radius: 15px 0 15px 0;
          background: rgb(65, 194, 72);
        }
      }
    }
    .sender {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      .el-input {
        height: 40px;
        padding: 0 10px;
      }
      button {
        margin-right: 10px;
      }
    }
  }
}
</style>

<style>
.tips {
  text-align: center;
  color: #707070;
  font-size: 16px;
}
</style>
