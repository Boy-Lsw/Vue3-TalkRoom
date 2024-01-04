<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps(['isEnterRoom', 'roomId', 'messageList'])

// interface RoomMessage {
//   sender: string,
//   sendTime: string,
//   content: string
// }
// const roomMessages = reactive<RoomMessage[]>([])

const messages = reactive({
  list: []
})

watch(
  () => props.messageList,
  (cur) => {
    messages.list = cur
  }
)
</script>

<template>
  <div class="content-box" v-if="!props.isEnterRoom">
    <h1 class="noMessage" v-if="!messages.list.length">
      点击左侧用户列表开始聊天
    </h1>
    <div class="content" v-if="messages.list.length">
      <span class="title">与xxx的私人房间</span>
      <div class="messages">
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
        <el-button type="primary" size="large">发送</el-button>
      </div>
    </div>
  </div>

  <div class="content-box" v-else>
    <div class="content">
      <span class="title">房间号:{{ props.roomId }}</span>
      <div class="messages">
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
        <el-button type="primary" size="large">发送</el-button>
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
      // background-color: red;
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
