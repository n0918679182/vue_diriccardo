<template>
  <div class="menu w-100 pt-4 overflow-hidden position-relative">
    <img src="../assets/images/menu/index-bg1.png" class="indexBg_img1" alt="">
    <img src="../assets/images/menu/index-bg2.png" class="indexBg_img2" alt="">
    <div class="mt-5 pt-4 d-flex justify-content-center position-relative">
      <div class="hint w-100 d-flex justify-content-center align-items-center" :class="[{ 'hide': noHint }, {'d-none': dnone}]" @click="()=>hideHint()">
        <p class="mb-0 text-white">請按住菜單向左翻</p>
      </div>
      <!-- 首頁菜單+翻頁效果 -->
      <VueFlipbook class="flipbook" :pages="pages" v-slot="flipbook" :singlePage="true" :clickToZoom="false">
        <button class="d-none" @click="() => flipbook.flipLeft">Previous Page</button>
        <button class="d-none" @click="() => flipbook.flipRight">Next Page</button>
      </VueFlipbook>
    </div>
  </div>
</template>
<script>
import menu1 from "../assets/images/menu/menu1.png";
import menu2 from "../assets/images/menu/menu2.png";
import menu3 from "../assets/images/menu/menu3.png";
import menu4 from "../assets/images/menu/menu4.png";
import menu5 from "../assets/images/menu/menu5.png";
export default {
  data() {
    return {
      pages: [
        null,
        menu1,
        menu2,
        menu3,
        menu4,
        menu5,
      ],
      noHint: false,
      dnone: false
    }
  },
  methods: {
    hideHint() {
      this.noHint = true;
      setTimeout(()=>{
        this.dnone = true;
      }, 200)
    }
  },
}
</script>
<style lang="scss">
.indexBg_img1 {
  position: absolute;
  top: -270px;
  left: -80px;
  transform: scale(1) rotate(0deg);
  opacity: .7;
  z-index: -10;
}

.indexBg_img2 {
  position: absolute;
  bottom: -120px;
  right: -120px;
  opacity: .7;
  z-index: -10;
}

.flipbook {
  width: 900px;
  height: 92vh;

  .bounding-box {
    box-shadow: 0 0 20px #000;
  }

  .viewport {
    height: 90vh;
  }
}

.hint {
  position: absolute;
  left: 0;
  top: 100px;
  height: 60vh;
  background: rgba(0, 0, 0, .7);
  z-index: 1;
  transition: .2s;
  opacity: 100;

  &.hide {
    opacity: 0;
  }
}
</style>