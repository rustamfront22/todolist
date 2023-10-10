<template>
  <Transition name="modal">
    <div
      class="modal"
      @click="$emit('closeModal'), (title = ''), (descr = '')"
      v-on:keyup.esc="$emit('closeModal')"
    >
      <div class="modal-content" @click.stop>
        <h3>{{ edit ? words.titlewindowedit[lang] : words.titlewindow[lang] }} </h3>
        <form @submit.prevent="addNote">
          <label>
            <span>Title</span>
            <input
              type="text"
              required
              placeholder="Title"
              v-model="title"
              v-if="!edit"
            />
            <input
              type="text"
              required
              placeholder="Title"
              v-model="editNote.title"
              v-else
            />
          </label>
          <label>
            <span>Content</span>
            <input
              required
              placeholder="Content"
              v-model="descr"
              v-if="!edit"
            />
            <input
              required
              placeholder="Content"
              v-model="editNote.descr"
              v-else
            />
          </label>
          <div class="modal-btns">
            <button class="btn" v-if="!edit">{{words.addbtn[lang]}}</button>
            <button type="button" class="btn" @click="changeNote" v-else>
              {{words.editwindowbtn[lang]}}
            </button>
            <a
              href="#"
              class="btn"
              @click.prevent="$emit('closeModal'), (title = ''), (descr = '')"
              >{{words.closebtn[lang]}}</a
            >
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  inject: ['words'],
  props: ["currentId", "edit", "editNote", "lang"],
  data() {
    return {
      title: "",
      descr: "",
      id: this.currentId,
    };
  },
  methods: {
    addNote() {
      const note = {
        id: this.id++,
        title: this.title,
        descr: this.descr,
        date: new Date().toLocaleDateString(),
      };
      this.$emit("addNote", note);
      this.$emit("closeModal");
      setTimeout(() => {
        this.title = this.descr = "";
      }, 400);
      this.$emit('closeModal')
    },
    changeNote() {
      if (this.title != "" && this.descr != "") {
        const editedNote = {
          id: this.editNote.id,
          title: this.editNote.title,
          descr: this.editNote.descr,
          date: new Date().toLocaleDateString(),
        };
        this.$emit("editedNote", editedNote);
      }
      this.$emit("closeModal");
    },
  },
};
</script>
