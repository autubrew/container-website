import Vue from 'vue'

import 'bootstrap-vue/dist/bootstrap-vue.min.css'

// Component
import {
    BButton,
    BCard,
    BCardBody,
    BCardFooter,
    BCardHeader,
    BCardText,
    BCardTitle,
    BCol,
    BCollapse,
    BContainer,
    BDropdownItemButton,
    BFormInput,
    BImgLazy,
    BLink,
    BListGroup,
    BListGroupItem,
    BModal,
    BNavItem,
    BNavItemDropdown,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BPaginationNav,
    BRow
} from 'bootstrap-vue'

Vue.component('b-button', BButton);
Vue.component('b-card', BCard);
Vue.component('b-card-body', BCardBody);
Vue.component('b-card-footer', BCardFooter);
Vue.component('b-card-header', BCardHeader);
Vue.component('b-card-text', BCardText);
Vue.component('b-card-title', BCardTitle);
Vue.component('b-col', BCol);
Vue.component('b-collapse', BCollapse);
Vue.component('b-container', BContainer);
Vue.component('b-dropdown-item-button', BDropdownItemButton);
Vue.component('b-form-input', BFormInput);
Vue.component('b-img-lazy', BImgLazy);
Vue.component('b-link', BLink);
Vue.component('b-list-group', BListGroup);
Vue.component('b-list-group-item', BListGroupItem);
Vue.component('b-modal', BModal);
Vue.component('b-nav-item', BNavItem);
Vue.component('b-nav-item-dropdown', BNavItemDropdown);
Vue.component('b-navbar', BNavbar);
Vue.component('b-navbar-brand', BNavbarBrand);
Vue.component('b-navbar-toggle', BNavbarToggle);
Vue.component('b-navbar-nav', BNavbarNav);
Vue.component('b-pagination-nav', BPaginationNav);
Vue.component('b-row', BRow);

// Icon
import {
    BIconDownload,
    BIconEye,
    BIconGraphUp,
    BIconPeopleFill,
    BIconPerson,
    BIconSearch
} from 'bootstrap-vue'

Vue.component('b-icon-download', BIconDownload);
Vue.component('b-icon-eye', BIconEye);
Vue.component('b-icon-graph-up', BIconGraphUp);
Vue.component('b-icon-people-fill', BIconPeopleFill);
Vue.component('b-icon-person', BIconPerson);
Vue.component('b-icon-search', BIconSearch);

// Directive
import {
    VBModal
} from "bootstrap-vue";

Vue.directive('b-modal', VBModal);
