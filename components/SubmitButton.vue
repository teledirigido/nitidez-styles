<template>
  <div class="admin-button-wrapper">
    <button
      type="submit"
      class="admin-button admin-button-primary admin-button--text"
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
</script>
