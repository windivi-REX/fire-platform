<template>
  <div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'AutoLogin',
  created() {
    this.login();
  },
  methods: {
    login() {
      this.$store
        .dispatch('LoginByUsername', { username: 'admin', password: '111111' })
        .then(() => {
          //   localStorage.setItem('username', this.loginForm.username);
          //   localStorage.setItem('password', this.loginForm.password);
          this.$router.push({
            path: '/terminalChange/index',
          });
        })
        .catch(() => {});
    },
  },
};
</script>

