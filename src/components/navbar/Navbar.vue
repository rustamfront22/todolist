<template>
<header class="header">
    <div class="header-main" v-if="header">
        <button @click="changeLang" v-if="lang == 'ru'">UZ</button>
        <button @click="changeLang" v-else>RU</button>
        <h1>{{words.appbartitle[lang]}}</h1>
        <img src="@\assets\img\search.svg" alt="" @click="header = false">
    </div>
    <div class="header-main" v-else>
        <img src="@\assets\img\reset.svg" alt="" @click="header = true, search = ''">
        <input type="text" :placeholder="words.appbarseacrch[lang]" v-model="search" autofocus>
        <img src="@\assets\img\back.svg" alt="" @click="search = ''">
    </div>
</header>
</template>

<script>
    export default {
        inject: ['words'],
        props: ['lang'],
        data() {
            return {
                header: true,
                search: ''
            }
        },
        watch: {
            search(val){
                this.$emit('searchValue', val)
            }
        },
        methods: {
            changeLang(){
                this.$emit('changeLang', this.lang == 'ru' ? 'uz' : 'ru')
            }
        },
    }
</script>

<style>

</style>