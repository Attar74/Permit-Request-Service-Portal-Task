<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Apply for a Permit</h1>
      <p class="text-muted-foreground mt-2 text-sm sm:text-base">
        Fill out the form below to submit your permit application
      </p>
    </div>

    <Card>
      <CardContent class="pt-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <Label for="applicantName">
              Applicant Name <span class="text-destructive">*</span>
            </Label>
            <Input
              id="applicantName"
              v-model="form.applicantName"
              type="text"
              required
              :disabled="isSubmitting"
              placeholder="Enter your full name"
            />
            <p v-if="errors.applicantName" class="text-sm text-destructive">
              {{ errors.applicantName }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="applicantEmail">
              Email Address <span class="text-destructive">*</span>
            </Label>
            <Input
              id="applicantEmail"
              v-model="form.applicantEmail"
              type="email"
              required
              :disabled="isSubmitting"
              placeholder="Enter your email address"
            />
            <p v-if="errors.applicantEmail" class="text-sm text-destructive">
              {{ errors.applicantEmail }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="permitType">
              Permit Type <span class="text-destructive">*</span>
            </Label>
            <Input
              id="permitType"
              v-model="form.permitType"
              type="text"
              required
              :disabled="isSubmitting"
              placeholder="e.g., Construction Permit, Business License"
            />
            <p v-if="errors.permitType" class="text-sm text-destructive">
              {{ errors.permitType }}
            </p>
          </div>

          <div
            v-if="submitError"
            class="rounded-md bg-destructive/10 p-4 text-sm text-destructive"
          >
            {{ submitError }}
          </div>

          <div class="flex items-center gap-4">
            <Button
              type="submit"
              :disabled="isSubmitting"
              class="w-full sm:w-auto"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Application</span>
            </Button>
            <Button variant="outline" as-child>
              <NuxtLink to="/">Cancel</NuxtLink>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { CreatePermitApplication } from '~/types/permit';

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

function validateForm(): boolean {
  // Clear previous errors
  errors.applicantName = undefined;
  errors.applicantEmail = undefined;
  errors.permitType = undefined;

  let isValid = true;

  if (!form.applicantName.trim()) {
    errors.applicantName = 'Applicant name is required';
    isValid = false;
  }

  if (!form.applicantEmail.trim()) {
    errors.applicantEmail = 'Email address is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.applicantEmail)) {
    errors.applicantEmail = 'Please enter a valid email address';
    isValid = false;
  }

  if (!form.permitType.trim()) {
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
      body: form,
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
