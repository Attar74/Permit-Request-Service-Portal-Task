<template>
  <div>
    <h1>Permit Request Service Portal</h1>
    <p>View all permit applications below</p>

    <div v-if="pending" class="loading">Loading applications...</div>
    <div v-else-if="error" class="error">
      Error loading applications: {{ error.message }}
    </div>
    <div v-else-if="data && data.length === 0" class="empty">
      No permit applications found. <NuxtLink to="/apply">Apply for a permit</NuxtLink> to get started.
    </div>
    <div v-else class="applications">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Permit Type</th>
            <th>Status</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in data" :key="application.id">
            <td>{{ application.id }}</td>
            <td>{{ application.applicantName }}</td>
            <td>{{ application.applicantEmail }}</td>
            <td>{{ application.permitType }}</td>
            <td>
              <span :class="['status', `status-${application.applicationStatus.toLowerCase()}`]">
                {{ application.applicationStatus }}
              </span>
            </td>
            <td>{{ formatDate(application.submittedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PermitApplication } from '~/types/permit';

const { data, pending, error } = await useFetch<PermitApplication[]>('/api/permits');

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped>
.loading,
.error,
.empty {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

.empty a {
  color: #2563eb;
  text-decoration: none;
}

.empty a:hover {
  text-decoration: underline;
}

.applications {
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
}

thead {
  background: #f9fafb;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tbody tr:hover {
  background: #f9fafb;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-approved {
  background: #d1fae5;
  color: #065f46;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}
</style>

