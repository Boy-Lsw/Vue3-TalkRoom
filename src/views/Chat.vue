<script setup lang="ts">
import ChatContent from '@/components/ChatContent.vue'
import UserList from '@/components/UserList.vue'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const showJoinRoom = ref(false)
const showDrawer = ref(false)

const joinRoomData = reactive({
  number: ''
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="chat-box">
    <div class="chatScreen">
      <UserList></UserList>
      <ChatContent></ChatContent>
    </div>
    <div class="tools">
      <div class="avatar">
        <el-button
          type="primary"
          @click="
            () => {
              showDrawer = true
            }
          "
          >更换头像</el-button
        >
        <el-avatar :size="125" src="" />
      </div>
      <el-button
        type="primary"
        @click="
          () => {
            showJoinRoom = true
          }
        "
        >加入房间</el-button
      >
    </div>
  </div>

  <el-dialog v-model="showJoinRoom" title="输入房间号后加入房间" :center="true">
    <el-form
      ref="formRef"
      :model="joinRoomData"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="房间号"
        prop="number"
        :rules="[
          { required: true, message: '请输入房间号' },
          { type: 'number', message: '房间号为数字' }
        ]"
      >
        <el-input
          v-model.number="joinRoomData.number"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-drawer v-model="showDrawer" :show-close="false">
    <template #header>
      <span>输入qq号修改头像</span>
    </template>
    <template #default>
      <el-input placeholder="输入qq号"></el-input>
      <el-button type="primary">点击预览</el-button>
      <el-avatar></el-avatar>
    </template>
    <template #footer>
      <el-button
        type="primary"
        @click="
          () => {
            showDrawer = false
          }
        "
        >确认更换</el-button
      >
    </template>
  </el-drawer>
</template>

<style scoped lang="less">
.chat-box {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  .chatScreen {
    width: 75vw;
    height: 80vh;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tools {
    position: absolute;
    width: 150px;
    height: 100vh;
    // background-color: blue;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar {
      position: absolute;
      top: 75px;
      .el-button {
        margin-bottom: 10px;
      }
    }
    .el-button {
      width: 125px;
    }
  }
}
.el-overlay {
  .el-overlay-dialog {
    button {
      position: absolute;
      top: 0px;
      &:nth-child(1) {
        right: 0;
      }
      &:nth-child(2) {
        right: 100px;
      }
    }
  }
  .el-drawer {
    .el-drawer__header {
      span {
        text-align: center;
      }
    }
    .el-drawer__body {
      position: relative;
      button {
        top: 18%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .el-avatar {
        height: 300px;
        width: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
