<template>
  <div class="admin-button-wrapper" :style="toneStyle">
    <button
      type="submit"
      class="admin-button admin-button-tone admin-button-primary admin-button--text"
      :class="icon || prependIcon ? 'button-with-icon' : ''"
      :disabled="disabled"
    >
      <Icon v-if="prependIcon" :name="prependIcon" />
      {{ text }}
      <Icon v-if="icon" :name="icon" />
    </button>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    text?: string;
    icon?: string;
    prependIcon?: string;
  }>(),
  {
    text: 'Send',
    disabled: false,
  },
);

const toneStyle = useButtonTone(() => 'primary');
</script>
