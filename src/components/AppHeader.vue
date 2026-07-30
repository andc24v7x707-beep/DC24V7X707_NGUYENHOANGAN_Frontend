<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>

    <!-- PHẦN XỬ LÝ ĐĂNG NHẬP / ĐĂNG XUẤT -->
    <div class="navbar-nav align-items-center">
      <!-- Đã đăng nhập: Hiện tên user + nút Đăng xuất -->
      <div v-if="username" class="d-flex align-items-center">
        <span class="text-light mr-3">
          <i class="fas fa-user-circle mr-1"></i>
          <strong>{{ username }}</strong>
        </span>
        <button class="btn btn-outline-danger btn-sm" @click="logout">
          Đăng xuất <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>

      <!-- Chưa đăng nhập: Hiện nút Đăng nhập -->
      <div v-else>
        <router-link :to="{ name: 'user.login' }" class="btn btn-outline-success btn-sm">
          Đăng nhập <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username") || "",
    };
  },
  watch: {
    // Theo dõi sự thay đổi đường dẫn router để cập nhật lại username khi đăng nhập/đăng xuất
    $route() {
      this.username = localStorage.getItem("username") || "";
    },
  },
  methods: {
    logout() {
      // Xóa Token và thông tin user trong LocalStorage
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.username = "";
      
      // Chuyển về trang đăng nhập
      this.$router.push({ name: "user.login" });
    },
  },
};
</script>

<style scoped>
.navbar-brand {
  color: #fff !important;
}
</style>