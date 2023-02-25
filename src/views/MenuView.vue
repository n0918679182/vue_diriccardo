<template>
  <div class="menu w-100 pt-4 overflow-hidden position-relative">
      <img src="../assets/images/menu/index-bg1.png" class="indexBg_img1" alt="">
      <img src="../assets/images/menu/index-bg2.png" class="indexBg_img2" alt="">
      <div class="mt-5 pt-4 d-flex justify-content-center">
        <!-- 首頁菜單+翻頁效果 -->
        <VueFlipbook class="flipbook" :pages="pages" v-slot="flipbook" :singlePage="true" :clickToZoom="false">
          <button class="d-none" @click="flipbook.flipLeft">Previous Page</button>
          <button class="d-none" @click="flipbook.flipRight">Next Page</button>
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
    }
  },
}
</script>
<style lang="scss">
.indexBg_img1 {
    position: absolute;
    top: -230px;
    left: -80px;
    transform: scale(1) rotate(90deg);
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
    height: 668px;

    .bounding-box {
        box-shadow: 0 0 20px #000;
    }

    .viewport {
        height: 668px;
    }
}
</style>