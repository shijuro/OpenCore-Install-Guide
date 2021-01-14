const { description } = require('../../package')
const moment = require('moment')
const navbar = require('./configs/navbar')
const sidebar = require('./configs/sidebar')

module.exports = {
    title: 'Руководство по установке OpenCore',
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        },]
    ],
    base: '/OpenCore-Install-Guide/',
    
	watch: {
	    $page(newPage, oldPage) {
	      if (newPage.key !== oldPage.key) {
	        requestAnimationFrame(() => {
	          if (this.$route.hash) {
	            const element = document.getElementById(this.$route.hash.slice(1));

	            if (element && element.scrollIntoView) {
	              element.scrollIntoView();
	            }
	          }
	        });
	      }
	    }
	  },
	
	markdown: {
		extendMarkdown: md => {
			md.use(require('markdown-it-multimd-table'), {
				rowspan: true,
			});
		}
	},
	
    extend: '@vuepress/theme-default',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: 'Последнее обновление',
        repo: 'shijuro/OpenCore-Install-Guide',
        docsDir: 'src',
		editLinks: true,
        editLinkText: 'Помогите нам улучшить эту страницу!',
        logo: 'homepage.png',
        nav: navbar,
        sidebar: sidebar
    },
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
        ['@vuepress/last-updated',
            {
                transformer: (timestamp) => {
                    const moment = require('moment')
                    moment.locale('ru')
                    return moment(timestamp).fromNow()
                }
            }],
    ]
}
