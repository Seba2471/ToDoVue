<template>
  <div class="log"> </div>
</template>

<script>
export default {

  // Przy wywolaniu wylogowuje
  created() {
    this.$store.dispatch('userLogout')
      .then(() => {
        this.$router.push({ name: 'Login' })
      })
  }
}
</script>

<style scoped>

</style>
