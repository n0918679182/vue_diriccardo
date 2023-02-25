import { defineStore } from "pinia";
import axios from "axios";
export default defineStore('staffStore', {
    state: () => ({
        staffs: []
    }),
    actions: {
        async getStaffs() {
            await axios.get('http://localhost:3000/staffs').then(resp=>{
                this.staffs = resp.data
            }).catch(err => {
                console.log('staffStore err',err.response.data.message);
            });
        }
    }
})