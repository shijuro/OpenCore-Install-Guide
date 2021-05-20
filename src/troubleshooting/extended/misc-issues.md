# Прочие проблемы

* Поддерживаемая версия: 0.6.9

Разные проблемы, не связанные с самой macOS, такие как мультизагрузка.

* [Невозможно запустить `acpidump.efi`](#невозможно-запустить-acpidump-efi)
* [Исправление ошибки SSDTTime: `Could not locate or download iasl!`](#исправление-ошибки-ssdttime-could-not-locate-or-download-iasl)
* [Исправление ошибки Python: `Python is not installed or not found on PATH`](#исправление-ошибки-python-python-is-not-installed-or-not-found-on-path)
* [Загрузочный диск Windows не видит APFS диски](#загрузочныи-диск-windows-не-видит-apfs-диски)
* [Неправильное разрешение в OpenCore](#неправильное-разрешение-в-opencore)
* [Не отображается Windows/BootCamp диск в меню выбора](#не-отображается-windows-bootcamp-диск-в-меню-выбора)
* [Неправильно выбирается загрузочный диск](#неправильно-выбирается-загрузочныи-диск)
* [Загрузка Windows приводит к синему экрану смерти или крашам Linux](#загрузка-windows-приводит-к-синему-экрану-смерти-или-крашам-linux)
* [Ошибка при загрузке Windows: `OCB: StartImage failed - Already started`](#ошибка-при-загрузке-windows-ocb-startimage-failed-already-started)
* [iASL warning, only X unresolved](#iasl-warning-only-x-unresolved)

## Невозможно запустить `acpidump.efi`

Вызов оболочки OpenCore:

```
shell> fs0: //заменить на корректный диск

fs0:\> dir //чтобы убедиться, что это правильный каталог

  Directory of fs0:\

   01/01/01 3:30p  EFI
fs0:\> cd EFI\OC\Tools //обратите внимание на слеши

fs0:\EFI\OC\Tools> acpidump.efi -b -n DSDT -z
```

## Исправление ошибки SSDTTime: `Could not locate or download iasl!`

Обычно это происходит из-за устаревшей версии Python, попробуйте либо обновить Python, либо добавить iasl в папку Scripts для SSDTTime:

* [Версия iasl для macOS](https://bitbucket.org/RehabMan/acpica/downloads/iasl.zip)
* [Версия iasl для Windows](https://acpica.org/downloads/binary-tools)
* [Версия iasl для Linux](http://amdosx.kellynet.nl/iasl.zip)

## Исправление ошибки Python: `Python is not installed or not found on PATH`

Просто исправить - загрузите и установите последнюю версию Python:

* [Ссылка для macOS](https://www.python.org/downloads/macos)
* [Ссылка для Windows](https://www.python.org/downloads/windows/)
* [Ссылка для Linux](https://www.python.org/downloads/source/)

Убедитесь, что включен `Add Python to PATH`

![](../../../img/troubleshooting/troubleshooting-md/python-path.png)

## Загрузочный диск Windows не видит APFS диски

* Устаревшие драйверы BootCamp(обычно версия 6.0 идёт с brigadier, утилита BootCamp в macOS предоставляет более новую версию, к примеру, 6.1). CorpNewt «форкнул» brigadier для устранения этих проблем: [brigadier от CorpNewt](https://github.com/corpnewt/brigadier)

## Неправильное разрешение в OpenCore

* Следуйте [Исправление разрешения и Verbose](https://dortania.github.io/OpenCore-Post-Install/cosmetic/verbose.html) для правильной настройки, установите `UIScale` в `02` на HiDPI
* Пользователи также приметели, что установка `ConsoleMode` в Max иногда даёт сбои, если оставить его пустым, это может помочь

## Не отображается Windows/BootCamp диск в меню выбора

Итак, в OpenCore, мы подметим, что Legacy установка Windows не поддерживается, только UEFI. Большинство установок сейчас - UEFI, но те, которые осуществленны с Ассистентом BootCamp - являются Legacy, поэтому вам придётся найти другие средства создания установщика(Google ваш друг). Это также означает, что MBR/Hybrid разделы также сломаны, поэтому вам необходимо форматировать диск на который вы хотите установить с помощью Дисковой утилиты. См. [Руководство по Multiboot](https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/), чтобы получить лучший результат ваших действий.

Теперь перейдём к устранению неполадок:

* Убедитесь в том, что в `Misc -> Security -> ScanPolicy` установлено значение `0` для того, чтобы отображались все диски
* Включите `Misc -> Boot -> Hideself`, когда загрузчик Windows находится на том же диске

## Неправильно выбирается загрузочный диск

Если у вас возникают проблемы с правильным с загрузочным диском правильно применяющую вашу новую загрузочную запись, это, скорее всего, вызвано отсутствием в вашем I/O Registry. Чтобы решить эту проблему, убедитесь, что вы используете `PlatformInfo -> Automatic -> True`

Пример отсутствия `DevicePathsSupported`:

* [Default DevicePath match failure due to different PciRoot #664](https://github.com/acidanthera/bugtracker/issues/664#issuecomment-663873846)

## Загрузка Windows приводит к синему экрану смерти или крашам Linux

Это происходит из-за проблем связанных с alignment, убедитесь, что `SyncRuntimePermissions` включен на прошивках, которые поддерживают MAT. Проверьте свои логи, чтобы узнать, поддерживает ли ваша прошивка Memory Attribute Tables(сокр. MAT; обычно поддержка встречается на прошивках 2018 г. и новее)

Обычный код ошибки Windows:

* `0xc000000d`

## Ошибка при загрузке Windows: `OCB: StartImage failed - Already started`

Это связано с тем, что OpenCore запутывается при загрузке Windows, и случайно думает, что он загружает OpenCore. Этого можно избежать либо перемещением Windows на отдельный диск, *или же* добавлением Custom Path к диску в BlessOverride. См. [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) для получения подробностей.

## iASL warning, only X unresolved

Если вы пытаетесь декомпилировать ваш DSDT и получаете ошибку подобную этой:

```
iASL Warning: There were 19 external control methods found during disassembly, but only 0 were resolved (19 unresolved)
```

Это случается, когда одна ACPI таблица требует остальных таблиц для правильной ссылки, она не принимает создание DSDT, поскольку мы используем его только для создания нескольких выбранных SSDT. Тем, кто беспокоится, вы можете запустить следующее:

```
iasl * [вставьте сюда все ACPI файлы]
```

## Несоответствие времени между macOS и Windows

Это из-за того, что macOS использует UTC, а Windows полагается на GMT, поэтому вам необходимо заставить одну ОС использовать другой способ измерения времени. Мы настоятельно рекомендуем модифицировать Windows, поскольку это гораздо менее разрушительно и болезненно:

* [Установка утилит Bootcamp](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* [Модификация реестера Windows (на английском)](https://superuser.com/q/494432)
