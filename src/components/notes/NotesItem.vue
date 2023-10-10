<template>
    <div class="notes-item">
        <button @click.prevent="openDropdown" class="notes-item__dots">
            <img src="@/assets/img/dots.svg" alt="">
        </button>
        <h3>{{note.title}}</h3>
        <span>{{note.date}}</span>
        <p>{{note.descr}}</p>
        <div class="notes-item-controls">
            <a href="#" class="btn" @click.prevent="$emit('changeNote', note.id)">
                <img src="@/assets/img/edit.svg" alt="">{{words.editbtn[lang]}}
            </a>
            <a href="#" class="btn" @click.prevent="$emit('deleteNote'), note.id">
                <img src="@/assets/img/del.svg" alt="">{{words.deledit[lang]}}
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        inject: ['words'],
        props: ["note", "lang"],
        methods: {
        openDropdown(event) {
            this.$evnt.dispatch('dropdown-open', {
                list: [
                    {
                        id: this.note.id,
                        label: 'Редактировать',
                        img: require('@/assets/img/edit.svg'),
                        event: 'edit-item'
                    },
                    {
                        id: this.note.id,
                        label: 'Удалить',
                        img: require('@/assets/img/del.svg'),
                        event: 'delete-item'
                    }
                ],
                event
            });
        },
        editEvent(event) {
            this.$emit('changeNote', event.id)
        },
        deleteEvent(event) {
            this.$emit('deleteNote', event.id)
        }
    },
    mounted() {
        this.$evnt.register('edit-item', this.editEvent);
        this.$evnt.register('delete-item', this.deleteEvent);
    }
    }
</script>

<style >

</style>