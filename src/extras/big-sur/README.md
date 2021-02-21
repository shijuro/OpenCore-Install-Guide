# OpenCore и macOS 11: Big Sur

Снова наступило то время года, а вместе с ним и новая бета-версия macOS. Вот вся информация, которая вам нужна, чтобы начать работу.

::: tip Напоминание

**На этой странице будет небольшое обсуждение того, что именно вам нужно подготовить к обновлению на Big Sur, более подробнее о том, что изменилось в Big Sur, можно найти здесь:**

* [Что нового в macOS 11, Big Sur!](https://dortania.github.io/hackintosh/updates/2020/11/12/bigsur-new.html)

:::

## Содержание

* [Предварительные условия](#предварительные-условия)
  * [Поддерживаемые SMBIOS](#поддерживаемые-smbios)
  * [Поддерживаемое оборудование](#поддерживаемое-оборудование)
  * [Обновление кекстов, загрузчика и config.plist](#обновление-кекстов-загрузчика-и-config-plist-до-актуального)
  * [Известные проблемы](#известные-проблемы)
* [Установка](#установка)
* [Устранение неполадок](#устранение-неполадок)
  * [Зависает на Forcing CS_RUNTIME for entitlement](#зависает-на-forcing-cs-runtime-for-entitlement)
  * [Зависает на PCI Configuration Begins на платах Intel X99 и X299](#зависает-на-pci-configuration-begins-на-платах-intel-x99-и-x299)
  * [Зависает на ramrod(^^^^^^^^^^^^^)](#зависает-на-ramrod)
  * [X79 и X99 паникуют на IOPCIFamily](#x79-и-x99-паникуют-на-iopcifamily)
  * [DeviceProperties не инжектируется](#deviceproperties-не-инжектируется)
  * [Клавиатура и мышь сломаны](#клавиатура-и-мышь-сломаны)
  * [Ранняя паника ядра на max_cpus_from_firmware not yet initialized](#ранняя-паника-ядра-на-max-cpus-from-firmware-not-yet-initialized)
  * [Не удается обновить Big Sur до более новых версий](#не-удается-обновить-big-sur-до-более-новых-версии)
  * [Паника ядра на Rooting from the live fs](#паника-ядра-на-rooting-from-the-live-fs)
  * [Asus Z97 и HEDT(т.е. X99 и X299) не могут пройти второй этап установки](#asus-z97-и-hedt-т-е-x99-и-x299-не-могут-проити-второи-этап-установки)
  * [На ноутбуке ядро паникует на cannot perform kext scan](#на-ноутбуке-ядро-паникует-на-cannot-perform-kext-scan)

## Предварительные условия

Прежде чем мы сможем сразу приступить к установке Big Sur, нам нужно рассмотреть несколько вещей:

### Поддерживаемые SMBIOS

В Big Sur перестались поддерживаться некоторые SMBIOS на Ivy Bridge и Haswell, так что смотрите ниже, чтобы ваш не перестал поддерживаться:

* iMac14,3 и старее
  * Примечание: iMac14,4 все еще поддерживается
* MacPro5,1 и старее
* MacMini6,x и старее
* MacBook7,1 и старее
* MacBookAir5,x и старее
* MacBookPro10,x и старее

Если ваш SMBIOS поддерживается в Catalina и не указан выше, вы можете идти дальше!

::: details Поддерживаемые SMBIOS

SMBIOS поддерживаемые в macOS Big Sur:

* iMac14,4 и новее
* MacPro6,1 и новее
* iMacPro1,1 и новее
* MacMini7,1 и новее
* MacBook8,1 и новее
* MacBookAir6,x и новее
* MacBookPro11,x и новее

Полный список поддерживаемых SMBIOS, включая поддержку ОС, см. здесь: [Выбор правильного SMBIOS](../smbios-support.md)

:::

Для тех, кому нужен простой переход на своих машинах:

* iMac13,1 должен теперь использовать iMac14,4
* iMac13,2 должен теперь использовать iMac15,1
* iMac14,2 и iMac14,3 должны теперь использовать iMac15,1
  * Примечание: пользователи процессоров AMD с графическими процессорами Nvidia могут найти MacPro7,1 более подходящим
* iMac14,1 должен теперь использовать iMac14,4

### Поддерживаемое оборудование

Не так много оборудования перестало поддерживаться, но вот некоторое из них:

* Официально процессоры Ivy Bridge U, H и S.
  * Эти процессоры по-прежнему будут загружаться без особых проблем, но обратите внимание, что Mac с потребительскими Ivy Bridge не поддерживаются в Big Sur.
  * Процессоры Ivy Bridge-E по-прежнему поддерживаются благодаря MacPro6,1
* Поддержку iGPU Ivy Bridge планируется прекратить
  * Однако драйверы для HD 4000 и HD 2500 всё ещё присутствуют в 11.0.1
* Wi-Fi-карты на базе BCM4331 и BCM43224.
  * См. [Wireless Buyers guide](https://dortania.github.io/Wireless-Buyers-Guide/) о потенциальных картах, на которые можно перейти.
  * Возможный обходной путь состоит в инжекции патченного IO80211Family, подробнее см. здесь: [Патчи IO80211](https://github.com/khronokernel/IO80211-Patches)
* Некоторые SATA-контроллеры
  * По каким-то причинам, Apple удалила класс AppleIntelPchSeriesAHCI из AppleAHCIPort.kext. Из-за полного удаления класса, попытка подмены на другой ID (обычно выполняется SATA-unsupported.kext) может закончиться неудачей для многих и создать нестабильность для других.
  * Частичное решение: инжектировать версию от Catalina с пропатченными конфликтующими символами. Вы можете найти кекст здесь: [Патченный AppleAHCIPort.kext от Catalina](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  * Мы рекомендуем установить для MinKernel значение 20.0.0 для кекста `CtlnaAHCIPort.kext` во избежание любых потенциальных проблем. Этот способ будет работать как в Catalina, так и в Big Sur, поэтому если хотите, вы можете удалить SATA-unsupported.

Другие заметные изменения:

* Пользователям MSI Navi больше не требуется патч `ATY,rom`/`-wegnoegpu` чтобы загрузиться в установщик
* 2 этап установки, требующий рабочего NVRAM
  * Asus 9 серия: дополнительную информацию см. здесь: [Haswell ASUS Z97 Big Sur Update Thread](https://www.reddit.com/r/hackintosh/comments/jw7qf1/haswell_asus_z97_big_sur_update_and_installation/)
  * Пользователям X99 и X299 со сломанным NVRAM потребуется установить на другом компьютере и переместить SSD, когда все будет сделано

### Обновление кекстов, загрузчика и config.plist до актуального

Убедитесь, что у вас последняя версия OpenCore, кекстов и config.plist, чтобы не возникало каких-либо проблем с совместимостью. Вы можете просто загрузить и обновить OpenCore и кексты, как написано здесь здесь:

* [Обновление OpenCore и macOS](https://dortania.github.io/OpenCore-Post-Install/universal/update.html)

Если вы не уверены в том, какую версию OpenCore используете, вы можете запустить в терминале следующее:

```sh
nvram 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102:opencore-version
```

* Примечание: команда about требует включенного бита `0x2` в `Misc -> Security -> ExposeSensitiveData`, рекомендуемое значение для ExposeSensitiveData - `0x6`, которое включает в себя `0x2` и `0x4` биты.

#### Примечание для AMD

**Напоминание пользователям AMD**: Не забудьте обновить свои патчи ядра, предоставленными AMD OS X, иначе вы не сможете загрузить Big Sur:

* [Патчи AMD OSX](https://github.com/AMD-OSX/AMD_Vanilla/)

#### Примечание для Intel HEDT

Пользователям X79, X99 и X299 следует обратить особое внимание на следующее. В Big Sur добавлены новые требования к ACPI, так что вам нужно получить несколько новых SSDT:

* X79
  * [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)
* X99
  * [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)
  * [SSDT-RTC0-RANGE](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)
* X299
  * [SSDT-RTC0-RANGE](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)

Для тех, кто хотел бы скомпилированные файлы, смотрите здесь:

* [Начало работы с ACPI: Предварительно скомпилированные SSDT](https://dortania.github.io/Getting-Started-With-ACPI/ssdt-methods/ssdt-prebuilt.html)

### Известные проблемы

С Big Sur кое-что сломалось. В основном следующее:

* Lilu
  * В основном, сильно сломался патчинг пользовательского пространства, а это означает, что некоторая функциональность может быть сломана
  * Это затрагивает:
    * DiskArbitrationFixup
    * MacProMemoryNotificationDisabler
    * SidecarEnabler
    * SystemProfilerMemoryFixup
    * NoTouchID
    * Патчи WhateverGreen DRM и -cdfon
* AirportBrcmFixup
  * Форсированная загрузка определенного драйвера с помощью `brcmfx-driver=` может помочь
    * Например, пользователям BCM94352Z может понадобиться `brcmfx-driver=2` в boot-args для устранения этой проблемы, другим чипсетам понадобятся другие переменные.
  * Установка MaxKernel в значении 19.9.9 для AirPortBrcm4360_Injector.kext может помочь. Больше информации [в этом репозитории](https://github.com/acidanthera/AirportBrcmFixup/blob/master/README.md#please-pay-attention)
* Подержка SATA
  * Нарушение поддержки SATA произошло из-за того, что Apple удалила класс AppleIntelPchSeriesAHCI из AppleAHCIPort.kext
  * Чтобы решить эту проблему, добавьте [Патченный AppleAHCIPort.kext от Catalina](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip) с выставленным MinKernel в значении 20.0.0

И хотя это не проблема, SIP теперь получил новый бит, поэтому для правильного отключения SIP вам нужно задать `csr-active-config` значение `FF0F0000`. Дополнительную информацию см. здесь: [Отключение SIP](../../troubleshooting/extended/post-issues.md#отключение-sip)

## Установка

Руководства были обновлены для соответствия с Big Sur, см. подходящую среду ОС для вас:

* [Пользователям macOS](./../installer-guide/mac-install.md)
* [Пользователям Windows](./../installer-guide/winblows-install.md)
* [Пользователям Linux](./../installer-guide/linux-install.md)

## Устранение неполадок

### Зависает на `Forcing CS_RUNTIME for entitlement`

![Credit to Stompy for image](../../../img/extras/big-sur/readme/cs-stuck.jpg)

На самом деле это та часть, где macOS запечатывает системный том и где может показаться, что macOS застряла. **НЕ ПЕРЕЗАГРУЖАЙТЕСЬ**, думая, что вы застряли, это займет некоторое время, иначе вы сломаете установку.

### Зависает на `PCI Configuration Begins` на платах Intel X99 и X299

![](../../../img/extras/big-sur/readme/rtc-error.jpg)

Как было ранее упомянуто, материнские платы Intel HEDT могут иметь некоторые проблемы с RTC устройствами в ACPI. Чтобы устранить эту неполадку, вам нужно взглянуть на свое RTC устройство, и посмотреть, какие регионы отсутствуют. Для получения дополнительной информации см. здесь: [SSDT-RTC0-RANGE.dsl](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)

### Зависает на `ramrod`(^^^^^^^^^^^^^)

![Credit to Notiflux for image](../../../img/extras/big-sur/readme/ramrod.jpg)

Если вы застряли на разделе `ramrod` (в частности, он загружается, выдаёт эту ошибку, и перезагружается снова в эту ошибку, вызывая цикл), это намекает, что ваш SMC эмулятор сломан. Чтобы исправить это, у вас есть 2 варианта:

* Убедитесь, что вы используете последнии сборки VirtualSMC и Lilu, с помощью boot-arg `vsmcgen=1`
* Переключитесь на [FakeSMC от Rehabman](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/) (вы можете использовать упомянутый выше трюк c `MinKernel`/`MaxKernel`, чтобы ограничить использование FakeSMC Big Sur'ом и выше)

И при переключении кекстов, убедитесь, что FakeSMC и VirtualSMC не включены одновременно в вашем config.plist, поскольку это вызывает конфликты.

### X79 и X99 паникуют на IOPCIFamily

Это происходит из-за того, что в ACPI включены неиспользуемые Uncore PCI Bridges, и поэтому IOPCIFamily будет вызывать панику ядра, при зондировании неизвестных устройств. Чтобы исправить это, вам необходимо добавить [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)

### DeviceProperties не инжектируется

В Big Sur, macOS стала более требовательной к устройствам, представленным в ACPI. В особенности, если вы инжектируете важные свойства для WhateverGreen или AppleALC, вы можете заметить, что они больше не применяются. Чтобы проверить, определяет ли ваш ACPI ваше оборудование, проверьте `acpi-path` в [IORegistryExplorer](https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-210.zip):

![](../../../img/extras/big-sur/readme/acpi-path.png)

Если это свойство не найдено, вам необходимо создать SSDT, который обеспечивает полный путь, поскольку, скорее всего, у вас есть PCI Bridge, который не задокументирован в ваших ACPI таблицах. Пример такого SSDT можно найти здесь: [SSDT-BRG0](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-BRG0.dsl)

* **Примечание**: Эта проблема может также всплывать и в старых версиях macOS, но Big Sur больше всего подвержен проблемам.

### Клавиатура и мышь сломаны

Для некоторых Legacy систем, вы можете заметить, что во время работы USB портов, ваши HID устройства, такие как клавиатура и мышь, могут быть сломаны. Чтобы решить эту проблему, добавьте следующий патч:

::: details Патч IOHIDFamily

config.plist -> Kernel -> Patch:

| Key | Type | Value |
| :--- | :--- | :--- |
| Base | String | _isSingleUser |
| Count | Integer | 1 |
| Enabled | Boolean | True |
| Find | Data | |
| Identifier | String | com.apple.iokit.IOHIDFamily |
| Limit | Integer | 0 |
| Mask | Data | |
| MaxKernel | String | |
| MinKernel | String | 20.0.0 |
| Replace | Data | B801000000C3 |
| ReplaceMask | Data | |
| Skip | Integer | 0 |

[Источник](https://applelife.ru/threads/ustanovka-macos-big-sur-11-0-beta-na-intel-pc-old.2944999/page-81#post-884400)

:::

### Ранняя паника ядра на `max_cpus_from_firmware not yet initialized`

Если вы получаете раннюю панику ядра на `max_cpus_from_firmware not yet initialized`, это связано с новым методом `acpi_count_enabled_logical_processors` добавленным в ядро macOS Big Sur. Чтобы решить эту проблему, убедитесь, что вы используете OpenCore версии 0.6.0 или новее с включенным квирком `AvoidRuntimeDefrag`.

* **Примечание**: Из-за того, насколько рано происходит эта паника ядра, вы сможете записать ее в лог только через последовательный порт или перезагрузку в известной рабочей установке macOS и проверить свою панику, залогированную в NVRAM.
  * Большинство пользователей увидят эту панику просто как `[EB|#LOG:EXITBS:START]`

::: details Пример паники ядра

На экране:

![](../../../img/extras/big-sur/readme/onscreen-panic.png)

Через логирование последовательных портов или NVRAM:

![](../../../img/extras/big-sur/readme/apic-panic.png)

:::

::: details Крайний случай с Legacy

На определенном оборудовании, в основном на HP DC7900, ядро не может определить сколько потоков поддерживает ваше оборудование. Это приводит к вышеупомянутой панике ядра, и поэтому нам нужно жёстко указать значение ядер процессора.

Чтобы это сделать, добавьте следующий патч(заменив 04 из B8 **04** 00 00 00 C3 на количество потоков, которое ваше оборудование поддерживает):

| Key | Type | Value |
| :--- | :--- | :--- |
| Base | String | _acpi_count_enabled_logical_processors |
| Count | Integer | 1 |
| Enabled | Boolean | True |
| Find | Data | |
| Identifier | String | Kernel |
| Limit | Integer | 0 |
| Mask | Data | |
| MaxKernel | String | |
| MinKernel | String | 20.0.0 |
| Replace | Data | B804000000C3 |
| ReplaceMask | Data | |
| Skip | Integer | 0 |

:::

### Не удается обновить Big Sur до более новых версий

Как правило, есть 2 основных виновника:

* [Сломанная утилита обновлений](#сломанная-утилита-обновлении)
  * Самая распространенная ошибка, если это бета-версия, попробуйте сначала сделать это
* [Сломанный Seal](#сломанный-seal)

#### Сломанная утилита обновлений

Обычно это наблюдается с каждым бета-циклом, поэтому просто отмените регистрацию и зарегистрируйтесь снова:

```sh
# Отказ от участия в бета-версиях
sudo /System/Library/PrivateFrameworks/Seeding.framework/Resources/seedutil unenroll
# Регистрация снова
sudo /System/Library/PrivateFrameworks/Seeding.framework/Resources/seedutil enroll DeveloperSeed
```

Затем снова проверьте настройки, и обновления должны появиться. Если нет, запустите следующее:

```sh
# Список обновлений через терминал
softwareupdate -l
```

Это должно помочь возобновить работу утилиты обновлений. Если у вас все еще есть проблемы, проверьте раздел [Сломанный Seal](#сломанный-seal).

#### Сломанный Seal

C новыми снапшотами системного диска, теперь они сильно зависят от этого для правильного применения обновлений ОС. Поэтому, когда пломба (seal) диска сорвана, macOS откажется обновлять диск.

Чтобы проверить себя, убедитесь, что `Snapshot Sealed` возвращает YES:

```bash
# Список всех томов APFS
diskutil apfs list

# Найдите свой системный том
Volume disk1s8 A604D636-3C54-4CAA-9A31-5E1A460DC5C0
        ---------------------------------------------------
        APFS Volume Disk (Role):   disk1s8 (System)
        Name:                      Big Sur HD (Case-insensitive)
        Mount Point:               Not Mounted
        Capacity Consumed:         15113809920 B (15.1 GB)
        Sealed:                    Broken
        FileVault:                 No
        |
        Snapshot:                  4202EBE5-288B-4701-BA1E-B6EC8AD6397D
        Snapshot Disk:             disk1s8s1
        Snapshot Mount Point:      /
        Snapshot Sealed:           Yes
```

Если возвращается `Snapshot Sealed: Broken`, вам нужно выполнить следующее:

* Обновите OpenCore до 0.6.4 или новее
  * В частности, требуется коммит [ba10b5d](https://github.com/acidanthera/OpenCorePkg/commit/1b0041493d4693f9505aa6415d93079ea59f7ab0) или новее
* Вернутся к старым снапшотам
  * В основном для тех, кто вмешивался в системный том
  * См. здесь о том, как вернуться: [Откат APFS снапшотов](../../troubleshooting/extended/post-issues.md#откат-apfs-снапшотов)

### Паника ядра на `Rooting from the live fs`

Полная ошибка:

```
Rooting from the live fs of a sealed volume is not allowed on a RELEASE build
```

Это связано с проблемами включенного Secure Boot в Beta 10 со старыми версиями OpenCore. Просто обновитесь до 0.6.4, чтобы решить эту проблему

* В частности, требуется коммит [ba10b5d](https://github.com/acidanthera/OpenCorePkg/commit/1b0041493d4693f9505aa6415d93079ea59f7ab0) или новее

### Asus Z97 и HEDT(т.е. X99 и X299) не могут пройти второй этап установки

В Big Sur есть высокая зависимость от нативного NVRAM при установке, иначе установщик застрянет на цикличной перезагрузке. Чтобы решить эту проблему, вам необходимо:

* Установите Big Sur на другом компьютере, а затем перенесите диск
* Исправьте NVRAM материнской платы
  * в основном применимо к Asus серии Z97

Что касается последнего, см. здесь: [Haswell ASUS Z97 Big Sur Update Thread](https://www.reddit.com/r/hackintosh/comments/jw7qf1/haswell_asus_z97_big_sur_update_and_installation/)

### На ноутбуке ядро паникует на `cannot perform kext scan`

Это связано с тем, что в кэше ядра находится несколько копий одного и того же кекста, а точнее, несколько копий VoodooInput. Просмотрите `Kernel -> Add` и убедитесь, что у вас включена только 1 копия VoodooInput.

* Примечание: Как VoodooI2C, так и VoodooPS2 имеют комплектную копию VoodooInput, которую вы отключаете в зависимости от личных предпочтений
