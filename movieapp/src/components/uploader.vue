<template>
  <div>
    <input type="file" @change="onFill">
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  props: ["autoUpload"],
  data() {
    return {
      file: null
    };
  },
  methods: {
    onFill(e) {
      let f = (this.file = e.target.files[0]);
      if (!f) return;
      let fd = new FormData();
      fd.append("file", f);
      this.$emit("change", f);
      if (this.autoUpload) {
        let fd = new FormData();
        fd.append("file", f);
        api("_file/create", fd).then(r => {
          if (r.success) {
            e.target.value = "";
            this.$emit("uploadSuccess", r.data);
          } else {
            this.$emit("uploadFail", r);
          }
        });
      }
      // fd.append('name', 'my-file.jpg');
    }
  }
};
</script>

<style scoped>
input {
  width: 15rem;
}
</style>