<template>
  <div class="page col-md-5 mx-auto mt-5">
    <h4 class="text-center mb-4">ĐĂNG NHẬP HỆ THỐNG</h4>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group mb-3">
        <label for="username">Tên đăng nhập</label>
        <input 
          type="text" 
          class="form-control" 
          v-model="user.username" 
          required 
          placeholder="Nhập tên đăng nhập"
        />
      </div>

      <div class="form-group mb-3">
        <label for="password">Mật khẩu</label>
        <input 
          type="password" 
          class="form-control" 
          v-model="user.password" 
          required 
          placeholder="Nhập mật khẩu"
        />
      </div>

      <div class="form-group text-center">
        <button class="btn btn-primary w-100">Đăng nhập</button>
      </div>

      <p v-if="message" class="alert alert-danger mt-3 text-center">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await UserService.login(this.user);
        // Lưu Token và tên user vào LocalStorage
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("username", response.username);

        // Chuyển hướng sang trang danh bạ
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        this.message = error.response?.data?.message || "Đăng nhập thất bại!";
      }
    },
  },
};
</script>