import { defineStore } from "pinia";
import axios from "axios";
export default defineStore('staffStore', {
    state: () => ({
        staffs: []
    }),
    actions: {
        async getStaffs() {
            await axios.get('https://diriccardo-server.onrender.com/staffs').then(resp=>{
                this.staffs = resp.data
            }).catch(err => {
                alert(err.response.data.message);
            });
        }
    }
})