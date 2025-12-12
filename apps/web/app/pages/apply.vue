<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">
        Apply for a Permit
      </h1>
      <p class="text-muted-foreground mt-2 text-sm sm:text-base">
        Fill out the form below to submit your permit application
      </p>
    </div>

    <div
      class="rounded-md border border-border bg-card text-card-foreground shadow-md"
    >
      <div class="p-6 sm:p-8 lg:p-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Applicant Name Field -->
          <div class="space-y-2">
            <label
              for="applicantName"
              class="text-sm font-semibold text-foreground flex items-center gap-1.5"
            >
              <span>Applicant Name</span>
              <span class="text-destructive font-bold" aria-label="required">*</span>
            </label>
            <input
              id="applicantName"
              v-model="form.applicantName"
              type="text"
              :disabled="isSubmitting"
              placeholder="Enter your full name"
              :class="[
                'flex h-11 w-full rounded-md border bg-background px-4 py-2.5',
                'text-sm font-medium text-foreground',
                'ring-offset-background placeholder:text-muted-foreground/60',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'focus-visible:border-ring focus-visible:shadow-sm',
                'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
                'transition-all duration-200',
                'hover:border-input/80',
                errors.applicantName
                  ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                  : 'border-input',
              ]"
            />
            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <p
                v-if="errors.applicantName"
                class="text-sm text-destructive font-medium flex items-center gap-1.5 mt-1.5"
                role="alert"
              >
                <Icon name="lucide:alert-circle" class="h-4 w-4" />
                {{ errors.applicantName }}
              </p>
            </Transition>
          </div>

          <!-- Email Address Field -->
          <div class="space-y-2">
            <label
              for="applicantEmail"
              class="text-sm font-semibold text-foreground flex items-center gap-1.5"
            >
              <span>Email Address</span>
              <span class="text-destructive font-bold" aria-label="required">*</span>
            </label>
            <input
              id="applicantEmail"
              v-model="form.applicantEmail"
              type="email"
              :disabled="isSubmitting"
              placeholder="Enter your email address"
              :class="[
                'flex h-11 w-full rounded-md border bg-background px-4 py-2.5',
                'text-sm font-medium text-foreground',
                'ring-offset-background placeholder:text-muted-foreground/60',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'focus-visible:border-ring focus-visible:shadow-sm',
                'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
                'transition-all duration-200',
                'hover:border-input/80',
                errors.applicantEmail
                  ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                  : 'border-input',
              ]"
            />
            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <p
                v-if="errors.applicantEmail"
                class="text-sm text-destructive font-medium flex items-center gap-1.5 mt-1.5"
                role="alert"
              >
                <Icon name="lucide:alert-circle" class="h-4 w-4" />
                {{ errors.applicantEmail }}
              </p>
            </Transition>
          </div>

          <!-- Permit Type Field -->
          <div class="space-y-2">
            <label
              for="permitType"
              class="text-sm font-semibold text-foreground flex items-center gap-1.5"
            >
              <span>Permit Type</span>
              <span class="text-destructive font-bold" aria-label="required">*</span>
            </label>
            <input
              id="permitType"
              v-model="form.permitType"
              type="text"
              :disabled="isSubmitting"
              placeholder="e.g., Construction Permit, Business License"
              :class="[
                'flex h-11 w-full rounded-md border bg-background px-4 py-2.5',
                'text-sm font-medium text-foreground',
                'ring-offset-background placeholder:text-muted-foreground/60',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'focus-visible:border-ring focus-visible:shadow-sm',
                'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
                'transition-all duration-200',
                'hover:border-input/80',
                errors.permitType
                  ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                  : 'border-input',
              ]"
            />
            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <p
                v-if="errors.permitType"
                class="text-sm text-destructive font-medium flex items-center gap-1.5 mt-1.5"
                role="alert"
              >
                <Icon name="lucide:alert-circle" class="h-4 w-4" />
                {{ errors.permitType }}
              </p>
            </Transition>
          </div>

          <!-- Submit Error Message -->
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="submitError"
              class="rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive font-medium flex items-start gap-2"
            >
              <Icon
                name="lucide:alert-triangle"
                class="h-5 w-5 mt-0.5 flex-shrink-0"
              />
              <span>{{ submitError }}</span>
            </div>
          </Transition>

          <!-- Form Actions -->
          <div
            class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-border/50"
          >
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full sm:w-auto sm:min-w-[160px] h-11 font-semibold inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-md hover:shadow-lg active:shadow-sm"
            >
              <span v-if="isSubmitting" class="flex items-center gap-2">
                <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
                Submitting...
              </span>
              <span v-else>Submit Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreatePermitApplication } from '../../types/permit';

const form = reactive<CreatePermitApplication>({
  applicantName: '',
  applicantEmail: '',
  permitType: '',
});

const errors = reactive<Partial<Record<keyof CreatePermitApplication, string>>>(
  {}
);
const isSubmitting = ref(false);
const submitError = ref<string | null>(null);

const router = useRouter();

// Clear errors when user starts typing (only if error exists)
watch(
  () => form.applicantName,
  (newValue) => {
    console.log('applicantName changed:', newValue);
    if (errors.applicantName && newValue?.trim()) {
      errors.applicantName = undefined;
    }
  }
);

watch(
  () => form.applicantEmail,
  (newValue) => {
    if (errors.applicantEmail && newValue?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(newValue)) {
        errors.applicantEmail = undefined;
      }
    }
  }
);

watch(
  () => form.permitType,
  (newValue) => {
    if (errors.permitType && newValue?.trim()) {
      errors.permitType = undefined;
    }
  }
);

function validateForm(): boolean {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof CreatePermitApplication] = undefined;
  });

  let isValid = true;

  // Validate applicant name
  const trimmedName = form.applicantName?.trim() || '';
  if (!trimmedName) {
    errors.applicantName = 'Applicant name is required';
    isValid = false;
  }

  // Validate email
  const trimmedEmail = form.applicantEmail?.trim() || '';
  if (!trimmedEmail) {
    errors.applicantEmail = 'Email address is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.applicantEmail = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate permit type
  const trimmedPermitType = form.permitType?.trim() || '';
  if (!trimmedPermitType) {
    errors.permitType = 'Permit type is required';
    isValid = false;
  }

  return isValid;
}

async function handleSubmit() {
  submitError.value = null;

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    await $fetch('/api/permits', {
      method: 'POST',
      body: { ...form },
    });

    // Success - redirect to home page
    await router.push('/');
  } catch (error: any) {
    submitError.value =
      error.data?.message ||
      error.message ||
      'Failed to submit application. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>
