<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Permit Request Service Portal</h1>
      <p class="text-muted-foreground mt-2">View all permit applications below</p>
    </div>

    <Card v-if="pending">
      <CardContent class="py-8">
        <div class="text-center text-muted-foreground">Loading applications...</div>
      </CardContent>
    </Card>

    <Card v-else-if="error">
      <CardContent class="py-8">
        <div class="text-center text-destructive">
          Error loading applications: {{ error.message }}
        </div>
      </CardContent>
    </Card>

    <Card v-else-if="data && data.length === 0">
      <CardContent class="py-8">
        <div class="text-center text-muted-foreground">
          <p class="mb-4">No permit applications found.</p>
          <NuxtLink to="/apply" class="text-primary hover:underline">
            Apply for a permit
          </NuxtLink>
          to get started.
        </div>
      </CardContent>
    </Card>

    <Card v-else>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[80px]">ID</TableHead>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Permit Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="application in data" :key="application.id">
                <TableCell class="font-medium">{{ application.id }}</TableCell>
                <TableCell>{{ application.applicantName }}</TableCell>
                <TableCell>{{ application.applicantEmail }}</TableCell>
                <TableCell>{{ application.permitType }}</TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(application.applicationStatus)">
                    {{ application.applicationStatus }}
                  </Badge>
                </TableCell>
                <TableCell class="text-muted-foreground">
                  {{ formatDate(application.submittedAt) }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { PermitApplication, ApplicationStatus } from '~/types/permit';

const { data, pending, error } =
  await useFetch<PermitApplication[]>('/api/permits');

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
</script>
