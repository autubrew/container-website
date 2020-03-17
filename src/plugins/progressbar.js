import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    autoFinish: false,
    color: '#00bfff',
    failedColor: 'red',
    thickness: '2px',
});
