# Phase 2 - Fix: Input Component v-model Reactivity

## What Was Broken

The `Input` component was not updating form values when users typed in input fields. The form's reactive state (`form.applicantName`, `form.applicantEmail`, `form.permitType`) remained empty even though users could see text in the input fields.

## Root Cause

### Vue 3 Props Immutability Rule

In Vue 3, **props are read-only and immutable**. You cannot directly mutate a prop value. When a component receives a prop like `modelValue`, it cannot modify it directly.

### The Problematic Pattern

If you try to use `v-model` directly on a prop:

```vue
<!-- ❌ WRONG - This doesn't work -->
<input v-model="props.modelValue" />
```

Vue will throw a warning: "Attempting to mutate prop 'modelValue'". Even if it didn't throw an error, the mutation wouldn't propagate back to the parent component because props are one-way data flow.

### Why It Happened

The original implementation likely tried to bind `v-model` directly to the `modelValue` prop, which violates Vue's one-way data flow principle. Props flow down from parent to child, but updates must flow up through events.

## The Solution

### Computed Getter/Setter Pattern

Vue 3 provides a pattern for creating two-way bindings with props using a **computed property with getter and setter**:

```vue
<script setup>
const props = defineProps<{
  modelValue?: string | number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

// ✅ CORRECT - Computed proxy for v-model
const proxyValue = computed({
  get: () => props.modelValue ?? '',
  set: (val: string | number) => {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <!-- Now v-model works correctly -->
  <input v-model="proxyValue" />
</template>
```

### How It Works

1. **Getter (`get`)**: Returns the current `modelValue` prop value
   - When the input needs to display a value, it reads from `props.modelValue`
   - This maintains the one-way data flow from parent to child

2. **Setter (`set`)**: Emits an update event instead of mutating the prop
   - When the user types, Vue calls the setter with the new value
   - The setter emits `update:modelValue` event to the parent
   - The parent component updates its reactive state
   - Vue's reactivity system propagates the change back down as a new prop value

3. **v-model Binding**: The computed property can be used with `v-model`
   - Vue's `v-model` automatically calls the getter to read and setter to write
   - This creates a seamless two-way binding experience

## Implementation Details

### Key Components of the Fix

1. **`defineOptions({ inheritAttrs: false })`**
   - Prevents automatic attribute inheritance
   - Gives us full control over which attributes are applied

2. **Computed Proxy**
   ```typescript
   const proxyValue = computed({
     get: () => props.modelValue ?? '',
     set: (val: string | number) => {
       emit('update:modelValue', val);
     },
   });
   ```
   - Creates a reactive proxy that bridges prop reading and event emitting

3. **Attribute Handling**
   - Explicit props take precedence over `$attrs`
   - `passthroughAttrs` excludes already-handled attributes to avoid conflicts
   - Class is handled separately via `cn()` utility

## Benefits

### Consistent v-model Usage

After this fix, the `Input` component can be used with `v-model` anywhere in the app:

```vue
<!-- ✅ Works everywhere -->
<Input v-model="form.applicantName" />
<Input v-model="form.applicantEmail" />
<Input v-model="form.permitType" />
```

### No Prop Mutation Warnings

The computed proxy pattern ensures:
- No Vue warnings about mutating props
- Proper one-way data flow (props down, events up)
- Full reactivity support

### Reusability

The component is now a proper reusable input that follows Vue 3 best practices and can be used consistently across the entire application.

## Testing

To verify the fix works:

1. **Type in any input field** (Applicant Name, Email, Permit Type)
2. **Check Vue DevTools** - the `form` reactive object should update immediately
3. **Check browser console** - no warnings about prop mutations
4. **Submit the form** - validation should work with the actual form values

## Related Concepts

- **Vue 3 Composition API**: Using `defineProps`, `defineEmits`, and `computed`
- **v-model Directive**: How Vue implements two-way binding
- **Props vs Events**: Understanding one-way data flow in Vue
- **Computed Properties**: Reactive derived state with getters and setters

## References

- [Vue 3 Props Documentation](https://vuejs.org/guide/components/props.html)
- [Vue 3 v-model Documentation](https://vuejs.org/guide/components/v-model.html)
- [Vue 3 Computed Properties](https://vuejs.org/guide/essentials/computed.html)

