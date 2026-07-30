<script>
export default {
props: {
contacts: { type: Array, default: [] },
activeIndex: { type: Number, default: -1 },
},
emits: ["update:activeIndex"],
methods: {
updateActiveIndex(index) {
this.$emit("update:activeIndex", index);
}
}
};
</script>
<template>
<ul class="list-group">
<li
class="list-group-item"
v-for="(contact, index) in contacts"
:key="contact._id"
:class="{ active: index === activeIndex }"
@click="updateActiveIndex(index)"
>
<img 
    :src="contact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&size=32`" 
    class="rounded-circle mr-2"
    style="width: 32px; height: 32px; object-fit: cover;"
  />
{{ contact.name }}
</li>
</ul>
</template>