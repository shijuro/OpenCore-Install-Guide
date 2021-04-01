# Проблемы с ядром

* Поддерживаемая версия: 0.6.7

Проблемы связанны от начала загрузки установщика macOS до появления графического интерфейса установщика.

* [Зависает на `[EB|#LOG:EXITBS:START]`](#зависает-на-eb-log-exitbs-start)
* [Зависает на EndRandomSeed](#зависает-на-endrandomseed)
* [Зависает после выбора раздела с macOS в OpenCore](#зависает-после-выбора-раздела-с-macos-в-opencore)
* [Паника ядра на `Invalid frame pointer`](#паника-ядра-на-invalid-frame-pointer)
* [Зависает на [EB|LD:OFS] Err(0xE) при загрузке preboot тома](#зависает-на-eb-ld-ofs-err-0xe-при-загрузке-preboot-тома)
* [Зависает на `OCB: LoadImage failed - Security Violation`](#зависает-на-ocb-loadimage-failed-security-violation)
* [Зависает на `OCABC: Memory pool allocation failure - Not Found`](#зависает-на-ocabc-memory-pool-allocation-failure-not-found)
* [Зависает на `Buffer Too Small`](#зависает-на-buffer-too-small)
* [Зависает на `Plist only kext has CFBundleExecutable key`](#зависает-на-plist-only-kext-has-cfbundleexecutable-key)
* [Зависает на `This version of Mac OS X is not supported: Reason Mac...`](#зависает-на-this-version-of-mac-os-x-is-not-supported-reason-mac)
* [Ошибки `Couldn't allocate runtime area`](#ошибки-couldn-t-allocate-runtime-area)
* [Зависает на `RTC...`, `PCI ConfigurationBegins`, `Previous Shutdown...`, `HPET`, `HID: Legacy...`](#зависает-на-rtc-pci-configuration-begins-previous-shutdown-hpet-hid-legacy)
* [Зависает при загрузки ACPI таблицы на B550](#зависает-при-загрузки-acpi-таблицы-на-b550)
* ["Waiting for Root Device" или ошибка запрещающего знака](#waiting-for-root-device-или-ошибка-запрещающего-знака)
* [Паника ядра на IOPCIFamily на X99](#паника-ядра-на-iopcifamily-на-x99)
* [Зависает на или рядом с `IOConsoleUsers: gIOScreenLock...`](#зависает-на-или-рядом-с-ioconsoleusers-gioscreenlock-giolockstate-3)
* [Скремблированный экран на ноутбуках](#скремблированныи-экран-на-ноутбуках)
* [Черный экран после `IOConsoleUsers: gIOScreenLock...` на Navi](#черныи-экран-после-ioconsoleusers-gioscreenlock-на-navi)
* [Паника ядра на `Cannot perform kext summary`](#паника-ядра-на-cannot-perform-kext-summary)
* [Паника ядра на `AppleIntelMCEReporter`](#паника-ядра-на-appleintelmcereporter)
* [Паника ядра на `AppleIntelCPUPowerManagement`](#паника-ядра-на-appleintelcpupowermanagement)
* [Kernel Panic `AppleACPIPlatform` in 10.13](#паника-ядра-на-appleacpiplatform-в-10-13)
* [Клавиатура работает, а трекпад - нет](#клавиатура-работает-а-трекпад-нет)
* [`kextd stall[0]: AppleACPICPU`](#kextd-stall-0-appleacpicpu)
* [Паника ядра на AppleIntelI210Ethernet](#паника-ядра-на-appleinteli210ethernet)
* [Паника ядра из-за "Wrong CD Clock Frequency" на Icelake ноутбуке](#паника-ядра-из-за-wrong-cd-clock-frequency-на-icelake-ноутбуке)
* [Зависает на `Forcing CS_RUNTIME for entitlement` в Big Sur](#зависает-на-forcing-cs-runtime-for-entitlement-в-big-sur)
* [Зависает на `ramrod`(^^^^^^^^^^^^^)](#зависает-на-ramrod)

## Зависает на `[EB|#LOG:EXITBS:START]`

Этот раздел разделен на 4 части, поэтому обратите особое внимание:

* [Проблемы с Booter](#booter-issues)
* [Проблемы с патчами ядра](#kernel-patch-issues)
* [Проблемы с UEFI](#uefi-issues)
* [Проблемы на виртуальный машинах](#virtual-machine-issues)

### Проблемы с Booter

Основными виновниками в разделе Booter являются:

* **DevirtualiseMmio**
  * Некоторые MMIO области по-прежнему требуются для правильного функционирования, поэтому вам нужно либо исключить эти регионы в Booter -> MmioWhitelist, либо отключить этот квирк. Подробнее здесь: [Использование DevirtualiseMmio](../../extras/kaslr-fix.md#using-devirtualisemmio)
  * Для пользователей TRx40, включите этот квирк
  * Для пользователей X99, отключите этот квирк, поскольку он ломается с некоторыми прошивками

* **SetupVirtualMap**
  * Этот квирк требуется для большинства прошивок, и без него, ядро обычно паникует здесь, поэтому включите его, если он не включен
    * В основном, Z390 и старее требуют включения этого квирка
    * Однако, определенные прошивки(в основном, 2020+) не работают с этим квирком, и могут вызывать панику ядра:
      * Intel серии Ice Lake
      * Intel серии Comet Lake (B460, H470, Z490, т.д.)
      * AMD B550 и A520(Последние версии BIOS на X570 также входят сюда)
        * Также сюда входят многие B450 и X470 платы с обновлением BIOS датированным концом 2020 г.
      * AMD TRx40
      * Виртуальные машины, такие как QEMU
      * Обновления BIOS на X299 старше 2020 г. (Это относится к другим X299 платам с последним BIOS, которые вышли в конце 2019 или 2020+)

* **EnableWriteUnprotector**

  * Другая проблема может быть в том, что macOS конфликтует с защитой от записи CR0 регистра, для решения этой проблемы, у нас есть 2 варианта:
    * Если ваша прошивка поддерживает MAT(прошивки старше 2018 г.):
      * EnableWriteUnprotector -> False
      * RebuildAppleMemoryMap -> True
      * SyncRuntimePermissions -> True
    * Для старых прошивок:
      * EnableWriteUnprotector -> True
      * RebuildAppleMemoryMap -> False
      * SyncRuntimePermissions -> False
    * Примечание: Некоторые ноутбуки (к примеру, Dell Inspiron 5370) даже с поддержкой MAT не будут загружаться, в таких случаях, вам нужно будет загружаться с комбинацией для старых прошивок(т.е. с EnableWriteUnprotector)
      * Загрузитесь с комбинацией квирков для старых прошивок(т.е. с EnableWriteUnprotector и выключенными `RebuildAppleMemoryMap` + `SyncRuntimePermissions`)
      * Включите `DevirtualiseMmio` и следуйте [руководству по MmioWhitelist](https://dortania.github.io/OpenCore-Install-Guide/extras/kaslr-fix.html)

Касательно поддержки MAT, прошивки собранные в EDK 2018 будут поддерживать MAT, и многие OEM-производители даже добавили поддержку вплоть до ноутбуков на Skylake. Проблема в том, что не всегда очевидно, когда производитель обновил прошивку, вы можете проверить логи OpenCore, чтобы узнать, поддерживает ли ваша прошивка MAT([См. здесь, как получить лог](../debug.html)):

```
OCABC: MAT support is 1
```

* Примечание: `1` означает, что есть поддержка MAT, в то время как `0` означает что поддержки нет.

### Проблемы с патчами ядра

Этот раздел разделен между пользователями Intel и AMD:

#### Пользователи AMD

* Отсутствуют [патчи ядра](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore) (применимо только для процессоров AMD, убедитесь, что это патчи для OpenCore, а не для Clover. Clover использует `MatchOS`, когда как OpenCore имеет `MinKernel` и `Maxkernel`)
  * Обратите внимание, что устаревшие патчи ядра также будут иметь такой же эффект, поэтому убедитесь что вы используете последние патчи AMD OS X

#### Пользователи Intel

* **AppleXcpmCfgLock** and **AppleCpuPmCfgLock**
  * Отсутствуют CFG или XCPM патчи, включите `AppleXcpmCfgLock` и `AppleCpuPmCfgLock`
    * Haswell и новее нуждаются только в AppleXcpmCfgLock
    * Ivy Bridge и старее нуждаются только в AppleCpuPmCfgLock
      * Broadwell и старее, нуждаются в AppleCpuPmCfgLock, если используется 10.10 и старее
  * Альтернативой может стать отключение CFG-Lock: [Исправление CFG Lock](https://dortania.github.io/OpenCore-Post-Install/misc/msr-lock.html)
* **AppleXcpmExtraMsrs**
  * Может также требоваться, обычно для Pentium, HEDT и других странных систем, не поддерживаемых нативно в macOS

#### Пользователи Legacy Intel

Для macOS Big Sur у многих прошивок есть проблемы с определением количества ядер ЦП, и поэтому ядро паникает слишком рано для трафаретной печати. По серийнику вы можете увидеть следующую панику: Для macOS Big Sur, многие прошивки имеют проблемы с определением количества ядер процессора, и поэтому ядро паникует слишком рано. Через serial, вы можете увидеть следующую панику:

```
max_cpus_from_firmware not yet initialized
```

Чтобы решить:

* Включите `AvoidRuntimeDefrag` в разделе Booter -> Quirks
  * Это должно работать для большинства прошивок

Однако, на определенных компьютерах, таких как HP Compaq DC 7900, прошивка по-прежнему будет приводить к панике, поэтому нам нужно принудительно выставить значение количества ядер процессора. Используйте патч ниже только когда AvoidRuntimeDefrag не работает:

::: details Патч на кол-во ядер для Legacy процессоров

Добавьте следующий патч(заменив 04 из B8 **04** 00 00 00 C3 на количество потоков вашего процессора):

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

### Проблемы с UEFI

* **ProvideConsoleGop**
  * Необходимо для перехода на следующий экран, изначально был частью AptioMemoryFix, но теперь находится в OpenCore как квирк. Можно найти в разделе UEFI -> Output
  * Обратите внимание, что с версии 0.5.6, этот квирк включен по умолчанию в sample.plist
* **IgnoreInvalidFlexRatio**
  * Необходим для Broadwell и старее. **Не для AMD и Skylake или новее**

## Зависает на EndRandomSeed

Такие же проблемы, что и выше, см. подробнее здесь: [Зависает на `[EB|#LOG:EXITBS:START]`](#stuck-on-eb-log-exitbs-start)

## Зависает после выбора раздела с macOS в OpenCore

Такие же проблемы, что и выше, см. подробнее здесь: [Зависает на `[EB|#LOG:EXITBS:START]`](#stuck-on-eb-log-exitbs-start)

* Примечание: Включение [отладки Opencore](../debug.html) может помочь пролить некоторый свет

## Паника ядра на `Invalid frame pointer`

Это связано с какой-то проблемой в разделе `Booter -> Quirks`, в котором вы что-то установили, основные вещи, которые нужно проверить:

* `DevirtualiseMmio`
  * Некоторые MMIO области по-прежнему требуются для правильного функционирования, поэтому вам нужно либо исключить эти регионы в Booter -> MmioWhitelist, либо отключить этот квирк
  * Более подробно здесь: [Использование DevirtualiseMmio](../../extras/kaslr-fix.md#using-devirtualisemmio)

* `SetupVirtualMap`
  * Этот квирк требуется для большинства прошивок, и без него, ядро обычно паникует здесь, поэтому включите его, если он не включен
    * Однако, определенные прошивки не работают с этим квирком, и могут вызывать панику ядра:
      * Intel серии Ice Lake
      * Intel серии Comet Lake
      * AMD B550
      * AMD A520
      * AMD TRx40
      * Виртуальные машины, такие как QEMU
  
Другая проблема может быть в том, что macOS конфликтует с защитой от записи CR0 регистра, для решения этой проблемы, у нас есть 2 варианта:

* Если ваша прошивка поддерживает MAT(прошивки старше 2018 г.):
  * EnableWriteUnprotector -> False
  * RebuildAppleMemoryMap -> True
  * SyncRuntimePermissions -> True
* Для старых прошивок:
  * EnableWriteUnprotector -> True
  * RebuildAppleMemoryMap -> False
  * SyncRuntimePermissions -> False

Касательно поддержки MAT, прошивки собранные в EDK 2018 будут поддерживать MAT, и многие OEM-производители даже добавили поддержку вплоть до ноутбуков на Skylake. Проблема в том, что не всегда очевидно, когда производитель обновил прошивку, вы можете проверить логи OpenCore, чтобы узнать, поддерживает ли ваша прошивка MAT:

```
OCABC: MAT support is 1
```

Примечание: `1` означает, что есть поддержка MAT, в то время как `0` означает что поддержки нет.

## Зависает на `[EB|LD:OFS] Err(0xE)` при загрузке preboot тома

Полная ошибка:

```
[EB|`LD:OFS] Err(0xE) @ OPEN (System\\Library\\PrelinkedKernels\\prelinkedkernel)
```

Это может произойти, когда preboot том не был обновлен должным образом, чтобы исправить это, вам нужно загрузиться в рекавери и восстановить его:

1. Включите JumpstartHotplug в разделе UEFI -> APFS(Рекавери macOS Big Sur может не загрузиться без этой опции)
2. Загрузитесь в рекавери
3. Откройте терминал и выполните следующее:

```bash
# Сначала найдите свой Preboot том
diskutil list

# Из списка ниже, мы можем видеть наш Preboot том как disk5s2
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

# Теперь смонтируйте Preboot том
diskutil mount disk5s2

# Затем запустите updatePreboot на Preboot томе
diskutil apfs updatePreboot /volume/disk5s2
```

Затем, наконец-то, перезагрузитесь

## Зависает на `OCB: LoadImage failed - Security Violation`

```
OCSB: No suitable signature - Security Violation
OCB: Apple Secure Boot prohibits this boot entry, enforcing!
OCB: LoadImage failed - Security Violation
```

Это происходит из-за отсутствия устаревших манифестов Apple Secure Boot на вашем preboot томе, что приводит к невозможности загрузки, если у вас установлен SecureBootModel, на самом деле причиной отсутствия этих файлов является баг в macOS.

Чтобы решить эту проблему, вы можете сделать одно из следующих действий:

* Отключить SecureBootModel
  * т.е. установить `Misc -> Secuirty -> SecureBootModel -> Disabled`
* Переустановите macOS на последнюю версию
* Или скопируйте манифесты Secure Boot из `/usr/standalone/i386` в `/Volumes/Preboot/<UUID>/System/Library/CoreServices`
  * Обратите внимание, что скорее всего вам потребуется это делать через терминал, поскольку Preboot том непросто редактировать через Finder
  
Чтобы сделать это через терминал:

```bash
# Сначала найдите свой Preboot том
diskutil list

# Из списка ниже, мы можем видеть наш Preboot том как disk5s2
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

# Теперь смонтируйте Preboot том
diskutil mount disk5s2

# CD в свой Preboot том
# Обратите внимание, что фактический том находится в /System/Volumes/Preboot
cd /System/Volumes/Preboot

# Получите свой UUID
ls
 46923F6E-968E-46E9-AC6D-9E6141DF52FD
 CD844C38-1A25-48D5-9388-5D62AA46CFB8

# Если отображается несколько(т.е. у вас дуалбут нескольких версий macOS), вам
# нужно определить, какой UUID правильный.
# Самый простой способ определить это - вывести значение .disk_label.contentDetails
# каждого тома.
cat ./46923F6E-968E-46E9-AC6D-9E6141DF52FD/System/Library/CoreServices/.disk_label.contentDetails
 Big Sur HD%

cat ./CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices/.disk_label.contentDetails
 Catalina HD%

# Далее, давайте скопируем Secure Boot файлы
# Замените CD844C38-1A25-48D5-9388-5D62AA46CFB8 на своё значение UUID
cd ~
sudo cp -a /usr/standalone/i386/. /System/Volumes/Preboot/CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices
```

## Зависает на `OCABC: Memory pool allocation failure - Not Found`

Это связано с неправильными настройками BIOS:

* Above4GDecoding должен быть включен
* CSM должен быть отключен(Включение Windows8.1/10 WHQL Mode на некоторых платах делает тоже самое)
  * Обратите внимание, что на некоторых ноутбуках, CSM должен быть включен
* BIOS должен быть обновленным(Z390 и HEDT известны за плохо написанные прошивки)

## Зависает на `Buffer Too Small`

* Включите Above4GDecoding в BIOS

## Зависает на `Plist only kext has CFBundleExecutable key`

Отсутствует или неправильный `Executable path` в вашем config.plist, это должно быть решено повторным запуском снапшота в ProperTree(Cmd/Ctrl+R).

## Зависает на `This version of Mac OS X is not supported: Reason Mac...`

Эта ошибка происходит когда SMBIOS больше не поддерживается этой версией macOS, убедитесь, что значения установленые в `PlatformInfo->Generic` со включеным `Automatic`. Полный список поддерживаемых SMBIOS и ОС к ним, см. здесь: [Выбор правильного SMBIOS](../../extras/smbios-support.md)

::: details Поддерживаемые SMBIOS в macOS 10.15, Catalina

* iMac13,x+
* iMacPro1,1
* MacPro6,1+
* Macmini6,x+
* MacBook8,1+
* MacBookAir5,x+
* MacBookPro9,x+

:::

::: details Поддерживаемые SMBIOS в macOS 11, Big Sur

* iMac14,4+
* iMacPro1,1
* MacPro6,1+
* Macmini7,1+
* MacBook8,1+
* MacBookAir6,x+
* MacBookPro11,x+

:::

## Ошибки `Couldn't allocate runtime area`

См. [Исправление KASLR slide значений](../../extras/kaslr-fix.md)

## Зависает на `RTC...`, `PCI Configuration Begins`, `Previous Shutdown...`, `HPET`, `HID: Legacy...`

Что ж, эта область, где PCI устройства устанавливаются и конфигурируются, и где случаются большинство проблем с загрузкой. Другие названия:

* `apfs_module_start...`,
* `Waiting for Root device`,
* `Waiting on...IOResources...`,
* `previous shutdown cause...`

Основные места для проверки:

* **Отсутствующий патч EC**:
  * Убедитесь, что ваш EC SSDT есть как в EFI/OC/ACPI, так и в ACPI -> Add, **дважды проверьте, что он включен.**
  * Если у вас его нет, получите его здесь: [Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/)
* **Конфликты IRQ**:
  * Наиболее распространены на старых ноутбуках и готовых сборках, запустите в SSDTTime опцию FixHPET и добавьте полученный SSDT-HPET.aml и ACPI патчи в свою конфигурацию(SSDT не будет работать без ACPI патчей)
* **Проблема PCI allocation**:
  * **ОБНОВИТЕ СВОЙ BIOS**, убедитесь что он последней версии. Большинство OEM-производителей сильно нарушили PCI allocation (распределение) на старых прошивках, особенно у AMD
  * Убедитесь что Above4G включен в BIOS, если эта опция недоступна, то добавьте `npci=0x2000` в аргументы загрузки.
    * Некоторые X99 и X299 платы(такие как, GA-X299-UD4) могут требовать как npci в boot-args, так и включеного Above4G
    * Примечание для процессоров AMD: **Не включайте одновременно Above4G с npci в аргументах загрузки, они будут конфликтовать**
    * Примечание для BIOS новее 2020 г.: При включение Above4G - может стать доступной опция Resizable BAR Support. Убедитесь, что эта опция установлена в **Disabled** вместо Auto.
  * Другие важные настройки BIOS: CSM отключен, Windows 8.1/10 UEFI Mode включен.
* **Проблемы с NVMe или SATA**:
  * Иногда, если используется плохой SATA-контроллер или неподдерживаемый NVMe накопитель, вы обычно можете застрять здесь. Что вы можете проверить:
    * Не используется ли NVMe SSD-накопитель Samsung PM981 или Micron 2200S
    * Samsung 970EvoPlus имеет последнюю прошивку(старые прошивки были известны нестабильностью и зависаниями, [см. здесь для получения дополнительной информации](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/))
    * SATA Hot-Plug отключен в BIOS(чаще всего вызывает проблемы на системах с процессорами AMD)
    * Убедиться, что NVMe-накопитель используется в режиме NVMe в BIOS(некоторые BIOS имеют баг, когда вы можете установить NVMe-накопитель как SATA)
* **Ошибки NVRAM**:
  * Распространенная проблема материнских плат HEDT и 300-й серии, у вас есть пару путей, по которым можно пойти:
    * Потребительская 300-ая серия Intel: См. [Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) о создании SSDT-PMC.aml
    * HEDT(т.е. X99): См. [Эмуляция NVRAM](https://dortania.github.io/OpenCore-Post-Install/misc/nvram.html) о том, как остановить запись в NVRAM, обратите внимание, что для установки вам не нужно запускать скрипт. Просто настройте config.plist

* **Отсутствует RTC**:
  * Обычно встречается на чипсетах Intel 300+ серии, вызванная отключением RTC часов по умолчанию. См. [Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) о создании SSDT-AWAC.aml
  * X99 и X299 имеют сломанные RTC устройства, так что их надо исправить с помощью SSDT-RTC0-RANGE. См. [Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) о создании указанного файла
  * Какой-то пьяный программист прошивки в HP также отключил RTC на HP 250 G6 без возможности включить его заново. Для пользователей, проклятых таким «железом», вам нужно будет создать поддельные RTC часы для macOS:
    * Известные затронутые модели: `HP 15-DA0014dx`, `HP 250 G6`
    * Для пользователей, проклятых таким оборудованием, вам нужно будет создать поддельные часы RTC для macOS, чтобы с ними можно было играть. Чтобы получить более подробной информацию см. Начало работы с ACPI, а также пример изображения ниже:

Пример того, как выглядит отключенный RTC без возможности включения заново(обратите внимание, что нет значения для повторного включения, такого как `STAS`):

![](../../../img/troubleshooting/troubleshooting-md/rtc.png)

## Зависает при загрузки ACPI таблицы на B550

![](../../../img/troubleshooting/troubleshooting-md/OC_catalina.jpg)

Если вы застряли при загрузке ACPI таблицы или рядом с ней на материнской плате AMD B550 или A520, добавьте следующий SSDT:

* [SSDT-CPUR.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml)

И, пожалуйста, не забудьте добавить в EFI/OC/ACPI **и** в свой config.plist в раздел ACPI -> Add(Функция снапшота в ProperTree может это сделать за вас)

## "Waiting for Root Device" или ошибка запрещающего знака

* Другие названия: Знак остановки

Обычно это рассматривается как ошибка USB или SATA, исправить которую можно несколькими способами:

### Проблемы с USB

Это предполагает, что вы загружаете только установщик на USB-накопителе, а не саму macOS.

* Если вы достигли лимита в 15 портов, вы можете временно обойти это с помощью `XhciPortLimit`, но для долгосрочного использования мы рекомендуем создать [USBmap](https://dortania.github.io/OpenCore-Post-Install/usb/)
  * `Kernel -> Quirks -> XhciPortLimit -> True`

* Другая проблема может заключаться в том, что некоторые прошивки не передают USB ownership в macOS
  * `UEFI -> Quirks -> ReleaseUsbOwnership -> True`
  * Включение XHCI Handoff в BIOS также может исправить это

* Иногда, если USB-накопитель подключен к 3.x порту, подключение его к 2.0 порту может исправить эту ошибку.

* Для процессоров AMD 15h и 16h, может понадобиться добавить следующее:
  * [XLNCUSBFix.kext](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)

* Если XLNCUSBFix не работает, попробуйте следующее:
  * [AMD StopSign-fixv5](https://cdn.discordapp.com/attachments/249992304503291905/355235241645965312/StopSign-fixv5.zip)

* Пользователям X299: Включите Above4G Decoding
  * Странный баг прошивки на X299, когда в противном случае, ломаются USB

* Отсутствующие USB порты в ACPI:
  * Для Intel Coffee Lake и старее, мы рекомендуем использовать [USBInjectAll](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/)
  * Для Intel Ice Lake и Comet Lake, мы рекомендуем [SSDT-RHUB](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-RHUB.aml)
    * `7. USB Reset` в SSDTTime может сделать то же самое
  * Для AMD, запустите в SSDTTime `7. USB Reset` и добавьте предоставленный SSDT-RHUB в ваш EFI и config.plist
  
### Проблемы с SATA

В редких случаях(в основном на ноутбуках), SATA-контроллер не поддерживается официально в macOS. Чтобы решить эту проблему, мы хотим сделать несколько вещей:

* Установить SATA в режим AHCI в BIOS
  * macOS не поддерживает аппаратный RAID или режим IDE должным образом.
  * Обратите внимание, что диски, использующие технологию Intel Rapid Storage(RST, программный RAID для Windows и Linux) не будут доступны в macOS.
* [SATA-unsupported.kext](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * Добавляет поддержку малоизвестных SATA-контроллеров, обычно ноутбуков.
  * Для очень устаревших SATA-контроллеров, [AHCIPortInjector.kext](https://www.insanelymac.com/forum/files/file/436-ahciportinjectorkext/) может быть более подходящим.
* [Патченный AppleAHCIPort.kext для Catalina](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  * Для пользователей, использующих macOS 11 Big Sur и имеющих проблемы. Этот бэкпорт известен работоспособностью с Catalina, SATA-unsupported не требуется с этим кекстом

Обратите внимание, что эта проблема возникнет только после установки macOS на диск, загрузка установщика macOS не приведет к ошибке из-за проблем с SATA.

## Паника ядра на IOPCIFamily на X99

Для тех, кто использует X99 платформу от Intel, пожалуйста, выполните следующие действия:

* Следующие патчи ядра должны быть включены:
  * AppleCpuPmCfgLock
  * AppleXcpmCfgLock
  * AppleXcpmExtraMsrs
* Вы должны иметь следующий SSDT:
  * SSDT-UNC(если нет, см. [Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) о создании указанного файла)

## Зависает на или рядом с `IOConsoleUsers: gIOScreenLock...`/`gIOLockState (3...`

Это происходит прямо перед правильной инциализацией графического процессора, проверьте следующее:

* GPU поддерживает UEFI(GTX 7XX/2013+)
* CSM выключен в BIOS
  * Возможно потребуется включить его на ноутбуках
* Форсированная пропускная способность [на уровне] PCIe 3.0
* Дважды проверьте, что значения ig-platform-id и device-id правильные, если запускается на iGPU.
  * Настольные UHD 630 могут нуждаться в использовании `00009B3E`
* Попробуйте различные [«фиксы» WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) ([на русском](https://www.applelife.ru/threads/intel-hd-graphics-3000-4000-4400-4600-5000-5500-5600-520-530-630.1289648/))
  * Загрузочный аргумент `-igfxmlr`. Это также может проявляться как ошибка «Деления на ноль» (Divide by Zero).
* Пользователям Coffee Lake iGPU также может потребоваться `igfxonln=1` в 10.15.4 и новее

## Скремблированный экран на ноутбуках

* Примечание от переводчика: Скремблированный экран (англ. - Scrambled Screen) - экран, у которого вместо изображения помехи.

Включите CSM в настройках UEFI. Это может выглядить как "Boot legacy ROMs" или другие legacy настройки.

## Черный экран после `IOConsoleUsers: gIOScreenLock...` на Navi

* Добавьте `agdpmod=pikera` в аргументы загрузки
* Переключитесь между различными выходами дисплея
* Попробуйте запустить SMBIOS MacPro7,1 с boot-arg `agdpmod=ignore`

Для пользователей MSI Navi, вам необходимо применить патч упомянутый здесь: [Installer not working with 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901)

В частности, добавьте следующую запись в `Kernel -> Patch`:

::: details Патч для MSI Navi

```
Base:
Comment: Navi VBIOS Bug Patch
Count: 1
Enabled: YES
Find: 4154592C526F6D2300
Identifier: com.apple.kext.AMDRadeonX6000Framebuffer
Limit: 0
Mask:
MinKernel: 19.00.00
MaxKernel: 19.99.99
Replace: 414D442C526F6D2300
ReplaceMask:
Skip: 0
```

:::

Примечание: macOS 11 Big Sur больше не требует этот патч для MSI Navi.

## Паника ядра на `Cannot perform kext summary`

Обычно рассматривается как проблема, связанная с prelinked ядром, в частности, macOS с трудом интерпретирует то, что мы инжектируем. Убедитесь в этом:

* Ваши кексты находятся в правильном порядке(сначала главный - потом плагины к нему, Lilu всегда перед плагинами)
* Кексты с исполняемыми файлами имеют их, а только plist кексты не имеют(т.е. USBmap.kext, XHCI-unspported.kext, т.д. не содержит исполняемого файла)
* Не включайте несколько одинаковых кекстов в свой config.plist (например, включая несколько копий VoodooInput из нескольких кекстов, мы рекомендуем выбрать первый кекст в массиве конфигурации и отключить остальные)

Примечание: эта ошибка также может выглядеть очень похожей на [Панику ядра на `Invalid frame pointer`](#kernel-panic-on-invalid-frame-pointer)

## Паника ядра на `AppleIntelMCEReporter`

В macOS Catalina поддержка двух сокетов нарушена, и забавный факт о прошивке AMD заключается в том, что некоторые платы фактически сообщают о нескольких процессорах. Чтобы исправить это, добавьте [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip) в EFI/OC/Kexts и в config.plist -> Kernel -> Add

## Паника ядра на `AppleIntelCPUPowerManagement`

Это, вероятно, связано с ошибкой или полным отсутствием NullCPUPowerManagement. Чтобы решить эту проблему, удалите NullCPUPowerManagement из `Kernel -> Add` и `EFI/OC/Kexts`, затем включите `DummyPowerManagement` в разделе `Kernel -> Emulate`

* **Примечание**: На старых процессорах Intel(т.е. Penryn и старее), это может возникать из-за IRQ конфликтов или отключением HPET устройства. Чтобы решить эту проблему, у вас есть 2 варианта:
  * [FixHPET в SSDTTime](https://dortania.github.io/Getting-Started-With-ACPI/ssdt-methods/ssdt-easy.html)
  * Принудительное включение HPET устройства
  
::: details Принудительное включение HPET устройства

В раздел ACPI -> Patch:

| Comment | String | Force HPET Online |
| :--- | :--- | :--- |
| Enabled | Boolean | YES |
| Count | Number | 0 |
| Limit | Number | 0 |
| Find | Data | A010934F53464C00 |
| Replace | Data | A40A0FA3A3A3A3A3 |

:::

## Паника ядра на `AppleACPIPlatform` в 10.13

![](../../../img/troubleshooting/troubleshooting-md/KA5UOGV.png)

macOS 10.13 (High Sierra) более строгая с ACPI таблицами. [В частности, ошибка с обработкой заголовков](https://alextjam.es/debugging-appleacpiplatform/). Чтобы решить эту проблему, включите `NormalizeHeaders` в ACPI -> Quirks вашего config.plist

## macOS зависает перед входом в систему

Это типичный пример «пьяного» TSC, для большинства систем добавляется [CpuTscSync](https://github.com/lvs1974/CpuTscSync)

Самый распространенный способ увидеть проблему с TSC:

Случай 1    |  Случай 2
:-------------------------:|:-------------------------:
![](../../../img/troubleshooting/troubleshooting-md/asus-tsc.png)  |  ![](../../../img/troubleshooting/troubleshooting-md/asus-tsc-2.png)

## Клавиатура работает, а трекпад - нет

Убедитесь, что VoodooInput стоит *перед* VoodooPS2 и VoodooI2C кекстами в вашем config.plist.

::: details Устранение неполадок с VoodooI2C

Проверьте порядок загрузки ваших кекстов - убедитесь, что они соответствуют тому, что показано в разделе [Сбор файлов](../../ktext.md):

1. VoodooGPIO, VoodooInput, и VoodooI2CServices в любом порядке (Найдено в VoodooI2C.kext/Contents/PlugIns)
2. VoodooI2C
3. Satellite/Plugin

Убедитесь, что у вас SSDT-GPIO в EFI/OC/ACPI и в вашем config.plist в ACPI -> Add. Если у вас по-прежнему возникают проблемы, обратитесь к [странице Начала работы с ACPI GPIO](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/trackpad.html).

:::

## `kextd stall[0]: AppleACPICPU`

Это либо из-за отсутствия SMC эмулятора, либо из-за неисправности его, убедитесь в следующем:

* Lilu и VirtualSMC находятся в EFI/OC/kexts и в вашем config.plist
* Lilu стоит перед VirtualSMC в списке кекстов
* В крайнем случае, попробуйте FakeSMC, **не включайте VirtualSMC и FakeSMC одновременно**

## Паника ядра на AppleIntelI210Ethernet

Те, кто использует материнские платы Comet lake с сетевой картой I225-V, вы можете испытывать панику ядра при загрузке с кекстом для I210. Чтобы решить эту проблему, убедитесь, что у вас правильный PciRoot для вашего Ethernet. Обычно это:

* PciRoot(0x0)/Pci(0x1C,0x1)/Pci(0x0, 0x0)
  * По умолчанию это то, что используют материнские платы Asus и Gigabyte
* PciRoot(0x0)/Pci(0x1C,0x4)/Pci(0x0,0x0)
  * Некоторые OEM-производители могут это использовать вместо вышеуказанного
  
Для тех, кто может использовать PciRoot вручную, вы захотите полностью установить macOS и выполнить следующее с помощью [gfxutil](https://github.com/acidanthera/gfxutil/releases):

```
/путь/до/gfxutil | grep -i "8086:15f3"
```

Должно выдать что-то вроде этого:

```
00:1f.6 8086:15f3 /PC00@0/GBE1@1F,6 = PciRoot(0x0)/Pci(0x1F,0x6)
```

`PciRoot(0x0)/Pci(0x1F,0x6)` - это то, что вы захотите добавить в свой config.plist с device-id `F2150000`.

## Паника ядра из-за "Wrong CD Clock Frequency" на Icelake ноутбуке

![](../../../img/troubleshooting/troubleshooting-md/cd-clock.jpg)

Чтобы устранить эту панику ядра, убедитесь, что у вас есть `-igfxcdc` в ваших аргументах загрузки.

## Паника ядра на "cckprng_int_gen"

Полная паника:

```
"cckprng_int_gen: generator has already been sealed"
```

Скорее всего, будет одна из этих двух вещей:

* Отсутствует SMC эмулятор(т.е. нет VirtualSMC в вашем config.plist или EFI)
  * Добавьте [VirtualSMC.kext](https://github.com/acidanthera/VirtualSMC/releases) в свой config.plist и EFI
* Неправильное использование SSDT-CPUR

В последнем случае, убедитесь что вы используете SSDT-CPUR только с **B550 и A520**. Не используйте на X570 или более старом оборудовании (например, B450 или A320)

## Зависает на `Forcing CS_RUNTIME for entitlement` в Big Sur

![Credit to Stompy for image](../../../img/extras/big-sur/readme/cs-stuck.jpg)

На самом деле это та часть, где macOS запечатывает (seal) системный том и где может показаться, что macOS зависла. **НЕ ПЕРЕЗАГРУЖАЙТЕСЬ**, думая что всё зависло, это займет некоторое время.

## Зависает на `ramrod`(^^^^^^^^^^^^^)

![Credit to Notiflux for image](../../../img/extras/big-sur/readme/ramrod.jpg)

Если вы застряли на разделе `ramrod` (в частности, загружаясь, выдаёт эту ошибку, и перезагружается снова в неё [ошибку], вызывая цикл), это намекает на то, что ваш SMC эмулятор сломан. Чтобы исправить это, у вас есть 2 варианта:

* Убедитесь, что вы используете последние сборки VirtualSMC и Lilu, с помощью аргумента загрузки `vsmcgen=1`
* Переключитесь на [FakeSMC от Rehabman](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/) (вы можете использовать трюк с `MinKernel`/`MaxKernel` чтобы ограничить FakeSMC в Big Sur и выше)

И при переключении кекстов. убедитесь, что в вашем config.plist не включены одновременно FakeSMC с VirtualSMC, поскольку это вызывает конфликт.

### Проблемы на виртуальный машинах

* Известно, что VMWare 15 застревает на `[EB|#LOG:EXITBS:START]`. VMWare 16 решает эту проблему.
