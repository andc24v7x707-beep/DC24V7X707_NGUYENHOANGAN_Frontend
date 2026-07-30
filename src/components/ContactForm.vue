<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <!-- Tên -->
    <div class="form-group">
      <label for="name">Tên</label>
      <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <!-- E-mail -->
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <!-- Địa chỉ -->
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <!-- Điện thoại -->
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <!-- Tải ảnh từ máy tính -->
<div class="form-group">
  <label for="avatar">Ảnh đại diện (Chọn từ máy tính)</label>
  <input 
    type="file" 
    accept="image/*" 
    class="form-control-file" 
    @change="onFileChange" 
  />
  
  <!-- Xem trước (Preview) ảnh vừa chọn -->
  <div v-if="contactLocal.avatar" class="mt-2">
    <img 
      :src="contactLocal.avatar" 
      alt="Preview Avatar" 
      class="rounded-circle img-thumbnail"
      style="width: 80px; height: 80px; object-fit: cover;"
    />
    <button 
      type="button" 
      class="btn btn-sm btn-outline-danger ml-2" 
      @click="contactLocal.avatar = ''"
    >
      Xóa ảnh
    </button>
  </div>
</div>
    
    <div class="form-group">
  <label for="category">Nhóm liên hệ</label>
  
  <select 
    id="category"
    class="form-control" 
    v-model="contactLocal.category"
  >
    <option value="Gia đình">Gia đình</option>
    <option value="Bạn bè">Bạn bè</option>
    <option value="Công việc">Công việc</option>
    <option value="Đồng học">Đồng học</option>
    <option value="Khác">Khác</option>
  </select>

  <!-- Field ẩn giúp Vee-Validate kiểm tra dữ liệu mà không can thiệp vào select -->
  <Field name="category" type="hidden" v-model="contactLocal.category" />
  <ErrorMessage name="category" class="error-feedback" />
</div>

    <!-- Liên hệ yêu thích -->
    <div class="form-group form-check">
      <input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>
    <!-- Sở thích -->
  <div class="form-group mb-3">
  <label class="d-block font-weight-bold">Sở thích:</label>  
  <div class="form-check form-check-inline">
    <input 
      class="form-check-input" 
      type="checkbox" 
      id="hobby-sports" 
      value="Thể thao" 
      v-model="contactLocal.hobbies"
    />
    <label class="form-check-label" for="hobby-sports">⚽ Thể thao</label>
  </div>
  <div class="form-check form-check-inline">
    <input 
      class="form-check-input" 
      type="checkbox" 
      id="hobby-music" 
      value="Âm nhạc" 
      v-model="contactLocal.hobbies"
    />
    <label class="form-check-label" for="hobby-music">🎵 Âm nhạc</label>
  </div>
  <div class="form-check form-check-inline">
    <input 
      class="form-check-input" 
      type="checkbox" 
      id="hobby-reading" 
      value="Đọc sách" 
      v-model="contactLocal.hobbies"
    />
    <label class="form-check-label" for="hobby-reading">📚 Đọc sách</label>
  </div>

  <div class="form-check form-check-inline">
    <input 
      class="form-check-input" 
      type="checkbox" 
      id="hobby-travel" 
      value="Du lịch" 
      v-model="contactLocal.hobbies"
    />
    <label class="form-check-label" for="hobby-travel">✈️ Du lịch</label>
  </div>
</div>
    <!-- Nút thao tác -->
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true }
  },
  data() {
  const contactFormSchema = yup.object().shape({
    name: yup.string().required("Tên phải có giá trị.").min(2).max(50),
    email: yup.string().email("E-mail không đúng.").max(50),
    address: yup.string().max(100),
    phone: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
    category: yup.string(),
    avatar: yup.string().nullable(),
    hobbies: yup.array(), // <-- Khai báo kiểm tra kiểu Mảng cho hobbies
  });

  return {
    contactLocal: {
      category: "Khác",
      avatar: "",
      hobbies: [], // <-- Khởi tạo mảng rỗng chứa các sở thích được tích
      ...this.contact,
    },
    contactFormSchema,
  };
  },
  created() {
    // Ép buộc hobbies luôn luôn là Mảng (Array) ngay khi component vừa load
    if (!Array.isArray(this.contactLocal.hobbies)) {
      this.contactLocal.hobbies = [];
    }
  },
  watch: {
    // Khi bấm Edit, dữ liệu contact từ API tải xong sẽ tự động cập nhật vào form
    contact: {
      handler(newVal) {
        this.contactLocal = {
          category: "Khác",
          ...newVal,
        };
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Giới hạn kích thước file (ví dụ dưới 2MB để tránh nặng Database)
    if (file.size > 2 * 1024 * 1024) {
      alert("Kích thước ảnh phải nhỏ hơn 2MB!");
      event.target.value = "";
      return;
    }

    // Đọc file thành chuỗi Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      this.contactLocal.avatar = e.target.result; // Lưu chuỗi Base64 vào biến avatar
    };
    reader.readAsDataURL(file);
  },


    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },
    Cancel() {
      const reply = window.confirm('Bạn có thay đổi chưa lưu! Bạn có muốn rời đi?');
      if (!reply) {
        return false;
      } else {
        this.$router.push({ name: "contactbook" });
      }
    }
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>