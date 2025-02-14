import ToastNotification from '~/components/ToastNotification.vue';

export default defineNuxtPlugin((nuxtApp) => {
  const toaster = {
    show: null,
  };

  nuxtApp.vueApp.component('ToastNotification', ToastNotification);

  nuxtApp.vueApp.config.globalProperties.$toaster = toaster;

  nuxtApp.provide('toaster', toaster);
});
