
# Создание установщика в macOS

* Поддерживаемая версия: 0.6.5

В то время как вам не нужна чистая установка macOS чтобы использовать OpenCore, некоторые пользователи предпочитают иметь свежую версию ОС с обновлением их Boot Manager.

Для начала, мы захотим получить себе копию macOS. Вы можете пропустить этот шаг и перейти к форматированию USB, если вы просто делаете загрузочную флешку с OpenCore, а не установщик. Для всех остальных, вы можете загрузить macOS из App Store или с помощью скрипта от Munki.

## Скачивание macOS: современные версии

* Этот метод позволяет вам загрузить macOS 10.13 и новее, для 10.12 и старее, смотрите [Скачивание macOS: устаревшие версии](#скачивание-macos-устаревшие-версии)

С компьютера macOS, отвечающего требованиям версии ОС, которую вы хотите установить, перейдите в App Store и загрузите желаемый релиз ОС и продолжайте [**настройку установщика**](#настроика-установщика).

Для компьютеров, которым нужен конкретный релиз ОС или не удается загрузить из App Store, вы можете использовать утилиту InstallInstallMacOS от Munki.

Чтобы запустить его, просто скопируйте и вставьте следующую команду в терминал:

```sh
mkdir ~/macOS-installer && cd ~/macOS-installer && curl -O https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py && sudo python installinstallmacos.py
```

![](../../img/installer-guide/mac-install-md/munki.png)

Как вы видите, мы получаем большой список установщиков macOS. Если вам нужна определенная версия macOS, вы можете выбрать её, набрав её номер. Для этого примера, мы выберим 10:

![](../../img/installer-guide/mac-install-md/munki-process.png)

* **Примечание к macOS 11, Big Sur**: Так как эта ОС совершенна новая, есть некоторые проблемы с определенными системами, которые нужно решить. Для получения дополнительной информации, смотрите здесь: [OpenCore и macOS 11: Big Sur](../extras/big-sur/README.md)
  * Для начинающих пользователей, мы рекомендуем macOS 10.15, Catalina
* **Примечание к GPU Nvidia**: напоминание о том, чтобы проверить, поддерживает ли ваше оборудование новые ОС, смотрите [Аппаратные ограничения](../macos-limits.md)

Это займёт некоторое время, поскольку мы загружаем установщик macOS весом 8Гб+, поэтому мы настоятельно рекомендуем прочитать остальную часть руководства, пока вы ждёте.

По завершению, вы найдёте в папке `~/macOS-Installer/` файл DMG содержащий установщик macOS, и названный, например `Install_macOS_11.1-20C69.dmg`. Смонтируйте его и вы найдёте приложение-установщик.

* Примечание: Мы рекомендуем переместить приложение Установка macOS.app в папку `/Applications`, поскольку мы будем выполнять команды в этой директории.
* Примечание 2: Нажатие сочетания клавиш Cmd+Shift+G в Finder позволит вам легче перейти к папке `~/macOS-installer`

![](../../img/installer-guide/mac-install-md/munki-done.png)

![](../../img/installer-guide/mac-install-md/munki-dmg.png)

Начиная отсюда, перейдите к [Настройке установщика](#настроика-установщика) чтобы закончить свою работу.

## Скачивание macOS: устаревшие версии

* Этот метод позволит вам скачать более старые OS X; в настоящее время поддерживаются все Intel версии OS X (с 10.4 по текущую версию)

::: details Получение устаревших версий macOS: автономный метод (Поддерживаются 10.10-10.12)

### Устаревшая macOS: автономный метод

Этот метод позволит нам загрузить полные установщики от Apple, однако он ограничен 10.10 Yosemite, поэтому более более старые ОС должны быть загружены с помощью "Онлайн метода", упомянотого ниже.

Чтобы начать, перейдите по следующей ссылке:

* [Как получить старые версии macOS](https://support.apple.com/ru-ru/HT211683)

Загрузите желаемую версию.

В зависимости от того, на какой ОС вы находитесь, вы можете запустить этот скрипт и перейти к [Настройка установщика](#setting-up-the-installer), однако если вы получили эту ошибку:

![](../../img/installer-guide/legacy-mac-install-md/unsupported.png)

Это означает то, что нам надо вручную распаковать установщик.

### Распаковка установщика

Чтобы начать, возьмите InstallMacOSX/InstallOS.dmg и смонтируйте его:

![](../../img/installer-guide/legacy-mac-install-md/mount.png)

Дальше, давайте откроем окно терминала и создадим папку на нашем рабочем столе. Запускайте по одной:

```sh
cd ~/Desktop
mkdir MacInstall && cd MacInstall
```

Теперь, мы переходим к интересной части, распаковка установщика (обратите внимание, что это может занять несколько минут):

* Для El Capitan(10.11) и старее:

```sh
xar -xf /Volumes/Install\ OS\ X/InstallMacOSX.pkg
```

* Для Sierra(10.12):

```sh
xar -xf /Volumes/Install\ macOS/InstallOS.pkg
```

Затем, выполните следующее(по одному):

* Yosemite:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ Yosemite.app/Contents/SharedSupport/
mv Install\ OS\ X\ Yosemite.app /Applications
```

* El Capitan:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ El\ Capitan.app/Contents/SharedSupport/
mv Install\ OS\ X\ El\ Capitan.app /Applications
```

* Sierra:

```sh
cd InstallOS.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ macOS\ Sierra.app/Contents/SharedSupport/
mv Install\ macOS\ Sierra.app /Applications
```

Как только это будет сделано, вы можете переходить к [Настройке установщика](#настроика-установщика)!

:::

::: details Получение устаревших версий macOS: онлайн метод(Поддерживаются 10.7-10.15)

### Устаревшая macOS: онлайн метод

Этот метод позволяет нам загрузить устаревшие версии macOS включая с 10.7 по текущую, однако это установщики только Recovery, поэтому требуется интернет соединение внутри самого установщика

Чтобы начать, вы захотите использовать macrecovery.py. Эта утилита уже входит в состав OpenCorePkg

![](../../img/installer-guide/legacy-mac-install-md/macrecovery.png)

Инструкции для запуска довольно просты, выберите ниже команду, в зависимости от того, какую ОС вы хотите загрузить:

```sh
# Lion(10.7):
python ./macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python ./macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# Mountain Lion(10.8):
python ./macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# Mavericks(10.9):
python ./macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# Yosemite(10.10):
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# El Capitan(10.11):
python ./macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# Sierra(10.12):
python ./macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# High Sierra(10.13)
python ./macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python ./macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# Mojave(10.14)
python ./macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# Catalina(10.15)
python ./macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Последняя версия
# т.е. Big Sur(11)
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download

# Обратите внимание, что Apple временно убрала Big Sur из каталога Recovery
# Ожидайте, что Apple решит эту проблему когда-нибудь после праздников
```

Начиная отсюда, выполните одну из этих команд в терминале и, когда вы закончите, вы получите результат, похожий на этот:

![](../../img/installer-guide/legacy-mac-install-md/download-done.png)

Как только это будет сделано, отформатируете USB накопитель как FAT32 со схемой разделов GUID:

![](../../img/installer-guide/legacy-mac-install-md/fat32-erase.png)

И наконец-то, создайте папку в корне этого накопителя назвав `com.apple.recovery.boot` и положите в неё загруженные BaseSystem/RecoveryImage файлы.

![](../../img/installer-guide/legacy-mac-install-md/dmg-chunklist.png)

Отсюда, вы можете перейти к [Настройке EFI окружения OpenCore](#настроика-efi-окружения-opencore)

:::

::: details Получение устаревших версий macOS: образы дисков(Поддерживаются 10.4-10.6)

### Устаревшая macOS: образы дисков

Этот метод полагается на размещенные образы от Apple или Acidanthera, и восстанавливаются на ваш диск.

#### Образы Acidanthera

Ниже, установщики были извлечены с подлинных дисков восстановления Mac с удаленной блокировкой SMBIOS, сожержимое самой OS X не было никаким образом модифицированно.

* [OS X 10.4.10(8R4088)](https://mega.nz/folder/D3ASzLzA#7sjYXE2X09f6aGjol_C7dg)

* [OS X 10.5.7(9J3050)](https://mega.nz/folder/inRBTarD#zanf7fUbviwz3WHBU5xpCg)

* [OS X 10.6.7(10J4139)](https://mega.nz/folder/z5YUhYTb#gA_IRY5KMuYpnNCg7kR3ug/file/ioQkTagI)

#### Образы Apple

Обратите внимание на то, что для получения доступа к этим образам, требуется аккаунт разработчика Apple.

* [OS X 10.5.0 Golden Master(9a581)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_v10.5_leopard_9a581/leopard_9a581_userdvd.dmg)

* [OS X 10.6.0 Golden Master(10a432)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_version_10.6_snow_leopard_build_10a432/mac_os_x_v10.6_build_10a432_user_dvd.dmg)

### Восстановление диска

Сейчас наступает интересная часть; в первую очередь, вы захотите открыть dmg, который вы скачали, и смонтировать его. Теперь открывайте Дисковую Утилиту и отформатируйте ваш накопитель как macOS Extended (HFS+) со схемой разделов GUID:

![Форматирование USB](../../img/installer-guide/mac-install-md/format-usb.png)

Next we have 2 options to follow:

* [Восстановление ASR](#asr)(Apple Software Restore)
  * На основе терминала, работает со включенным SIP
* [Восстановление через Дисковую Утилиту](#disk-utility)
  * Может требовать отключения SIP в новых ОС
  
#### ASR

Здесь вам просто надо открыть терминал и выполнить следующее:

```sh
sudo asr restore -source /Volumes/Mac\ OS\ X\ Install\ DVD  -target /Volumes/MyVolume -erase -noverify
```

* **Примечание**: Это может не соответствовать вашим настройками, так что измените соответствующим образом:
  * Измените `/Volumes/Mac\ OS\ X\ Install\ DVD` на то, как назван ваш смонтированный образ диска
  * Измените `/Volumes/MyVolume` на название вашего USB-накопителя

Это может занять некоторое время, но когда вы закончите, вы можете переходить к [Настройке EFI окружения OpenCore](#настроика-efi-окружения-opencore)
  
#### Дисковая Утилита

Из-за некоторых неприятных проблем с Дисковой Утилитой, многие попытки восстановления могут оказаться неудачными, если включен SIP. Если у вас есть проблемы, мы рекомендуем либо воспользоваться [Методом ASR](#asr), либо выключить SIP.

Чтобы начать, откройте Дисковую Утилиту и вы должны увидеть ваш USB накопитель и образ диска в боковой панели.

![](../../img/installer-guide/legacy-mac-install-md/pre-restore.png)
![](../../img/installer-guide/legacy-mac-install-md/restore.png)

Это может занять некоторое время, но когда вы закончите, вы можете переходить к [Настройке EFI окружения OpenCore](#настроика-efi-окружения-opencore)

::: details Решение проблем

Если вы во время восстановления получили ошибку похожую на эту:

![](../../img/installer-guide/legacy-mac-install-md/sip-fail.png)

Это означает то, что SIP должен быть выключен, однако мы вместого этого рекомендуем использовать [Метод ASR](#asr).

:::

## Настройка установщика

Теперь мы форматируем USB, чтобы подготовить его как к установщику macOS, так и к OpenCore. Мы хотим использовать macOS Extended (HFS+) с таблицей разделов GUID. Это создаст два раздела: основной `MyVolume` и второй под названием `EFI`, который используется как загрузочныйц раздел, где ваш firmware будет проверять загрузочные файлы.

* Примечание: По умолчанию, Дисковая Утилита показывает только разделы - нажмите Cmd/Win+2 , чтобы показать все накопители (или же можете нажать на кнопку Вид (View))
* Примечание 2: Пользователи следовавшие разделу "Устаревшая macOS: онлайн метод" могут перейти к [Настройке EFI окружения OpenCore](#настроика-efi-окружения-opencore)

![Форматирование USB](../../img/installer-guide/mac-install-md/format-usb.png)

Затем запустите команду `createinstallmedia` предоставленную [Apple](https://support.apple.com/ru-ru/HT201372). Обратите внимание на то, что эта команда используется для отформатированного USB с названием `MyVolume`:

```sh
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

Это займёт некоторое время, так что вы можете взять чашечку кофе или продолжить читать руководство (честно говоря, вам не стоит следовать этому руководству шаг за шагом, не прочитав это всё сначала).

Также вы можете поменять путь `createinstallmedia` на тот, где находится ваш установщик (то же самое с названием накопителя)

::: details Устаревшие createinstallmedia команды

Взято с сайта Apple: [Создание загружаемого установщика для macOS](https://support.apple.com/ru-ru/HT201372)

```sh
# Big Sur
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Catalina
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Mojave
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# High Sierra
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Sierra
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# El Capitan
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app

# Yosemite
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Yosemite.app

# Mavericks
sudo /Applications/Install\ OS\ X\ Mavericks.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Mavericks.app --nointeraction
```

:::

## Настройка Legacy

Для систем, не поддерживающих UEFI загрузку, смотрите ниже:

::: details Настройка Legacy загрузки

Для начала, вам понадобится следующее:

* BootInstall_IA32.tool или BootInstall_X64.tool
  * Может быть найдено в OpenCorePkg по пути `/Utilties/LegacyBoot/`
* Установочная USB флешка(создана выше)  

В папке OpenCore, перейдите к `Utilities/LegacyBoot`. Здесь вы найдете файл названный `BootInstall_ARCH.tool`. Он устанавливает DuetPkg на нужный накопитель.

![BootInstall Location](../../img/extras/legacy-md/download.png)

Теперь запустите эту утилиту в терминале **в sudo**(В противном случае, эта утилита, скорее всего, потерпит неудачу):

```sh
# Замените X64 на IA32, если у вас 32-битный процессор
sudo ~/Downloads/OpenCore/Utilities/legacyBoot/BootInstall_X64.tool
```

![Disk Selection/writing new MBR](../../img/extras/legacy-md/boot-disk.png)

Это покажет вам список доступных дисков, выберите нужный, и вам будет предложено записать новый MBR. Выберите yes`[y]`, и на этом вы закончите.

![Finished Installer](../../img/extras/legacy-md/boot-done.png)

![Base EFI](../../img/extras/legacy-md/efi-base.png)

Это даст вам EFI раздел с **bootia32** или **bootx64** файлом

:::

## Настройка EFI окружения OpenCore

Настроить EFI окружение OpenCore просто - всё что вам нужно сделать, это смонтировать наш системный EFI раздел. Это автоматически делается, когда мы форматируем в GUID, но по умолчанию размонтируется, так что появляется наш друг [MountEFI](https://github.com/corpnewt/MountEFI):

![MountEFI](../../img/installer-guide/mac-install-md/mount-efi-usb.png)

Вы заметите, что как только мы откроем EFI раздел - он будет пуст. Вот здесь и начинается самое интересное.

![Empty EFI partition](../../img/installer-guide/mac-install-md/base-efi.png)

## Теперь, когда это всё сделано, перейдите к [Настройке EFI](./opencore-efi.md), чтобы закончить работу
