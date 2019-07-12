<template>
  <div class="login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             auto-complete="off"
             label-position="left">
      <input type="text"
             style="display:none">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username"
                  name="username"
                  type="text"
                  auto-complete="off"
                  autocomplete="off"
                  placeholder="请输入用户名"
                  size="mini" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="pwdType"
                  v-model="loginForm.password"
                  size="mini"
                  name="password"
                  auto-complete="off"
                  :autocomplete="'new-password'"
                  placeholder="请输入密码"
                  @keyup.enter.native="handleLogin" />
        <span class="show-pwd"
              @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item style="height:3.5rem">
        <el-button :loading="loading"
                   type="primary"
                   class="login-btn"
                   @click.native.prevent="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
    <mask-layer v-show="showMask" />
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import MaskLayer from '@/components/Mask/index';
import { logout } from '../../api/login';

export default {
  name: 'Login',
  components: {
    MaskLayer,
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名',
            // validator: validateUsername
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码',
            // validator: validatePass
          },
        ],
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      showHelp: false,
      showTip: false,
      showMask: false,
      qdImgUrl: process.env.VUE_APP_API + '/files/app/app.png',
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              localStorage.setItem('username', this.loginForm.username);
              localStorage.setItem('password', this.loginForm.password);
              this.loading = false;
              this.$router.push({
                path: '/',
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleShow(val) {
      this.showTip = val;
      this.showMask = val;
    },
    handleReview() {
      this.showTip = true;
      this.showHelp = false;
    },
    logout() {
      logout()
        .then(res => {
          this.$message('success');
        })
        .catch(error => {
          console.log(error);
          this.$message('fail');
        });
    },
    setCookie(c_name, value, expiredays) {
      const exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      localStorage.set('');
      c_name +
        '=' +
        value +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
    },
  },
};
</script>

<style lang="scss">
/* reset element-ui css */

@import '../../styles/mixin.scss';
@import '../../styles/variables.scss';
.login-container {
  .el-form-item {
    width: 80%;
    @include flex(row, center, center);
    @include backgroundImg(url('../../assets/image/login-input-bg.png'));
    .el-form-item__content {
      @include flex(row, center, center);
      width: 100%;
      height: 100%;
    }
  }
  .el-input {
    font-size: 1rem;
    height: 3.5rem;
    flex: 1 1 80%;
    input {
      background: transparent !important;
      border: 0px; // border-bottom: 1px solid #989898 !important;
      -webkit-appearance: none;
      border-radius: 0px; // padding: 12px 5px 12px 15px;
      color: #989898;
      height: 100%;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px rgba(105, 59, 138, 1) inset !important;
        box-shadow: 0 0 0px 1000px rgba(105, 59, 138, 1) inset !important;
        -webkit-text-fill-color: orange !important;
      }
    }
    .show-pwd {
      top: 1rem;
    }
  }
  .el-form-item__error {
    left: 47px !important;
  }
}
</style>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';
@import '../../styles/variables.scss';
.login-container {
  position: fixed;
  height: calc(100vh - #{$topBarHeight});
  width: 100%;
  @include backgroundImg(url('../../assets/image/login-background.jpg'));
  .login-form {
    @include flex(column, center, center);
    position: absolute;
    left: 60.5%;
    right: 0px;
    width: 450px;
    height: 386px;
    max-width: 100%;
    bottom: 0;
    top: 38.6%;
    @include backgroundImg(url('../../assets/image/login-form-bg.png'));
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #87a0bd;
    .svg-icon {
      width: 1.5em;
      height: 1.5em;
    }
  }
  .title {
    font-family: 'SimHei';
    font-size: 1.625rem;
    font-weight: 500;
    color: #00b4ff;
    text-align: center;
  }
  .login-btn {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: transparent;
    font-size: 1.25rem;
    border: none;
    &:hover {
      color: #00b4ff;
      background-color: rgba(32, 84, 158, 0.54);
      box-shadow: 3px 4px 9px rgba(1, 36, 87, 0.5);
    }
  }
  .show-pwd {
    position: absolute;
    right: 2.125rem;
    top: 1rem;
    font-size: 1rem;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
