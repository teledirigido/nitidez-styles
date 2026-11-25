<template>
  <div
    :class="`chip chip--${props.size} chip--${props.type}`"
    :style="{
      '--chip-bg': tone?.bg,
      '--chip-fg': tone?.fg,
      '--chip-border': tone?.border,
      display: props.display,
    }"
  >
    <slot>{{ props.text }}</slot>
  </div>
</template>

<script lang="ts" setup>
// Tones come from app.config.ts (nitidez.chip): the layer ships the base set,
// and each app can add its own. ReturnType<typeof useAppConfig> avoids importing
// 'nuxt/schema', which a layer outside node_modules cannot resolve.
type ChipTone = keyof ReturnType<typeof useAppConfig>['nitidez']['chip'];
type ChipToneStyle = { bg: string; fg: string; border?: string };
type ChipSize = 'default' | 'small';
type CSSDisplay = 'inline' | 'block' | 'inline-block' | 'flex' | 'none';

const props = withDefaults(
  defineProps<{
    size?: ChipSize;
    text?: string;
    type?: ChipTone;
    display?: CSSDisplay;
  }>(),
  {
    size: 'default',
    type: 'default',
  },
);

const tones = useAppConfig().nitidez.chip as Record<string, ChipToneStyle>;
const tone = computed(() => tones[props.type]);
</script>

<style>
.chip {
  padding: 0.5rem 1.2rem;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: var(--chip-radius, 0.5rem);
  text-align: center;
  line-height: 150%;
  background-color: var(--chip-bg, #EDEDED);
  color: var(--chip-fg, #777);
  border: var(--chip-border, none);
}

.chip--small {
  padding: 0.3rem 1rem;
}
</style>
