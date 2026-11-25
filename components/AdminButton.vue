<template>
  <div
    :class="`admin-button-wrapper admin-button-tone admin-button-${type}
      ${$slots.submenu ? 'admin-button-has-submenu' : ''}
      ${disabled ? 'admin-button--disabled' : ''}
      `"
    :style="toneStyle"
  >
    <NuxtLink
      class="admin-button--text"
      :to="href ? href : '#'"
      :class="`${icon || $slots.submenu || prependIcon ? 'button-with-icon' : ''}`"
      v-bind="$attrs"
      @click="handleClick"
    >
      <Icon
        v-if="prependIcon"
        :name="loading ? 'mdi:loading' : prependIcon"
        :class="{ spinning: loading }"
      />
      <slot v-if="$slots.text">
        <slot name="text" />
      </slot>
      <slot v-else>
        {{ text }}
      </slot>
      <Icon
        v-if="icon && !prependIcon"
        :name="loading ? 'mdi:loading' : icon"
        :class="{ spinning: loading }"
      />
      <div v-else-if="!icon && !prependIcon && $slots.submenu" class="admin-button--submenu-icon">
        <Icon name="mdi:chevron-down" />
      </div>
    </NuxtLink>
    <div v-if="$slots.submenu" class="admin-button--submenu">
      <slot name="submenu" />
    </div>
  </div>
</template>
<script lang="ts" setup>
// Tones come from app.config.ts (nitidez.button): the layer ships primary,
// secondary and text, and each app can add its own.
type ButtonTone = keyof ReturnType<typeof useAppConfig>['nitidez']['button'];

defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    disabled?: boolean | undefined;
    type?: ButtonTone;
    text?: string;
    href?: string;
    icon?: string;
    prependIcon?: string;
    loading?: boolean;
    onClick?: () => void;
  }>(),
  {
    disabled: false,
    type: 'primary',
  },
);

const toneStyle = useButtonTone(() => props.type);

function handleClick(e: MouseEvent) {
  if (props.onClick) {
    e.preventDefault();
    if (!props.disabled) props.onClick();
    return;
  }
  if (props.href?.startsWith('#')) {
    e.preventDefault();
    document.querySelector(props.href)?.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
