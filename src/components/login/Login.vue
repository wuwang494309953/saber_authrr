<template>
  <div>
    <div class="wrapper">
      <div class="container">
				<h1>Welcome</h1>
				<form method="post" class="form">
					<input type="text" v-model="form.username" placeholder="Account"/>
					<input type="password" v-model="form.password" @keyup.enter="_submit" placeholder="Password" autocomplete/>
          <el-button type="primary" :loading="isSubmit" @click="_submit">Login</el-button>
				</form>
			</div>
      <ul class="bg-bubbles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  data () {
    return {
      isSubmit: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    _submit () {
      this.isSubmit = true
      login(this.form).then((res) => {
        if (res.code == 0) {
          this.isSubmit = false
          this.$router.push('/')
        } else {
          this._loginFail(res.msg)
        }
      }).catch((e) => {
        this._loginFail('发生了一个未知的错误')
      })
    },
    _loginFail (message) {
      this.isSubmit = false
      this.$notify.error({
        title: '错误',
        message: message
      })
    }
  }
}
</script>

<style scoped src="./main.css" >
</style>

<style scoped lang="stylus">
  h1
    color: #fff
</style>
