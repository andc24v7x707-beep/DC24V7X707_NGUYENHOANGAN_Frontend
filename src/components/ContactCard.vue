<script>
export default {
props: {
contact: { type: Object, required: true },
},
};
</script>
<template>
  <div>
    <!-- Khối hiển thị Avatar -->
    <div class="p-1 text-center mb-3">
      <img 
        :src="contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&size=128`" 
        alt="Avatar" 
        class="rounded-circle img-thumbnail shadow-sm"
        style="width: 110px; height: 110px; object-fit: cover;"
      />
    </div>
  </div>
<div>
<div class="p-1">
<strong>Tên:</strong>
{{ contact.name }}
</div>
<div class="p-1">
<strong>E-mail:</strong>
{{ contact.email }}
</div>
<div class="p-1">
<strong>Địa chỉ:</strong>
{{ contact.address }}
</div>
<div class="p-1">
<strong>Điện thoại:</strong>
{{ contact.phone }}
</div>
<div class="p-1">
<strong>Liên hệ yêu thích:&nbsp;</strong>
<i v-if="contact.favorite" class="fas fa-check"></i>
<i v-else class="fas fa-times"></i>
</div>
<div class="p-1">
  <strong>Sở thích:</strong>
  <div v-if="contact.hobbies && contact.hobbies.length > 0" class="mt-2 pl-2">
    <div 
      v-for="(hobby, index) in contact.hobbies" 
      :key="index" 
      class="mb-1 d-flex align-items-center"
    >
      <i class="fas fa-check-square text-success mr-2" style="font-size: 1.1rem;"></i>
      <span>{{ hobby }}</span>
    </div>
  </div>
  <span v-else class="text-muted ml-1"><i>Chưa cập nhật</i></span>
</div>
    </div>
<div class="p-1">
  <strong>Nhóm:</strong> 
  <span class="badge badge-info ml-1">
    {{ contact.category ? contact.category : 'Khác' }}
  </span>
</div>
</template>