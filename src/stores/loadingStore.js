import { defineStore } from "pinia";

export default defineStore('loadingStore', {
    state: ()=>({
        isLoading: false
    }),
    actions: {
        loading(){
            this.isLoading = true;
            setTimeout(()=>{
                this.isLoading = false;
            }, 500)
        }
    }
})