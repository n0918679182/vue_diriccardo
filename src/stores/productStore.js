import { defineStore } from "pinia";
import axios from "axios";
export default defineStore('productStore', {
    state: () => ({
        products: [],
        menuItem: [],           // 從products分離出餐點的種類名稱 用於渲染側邊選單
    }),
    actions: {
        async getProducts() {
            this.products = [];
            this.menuItem = [];
            await axios.get('https://diriccardo-server.onrender.com/products').then(resp => {
                this.products = resp.data;
                const set = new Set();
                resp.data.filter(item => !set.has(item.type) ? set.add(item.type) : false).forEach(o => {
                    this.menuItem.push({
                        type: o.type,
                        chi: o.type == 'contorni' ? '佐酒小點' :
                            o.type == 'zuppa' ? '湯' :
                                o.type == 'insalata' ? '沙拉' :
                                    o.type == 'antipasto' ? '開胃菜' :
                                        o.type == 'specialita' ? '主廚特選' :
                                            o.type == 'carne' ? '多人分享主餐' :
                                                o.type == 'pasta' ? '義大利麵、燉飯' :
                                                    o.type == 'pizza' ? '拿坡里披薩' :
                                                        o.type == 'dolce' ? '甜點' : '雞尾酒與啤酒'
                    })
                });
            }).catch(err => {
                console.dir(err);
            });
        }
    }
})