<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type FormInstance, type FormProps, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import httpHost from '@/interwork/axios/index.ts'

const $router = useRouter()

const labelPosition = ref<FormProps['labelPosition']>('right')
const formRef = ref<FormInstance>()
interface Info {
  username: string
  password: string
}
interface FormData {
  username: string
  password: string
  confirmedPassword: string
}
const formData: FormData = reactive({
  username: '',
  password: '',
  confirmedPassword: ''
})

const validateConfirmedPassword = (_: any, value: any, callback: any) => {
  if (value !== formData.password) {
    return callback(new Error('两次输入密码不一致！'))
  } else callback()
}
const rules = reactive<FormRules<FormData>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度为3-10位', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmedPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: validateConfirmedPassword, trigger: 'blur' }
  ]
})
const submitForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate(async (valid) => {
    if (valid) {
      const info = { username: formData.username, password: formData.password }
      let registerRes = await register(info)
      if (registerRes.data.code == 200 || registerRes.data.code == 1001) {
        return login(info)
      }
    } else {
      ElNotification({
        title: '出错啦!',
        message: '请检查账号密码是否正确!',
        type: 'error',
        position: 'top-right',
        duration: 1000
      })
      return false
    }
  })
}

const register = (info: Info) => {
  return httpHost.post('auth/register', {
    avatar: `https://api.multiavatar.com/Binx%${Math.floor(
      Math.random() * 50000
    )}.png`,
    username: info.username,
    password: info.password
  })
}
const login = async (info: Info) => {
  const { data } = await httpHost.post('auth/login', info)
  if (!data) {
    ElNotification({
      title: '登录失败!',
      message: '请检查网络!',
      type: 'error',
      position: 'top-right',
      duration: 1000
    })
  } else{
    ElNotification({
      // title: '登录成功!',
      message: '登录成功!',
      type: 'success',
      position: 'top-right',
      duration: 1000
    })
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('username', formData.username)
    document.cookie = `timekey=${Date.now()}`
    $router.push('/chat')
  } 
}
</script>

<template>
  <div class="home-box">
    <el-form
      :rules="rules"
      ref="formRef"
      :label-position="labelPosition"
      label-width="100px"
      :model="formData"
    >
      <el-form-item label="用户名" required prop="username">
        <el-input v-model="formData.username" style="width: 400px" />
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input
          show-password
          v-model="formData.password"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item label="确认密码" required prop="confirmedPassword">
        <el-input
          show-password
          v-model="formData.confirmedPassword"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      </el-form-item>
      <p>新用户首次登录将会自动注册</p>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.home-box {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    position: relative;
    background: #fff;
    width: 50vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 30px #109fb27b;
    .el-form-item {
      padding: 10px;
      margin-top: 10px;
    }
    p {
      position: absolute;
      bottom: 10px;
      left: 42%;
      opacity: 0.6;
    }
  }
}
</style>
