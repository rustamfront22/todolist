<template v-if="lang">
  <Navbar 
    @searchValue="search = $event"
    :lang="lang"
    @changeLang="changeLang"
  />
  <Notes 
      :notes="filterNotes"
      @deleteNote="deleteNote"
      @changeNote="changeNote"
      :search="search"
      :lang="lang"
    />
  <Modal 
    v-show="showModal"
    @closeModal="showModal = edit = false"
    :currentId="currentId"
    @addNote="addNote"
    :edit="edit"
    :editNote="editNote"
    @editedNote="editedNote"
    :lang="lang"
  />
  <a
   href="#" class="addNote"
   @click.prevent="(showModal = true), (edit = false)"
    v-if="!showModal"
  >
    <img src="@/assets/img/edit.svg" alt="">
  </a>
  <Dropdown></Dropdown>
</template>

<script>
import langs from '@/lang'
import Dropdown from "./components/dropdown/Dropdown.vue";
import Modal from './components/modal/Modal.vue'
import Navbar from './components/navbar/Navbar.vue'
import Notes from './components/notes/Notes.vue'

  export default {
    data() {
      return {
        showModal: false,
        currentId: localStorage.noteId ? localStorage.noteId : 0,
        notes: [],
        edit: false,
        editNote: {},
        search: '',
        lang: 'uz',
        langwords: {}
      }
    }, methods: {
      addNote(note){
        this.notes.push(note)
        this.currentId++
      },
      getNotes(){
        const localNotes = localStorage.notes
        if(localNotes){
          this.notes = JSON.parse(localNotes)
          this.currentId = localStorage.noteId
        }
      },
      changeNote(id){
        this.showModal = this.edit = true
        let pickedNote = this.notes.find(note => note.id === id)
        this.editNote = pickedNote
      },
      changeLang(val){
        this.lang = localStorage.lang = val
      },
      deleteNote(id){
        let index = this.notes.findIndex(note => note.id === id)
        this.notes.splice(index, 1)
        this.currentId--
      },
      editedNote(noteEdited){
        this.notes.forEach(note => {
          if (note.id === noteEdited.id) {
            if (note.id === noteEdited.id) {
              note.title = noteEdited.title;
              note.descr = noteEdited.descr;
              note.date = noteEdited.date;
            }
          }
        })
      }
    },
    created() {
      this.getNotes()
      localStorage.lang = localStorage.lang || 'uz'
      this.lang = localStorage.lang || 'uz'
      this.langwords = langs
      localStorage.words = JSON.stringify(this.langwords)
    },
    provide(){
      return {
        words: localStorage.words ? JSON.parse(localStorage.words) : langs
      }
    },
    computed: {
      filterNotes(){
        return this.search ? this.notes.filter(note => note.title.toLowerCase().includes(this.search.toLowerCase())) : this.notes
      }
    },
  components: { Navbar, Notes, Modal , Dropdown },
  watch: {
    notes: {
      handler(){
        localStorage.notes  = JSON.stringify(this.notes)
        localStorage.noteId = this.currentId
      },
      deep: true
    },
  },
}
</script>

<style>
</style>