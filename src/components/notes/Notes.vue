<template>
  <div class="notes">
    <div class="container">
      <div class="notes-nav">
        <h2 v-if="!search">{{ notes.length ? words.infobar[lang] : words.noinfobar[lang] }}</h2>
        <h2 v-else>{{ notes.length ? words.appbarseacrch[lang] : words.notfound[lang] }}</h2>
        <button @click="grid = !grid">
          <img src="@/assets/img/list.svg" alt="" v-if="grid" />
          <img src="@/assets/img/grid.svg" alt="" v-else />
          {{ grid ? words.list[lang] : words.grid[lang] }}
        </button>
      </div>
      <transition-group
        name="notes"
        tag="div"
        class="notes-grid"
        :class="{ column: !grid }"
      >
        <NotesItem 
          v-for="note in notes"
          :key="note.id"
          :note="note" 
          @deleteNote="$emit('deleteNote', note.id)"
          @changeNote="$emit('changeNote', note.id)"
          :lang="lang"
      />
      </transition-group>
    </div>
  </div>
</template>

<script>
import NotesItem from "./NotesItem.vue";
export default {
  inject: ['words'],
  props: ["notes", "search", "lang"],
  components: { NotesItem },
  data() {
        return {
            grid: true
        }
    },
    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    mounted() {
        this.myEventHandler()
    },
    methods: {
        myEventHandler() {
            window.innerWidth <= 768 ? this.grid = false : this.grid = true
        },
    },
};
</script>

<style>
</style>