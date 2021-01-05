<template>
  <a role="button" @click.prevent="switchTheme()" :aria-label="'Переключить на ' + nextTheme + ' тему'" class="nav-link">
    <span key="dark" v-if="theme === 'dark'">Переключить на светлую тему</span>
    <span key="light" v-else-if="theme === 'light'">Переключить на темную тему</span>
    <span key="light" v-else>Изменить тему</span>
  </a>
</template>

<script>
const themes = ['light', 'dark']

export default {
  name: 'ThemeSwitcher',

  data () {
    return {
      theme: ''
    }
  },

  computed: {
    nextTheme () {
      const currentIndex = themes.indexOf(this.theme)
      const nextIndex = (currentIndex + 1) % themes.length
      return themes[nextIndex]
    }
  },

  methods: {
    switchTheme () {
      const currentIndex = themes.indexOf(this.theme)
      const nextIndex = (currentIndex + 1) % themes.length
      window.__setPreferredTheme(themes[nextIndex])
      this.theme = themes[nextIndex]
    }
  },

  async mounted () {
    // set default
    if (typeof window.__theme !== 'undefined') {
      this.theme = window.__theme
    }
  }
}
</script>