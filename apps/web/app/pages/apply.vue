<template>
  <div class="apply-page">
    <h1>Apply for a Permit</h1>
    <p>Fill out the form below to submit your permit application</p>

    <form @submit.prevent="handleSubmit" class="application-form">
      <div class="form-group">
        <label for="applicantName">
          Applicant Name <span class="required">*</span>
        </label>
        <input
          id="applicantName"
          v-model="form.applicantName"
          type="text"
          required
          :disabled="isSubmitting"
          placeholder="Enter your full name"
        />
        <span v-if="errors.applicantName" class="error-message">
          {{ errors.applicantName }}
        </span>
      </div>

      <div class="form-group">
        <label for="applicantEmail">
          Email Address <span class="required">*</span>
        </label>
        <input
          id="applicantEmail"
          v-model="form.applicantEmail"
          type="email"
          required
          :disabled="isSubmitting"
          placeholder="Enter your email address"
        />
        <span v-if="errors.applicantEmail" class="error-message">
          {{ errors.applicantEmail }}
        </span>
      </div>

      <div class="form-group">
        <label for="permitType">
          Permit Type <span class="required">*</span>
        </label>
        <input
          id="permitType"
          v-model="form.permitType"
          type="text"
          required
          :disabled="isSubmitting"
          placeholder="e.g., Construction Permit, Business License"
        />
        <span v-if="errors.permitType" class="error-message">
          {{ errors.permitType }}
        </span>
      </div>

      <div v-if="submitError" class="submit-error">
        {{ submitError }}
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="isSubmitting" class="submit-button">
          <span v-if="isSubmitting">Submitting...</span>
          <span v-else>Submit Application</span>
        </button>
        <NuxtLink to="/" class="cancel-link">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CreatePermitApplication } from '~/types/permit';

const form = reactive<CreatePermitApplication>({
  applicantName: '',
  applicantEmail: '',
  permitType: '',
});

const errors = reactive<Partial<Record<keyof CreatePermitApplication, string>>>({});
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
      error.data?.message || error.message || 'Failed to submit application. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.apply-page {
  max-width: 600px;
  margin: 0 auto;
}

.application-form {
  margin-top: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #dc2626;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

input::placeholder {
  color: #9ca3af;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc2626;
}

.submit-error {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.submit-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.cancel-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
}

.cancel-link:hover {
  text-decoration: underline;
  color: #374151;
}
</style>

