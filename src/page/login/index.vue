<template>
  <div class="login-class">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" class="login-form">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name" placeholder="请输入用户名" type="text" autocomplete="on"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码" autocomplete="off" @keyup.enter.native="handleLogin"/>
        <div>
          <img :src="codeImg" @click="getVerifyCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberPwd" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading="butLoading" size="medium" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        <el-button size="medium" @click.native.prevent="handleCancel">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate' // 导入校验方法
export default {
  data() {
    // 用户名校验方法
    const validateName = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名不正确，请重新输入'))
      } else {
        callback()
      }
    }
    // 密码校验方法
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      codeImg: '#', // 验证码图片
      butLoading: false,
      loginForm: {
        name: '', // 用户名
        password: '', // 密码
        verifyCode: '', // 验证码
        rememberPwd: false // 是否记住密码
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifyCode: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      }
    }
  },
  created() {

  },
  methods: {
    validateName() {
      console.log('校验方')
    },
    getVerifyCode() {
      console.log('获取验证码')
    },
    handleLogin() {
      this.butLoading = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.butLoading = false
          console.log('登录成功')
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    },
    handleCancel() {

    }
  }

}
</script>

<style lang="scss">
// // 定义通用变量
// // $bg:#626e7e;
// $light_gray:#fff;
// $cursor: #fff;
// .login-class .el-input input {
//   color: $cursor;
// }
// .login-class {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;
//     }
//   }

//   .el-form-item {
//     // border: 1px solid rgba(255, 255, 255, 0.1);
//     // background: rgba(221, 179, 179, 0.1);
//     border-radius: 5px;
//     color: #f0ebeb;
//   }
// }
// </style>
// <style lang="scss" scoped>
// // $bg:#2d3a4b;
// $dark_gray:#889aa4;
// $light_gray:#eee;

// .login-class {
//   min-height: 100%;
//   width: 100%;
//   // background-color: $bg;
//   overflow: hidden;

//   .login-form {
//     position: relative;
//     width: 520px;
//     max-width: 100%;
//     padding: 160px 35px 0;
//     margin: 0 auto;
//     overflow: hidden;
//   }
// }
</style>
