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
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      category: yup.string(),
    });

    return {
      // Đảm bảo luôn có giá trị category mặc định nếu object contact truyền vào chưa có
      contactLocal: {
        category: "Khác",
        ...this.contact,
      },
      contactFormSchema,
    };
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