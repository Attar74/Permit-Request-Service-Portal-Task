<template>
  <div>
    <!-- View Toggle and Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Permit Applications</h2>
        <p class="text-sm text-muted-foreground mt-1">
          {{ props.applications.length }} application{{
            props.applications.length !== 1 ? 's' : ''
          }}
          found
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          :class="[
            'h-9 w-9 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            viewMode === 'list' ? 'bg-accent text-accent-foreground' : '',
          ]"
          @click="viewMode = 'list'"
          title="List View"
        >
          <Icon name="lucide:list" class="h-5 w-5" />
        </button>
        <button
          :class="[
            'h-9 w-9 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            viewMode === 'grid' ? 'bg-accent text-accent-foreground' : '',
          ]"
          @click="viewMode = 'grid'"
          title="Grid View"
        >
          <Icon name="lucide:layout-grid" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="props.pending"
      class="rounded-md border border-border bg-card text-card-foreground shadow-sm py-12"
    >
      <div class="text-center text-muted-foreground">
        <div class="mb-4 flex justify-center">
          <Icon name="lucide:loader-2" class="h-12 w-12 animate-spin" />
        </div>
        <p class="text-sm font-medium">Loading applications...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="props.error"
      class="rounded-md border border-border bg-card text-card-foreground shadow-sm py-12"
    >
      <div class="text-center text-destructive">
        <div class="mb-4 flex justify-center">
          <Icon name="lucide:alert-triangle" class="h-12 w-12" />
        </div>
        <p class="font-semibold mb-2">Error loading applications</p>
        <p class="text-sm text-muted-foreground">{{ props.error.message }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="props.applications.length === 0"
      class="rounded-md border border-border bg-card text-card-foreground shadow-sm py-12"
    >
      <div class="text-center text-muted-foreground">
        <div class="mb-4 flex justify-center">
          <Icon name="lucide:file-text" class="h-12 w-12" />
        </div>
        <p class="font-semibold mb-2 text-foreground">
          No permit applications found
        </p>
        <p class="text-sm mb-4">
          <NuxtLink
            to="/apply"
            class="text-primary hover:underline font-medium"
          >
            Apply for a permit
          </NuxtLink>
          to get started.
        </p>
      </div>
    </div>

    <!-- List View -->
    <div
      v-else-if="viewMode === 'list'"
      class="rounded-md border border-border bg-card text-card-foreground shadow-sm"
    >
      <div class="p-0">
        <div class="overflow-x-auto">
          <div class="relative w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
              <thead class="[&_tr]:border-b">
                <tr class="border-b transition-colors">
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]"
                  >
                    ID
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    Applicant Name
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    Email
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    Permit Type
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    Status
                  </th>
                  <th
                    class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody class="[&_tr:last-child]:border-0">
                <tr
                  v-for="application in props.applications"
                  :key="application.id"
                  class="border-b transition-colors hover:bg-muted/50"
                >
                  <td class="p-4 align-middle font-medium">
                    {{ application.id }}
                  </td>
                  <td class="p-4 align-middle font-medium">
                    {{ application.applicantName }}
                  </td>
                  <td class="p-4 align-middle text-muted-foreground">
                    {{ application.applicantEmail }}
                  </td>
                  <td class="p-4 align-middle">{{ application.permitType }}</td>
                  <td class="p-4 align-middle">
                    <span
                      :class="[
                        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
                        getBadgeClasses(
                          getStatusVariant(application.applicationStatus)
                        ),
                      ]"
                    >
                      {{ application.applicationStatus }}
                    </span>
                  </td>
                  <td class="p-4 align-middle text-muted-foreground text-sm">
                    {{ formatDate(application.submittedAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="application in props.applications"
        :key="application.id"
        class="rounded-md border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex flex-col space-y-1.5 p-6">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold leading-none tracking-tight">
                #{{ application.id }}
              </h3>
              <p class="text-xs text-muted-foreground mt-1">
                {{ formatDate(application.submittedAt) }}
              </p>
            </div>
            <span
              :class="[
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
                getBadgeClasses(
                  getStatusVariant(application.applicationStatus)
                ),
              ]"
            >
              {{ application.applicationStatus }}
            </span>
          </div>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <div>
            <p
              class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1"
            >
              Applicant
            </p>
            <p class="font-medium text-foreground">
              {{ application.applicantName }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1"
            >
              Email
            </p>
            <p class="text-sm text-muted-foreground break-all">
              {{ application.applicantEmail }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1"
            >
              Permit Type
            </p>
            <p class="font-medium text-foreground">
              {{ application.permitType }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApplicationStatus, PermitApplication } from '../types/permit';

interface Props {
  applications?: PermitApplication[];
  pending?: boolean;
  error?: Error | null;
}

const props = withDefaults(defineProps<Props>(), {
  applications: () => [],
  pending: false,
  error: null,
});

const viewMode = ref<'grid' | 'list'>('list');

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

function getStatusVariant(
  status: ApplicationStatus
): 'pending' | 'approved' | 'rejected' {
  const statusLower = status.toLowerCase();
  if (statusLower === 'pending') return 'pending';
  if (statusLower === 'approved') return 'approved';
  if (statusLower === 'rejected') return 'rejected';
  return 'pending';
}

function getBadgeClasses(variant: 'pending' | 'approved' | 'rejected'): string {
  const classes = {
    pending:
      'border-transparent bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    approved:
      'border-transparent bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    rejected:
      'border-transparent bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  };
  return classes[variant] || classes.pending;
}
</script>
