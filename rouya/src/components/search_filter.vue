<template>
  <div class="filter">
    <el-row class="sort brand">
      <el-col class="title" :span="2">{{propName}}</el-col>
      <el-col :span="22">
        <span
          @click="select(it)"
          v-for="it in data"
          :class="'item '+(selected&&(selected.id==it.id)?'active':'')"
          :key="it.id"
        >{{it[type+'name']}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["data", "propName", "type", "initial"],
  data() {
    return {
      selected: null
    };
  },
  mounted() {
    if (this.initial) this.selected = this.initial;
  },
  methods: {
    select(it) {
      if (this.selected && this.selected.id == it.id) {
        this.selected = null;
        this.$emit("clear", it);
        return;
      }
      this.selected = it;
      this.$emit("change", it);
    }
  },
  watch: {
    // eslint-disable-next-line
    initial(n, o) {
      this.selected = n;
    }
  }
};
</script>

<style scoped>
.filter {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 1rem;
}
.filter .sort {
  padding: 0.8rem 0 0.8rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.filter .sort:first-child {
  border: 0;
}
.filter .item:hover,
.filter .item.active {
  color: #fff;
  background-color: #888;
  cursor: pointer;
}
.filter .title,
.filter .item {
  display: inline-block;
}
.filter .title {
  padding: 0.5rem 0;
  color: rgba(0, 0, 0, 0.4);
}
.filter .item {
  padding: 0.5rem 1rem 0.5rem 1.2rem;
  margin: 0;
}
</style>

