import Vue from 'vue';

const animatedScrollObserver = new IntersectionObserver(
  (entries, scrollObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enter');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
);

Vue.directive('scrollanimation', {
  bind(ele) {
    ele.classList.add('before-enter');
    animatedScrollObserver.observe(ele);
  },
});
