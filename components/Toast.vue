<template>
  <Teleport to="body">
    <div class="notify-toast-backdrop" :class="{ visible }" @click.self="hide">
      <div class="notify-toast" :class="{ visible }">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  duration: { type: Number, default: 0 },
  modelValue: { type: Boolean, default: undefined },
});

const emit = defineEmits(['close', 'update:modelValue']);
const internalVisible = ref(false);

const visible = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalVisible.value,
  set: (val) => {
    internalVisible.value = val;
    emit('update:modelValue', val);
  },
});

let timer = null;

function show() {
  visible.value = true;
  if (props.duration > 0) {
    clearTimeout(timer);
    timer = setTimeout(hide, props.duration);
  }
}

function hide() {
  if (!visible.value) return;
  visible.value = false;
  emit('close');
}

defineExpose({ show, hide });
</script>

<style lang="scss">
@use '../scss/global/mediaqueries' as mq;

.notify-toast-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: ease background-color 300ms;

  @include mq.desktop {
    padding-bottom: var(--space-2);
  }

  @include mq.nondesktop {
    align-items: start;
    padding-top: var(--space-0-5);
    padding-left: var(--space-0-5);
    padding-right: var(--space-0-5);
  }
}

.notify-toast-backdrop.visible {
  pointer-events: all;
  background-color: var(--c-overlay);
}

.notify-toast {
  width: 100%;
  max-width: 520px;
  background: var(--c-white);
  border-radius: var(--radius-0-4);
  padding: var(--space-1-5);
  box-shadow: var(--shadow-l);
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 350ms ease, transform 350ms ease;
  pointer-events: none;
}

.notify-toast.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}
</style>
