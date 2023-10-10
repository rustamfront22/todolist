<template>
    <div class="dropdown" ref="dropdown" v-click-outside="onClickOutside" v-show="data">
        <div class="dropdown__content">
            <ul>
                <li v-for="(item, key) in data" :key="key" @click="clickEvent(item)">
                    <img v-if="item.img" :src="item.img" alt="">
                    {{item.label}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null
        }
    },
    mounted () {
        this.$evnt.register('dropdown-open', (data) => {
            this.data = data.list
            this.$nextTick(() => {
                this.$refs.dropdown.style.left = data.event.clientX - this.$refs.dropdown.clientWidth + 'px'
                this.$refs.dropdown.style.top = data.event.clientY + 'px'
            })
            
        });
    },
    methods: {
      onClickOutside () {
        this.data = null
      },
      clickEvent (evt) {
        this.$evnt.dispatch(evt.event, evt);
        this.data = null
      },
    }
}
</script>