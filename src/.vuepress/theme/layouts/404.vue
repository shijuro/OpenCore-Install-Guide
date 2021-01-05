<template>
  <div class="theme-container">
    <div class="theme-succinct-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        Отведите меня домой.
      </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  `Здесь ничего нет.`,
  `Как мы сюда попали?`,
  `Это Четыре-Ноль-Четыре.`,
  `Похоже, у нас есть битые ссылки.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
