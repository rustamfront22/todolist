export default function install(app) {
    app.config.globalProperties.$evnt = {
        eventStack: [],
        register(id, callback) {
            this.eventStack[id] = callback
        },
        unRegister(id) {
            if (this.eventStack[id])
                delete this.eventStack[id]
        },
        dispatch(id, ...args) {
            if (this.eventStack[id])
                this.eventStack[id](...args)
        },
    }
}