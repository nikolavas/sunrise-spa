import Vue from 'vue';
import template from '../../components/home/PageHome/template.vue';
import BannerTopLeft from '../../components/home/BannerTopLeft.vue';
import BannerTopRight from '../../components/home/BannerTopRight.vue';
import BannerMiddle from '../../components/home/BannerMiddle.vue';
import BannerBottomLeft from '../../components/home/BannerBottomLeft.vue';
import BannerBottomRight from '../../components/home/BannerBottomRight.vue';

const component = {
  components: {
    BannerTopLeft,
    BannerTopRight,
    BannerMiddle,
    BannerBottomLeft,
    BannerBottomRight,
  },
};
export default Vue.component('TheHeader', {
  ...component,
  ...template,
});
