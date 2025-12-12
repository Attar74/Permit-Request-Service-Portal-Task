<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border/60"
    >
      <div class="space-y-1">
        <h2 class="text-3xl font-bold tracking-tight text-foreground">
          Permit Applications
        </h2>
        <p class="text-sm text-muted-foreground">
          <span class="font-semibold text-foreground">{{
            props.applications.length
          }}</span>
          {{ props.applications.length !== 1 ? 'applications' : 'application' }}
          found
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          :class="[
            'h-10 px-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:scale-95',
            viewMode === 'list'
              ? 'bg-primary/10 text-primary border-primary/20 font-semibold'
              : 'text-muted-foreground',
          ]"
          @click="viewMode = 'list'"
          title="List View"
          type="button"
        >
          <Icon name="lucide:list" class="h-4 w-4" />
          <span class="hidden sm:inline text-sm font-medium">List</span>
        </button>
        <button
          :class="[
            'h-10 px-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:scale-95',
            viewMode === 'grid'
              ? 'bg-primary/10 text-primary border-primary/20 font-semibold'
              : 'text-muted-foreground',
          ]"
          @click="viewMode = 'grid'"
          title="Grid View"
          type="button"
        >
          <Icon name="lucide:layout-grid" class="h-4 w-4" />
          <span class="hidden sm:inline text-sm font-medium">Grid</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="props.pending"
      class="rounded-xl border border-muted bg-card text-card-foreground shadow-md py-16"
    >
      <div class="text-center text-muted-foreground">
        <div class="mb-4 flex justify-center">
          <Icon
            name="lucide:loader-2"
            class="h-12 w-12 animate-spin text-primary"
          />
        </div>
        <p class="text-base font-semibold text-foreground mb-1">
          Loading applications...
        </p>
        <p class="text-sm">Please wait while we fetch your data</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="props.error"
      class="rounded-xl border border-destructive/20 bg-destructive/5 text-card-foreground shadow-md py-16"
    >
      <div class="text-center text-destructive">
        <div class="mb-4 flex justify-center">
          <Icon name="lucide:alert-triangle" class="h-12 w-12" />
        </div>
        <p class="font-bold text-lg mb-2">Error loading applications</p>
        <p class="text-sm text-muted-foreground max-w-md mx-auto">
          {{ props.error.message }}
        </p>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="props.applications.length === 0"
      class="rounded-xl border border-muted bg-card text-card-foreground shadow-md py-16"
    >
      <div class="text-center text-muted-foreground">
        <div class="mb-4 flex justify-center">
          <Icon
            name="lucide:file-text"
            class="h-12 w-12 text-muted-foreground/60"
          />
        </div>
        <p class="font-bold text-lg mb-2 text-foreground">
          No permit applications found
        </p>
        <p class="text-sm mb-6 max-w-md mx-auto">
          Get started by submitting your first permit application.
        </p>
        <NuxtLink
          to="/apply"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Icon name="lucide:plus" class="h-4 w-4" />
          Apply for a Permit
        </NuxtLink>
      </div>
    </div>

    <!-- List View -->
    <div
      v-else-if="viewMode === 'list'"
      class="rounded-xl border border-muted bg-card text-card-foreground shadow-md overflow-hidden"
    >
      <div class="overflow-x-auto">
        <div class="relative w-full min-w-full">
          <table class="w-full caption-bottom text-sm">
            <thead class="[&_tr]:border-b border-border/60 bg-muted/30">
              <tr class="border-b transition-colors">
                <th
                  class="h-14 px-6 text-left align-middle font-bold text-foreground text-xs uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="h-14 px-6 text-left align-middle font-bold text-foreground text-xs uppercase tracking-wider"
                >
                  Applicant Name
                </th>
                <th
                  class="h-14 px-6 text-left align-middle font-bold text-foreground text-xs uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="h-14 px-6 text-left align-middle font-bold text-foreground text-xs uppercase tracking-wider"
                >
                  Permit Type
                </th>
                <th
                  class="h-14 px-6 text-left align-middle font-bold text-foreground text-xs uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="h-14 px-6 text-left align-middle font-bold text-foreground text-xs uppercase tracking-wider"
                >
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody class="[&_tr:last-child]:border-0">
              <tr
                v-for="(application, index) in props.applications"
                :key="application.id"
                class="border-b border-border/40 transition-colors hover:bg-muted/30"
                :class="{ 'bg-muted/10': index % 2 === 0 }"
              >
                <td class="p-6 align-middle">
                  <span
                    class="font-mono text-xs font-semibold text-muted-foreground"
                  >
                    #{{ String(application.id).substring(0, 8) }}
                  </span>
                </td>
                <td class="p-6 align-middle">
                  <span class="font-semibold text-foreground">
                    {{ application.applicantName }}
                  </span>
                </td>
                <td class="p-6 align-middle">
                  <a
                    :href="`mailto:${application.applicantEmail}`"
                    class="text-sm text-primary hover:underline font-medium transition-colors"
                  >
                    {{ application.applicantEmail }}
                  </a>
                </td>
                <td class="p-6 align-middle">
                  <span class="text-sm text-foreground">
                    {{ application.permitType }}
                  </span>
                </td>
                <td class="p-6 align-middle">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors',
                      getBadgeClasses(
                        getStatusVariant(application.applicationStatus)
                      ),
                    ]"
                  >
                    <Icon
                      :name="getStatusIcon(application.applicationStatus)"
                      class="h-3.5 w-3.5"
                    />
                    {{ application.applicationStatus }}
                  </span>
                </td>
                <td class="p-6 align-middle">
                  <span class="text-sm text-muted-foreground font-medium">
                    {{ formatDate(application.submittedAt) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="application in props.applications"
        :key="application.id"
        class="group rounded-xl border border-muted bg-card text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        <!-- Card Header -->
        <div class="flex flex-col space-y-3 p-6 pb-4 border-b border-border/40">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h3
                class="text-lg font-bold leading-tight tracking-tight text-foreground mb-1.5"
              >
                Application #{{ String(application.id).substring(0, 8) }}
              </h3>
              <p
                class="text-xs text-muted-foreground font-medium flex items-center gap-1.5"
              >
                <Icon name="lucide:calendar" class="h-3.5 w-3.5" />
                {{ formatDate(application.submittedAt) }}
              </p>
            </div>
            <span
              :class="[
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors flex-shrink-0',
                getBadgeClasses(
                  getStatusVariant(application.applicationStatus)
                ),
              ]"
            >
              <Icon
                :name="getStatusIcon(application.applicationStatus)"
                class="h-3.5 w-3.5"
              />
              {{ application.applicationStatus }}
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-6 pt-5 space-y-5">
          <div class="space-y-1.5">
            <p
              class="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
            >
              <Icon name="lucide:user" class="h-3.5 w-3.5" />
              Applicant
            </p>
            <p class="font-semibold text-foreground text-base">
              {{ application.applicantName }}
            </p>
          </div>

          <div class="space-y-1.5">
            <p
              class="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
            >
              <Icon name="lucide:mail" class="h-3.5 w-3.5" />
              Email
            </p>
            <a
              :href="`mailto:${application.applicantEmail}`"
              class="text-sm text-primary hover:underline font-medium transition-colors break-all block"
            >
              {{ application.applicantEmail }}
            </a>
          </div>

          <div class="space-y-1.5">
            <p
              class="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
            >
              <Icon name="lucide:file-text" class="h-3.5 w-3.5" />
              Permit Type
            </p>
            <p class="font-semibold text-foreground text-base">
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

function getStatusIcon(status: ApplicationStatus): string {
  const statusLower = status.toLowerCase();
  if (statusLower === 'approved') return 'lucide:check-circle-2';
  if (statusLower === 'rejected') return 'lucide:x-circle';
  return 'lucide:clock';
}

function getBadgeClasses(variant: 'pending' | 'approved' | 'rejected'): string {
  const classes = {
    pending:
      'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40',
    approved:
      'border-green-500/30 bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/40',
    rejected:
      'border-red-500/30 bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/40',
  };
  return classes[variant] || classes.pending;
}
</script>
