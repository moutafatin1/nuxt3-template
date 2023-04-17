<script lang="ts" setup>
const user = useCurrentUser();
const { logout } = useAuth();
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  Hello {{ user?.username }} - CreatedAt :
  {{ user?.createdAt.toDateString() }}
  <Button @click="logout" variant="danger">Logout</Button>
</template>
