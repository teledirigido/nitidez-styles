<template>
  <div class="d-inline-block pb-1">
    <div
      class="status-icon br-max"
      :class="`status-icon--${type} ${bgClass}`"
      style="line-height: 100%; padding: 0.75rem"
    >
      <Icon class="f-size-xl" :class="{ spinning: type === 'pending' }" :name="icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type StatusIconType = 'success' | 'pending' | 'error';

const props = withDefaults(
  defineProps<{
    type?: StatusIconType;
    icon?: string;
  }>(),
  {
    type: 'success',
  },
);

const icons: Record<StatusIconType, string> = {
  success: 'mdi-check',
  pending: 'mdi-loading',
  error: 'mdi-close',
};

const bgClasses: Record<StatusIconType, string> = {
  success: 'bg-success c-white',
  pending: 'bg-secondary',
  error: 'bg-danger c-white',
};

const icon = computed(() => props.icon ?? icons[props.type]);
const bgClass = computed(() => bgClasses[props.type]);
</script>

<style lang="scss">
.status-icon {
  animation: status-icon-pop 400ms ease-out;
}

@keyframes status-icon-pop {
  0% {
    transform: translateY(0.5rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
