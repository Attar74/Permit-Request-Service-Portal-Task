<template>
  <Teleport to="body">
    <div
      class="fixed top-20 z-50 flex flex-col gap-3 p-4 pointer-events-none"
      :class="isRTL ? 'left-4' : 'right-4'"
    >
      <TransitionGroup name="toast" tag="div" class="flex flex-col gap-3">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto"
        >
          <div
            :class="[
              'min-w-[320px] max-w-md rounded-[0.875rem] shadow-lg border p-4 flex items-start gap-3',
              getToastClasses(toast.type),
            ]"
          >
            <!-- Icon -->
            <div class="flex-shrink-0 mt-0.5">
              <Icon :name="getToastIcon(toast.type)" class="h-5 w-5" />
            </div>

            <!-- Message -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium leading-5">
                {{ toast.message }}
              </p>
            </div>

            <!-- Close Button -->
            <button
              @click="removeToast(toast.id)"
              class="flex-shrink-0 h-5 w-5 rounded-md flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              :aria-label="t('Close')"
              type="button"
            >
              <Icon name="lucide:x" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useRTL } from '../composables/useRTL';
import { useToast, type ToastType } from '../composables/useToast';
import { useTranslations } from '../composables/useTranslations';

const { toasts, removeToast } = useToast();
const { isRTL } = useRTL();
const { t } = useTranslations();

function getToastClasses(type: ToastType): string {
  const classes = {
    success:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error:
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  };
  return classes[type] || classes.info;
}

function getToastIcon(type: ToastType): string {
  const icons = {
    success: 'lucide:check-circle-2',
    error: 'lucide:alert-circle',
    info: 'lucide:info',
    warning: 'lucide:alert-triangle',
  };
  return icons[type] || icons.info;
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

[dir='rtl'] .toast-enter-from {
  transform: translateX(-100%);
}

[dir='rtl'] .toast-leave-to {
  transform: translateX(-100%);
}
</style>
