<template>
  <input
    :id="inputId"
    :type="inputType"
    :placeholder="placeholderText"
    :disabled="isDisabled"
    :required="isRequired"
    v-bind="passthroughAttrs"
    :class="
      cn(
        'flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        ($attrs.class as ClassValue)
      )
    "
    v-model="proxyValue"
  />
</template>

<script setup lang="ts">
import type { ClassValue } from 'clsx';
import { computed, useAttrs } from 'vue';
import { cn } from '../../lib/utils';

// Disable automatic attribute inheritance to have full control
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue?: string | number;
  id?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const attrs = useAttrs();

// v-model proxy: Vue props are read-only, so we use a computed getter/setter
// to create a two-way binding that emits updates instead of mutating props
const proxyValue = computed({
  get: () => props.modelValue ?? '',
  set: (val: string | number) => {
    emit('update:modelValue', val);
  },
});

// Extract specific attributes with fallback to $attrs
const inputId = computed(() => props.id ?? (attrs.id as string | undefined));
const inputType = computed(
  () => props.type ?? (attrs.type as string) ?? 'text'
);
const placeholderText = computed(
  () => props.placeholder ?? (attrs.placeholder as string | undefined)
);
const isDisabled = computed(
  () => props.disabled ?? (attrs.disabled as boolean | undefined)
);
const isRequired = computed(
  () => props.required ?? (attrs.required as boolean | undefined)
);

// Pass through all other attributes except class (which we handle separately)
const passthroughAttrs = computed(() => {
  const { class: _class, id: _id, type: _type, placeholder: _placeholder, disabled: _disabled, required: _required, ...rest } = attrs;
  return rest;
});
</script>
