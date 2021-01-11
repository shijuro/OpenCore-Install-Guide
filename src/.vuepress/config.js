const { description } = require('../../package')
const moment = require('moment')

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
        repo: 'https://github.com/shijuro/OpenCore-Install-Guide',
		editLinks: true,
        editLinkText: 'Помогите нам улучшить эту страницу!',
        logo: 'homepage.png',
        nav: [{
            text: 'Руководства от Dortania',
            ariaLabel: 'Language Menu',
            items: [{
                text: 'Домашняя страница',
                link: 'https://dortania.github.io/'
            },
            {
                text: 'Начало работы с ACPI',
                link: 'https://dortania.github.io/Getting-Started-With-ACPI/'
            },
            {
                text: 'После установки OpenCore',
                link: 'https://dortania.github.io/OpenCore-Post-Install/'
            },
            {
                text: 'GPU Buyers Guide',
                link: 'https://dortania.github.io/GPU-Buyers-Guide/'
            },
            {
                text: 'Wireless Buyers Guide',
                link: 'https://dortania.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: 'Anti Buyers Guide',
                link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/'
            },
            ]
        },
        ],
        sidebar: [{
            title: 'Вступление',
            collapsable: false,
            sidebarDepth: 1,
            children: [
				'prerequisites',
				{
                    title: 'Аппаратные ограничения',
                    collapsable: true,
                    path: 'macos-limits',
                    children: [
                        'find-hardware'
                    ]
                },
                'terminology',
                'why-oc',
            ]

        },
        {
            title: 'Создание USB',
            collapsable: false,
            sidebarDepth: 2,
            children: [{
                title: 'Создание USB флешки',
                collapsable: true,
                path: '/installer-guide/',
                sidebarDepth: 1,
                children: [
                    '/installer-guide/mac-install',
                    '/installer-guide/winblows-install',
                    '/installer-guide/linux-install',
                ],
            },
                '/installer-guide/opencore-efi',
                'ktext',
            ['https://dortania.github.io/Getting-Started-With-ACPI/', 'Начало работы с ACPI (на английском)'],
                '/config.plist/',
            ]
        },
        {
            title: 'Конфигурации',
            collapsable: false,
            children: [{
                title: 'Intel Desktop config.plist',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    ['/config.plist/penryn', 'Penryn'],
                    ['/config.plist/clarkdale', 'Clarkdale'],
                    ['/config.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config.plist/haswell', 'Haswell'],
                    ['/config.plist/skylake', 'Skylake'],
                    ['/config.plist/kaby-lake', 'Kaby Lake'],
                    ['/config.plist/coffee-lake', 'Coffee Lake'],
                    ['/config.plist/comet-lake', 'Comet Lake'],
                ]
            },
            {
                title: 'Intel Laptop config.plist',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    ['/config-laptop.plist/arrandale', 'Arrandale'],
                    ['/config-laptop.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config-laptop.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config-laptop.plist/haswell', 'Haswell'],
					['/config-laptop.plist/broadwell', 'Broadwell'],
                    ['/config-laptop.plist/skylake', 'Skylake'],
                    ['/config-laptop.plist/kaby-lake', 'Kaby Lake'],
                    ['/config-laptop.plist/coffee-lake', 'Coffee Lake и Whiskey Lake'],
					['/config-laptop.plist/coffee-lake-plus', 'Coffee Lake Plus и Comet Lake'],
                    ['/config-laptop.plist/icelake', 'Ice Lake'],
                ]
            },
            {
                title: 'Intel HEDT config.plist',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    '/config-HEDT/nehalem',
                    '/config-HEDT/ivy-bridge-e',
                    '/config-HEDT/haswell-e',
                    '/config-HEDT/broadwell-e',
                    '/config-HEDT/skylake-x',
                ]
            },
            {
                title: 'AMD Desktop config.plist',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    '/AMD/fx',
                    '/AMD/zen',
                ]
            },
            ]
        },
        {
            title: 'Установка',
            collapsable: false,
            children: [
                '/installation/installation-process',

            ]
        },
        {
            title: 'Решение проблем',
            collapsable: false,
            children: [
                '/troubleshooting/troubleshooting',
				{
            		title: '',
            		collapsable: false,
		            children: [
		                '/troubleshooting/extended/opencore-issues',
						'/troubleshooting/extended/kernel-issues',
						'/troubleshooting/extended/userspace-issues',
						'/troubleshooting/extended/post-issues',
						'/troubleshooting/extended/misc-issues',

		            ]
				},
                '/troubleshooting/debug',
                '/troubleshooting/boot',
            ]
        },
        {
            title: 'После установки (на английском)',
            collapsable: false,
            children: [
                ['https://dortania.github.io/OpenCore-Post-Install/', 'После установки'],
                {
                    title: 'Универсально',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/security', 'Безопасность и FileVault'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/audio', 'Исправление звука'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/oc2hdd', 'Загрузка без USB'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/update', 'Обновление OpenCore, кекстов и macOS'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/drm', 'Исправление DRM'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/iservices', 'Исправление iServices'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/pm', 'Исправление управления энергопотреблением'],
                        ['https://dortania.github.io/OpenCore-Post-Install/universal/sleep', 'Исправление сна'],
                        ['https://dortania.github.io/OpenCore-Post-Install/usb/', 'Исправление USB'],
                    ]
                },
                {
                    title: 'Особенности ноутбуков',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/laptop-specific/battery', 'Исправление показаний батареи'],

                    ]
                },
                {
                    title: 'Косметика',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/cosmetic/verbose', 'Исправление разрешения и подробного режима'],
                        ['https://dortania.github.io/OpenCore-Post-Install/cosmetic/gui', 'Добавление GUI и Boot-chime'],
                    ]
                },
                {
                    title: 'Multiboot',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap', 'Настройка Bootstrap.efi'],
                        ['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp', 'Установка BootCamp'],
                    ]
                },
                {
                    title: 'Разное',
                    collapsable: true,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/misc/rtc', 'Исправление RTC'],
                        ['https://dortania.github.io/OpenCore-Post-Install/misc/msr-lock', 'Исправление CFG Lock'],
                        ['https://dortania.github.io/OpenCore-Post-Install/misc/nvram', 'Эмулированный NVRAM'],
                    ]
                },
            ]
        },
        {
            title: 'Дополнительно',
            collapsable: false,
			sidebarDepth: 2,
            children: [
                '/extras/kaslr-fix',
                '/extras/spoof',
                '/extras/big-sur/',
                ['https://github.com/dortania/OpenCore-Install-Guide/tree/master/clover-conversion', 'Конверсия Clover'],
                '/extras/smbios-support.md',
            ]
        },
        {
            title: 'Прочее',
            collapsable: false,
            children: [
                'CONTRIBUTING',
                '/misc/credit',
            ]
        },
        ],
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