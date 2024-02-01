<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import useUserStore from '@/store/user'
import httpHost from '@/interwork/axios'
import { formatTime, toBottom } from '@/utils'
import { socket } from '@/interwork/socket'

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
interface RoomMessage {
  sender: string
  content: string
  sendTime: string
}
interface RoomMessageList {
  list: RoomMessage[]
}
interface Props {
  isEnterRoom: boolean
  roomId: string
  messageList: Message[]
  curChater: string
  roomMessage: RoomMessage[]
}

const props = defineProps<Props>()

const isTalking = ref(false)

const messages = reactive<CurMessage>({ list: [] })
const roomMessages = reactive<RoomMessageList>({
  list: []
})

const iptMessage = ref('')
const sendMessage = async () => {
  const val = iptMessage.value.trim()
  const strLen = val.length
  if (strLen > 0 && strLen <= 10) {
    try {
      await httpHost.post('message/send', {
        sender: userStore.username,
        content: iptMessage.value,
        receiver: props.curChater,
        sendTime: formatTime(new Date())
      })
    } catch (error) {
      console.log(error)
    }
    socket.emit('sendMessage')
  } else {
    ElNotification({
      message: '发送消息失败!',
      type: 'error',
      position: 'top-right',
      duration: 1000
    })
  }
  iptMessage.value = ''
}

const iptRoomMessage = ref('')
const sendRoomMessage = () => {
  const msg = {
    content: iptRoomMessage.value.trim(),
    sendTime: formatTime(new Date()),
    sender: userStore.username
  }
  // roomMessages.list.push(msg)
  socket.emit('sendRoomMessage', msg)
  iptRoomMessage.value = ''
}

const getRoomMessage = (msg: RoomMessage) => {
  // socket.off('getRoomMessage')
  toBottom(getDom())
  roomMessages.list.push(msg)
  console.log(msg)
}
socket.on('getRoomMessage', getRoomMessage)

const getDom = () => {
  const contentBox = document.querySelector('.content-box .content .messages')
  return contentBox
}
const talkingFlag = () => {
  isTalking.value = false
}
defineExpose({ getDom, talkingFlag })

watch(
  () => props.messageList,
  (cur) => {
    // console.log(cur, old)
    isTalking.value = true
    messages.list = cur
  }
)
watch(
  () => props.roomMessage,
  async (cur) => {
    roomMessages.list = cur
  },
  {
    deep: true
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
            item.sender == userStore.username ? 'toOther' : ''
          }`"
        >
          <span class="name">{{ item.sender }}</span>
          <span class="time">{{ item.sendTime }}</span>
          <span class="information">{{ item.content }}</span>
        </div>
      </div>
      <div class="sender">
        <el-input placeholder="说点什么..." v-model="iptMessage"></el-input>
        <el-button type="primary" size="large" @click="sendMessage"
          >发送</el-button
        >
      </div>
    </div>
  </div>

  <div class="content-box" v-else>
    <div class="content">
      <span class="title">房间号:{{ props.roomId }}</span>

      <div class="messages">
        <template v-for="item in roomMessages.list" :key="item.sendTime">
          <template v-if="item.sender == 'sys'">
            <div class="tips">
              {{ item.content }}
            </div>
          </template>
          <template v-else>
            <div
              :class="`information-box 
            ${item.sender == userStore.username ? 'toOther' : ''}
            `"
            >
              <span class="name">{{ item.sender }}</span>
              <span class="time">{{ item.sendTime }}</span>
              <span class="information">{{ item.content }}</span>
            </div>
          </template>
        </template>
      </div>

      <div class="sender">
        <el-input placeholder="说点什么..." v-model="iptRoomMessage"></el-input>
        <el-button type="primary" size="large" @click="sendRoomMessage"
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
      .tips {
        text-align: center;
        color: #707070;
        font-size: 16px;
      }
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

<!-- <style>
.tips {
  text-align: center;
  color: #707070;
  font-size: 16px;
}
</style> -->
