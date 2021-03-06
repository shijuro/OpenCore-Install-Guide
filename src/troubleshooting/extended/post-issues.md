# Послеустановочные проблемы

* Поддерживаемая версия: 0.6.9

Проблемы, связанные с macOS после правильной установки.

* [Сломанный iMessage и Siri](#сломанныи-imessage-и-siri)
* [Нет звука](#нет-звука)
* [После перезагрузки/выключения BIOS сбрасывается или отправляется в безопасный режим (Safemode)?](#после-перезагрузки-выключения-bios-сбрасывается-или-отправляется-в-безопасныи-режим-safemode)
* [PS2 трекпад Synaptics не работает](#ps2-трекпад-synaptics-не-работает)
* [Исправление клавиш PS2 клавиатуры Dell](#исправление-клавиш-ps2-клавиатуры-dell)
* [Ускорение графического процессора в macOS отсутствует на AMD X570](#ускорение-графического-процессора-в-macos-отсутствует-на-amd-x570)
* [Сломан DRM](#сломан-drm)
* ["Memory Modules Misconfigured" на MacPro7,1](#memory-modules-misconfigured-на-macpro7-1)
* [Вылетают приложения на AMD](#вылетают-приложения-на-amd)
* [AssetCache Content Caching недоступен в виртуальной машине](#assetcache-content-caching-недоступен-в-виртуальнои-машине)
* [Системы на Coffee Lake не просыпаются](#системы-на-coffee-lake-не-просыпаются)
* [Нет показаний с датчиков температуры/кулера](#нет-показании-с-датчиков-температуры-кулера)
* [Ошибка "You can't change the startup disk to the selected disk"](#ошибка-you-can-t-change-the-startup-disk-to-the-selected-disk)
* [macOS просыпается со сбитым временем](#macos-просыпается-со-сбитым-временем)
* [Нет регулировки громкостью/яркости на внешних мониторах](#нет-регулировки-громкостью-яркости-на-внешних-мониторах)
* [Отключение SIP](#отключение-sip)
* [Откат APFS снапшотов](#откат-apfs-снапшотов)
* [Проблемы с разблокировкой с помощью Apple Watch](#проблемы-с-разблокировкои-с-помощью-apple-watch)
* [Проблемы с выводом 4K через HDMI на iGPU](#проблемы-с-выводом-4k-через-hdmi-на-igpu)

## Сломанный iMessage и Siri

См. раздел [Исправление iServices](https://dortania.github.io/OpenCore-Post-Install/universal/iservices.html)

## Нет звука

См. раздел [Исправление звука с помощью AppleALC](https://dortania.github.io/OpenCore-Post-Install/universal/audio.html)

## После перезагрузки/выключения BIOS сбрасывается или отправляется в безопасный режим (Safemode)

См. раздел [Исправление сбросов RTC/CMOS](https://dortania.github.io/OpenCore-Post-Install/misc/rtc.html)

## PS2 трекпад Synaptics не работает

Вы можете попробовать использовать [SSDT-Enable_DynamicEWMode.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-Enable_DynamicEWMode.dsl).
Сначала, откройте Диспетчер устройств и перейдите к следующему:

```
Диспетчер устройств -> Мыши и иные указывающие устройства -> Дважды щелкните по вашему трекпаду -> Сведения -> Свойство > Имя устройства в BIOS
```

Затем возьмите [SSDT-Enable_DynamicEWMode.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-Enable_DynamicEWMode.dsl)
По умолчанию, используется PCI0.LPCB.PS2K для пути. Вы захотите соответственно это переименовать.

```c
External (_SB_.PCI0.LPCB.PS2K, DeviceObj) <- Переименуйте это

    Name(_SB.PCI0.LPCB.PS2K.RMCF, Package()  <- Переименуйте это

```

Затем скомпилируйте с помощью, скопируйте в папку OC/ACPI, и добавьте в свой config.plist.

* Примечание: Хотя это будет работать в большинстве случаев, трекпад может работать с задержками, и вы не сможете использовать физические кнопки ([подробнее](https://github.com/acidanthera/bugtracker/issues/890)). Если вы можете жить без трекпада, это может быть лучше:

Найдите ACPI путь вашей мыши (см. выше), затем возьмите [SSDT-DisableTrackpadProbe.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-DisableTrackpadProbe.dsl). По умолчанию, здесь используется PCI0.LPCB.PS2K, поэтому при необходимости вы должны изменить его на путь своего ACPI:

```c
External (_SB_.PCI0.LPCB.PS2K, DeviceObj) <- Переименуйте это

    Name(_SB.PCI0.LPCB.PS2K.RMCF, Package() <- Переименуйте это
```

## Исправление клавиш PS2 клавиатуры Dell

Для тех, у кого проблемы с нажатием клавиш, которые не отпускаются (т.е. нажимаются бесконечно), вам нужно включить профиль Dell в VoodooPS2.

Прежде всего, вам нужно найти путь к вашему ACPI объекту клавиатуры в диспетчере устройств:

```
Диспетчер устройств -> Клавиатуры -> Дважды щелкните по вашей клавиатуре -> Сведения -> Свойство > Имя устройства в BIOS
```

После этого, возьмите [SSDT-KEY-DELL-WN09.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-KEY-DELL-WN09.dsl) и при необходимости измените путь ACPI на тот, который найден выше:

```c
External (_SB_.PCI0.LPCB.PS2K, DeviceObj) <- Переименуйте это

    Method(_SB.PCI0.LPCB.PS2K._DSM, 4) <- Переименуйте это
```

## Ускорение графического процессора в macOS отсутствует на AMD X570

Проверьте следующее:

* GPU поддерживает UEFI(GTX 7XX/2013+)
* CSM выключен в BIOS
* Форсированная пропускная способность [на уровне] PCIe 3.0

## Сломан DRM

См. раздел [Исправление DRM](https://dortania.github.io/OpenCore-Post-Install/universal/drm.html)

## "Memory Modules Misconfigured" на MacPro7,1

Следуйте следующему руководству:

* [Исправления ошибок памяти на MacPro7,1](https://dortania.github.io/OpenCore-Post-Install/universal/memory.html)

Тем, кто просто хочет отключить уведомление (а не саму ошибку), мы рекомендуем установить [RestrictEvents](https://github.com/acidanthera/RestrictEvents/releases).

## Вылетают приложения на AMD

~~Решение простое, купить Intel~~

Итак, всякий раз, когда на AMD Apple вызывает специфичные функции процессора, приложение либо не работает, либо вылетает. Вот некоторые приложения и их "фиксы":

* Продукты Adobe не всегда работают
  * Некоторые «фиксы» можно найти здесь: [Adobe Fixes](https://adobe.amd-osx.com/)
  * Обратите внимание, что эти «фиксы» просто отключают [некоторую] функциональность, на самом деле это не «фиксы»
* Виртуальные машины на фреймворке AppleHV не будет работать(т.е. Parallels 15, VMware)
  * VirtualBox работает отлично, поскольку он не использует AppleHV
  * VMware 10 и старее тоже могут работать
  * Известно, что Parallels 13.1.0 и старее также работают
* Docker сломан
  * Docker toolbox - единственное решение, так как он основан на VirtualBox, многие функции недоступны в этой версии.
* IDA Pro не будет устанавливаться
  * В установщике есть специальная проверка Intel, само приложение, скорее всего, в порядке
* «Крашат» веб-страницы на процессорах 15/16h
  * Следуйте инструкциям здесь после UPDATE 5: [Fix web pages](https://www.insanelymac.com/forum/topic/335877-amd-mojave-kernel-development-and-testing/?do=findComment&comment=2661857)

## Сбой сна на AMD

Это обычно наблюдается на AMD, которые используют USB-контроллер чипсета, особенно для серии Ryzen и новее. Основной способ узнать, есть ли у вас проблемы с этим - проверить логи после сна или пробуждения:

* В терминале:
  * `log show --last 1d | grep -i "Wake reason"`

Должно выдать что-то вроде этого:

```
Sleep transition timed out after 180 seconds while calling power state change callbacks. Suspected bundle: com.apple.iokit.IOUSBHostFamily.
```

Вы можете дважды проверить, какой контроллер является XHC0, с помощью IOReg и проверить Vendor ID (1022 для AMD чипсета). Чтобы исправиль эту проблему со сном:

* Избегайте использования чипсета USB вместе(в идеале установите _STA = 0x0, чтобы полностью отключить контроллер с помощью SSDT)
* Скорректируйте параметры питания USBX в соответствии с тем, что ожидает контроллер.

## AssetCache Content Caching недоступен в виртуальной машине

Такие ошибки как:

```bash
$ sudo AssetCacheManagerUtil activate
AssetCacheManagerUtil[] Failed to activate content caching: Error Domain=ACSMErrorDomain Code=5 "virtual machine"...
```

возникают из-за того, что sysctl выставляет флаг `VMM`.

Примените патч ядра [VmAssetCacheEnable](https://github.com/ofawx/VmAssetCacheEnable) для маскировки флага и обеспечить нормальную работу.

## Системы на Coffee Lake не просыпаются

В macOS 10.15.4, произошли некоторые изменения в AGPM, которые могут вызвать проблемы с пробуждением Coffee Lake систем. В частности, дисплеи подключенные к iGPU, не смогут проснуться. Чтобы решить эту проблему:

* Добавьте `igfxonln=1` в boot-args
* Убедитесь, что вы используете [WhateverGreen v1.3.8](https://github.com/acidanthera/WhateverGreen/releases) или новее

## Нет показаний с датчиков температуры/кулера

Итак, пару вещей:

* iStat Menus пока что не поддерживает считывание данных MacPro7,1
* Датчики в комплекте с VirtualSMC не поддерживают AMD

Для iStat вам придется дождаться обновления. Для пользователей AMD вы можете использовать:

* [SMCAMDProcessor](https://github.com/trulyspinach/SMCAMDProcessor/releases)
  * Все еще находится в ранней бета-версии, но была проделана большая работа, обратите внимание, что он в основном тестировалась на Ryzen
* [FakeSMC3_with_plugins](https://github.com/CloverHackyColor/FakeSMC3_with_plugins/releases)

**Примечание для AMD с FakeSMC**:

* Поддержка FileVault требует больше работы с FakeSMC
* Убедитесь, что никаких других SMC кекстов не присутствуют, в частности, из [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)

## Ошибка "You can't change the startup disk to the selected disk"

* Примечание от переводчика: Эта ошибка не переведена в заголовке, потому что не удалось найти подлинный перевод этой ошибки в macOS. Но переводя с английского, она будет звучать как: Вы не можете изменить загрузочный диск на выбранный диск

Обычно это вызывается неправильной настройкой разделов диска Windows, в частности с тем, что EFI не является первым разделом. Чтобы исправить это, нам нужно включить этот квирк:

* `PlatformInfo -> Generic -> AdviseWindows -> True`

![](../../../img/troubleshooting/troubleshooting-md/error.png)

## Неправильно выбирается загрузочный диск

Если у вас возникают проблемы с загрузочным диском, правильно применяющим новую загрузочную запись, то, это скорее всего вызвано отсутствующим DevicePathsSupported в вашем I/O Registry. Чтобы решить эту проблему, убедитесь, что вы используете `PlatformInfo -> Automatic -> True`

Пример отсутствующего `DevicePathsSupported`:

* [Default DevicePath match failure due to different PciRoot #664](https://github.com/acidanthera/bugtracker/issues/664#issuecomment-663873846)

## macOS просыпается со сбитым временем

Странная причуда, которую некоторые люди могут заметить, заключается в том, что после пробуждения macOS будет иметь неправильное время на некоторое время, прежде чем оно самокорректируется с помощью проверки сетевого времени. Причиной этой проблемы, скорее всего, в том, что ваш RTC не тикает, и может быть решено новой CMOS батарейкой(обратите внимание, что Z270 и новее довольно придирчивы к напряжению, поэтому выбирайте внимательно).

Чтобы убедиться, правильно ли работает ваш RTC:

* Загрузите [VirtualSMC v1.1.5+](https://github.com/acidanthera/virtualsmc/releases) и запустите smcread:

```bash
/путь/до/smcread -s | grep CLKT
```

![](../../../img/extras/big-sur/readme/rtc-1.png)

Это должно дать вам HEX значение, которое после конвертации должно равняться времени, прошедшему с полуночи относительно Купертино.

Для этого примера, мы возьмём наше значение(`00010D13`), затем конвертируем в десятичное счисление, и поделим на 3600. Это должно привести к приблизительному прошедшему времени(в секундах) с полуночи относительно Купертино

* 00010D13 (Конвертируем в HEX)-> 68883 (Делим на 3600, и получаем часы)-> 19.13h(итак, 19:07:48)

Затем вы захотите немного усыпить ваш хак и разбудить его, а после ещё раз проверить значение CLKT, чтобы увидеть отклонилось ли оно больше или есть заданная разница. Если вы обнаружили, что он на самом деле вообще не отсчитывал время. вам нужно задуматься о покупке новой батарейки(с правильным напряжением)

## Нет регулировки громкостью/яркости на внешних мониторах

Как ни странно, macOS заблокировало управление цифровым звуком. Чтобы вернуть некоторую функциональность, приложение [MonitorControl](https://github.com/the0neyouseek/MonitorControl/releases) прекрасно справляется с улучшением поддержки в macOS

## Несоответствие времени между macOS и Windows

Это из-за того, что macOS использует UTC, а Windows полагается на GMT, поэтому вам необходимо заставить одну ОС использовать другой способ измерения времени. Мы настоятельно рекомендуем модифицировать Windows, поскольку это гораздо менее разрушительно и болезненно:

* [Установка утилит Bootcamp](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* [Модификация реестера Windows (на английском)](https://superuser.com/q/494432)

## Отключение SIP

SIP или более правильно System Intergity Protection - это технология безопасность, которая пытается предотвратить любое вредоносное ПО и повреждение ОС конечным пользователем. Впервые представлен в OS X El Capitan, SIP со временем улучшался, чтобы чтобы контролировать все больше и больше вещей в macOS, включая ограничение редактирования файлов с определенным местоположением и загрузку сторонних кекстов с помощью `kextload`(На OpenCore это не влияет, поскольку кексты инжектируются при загрузке). Чтобы разрешить это, Apple предоставила множество конфигурационных параметров в NVRAM перменной `csr-active-config`, которые могут установлены либо в среде восстановления macOS, либо в разделе NVRAM в OpenCore(последнее будет обсуждаться ниже).

* <span style="color:red">ПРЕДУПРЕЖДЕНИЕ:</span> Отключение SIP может нарушить фукциональность ОС, такую как обновление ПО в macOS 11 Big Sur и новее. Пожалуйста, будьте осторожны и отключайте только определенные значения SIP, а не его полностью, для избежания подобных проблем.
  * Обычно включение `CSR_ALLOW_UNAUTHENTICATED_ROOT` и `CSR_ALLOW_APPLE_INTERNAL` ломают обновления ОС для пользователей

Вы можете выбрать различные значения, чтобы включить или отключить определенные флаги SIP. Вот некоторые полезные инструменты, которые могут помочь вам с этим: [CsrDecode](https://github.com/corpnewt/CsrDecode) и [csrstat](https://github.com/JayBrown/csrstat-NG). Общие значения следующие (байты меняются местами в HEX, и обратите внимание, что это должно записываться в NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config):

* `00000000` - SIP полностью включен (0x0).
* `03000000` - Отключение подписывание кекстов (0x1) и защиты файловой системы (0x2).
* `FF030000` - Отключение всех [флагов в macOS High Sierra](https://opensource.apple.com/source/xnu/xnu-4570.71.2/bsd/sys/csr.h.auto.html) (0x3ff).
* `FF070000` - Отключение всех [флагов в macOS Mojave](https://opensource.apple.com/source/xnu/xnu-4903.270.47/bsd/sys/csr.h.auto.html) и в [macOS Catalina](https://opensource.apple.com/source/xnu/xnu-6153.81.5/bsd/sys/csr.h.auto.html) (0x7ff), поскольку Apple ввела значение для политики исполняемых файлов.
* `FF0F0000` - Отключение всех флагов в macOS Big Sur (0xfff), в которой есть еще один новый [флаг для аутентифицированного корня (authenticated root)](https://eclecticlight.co/2020/06/25/big-surs-signed-system-volume-added-security-protection/).

**Примечание**: Отключение SIP в OpenCore довольно сильно отличается от Clover, в особенности, NVRAM переменные не будут перезаписаны, даже если это явно указано в разделе `Delete`. Поэтому, если вы однажды устанавливали значение SIP через OpenCore или macOS, вы должны переопределить переменную:

* `NVRAM -> Delete -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`
  
![](../../../img/troubleshooting/troubleshooting-md/sip.png)

## Запись в системный раздел macOS

С macOS Catalina и новее, Apple разделила данные ОС и пользователя на 2 тома, где системный том read-only по умолчанию. Чтобы сделать эти диски доступными для записи, нам необходимо сделать несколько вещей:

* Примечание: Пользователи `SecureBootModel` могут попасть в бутлуп при загрузке RecoveryOS, если системный раздел был модифицирован. Чтобы решить эту проблему, сбростье NVRAM и установите для `SecureBootModel` значение `Disabled`

**macOS Catalina**

1. [Отключение SIP](#отключение-sip)
2. Смонтируйте диск как доступный для записи (запустите `sudo mount -uw /` в терминале)

**macOS Big Sur**

1. [Отключение SIP](#отключение-sip)
2. Смонтируйте диск как доступный для записи (см. команды ниже)

* Примечание: Из-за того, как обновления ОС работают в macOS Big Sur и новее, изменение системного тома может фактически сломать обновления ОС. Пожалуйста, редактируйте с осторожностью

Команды, основанные на документации Apple KDK:

```bash
# Сначала, создайте точку монтирования для вашего диска
mkdir ~/livemount

# Затем, найдите свой системный том
diskutil list

# Из нижеприведенного списка, мы можем видеть, что наш системный том это disk5s5
/dev/disk5 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +255.7 GB   disk5
                                 Physical Store disk4s2
   1:                APFS Volume ⁨Big Sur HD - Data⁩       122.5 GB   disk5s1
   2:                APFS Volume ⁨Preboot⁩                 309.4 MB   disk5s2
   3:                APFS Volume ⁨Recovery⁩                887.8 MB   disk5s3
   4:                APFS Volume ⁨VM⁩                      1.1 MB     disk5s4
   5:                APFS Volume ⁨Big Sur HD⁩              16.2 GB    disk5s5
   6:              APFS Snapshot ⁨com.apple.os.update-...⁩ 16.2 GB    disk5s5s

# Смонтируйте диск(т.е. disk5s5)
sudo mount -o nobrowse -t apfs  /dev/disk5s5 ~/livemount

# Теперь вы можете свободно вносить любые изменения в системный том

# Если вы редактировали S*/L*/Kernel, S*/L*/Extensions или L*/Extensions,
# вам нужно будет перестроить кэш ядра
sudo kmutil install --volume-root ~/livemount --update-all

# Наконец, после редактирования системного тома мы захотим создать новый снапшот
sudo bless --folder ~/livemount/System/Library/CoreServices --bootefi --create-snapshot
```

## Откат APFS снапшотов

В macOS Big Sur, системный том теперь снапшотится, что позволяет вам откатываться в случаях проблем с обновлением системы из-за сломанного seal (прим. переводчика - неизвестно что такое seal). Благодаря созданию снапшотов при каждом обновлении ОС, у нас есть что откатить.

Чтобы откатиться, вам сначала необходимо перезагрузиться в рекавери, и выбрать "Восстановление из резервной копии Time Machine":

![](./../../../img/troubleshooting/troubleshooting-md/snapshots.jpg)

* [Credit to Lifewire for image](https://www.lifewire.com/roll-back-apfs-snapshots-4154969)

## Проблемы с разблокировкой с помощью Apple Watch

Для тех, кто имеет проблемы с разблокировкой с помощью Apple Watch, проверьте следующее:

* У вас есть поддерживаемая беспроводная карта Apple с Bluetooth Low Energy(4.0+)
* Ваши часы и Mac вошли в одну и ту же учетную запись
* iServices работают правильно(т.е. iMessage)
* Есть возможность разблокировать с помощью Apple Watch в разделе «Защита и безопасность» в Системных настройках.

![](../../../img/troubleshooting/troubleshooting-md/watch-unlock.png)

Если вышеперечисленное выполнено, но у вас все еще есть проблемы с разблокировкой, мы рекомендуем следовать следующему руководству:

* [Исправление авторазблокировки (на английском)](https://forums.macrumors.com/threads/watchos-7-beta-5-unlock-mac-doesnt-work.2250819/page-2?post=28904426#post-28904426)

## Проблемы с выводом 4K через HDMI на iGPU

Для компьютеров с портами HDMI 2.0, у которых возникают проблемы с разрешением, проверьте следующее:

* Вывод 4k правильно работает в Windows
* Монитор настроен на использование HDMI 2.0
  * Если используете переходник с HDMI на DisplayPort, убедитесь, что монитор использует DisplayPort 1.2 или выше
* Убедитесь, что выделено достаточно iGPU памяти
  * Для Broadwell и новее ожидается, что будет выделено 64 МБ
  * Компьютеры, использующие свойство `framebuffer-stolenmem` у WhateverGreen, должны знать, что это может вызывать проблемы с выводом 4k. Убедитесь, что вы можете установить память iGPU на 64 МБ, чтобы удалить это свойство
* Пользователям ноутбуков и многих настольных ПК, может понадобиться этот boot-arg:
  * `-cdfon`

По всем остальным вопросам, связанным с устранением неполадок, обращайтесь к [документации WhateverGreen по Intel](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) ([на русском](https://www.applelife.ru/threads/intel-hd-graphics-3000-4000-4400-4600-5000-5500-5600-520-530-630.1289648/))
