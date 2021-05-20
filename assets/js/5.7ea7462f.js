(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{357:function(t,e,a){t.exports=a.p+"assets/img/com-recovery.805dc41f.png"},358:function(t,e,a){t.exports=a.p+"assets/img/base-oc-folder.9a1a058a.png"},359:function(t,e,a){t.exports=a.p+"assets/img/com-efi-done.a6fb730e.png"},531:function(t,e,a){t.exports=a.p+"assets/img/file-path.0aea4278.png"},532:function(t,e,a){t.exports=a.p+"assets/img/command-prompt.53392eba.png"},533:function(t,e,a){t.exports=a.p+"assets/img/macrecovery-done.1b0960bc.png"},534:function(t,e,a){t.exports=a.p+"assets/img/basesystem-example.93778929.png"},535:function(t,e,a){t.exports=a.p+"assets/img/macrecovery-after.4c24ba88.jpg"},536:function(t,e,a){t.exports=a.p+"assets/img/DiskManagement.aac12f25.jpg"},537:function(t,e,a){t.exports=a.p+"assets/img/format-usb-rufus.43feba9e.png"},538:function(t,e,a){t.exports=a.p+"assets/img/bootice.f83b0859.png"},539:function(t,e,a){t.exports=a.p+"assets/img/restore-mbr.8e5164a9.png"},540:function(t,e,a){t.exports=a.p+"assets/img/restore-mbr-file.a0daa24a.png"},541:function(t,e,a){t.exports=a.p+"assets/img/restore-pbr.2635de6c.png"},542:function(t,e,a){t.exports=a.p+"assets/img/restore-pbr-file.cbf5dcf4.png"},543:function(t,e,a){t.exports=a.p+"assets/img/final-boot-file.a45bcbb9.png"},657:function(t,e,a){"use strict";a.r(e);var s=a(24),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"создание-установщика-в-windows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#создание-установщика-в-windows"}},[t._v("#")]),t._v(" Создание установщика в Windows")]),t._v(" "),s("ul",[s("li",[t._v("Поддерживаемая версия: 0.6.9")])]),t._v(" "),s("p",[t._v("В то время как вам не нужна чистая установка macOS чтобы использовать OpenCore, некоторые пользователи предпочитают иметь свежую версию ОС с обновлением их Boot Manager.")]),t._v(" "),s("p",[t._v("Чтобы начать, вам нужно:")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("USB флешка объемом 4 Гб")])]),t._v(" "),s("li",[s("p",[t._v("Для USB-накопителей объемом свыше 16 Гб для форматирования в FAT32 используйте "),s("a",{attrs:{href:"#%D1%87%D0%B5%D1%80%D0%B5%D0%B7-rufus"}},[t._v("Rufus")])])]),t._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("macrecovery.py"),s("OutboundLink")],1)]),t._v(" "),s("ul",[s("li",[t._v("Требуется "),s("a",{attrs:{href:"https://www.python.org/downloads/",target:"_blank",rel:"noopener noreferrer"}},[t._v("установленный Python"),s("OutboundLink")],1)])])])]),t._v(" "),s("h2",{attrs:{id:"скачивание-macos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#скачивание-macos"}},[t._v("#")]),t._v(" Скачивание macOS")]),t._v(" "),s("p",[t._v("Получение устаревших установщиков очень простое, для начала получите копию "),s("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCorePkg"),s("OutboundLink")],1),t._v(" и перейдите в "),s("code",[t._v("/Utilities/macrecovery/")]),t._v(". Затем скопируйте путь к папке macrecovery:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(531),alt:""}})]),t._v(" "),s("p",[t._v('Отсюда, вы захотите открыть Командную Строку и "cd" в папку macrecovery, путь которой мы скопировали ранее:')]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" Вставьте_Путь_К_Папке\n")])])]),s("p",[s("img",{attrs:{src:a(532),alt:""}})]),t._v(" "),s("p",[t._v("Теперь запустите одну из следующих команд, в зависимости от того, какую версию macOS вы хотите (Обратите внимание на то, что эти скрипты написаны на "),s("a",{attrs:{href:"https://www.python.org/downloads/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Python"),s("OutboundLink")],1),t._v(", пожалуйста, установите его, если вы ещё это не сделали):")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Lion(10.7):")]),t._v("\npython macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download\npython macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Mountain Lion(10.8):")]),t._v("\npython macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Mavericks(10.9):")]),t._v("\npython macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Yosemite(10.10):")]),t._v("\npython macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# El Capitan(10.11):")]),t._v("\npython macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Sierra(10.12):")]),t._v("\npython macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# High Sierra(10.13)")]),t._v("\npython macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download\npython macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Mojave(10.14)")]),t._v("\npython macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Catalina(10.15)")]),t._v("\npython macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Последняя версия")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# т.е. Big Sur(11)")]),t._v("\npython macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download\n")])])]),s("ul",[s("li",[s("strong",[t._v("Примечание к macOS 11, Big Sur")]),t._v(": Так как эта ОС совершенна новая, есть некоторые проблемы с определенными системами, которые нужно решить. Для получения дополнительной информации, смотрите здесь: "),s("RouterLink",{attrs:{to:"/extras/big-sur/"}},[t._v("OpenCore и macOS 11: Big Sur")]),t._v(" "),s("ul",[s("li",[t._v("Для начинающих пользователей, мы рекомендуем macOS 10.15, Catalina")])])],1),t._v(" "),s("li",[s("strong",[t._v("Примечание к GPU Nvidia")]),t._v(": напоминание о том, чтобы проверить, поддерживает ли ваше оборудование новые ОС, смотрите "),s("RouterLink",{attrs:{to:"/macos-limits.html"}},[t._v("Аппаратные ограничения")])],1)]),t._v(" "),s("p",[t._v("Это займёт некоторое время, однако когда вы закончите, вы должны получить BaseSystem или RecoveryImage файлы:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(533),alt:""}})]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("BaseSystem")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("RecoveryImage")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("img",{attrs:{src:a(534),alt:""}})]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("img",{attrs:{src:a(535),alt:""}})])])])]),t._v(" "),s("p",[t._v("Теперь, когда наш установщик загружен, мы дальше захотим отформатировать USB.")]),t._v(" "),s("h2",{attrs:{id:"создание-установщика"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#создание-установщика"}},[t._v("#")]),t._v(" Создание установщика")]),t._v(" "),s("p",[t._v("Здесь мы будем форматировать наш USB накопитель и записывать на него macOS. Для этого у нас есть несколько вариантов:")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#%D1%87%D0%B5%D1%80%D0%B5%D0%B7-%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B8%D1%81%D0%BA%D0%B0%D0%BC%D0%B8"}},[t._v("Через Управление Дисками")]),t._v(" "),s("ul",[s("li",[t._v("На базе графического интерфейса, самый простой вариант")]),t._v(" "),s("li",[t._v("Поддерживаются системы только с UEFI(напр. 2012 г.+)")])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#%D1%87%D0%B5%D1%80%D0%B5%D0%B7-rufus"}},[t._v("Через Rufus")]),t._v(" "),s("ul",[s("li",[t._v("На базе графического интерфейса, самый простой вариант")]),t._v(" "),s("li",[t._v("Для USB-накопителей большего размера (16Гб+)")])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#%D1%87%D0%B5%D1%80%D0%B5%D0%B7-diskpart"}},[t._v("Через diskpart")]),t._v(" "),s("ul",[s("li",[t._v("На базе командной строки, требует немного больше работы")]),t._v(" "),s("li",[t._v("Требуется для устаревших (Legacy) систем (т.е. не UEFI, до 2012 г.)")])])])]),t._v(" "),s("h3",{attrs:{id:"через-управление-дисками"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#через-управление-дисками"}},[t._v("#")]),t._v(" Через Управление Дисками")]),t._v(" "),s("p",[t._v("Просто откройте Управление Дисками, и отформатируйте ваш USB накопитель в FAT32:")]),t._v(" "),s("ol",[s("li",[t._v('Щелкните правой кнопкой мыши (ПКМ) по кнопке "Пуск" на вашей панели задач (task bar) и выберите Управление Дисками')]),t._v(" "),s("li",[t._v("Вы должны видеть все разделы и диски. В нижней половине, вы видете ваши накопители. Найдите свой USB накопитель.")]),t._v(" "),s("li",[t._v("Вы захотите отформатировать USB накопитель, чтобы он имел раздел в FAT32")])]),t._v(" "),s("ul",[s("li",[t._v("Если у вас есть множество разделов на USB накопителе, щелкните правой кнопкой мыши по каждому разделу и кликните Удалить том (Delete Volume) на вашем USB накопителе (Это удалит ваши данные, убедитесь, что вы имеете резервные копии, и после удалите только разделы с вашего USB накопителя)\n"),s("ul",[s("li",[t._v('Щелкните ПКМ по нераспределенному (unallocated) пространству и создайте новый простой том. Убедитесь в том, что он в FAT32 и не меньше одного-двух гигабайтов. Назовите его "EFI".')])])]),t._v(" "),s("li",[t._v("В противном случае, щелкните ПКМ по разделу на USB накопителе, щелкните форматировать (Format) и поставьте его в FAT32.")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(536),alt:""}})]),t._v(" "),s("p",[t._v("Далее, перейдите в корень USB накопителя и создайте папку с названием "),s("code",[t._v("com.apple.recovery.boot")]),t._v(". Дальше, переместите загруженные BaseSystem или RecoveryImage файлы. Пожалуйста, убедитесь, что вы скопировали .dmg и .chunklist файлы в эту папку:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(357),alt:""}})]),t._v(" "),s("p",[t._v("Теперь возьмите OpenCorePkg, который вы ранее загрузили и откройте его:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(358),alt:""}})]),t._v(" "),s("p",[t._v("Здесь мы видим папки IA32 (32-битные процессоры) и X64 (64-битные процессоры), выберите подходящую для вашего оборудования, и откройте её. Затем возьмите папку EFI внутри и поместите в корень USB накопителя, рядом с com.apple.recovery.boot. После этого, оно должно выглядеть так:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(359),alt:""}})]),t._v(" "),s("h3",{attrs:{id:"через-rufus"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#через-rufus"}},[t._v("#")]),t._v(" Через Rufus")]),t._v(" "),s("ol",[s("li",[t._v("Загрузите "),s("a",{attrs:{href:"https://rufus.ie/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Rufus"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("Выберите метод загрузки как незагрузочный образ")]),t._v(" "),s("li",[t._v("Выберите файловую систему Large FAT32")]),t._v(" "),s("li",[t._v("Кликните по кнопке Старт")]),t._v(" "),s("li",[t._v("Удалите все файлы autorun в разделе USB-накопителя")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(537),alt:""}})]),t._v(" "),s("p",[t._v("Далее, перейдите в корень USB накопителя и создайте папку с названием "),s("code",[t._v("com.apple.recovery.boot")]),t._v(". Дальше, переместите загруженные BaseSystem или RecoveryImage файлы. Пожалуйста, убедитесь, что вы скопировали .dmg и .chunklist файлы в эту папку:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(357),alt:""}})]),t._v(" "),s("p",[t._v("Теперь возьмите OpenCorePkg, который вы ранее загрузили и откройте его:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(358),alt:""}})]),t._v(" "),s("p",[t._v("Здесь мы видим папки IA32 (32-битные процессоры) и X64 (64-битные процессоры), выберите подходящую для вашего оборудования, и откройте её. Затем возьмите папку EFI внутри и поместите в корень USB накопителя, рядом с com.apple.recovery.boot. После этого, оно должно выглядеть так:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(359),alt:""}})]),t._v(" "),s("h3",{attrs:{id:"через-diskpart"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#через-diskpart"}},[t._v("#")]),t._v(" Через diskpart")]),t._v(" "),s("details",{staticClass:"custom-block details"},[s("summary",[t._v("через diskpart")]),t._v(" "),s("p",[t._v("Нажмите Windows + R и введите "),s("code",[t._v("diskpart")]),t._v(".")]),t._v(" "),s("p",[t._v("Теперь запустите следующее:")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Список доступных дисков")]),t._v("\nlist disk\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Выберите ваш диск (т.е. disk 1)")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("select")]),t._v(" disk "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Отформатируйте накопитель")]),t._v("\nclean\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Конвертируйте в GPT")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Из-за странного бага с BOOTICE и DuetPkg, MBR диски не смогут загрузиться")]),t._v("\nconvert gpt\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Создайте новый раздел")]),t._v("\ncreate partition primary\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Select your partition Выберите ваш раздел")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# Запуск clean гарантирует, что у нас будет один раздел, поэтому это будет "partition 1"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("select")]),t._v(" partition "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Отформатируйте накопитель в FAT32")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("format")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("fs")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("fat32 quick\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Назначьте букву диску (т.е. диск E; убедитесь, что она в настоящее время не используется)")]),t._v("\nASSIGN "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("LETTER")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("E\n")])])]),s("p",[t._v("Далее, перейдите в корень USB накопителя и создайте папку с названием "),s("code",[t._v("com.apple.recovery.boot")]),t._v(". Дальше, переместите загруженные BaseSystem или RecoveryImage файлы. Пожалуйста, убедитесь, что вы скопировали .dmg и .chunklist файлы в эту папку:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(357),alt:""}})]),t._v(" "),s("p",[t._v("Теперь возьмите OpenCorePkg, который вы ранее загрузили и откройте его:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(358),alt:""}})]),t._v(" "),s("p",[t._v("Здесь мы видим папки IA32 (32-битные процессоры) и X64 (64-битные процессоры), выберите подходящую для вашего оборудования, и откройте её. Затем возьмите папку EFI внутри и поместите в корень USB накопителя, рядом с com.apple.recovery.boot. После этого, оно должно выглядеть так:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(359),alt:""}})]),t._v(" "),s("details",{staticClass:"custom-block details"},[s("summary",[t._v("Настройка установки в Legacy")]),t._v(" "),s("p",[t._v("Если ваше оборудование не поддерживает UEFI, смотрите инструкции ниже.")]),t._v(" "),s("p",[t._v("Для начала, вам понадобится следующее:")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://www.7-zip.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("7-Zip"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.majorgeeks.com/files/details/bootice_64_bit.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("BOOTICE"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCorePkg"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("Далее, откройте BOOTICE и убедитесь, что вы выбрали правильный накопитель.")]),t._v(" "),s("p",[s("img",{attrs:{src:a(538),alt:""}})]),t._v(" "),s("p",[t._v('Затем, войдите в "Process MBR", потом нажмите на "Restore MBR" и выберите '),s("strong",[t._v("boot0")]),t._v(" файл из "),s("code",[t._v("Utilities/LegacyBoot/")]),t._v(" в OpenCorePkg:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("Восстановление MBR")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("Восстановление boot0 файла")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("img",{attrs:{src:a(539),alt:""}})]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("img",{attrs:{src:a(540),alt:""}})])])])]),t._v(" "),s("p",[t._v('После, вернитесь на главный экран и выберите "Process PBR", затем "Restore PBR". Здесь, выберите '),s("strong",[t._v("Boot1f32")]),t._v(" файл из "),s("code",[t._v("Utilities/LegacyBoot/")]),t._v(" в OpenCorePkg:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("Восстановление PBR")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("Восстановление boot1f32 файла")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("img",{attrs:{src:a(541),alt:""}})]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("img",{attrs:{src:a(542),alt:""}})])])])]),t._v(" "),s("p",[t._v("Как только это будет сделано, вернитесь к вашему USB накопителю и сделайте последнюю вещь. Возьмите либо "),s("strong",[t._v("bootx64")]),t._v("(64-битные процессоры), либо "),s("strong",[t._v("bootia32")]),t._v("(32-битные процессоры) файл из "),s("code",[t._v("Utilities/LegacyBoot/")]),t._v(" и поместите его в корень вашего накопителя. "),s("strong",[t._v("Переименуйте этот файл в "),s("code",[t._v("boot")])]),t._v(", чтобы DuetPkg мог правильно функционировать:")]),t._v(" "),s("p",[s("img",{attrs:{src:a(543),alt:""}})])])]),t._v(" "),s("h2",{attrs:{id:"теперь-когда-это-все-сделано-переидите-к-настроике-efi-чтобы-закончить-работу"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#теперь-когда-это-все-сделано-переидите-к-настроике-efi-чтобы-закончить-работу"}},[t._v("#")]),t._v(" Теперь, когда это всё сделано, перейдите к "),s("RouterLink",{attrs:{to:"/installer-guide/opencore-efi.html"}},[t._v("Настройке EFI")]),t._v(", чтобы закончить работу")],1)])}),[],!1,null,null,null);e.default=r.exports}}]);