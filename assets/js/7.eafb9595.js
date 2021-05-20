(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{356:function(t,a,s){t.exports=s.p+"assets/img/format-usb.83a24b13.png"},517:function(t,a,s){t.exports=s.p+"assets/img/munki.cb5c523a.png"},518:function(t,a,s){t.exports=s.p+"assets/img/munki-process.c0791880.png"},519:function(t,a,s){t.exports=s.p+"assets/img/munki-done.581ad405.png"},520:function(t,a,s){t.exports=s.p+"assets/img/munki-dmg.893a0e5d.png"},521:function(t,a,s){t.exports=s.p+"assets/img/download.974b60da.png"},522:function(t,a,s){t.exports=s.p+"assets/img/boot-disk.73bf04f5.png"},523:function(t,a,s){t.exports=s.p+"assets/img/boot-done.48b57b22.png"},524:function(t,a,s){t.exports=s.p+"assets/img/efi-base.2af0e24a.png"},525:function(t,a,s){t.exports=s.p+"assets/img/mount-efi-usb.c855475e.png"},526:function(t,a,s){t.exports=s.p+"assets/img/base-efi.3b1f0304.png"},655:function(t,a,s){"use strict";s.r(a);var n=s(24),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"создание-установщика-в-macos"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#создание-установщика-в-macos"}},[t._v("#")]),t._v(" Создание установщика в macOS")]),t._v(" "),n("ul",[n("li",[t._v("Поддерживаемая версия: 0.6.9")])]),t._v(" "),n("p",[t._v("В то время как вам не нужна чистая установка macOS чтобы использовать OpenCore, некоторые пользователи предпочитают иметь свежую версию ОС с обновлением их Boot Manager.")]),t._v(" "),n("p",[t._v("Для начала, мы захотим получить себе копию macOS. Вы можете пропустить этот шаг и перейти к форматированию USB, если вы просто делаете загрузочную флешку с OpenCore, а не установщик. Для всех остальных, вы можете загрузить macOS из App Store или с помощью скрипта от Munki.")]),t._v(" "),n("h2",{attrs:{id:"скачивание-macos-современные-версии"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#скачивание-macos-современные-версии"}},[t._v("#")]),t._v(" Скачивание macOS: современные версии")]),t._v(" "),n("ul",[n("li",[t._v("Этот метод позволяет вам загрузить macOS 10.13 и новее, для 10.12 и старее, смотрите "),n("a",{attrs:{href:"#%D1%81%D0%BA%D0%B0%D1%87%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-macos-%D1%83%D1%81%D1%82%D0%B0%D1%80%D0%B5%D0%B2%D1%88%D0%B8%D0%B5-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8"}},[t._v("Скачивание macOS: устаревшие версии")])])]),t._v(" "),n("p",[t._v("С компьютера macOS, отвечающего требованиям версии ОС, которую вы хотите установить, перейдите в App Store и загрузите желаемый релиз ОС и продолжайте "),n("a",{attrs:{href:"#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D0%BA%D0%B0-%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D1%89%D0%B8%D0%BA%D0%B0"}},[n("strong",[t._v("настройку установщика")])]),t._v(".")]),t._v(" "),n("p",[t._v("Для компьютеров, которым нужен конкретный релиз ОС или не удается загрузить из App Store, вы можете использовать утилиту InstallInstallMacOS от Munki.")]),t._v(" "),n("p",[t._v("Чтобы запустить его, просто скопируйте и вставьте следующую команду в терминал:")]),t._v(" "),n("div",{staticClass:"language-sh extra-class"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" ~/macOS-installer "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" ~/macOS-installer "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -O https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" python installinstallmacos.py\n")])])]),n("p",[n("img",{attrs:{src:s(517),alt:""}})]),t._v(" "),n("p",[t._v("Как вы видите, мы получаем большой список установщиков macOS. Если вам нужна определенная версия macOS, вы можете выбрать её, набрав её номер. Для этого примера, мы выберим 10:")]),t._v(" "),n("p",[n("img",{attrs:{src:s(518),alt:""}})]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("Примечание к macOS 11, Big Sur")]),t._v(": Так как эта ОС совершенна новая, есть некоторые проблемы с определенными системами, которые нужно решить. Для получения дополнительной информации, смотрите здесь: "),n("RouterLink",{attrs:{to:"/extras/big-sur/"}},[t._v("OpenCore и macOS 11: Big Sur")]),t._v(" "),n("ul",[n("li",[t._v("Для начинающих пользователей, мы рекомендуем macOS 10.15, Catalina")])])],1),t._v(" "),n("li",[n("strong",[t._v("Примечание к GPU Nvidia")]),t._v(": напоминание о том, чтобы проверить, поддерживает ли ваше оборудование новые ОС, смотрите "),n("RouterLink",{attrs:{to:"/macos-limits.html"}},[t._v("Аппаратные ограничения")])],1)]),t._v(" "),n("p",[t._v("Это займёт некоторое время, поскольку мы загружаем установщик macOS весом 8Гб+, поэтому мы настоятельно рекомендуем прочитать остальную часть руководства, пока вы ждёте.")]),t._v(" "),n("p",[t._v("По завершению, вы найдёте в папке "),n("code",[t._v("~/macOS-Installer/")]),t._v(" файл DMG содержащий установщик macOS, и названный, например "),n("code",[t._v("Install_macOS_11.1-20C69.dmg")]),t._v(". Смонтируйте его и вы найдёте приложение-установщик.")]),t._v(" "),n("ul",[n("li",[t._v("Примечание: Мы рекомендуем переместить приложение Установка macOS.app в папку "),n("code",[t._v("/Applications")]),t._v(", поскольку мы будем выполнять команды в этой директории.")]),t._v(" "),n("li",[t._v("Примечание 2: Нажатие сочетания клавиш Cmd+Shift+G в Finder позволит вам легче перейти к папке "),n("code",[t._v("~/macOS-installer")])])]),t._v(" "),n("p",[n("img",{attrs:{src:s(519),alt:""}})]),t._v(" "),n("p",[n("img",{attrs:{src:s(520),alt:""}})]),t._v(" "),n("p",[t._v("Начиная отсюда, перейдите к "),n("a",{attrs:{href:"#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D0%BA%D0%B0-%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D1%89%D0%B8%D0%BA%D0%B0"}},[t._v("Настройке установщика")]),t._v(" чтобы закончить свою работу.")]),t._v(" "),n("h2",{attrs:{id:"скачивание-macos-устаревшие-версии"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#скачивание-macos-устаревшие-версии"}},[t._v("#")]),t._v(" Скачивание macOS: устаревшие версии")]),t._v(" "),n("ul",[n("li",[n("RouterLink",{attrs:{to:"/installer-guide/mac-install-pkg.html"}},[t._v("Устаревшие версии macOS: автономный метод")]),t._v(" "),n("ul",[n("li",[t._v("Поддерживаются 10.10-10.12")])])],1),t._v(" "),n("li",[n("RouterLink",{attrs:{to:"/installer-guide/mac-install-recovery.html"}},[t._v("Устаревшие версии macOS: онлайн метод")]),t._v(" "),n("ul",[n("li",[t._v("Поддерживаются 10.7-11")])])],1),t._v(" "),n("li",[n("RouterLink",{attrs:{to:"/installer-guide/mac-install-dmg.html"}},[t._v("Устаревшие версии macOS: образы дисков")]),t._v(" "),n("ul",[n("li",[t._v("Поддерживаются 10.4-10.6")])])],1)]),t._v(" "),n("h2",{attrs:{id:"настроика-установщика"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#настроика-установщика"}},[t._v("#")]),t._v(" Настройка установщика")]),t._v(" "),n("p",[t._v("Теперь мы форматируем USB, чтобы подготовить его как к установщику macOS, так и к OpenCore. Мы хотим использовать macOS Extended (HFS+) с таблицей разделов GUID. Это создаст два раздела: основной "),n("code",[t._v("MyVolume")]),t._v(" и второй под названием "),n("code",[t._v("EFI")]),t._v(", который используется как загрузочныйц раздел, где ваш firmware будет проверять загрузочные файлы.")]),t._v(" "),n("ul",[n("li",[t._v("Примечание: По умолчанию, Дисковая Утилита показывает только разделы - нажмите Cmd/Win+2 , чтобы показать все накопители (или же можете нажать на кнопку Вид (View))")]),t._v(" "),n("li",[t._v('Примечание 2: Пользователи следовавшие разделу "Устаревшая macOS: онлайн метод" могут перейти к '),n("a",{attrs:{href:"#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D0%BA%D0%B0-efi-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-opencore"}},[t._v("Настройке EFI окружения OpenCore")])])]),t._v(" "),n("p",[n("img",{attrs:{src:s(356),alt:"Форматирование USB"}})]),t._v(" "),n("p",[t._v("Затем запустите команду "),n("code",[t._v("createinstallmedia")]),t._v(" предоставленную "),n("a",{attrs:{href:"https://support.apple.com/ru-ru/HT201372",target:"_blank",rel:"noopener noreferrer"}},[t._v("Apple"),n("OutboundLink")],1),t._v(". Обратите внимание на то, что эта команда используется для отформатированного USB с названием "),n("code",[t._v("MyVolume")]),t._v(":")]),t._v(" "),n("div",{staticClass:"language-sh extra-class"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Big"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume\n")])])]),n("p",[t._v("Это займёт некоторое время, так что вы можете взять чашечку кофе или продолжить читать руководство (честно говоря, вам не стоит следовать этому руководству шаг за шагом, не прочитав это всё сначала).")]),t._v(" "),n("p",[t._v("Также вы можете поменять путь "),n("code",[t._v("createinstallmedia")]),t._v(" на тот, где находится ваш установщик (то же самое с названием накопителя)")]),t._v(" "),n("details",{staticClass:"custom-block details"},[n("summary",[t._v("Устаревшие createinstallmedia команды")]),t._v(" "),n("p",[t._v("Взято с сайта Apple: "),n("a",{attrs:{href:"https://support.apple.com/ru-ru/HT201372",target:"_blank",rel:"noopener noreferrer"}},[t._v("Создание загружаемого установщика для macOS"),n("OutboundLink")],1)]),t._v(" "),n("div",{staticClass:"language-sh extra-class"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Big Sur")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Big"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Catalina")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Mojave")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# High Sierra")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" High"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Sierra")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" macOS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Sierra.app\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# El Capitan")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" OS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" X"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" El"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" OS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" X"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" El"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Capitan.app\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Yosemite")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" OS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" X"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" OS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" X"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Yosemite.app\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Mavericks")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" OS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" X"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Mavericks.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" OS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" X"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Mavericks.app --nointeraction\n")])])])]),t._v(" "),n("h2",{attrs:{id:"настроика-legacy"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#настроика-legacy"}},[t._v("#")]),t._v(" Настройка Legacy")]),t._v(" "),n("p",[t._v("Для систем, не поддерживающих UEFI загрузку, смотрите ниже:")]),t._v(" "),n("details",{staticClass:"custom-block details"},[n("summary",[t._v("Настройка Legacy загрузки")]),t._v(" "),n("p",[t._v("Для начала, вам понадобится следующее:")]),t._v(" "),n("ul",[n("li",[t._v("BootInstall_IA32.tool или BootInstall_X64.tool\n"),n("ul",[n("li",[t._v("Может быть найдено в OpenCorePkg по пути "),n("code",[t._v("/Utilties/LegacyBoot/")])])])]),t._v(" "),n("li",[t._v("Установочная USB флешка(создана выше)")])]),t._v(" "),n("p",[t._v("В папке OpenCore, перейдите к "),n("code",[t._v("Utilities/LegacyBoot")]),t._v(". Здесь вы найдете файл названный "),n("code",[t._v("BootInstall_ARCH.tool")]),t._v(". Он устанавливает DuetPkg на нужный накопитель.")]),t._v(" "),n("p",[n("img",{attrs:{src:s(521),alt:"BootInstall Location"}})]),t._v(" "),n("p",[t._v("Теперь запустите эту утилиту в терминале "),n("strong",[t._v("в sudo")]),t._v("(В противном случае, эта утилита, скорее всего, потерпит неудачу):")]),t._v(" "),n("div",{staticClass:"language-sh extra-class"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Замените X64 на IA32, если у вас 32-битный процессор")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ~/Downloads/OpenCore/Utilities/legacyBoot/BootInstall_X64.tool\n")])])]),n("p",[n("img",{attrs:{src:s(522),alt:"Disk Selection/writing new MBR"}})]),t._v(" "),n("p",[t._v("Это покажет вам список доступных дисков, выберите нужный, и вам будет предложено записать новый MBR. Выберите yes"),n("code",[t._v("[y]")]),t._v(", и на этом вы закончите.")]),t._v(" "),n("p",[n("img",{attrs:{src:s(523),alt:"Finished Installer"}})]),t._v(" "),n("p",[n("img",{attrs:{src:s(524),alt:"Base EFI"}})]),t._v(" "),n("p",[t._v("Это даст вам EFI раздел с "),n("strong",[t._v("bootia32")]),t._v(" или "),n("strong",[t._v("bootx64")]),t._v(" файлом")])]),t._v(" "),n("h2",{attrs:{id:"настроика-efi-окружения-opencore"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#настроика-efi-окружения-opencore"}},[t._v("#")]),t._v(" Настройка EFI окружения OpenCore")]),t._v(" "),n("p",[t._v("Настроить EFI окружение OpenCore просто - всё что вам нужно сделать, это смонтировать наш системный EFI раздел. Это автоматически делается, когда мы форматируем в GUID, но по умолчанию размонтируется, так что появляется наш друг "),n("a",{attrs:{href:"https://github.com/corpnewt/MountEFI",target:"_blank",rel:"noopener noreferrer"}},[t._v("MountEFI"),n("OutboundLink")],1),t._v(":")]),t._v(" "),n("p",[n("img",{attrs:{src:s(525),alt:"MountEFI"}})]),t._v(" "),n("p",[t._v("Вы заметите, что как только мы откроем EFI раздел - он будет пуст. Вот здесь и начинается самое интересное.")]),t._v(" "),n("p",[n("img",{attrs:{src:s(526),alt:"Empty EFI partition"}})]),t._v(" "),n("h2",{attrs:{id:"теперь-когда-это-все-сделано-переидите-к-настроике-efi-чтобы-закончить-работу"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#теперь-когда-это-все-сделано-переидите-к-настроике-efi-чтобы-закончить-работу"}},[t._v("#")]),t._v(" Теперь, когда это всё сделано, перейдите к "),n("RouterLink",{attrs:{to:"/installer-guide/opencore-efi.html"}},[t._v("Настройке EFI")]),t._v(", чтобы закончить работу")],1)])}),[],!1,null,null,null);a.default=e.exports}}]);