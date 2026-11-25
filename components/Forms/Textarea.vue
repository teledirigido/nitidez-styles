<template>
  <textarea
    v-bind="$attrs"
    :value="modelValue"
    @input="onInput"
    :style="`${multiline ? 'overflow: hidden; resize: none' : ''}`"
    class="text"
  ></textarea>
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue: string;
    multiline?: boolean;
  }>(),
  {
    multiline: false,
  },
);

const el = useTemplateRef<HTMLTextAreaElement>('el');

function onInput(event: Event) {
  if (!props.multiline) {
    return;
  }
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  target.style.height = 'auto';
  target.style.height = target.scrollHeight + 'px';
}
</script>
