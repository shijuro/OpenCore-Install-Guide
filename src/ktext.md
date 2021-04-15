# Сбор файлов

* Поддерживаемая версия: 0.6.8

Этот раздел о сборе различных файлов для загрузки macOS, мы ожидаем, что вы хорошо знаете своё оборудование перед началом, и надеемся, что вы делали раньше Хакинтош, так как мы не будем здесь глубоко погружаться.

> Как лучше всего узнать, поддерживается ли мое оборудование?

См. [**Страницу аппаратных ограничений**](macos-limits.md) для лучшего понимания того, что требуется macOS для загрузки, аппаратная поддержка между Clover и OpenCore очень похожа.

> Как можно узнать, какое у меня оборудование?

См. предыдущую страницу: [Определение вашего оборудования](./find-hardware.md)

## Драйверы прошивок

Драйверы прошивок - драйверы, используемые OpenCore в UEFI среде. В основном они требуются для загрузки компьютера, либо расширяя возможности патчинга OpenCore или показывая вам различные накопители в меню выбора OpenCore(например, диски HFS).

* **Примечание о расположении**: Эти файлы **должны** находиться в `EFI/OC/Drivers/`

### Универсальные

::: tip Требуемые драйверы

Для большинства систем, вам понадобится только 2 `.efi` драйвера для работы:

* [HfsPlus.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi)(<span style="color:red">Требуется</span>)
  * Нужен для просмотра HFS разделов(т.е., установщиков macOS и Recovery разделов/образов). **Не смешивайте с другими HFS драйверами**
  * Для Sandy Bridge и старее (а также младшие (low end) Ivy Bridge (i3 и Celeron)), см. legacy раздел ниже
* [OpenRuntime.efi](https://github.com/acidanthera/OpenCorePkg/releases)(<span style="color:red">Требуется</span>)
  * Замена [AptioMemoryFix.efi](https://github.com/acidanthera/AptioFixPkg), используется как расширение для OpenCore, чтобы помогать в патчинге boot.efi для исправления NVRAM и лучшего управления памятью.
  * Напоминаем, что это включено в OpenCorePkg, который мы скачали ранее

:::

### Пользователям Legacy

В дополнение вышесказанному, если ваше оборудование не поддерживает UEFI(2011 г. и старее), вам понадобится следующее. Обратите пристальное внимание на каждый пункт, поскольку вам может не понадобится все 4:

* [OpenUsbKbDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases)
  * Используется для меню выбора (picker) OpenCore на **legacy системах, работающих под управлением DuetPkg** [не рекомендуется и даже вреден на UEFI (Ivy Bridge и новее)](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653)
* [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlusLegacy.efi)
  * Legacy вариант HfsPlus, используемый для систем без поддержки RDRAND инструкций. Обычно встречается на Sandy Bridge и старее(а также младшие (low end) Ivy Bridge (i3 и Celeron))
  * Не смешивайте это с HfsPlus.efi, выберите одно или другое, в зависимости от вашего оборудования
* [OpenPartitionDxe](https://github.com/acidanthera/OpenCorePkg/releases)
  * Требуется для загрузки раздела восстановления (recovery) в OS X 10.7-10.9
    * Этот файл идёт в комплекте с OpenCorePkg в EFI/OC/Drivers
    * Примечание: Пользователи OpenDuet(т. е. без UEFI) будут иметь этот встроенный драйвер, он им не потребуется
  * Не требуется для OS X 10.10, Yosemite и новее

Эти файлы должны быть помещены в папку Drivers в вашем EFI

::: details Особенности 32-бит

Для тех, у кого 32-битные процессоры, вы также захотите получить эти драйверы

* [HfsPlus32](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus32.efi)
  * Альтернатива HfsPlusLegacy, но для 32-битных процессоров; не смешивайте это с другими HFS .efi драйверами

:::

## Кексты

Kext - это **k**ernel **ext**ension, вы можете думать что это драйвер для macOS, эти файлы должны быть помещены в папку Kexts folder в вашем EFI.

* **Примечание для Windows и Linux**: Кексты будут выглядеть как обычные папки в вашей ОС, **дважды проверьте**, что папка, которую вы устанавливаете, имеет видимое расширение .kext(и не добавляйте его вручную, если оно отсутствует)
  * Если в любом кексте также есть `.dSYM` файл, вы можете просто удалить его. Они предназначены для отладочных целей.
* **Примечание о расположении**: Эти файлы **должны** находиться в `EFI/OC/Kexts/`.

Все кексты перечисленные ниже, можно найти **предварительно скомпилированными** в [Kext Repo](http://kexts.goldfish64.com/). Кексты здесь компилируются каждый раз при новом коммите.

### Маст-хэв

::: tip Требуемые кексты

Без двух ниже, система не загрузится:

* [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)(<span style="color:red">Требуется</span>)
  * Эмулирует чип SMC, найденный на реальных маках, без этого macOS не загрузится
  * Альтернативой является FakeSMC, который может иметь более лучшую или более худшую поддержку, чаще всего используется на legacy оборудовании.
  * Требуется OS X 10.6 или новее
* [Lilu](https://github.com/acidanthera/Lilu/releases)(<span style="color:red">Требуется</span>)
  * Кекст, чтобы патчить многие процессы; требуется для AppleALC, WhateverGreen, VirtualSMC и многих других кекстов. Без Lilu, они не будут работать
  * Обратите внимание: Lilu и плагины к нему требуют OS X 10.8 и новее
  
::: details Legacy "маст-хэв" кексты

Для тех, кто планирует загружать OS X 10.7 и старее на 32-битном оборудовании, вы захотите использовать вместо VirtualSMC - ниже:

* [FakeSMC-32](https://github.com/khronokernel/Legacy-Kexts/blob/master/32Bit-only/Zip/FakeSMC-32.kext.zip?raw=true)

Напоминание: если вы не хотите загружать эти старые ОС, вы можете проигнорировать эти кексты.

* **Примечание по OS X 10.4 и 10.5**: Даже на 64-битных процессорах, пространство ядра OS X по-прежнему 32-битное. Поэтому мы рекомендуем использовать FakeSMC-32 в тандеме с VirtualSMC, установив параметр `Arch` для FakeSMC-32 значение `i386`, и для VirtualSMC `x86_64`. Это обсуждается далее в руководстве.

:::

### Плагины VirtualSMC

Нижеприведенные плагины не требуются для загрузки, и просто добавляют дополнительный функционал в систему, как мониторинг компьютера(Учтите, что когда VirtualSMC поддерживает 10.6, плагины могут требовать 10.8+):

* SMCProcessor.kext
  * Используется для мониторинга температуры процессора, **не работает на системах с процессорами AMD**
* SMCSuperIO.kext
  * Используется для мониторинга скорости кулера, **не работает на системах с процессорами AMD**
* SMCLightSensor.kext
  * Используется для датчика освещения на ноутбуках, **настольные ПК могут игнорировать**
  * Не используйте, если у вас нет датчика освещения, иначе это может вызвать проблемы
* SMCBatteryManager.kext
  * Используется для измерения показания батареи на ноутбуках, **настольные ПК могут игнорировать**
  * Не используйте, пока батарея не будет правильно пропатчена, иначе могут возникнуть проблемы. Поэтому для первоначальной установки, пожалуйста, опустите этот кекст. После установки, вы можете перейти на эту страницу для настройки: [Исправление показаний батареи](https://dortania.github.io/OpenCore-Post-Install/laptop-specific/battery.html)
* SMCDellSensors.kext
  * Позволяет более точно мониторить и контролировать кулеры на компьютерах Dell, поддерживающие System Management Mode(SMM)
  * **Не используйте, если у вас нет поддерживаемого компьютера Dell**, в основном ноутбуки Dell могут извлечь выгоду из этого кекста

### Графика

* [WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases)(<span style="color:red">Требуется</span>)
  * Используется для патчинга DRM, boardID, исправления фреймбуфера, и т.д., все графические процессоры выигрывают от этого кекста
  * Обратите внимание, что файл SSDT-PNLF.dsl требуется только для ноутбуков и моноблоков, см. [Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) для получения подробной информации
  * Требуется OS X 10.8 или новее

### Звук

* [AppleALC](https://github.com/acidanthera/AppleALC/releases)
  * Используется для патчинга AppleHDA, что позволяет поддерживать большинство встроенных звуковых контроллеров
  * AMD 15h/16h могут иметь проблемы с этим и системы на Ryzen/Threadripper редко имеют поддержку микрофона
  * Требуется OS X 10.8 или новее
  
::: details Legacy Кексты на Звук

Для тех, кто планирует загружать OS X 10.7 и старее, возможно, лучше стоит выбрать эти кексты:

* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * Требуется OS X 10.6 или новее
  
* [VoodooHDA-FAT](https://github.com/khronokernel/Legacy-Kexts/blob/master/FAT/Zip/VoodooHDA.kext.zip)
  * Идентичен верхнему, однако поддерживает 32 и 64-битные ядра, так что он идеально подходит для загрузки OS X 10.4-5 и 32-битных процессоров

:::

### Ethernet

Здесь мы предполагаем, что вы знаете, какая Ethernet карта установлена в вашей системе, напоминаем, что на страницах спецификации продукта, скорее всего, будет указан тип сетевой карты.

* [IntelMausi](https://github.com/acidanthera/IntelMausi/releases)
  * Для большинства сетевых карт Intel, чипсеты I211, будут нуждаться в кексте SmallTreeIntel82576
  * Официально поддерживаются сетевые карты Intel 82578, 82579, I217, I218 и I219
  * Требуется OS X 10.9 или новее, пользователи 10.8-10.8 могут использовать вместо этого IntelSnowMausi для более старых ОС
* [SmallTreeIntel82576 kext](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases)
  * Требуется для сетевых карт I211, основан на кексте SmallTree, но пропатчен для поддержки I211
  * Требуется для большинства AMD плат с сетевыми картами Intel
  * Требуется OS X 10.9-12(v1.0.6), macOS 10.13-14(v1.2.5), macOS 10.15+(v1.3.0)
* [AtherosE2200Ethernet](https://github.com/Mieze/AtherosE2200Ethernet/releases)
  * Требуется для сетевых карт Atheros и Killer
  * Требуется OS X 10.8 или новее
  * Note: Модели Atheros Killer E2500 на самом деле сделаны на базе Realtek, вместо этого для этих систем, пожалуйста, используйте [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
* [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
  * Для гигабитного Ethernet от Realtek
  * Требуется OS X 10.8-11(2.2.0), 10.12-13(v2.2.2), 10.14+(2.3.0)
  * **ПРИМЕЧАНИЕ: Иногда гигабитный Ethernet от Realtek может работать некорректно, если у вас RealtekRTL8111 v2.3.0. Если вы наблюдаете эту проблему, попробуйте версию 2.2.2**
* [LucyRTL8125Ethernet](https://www.insanelymac.com/forum/files/file/1004-lucyrtl8125ethernet/)
  * Для 2.5-гигабитного Ethernet от Realtek
  * Требуется macOS 10.15 или новее
* Для сетевых карт Intel I225-V, патчи упомянуты в разделе настольного [Comet Lake DeviceProperties](config.plist/comet-lake.md#deviceproperties). Кекст не требуется.
  * Требуется macOS 10.15 или новее
* Для сетевых карт Intel I350, патчи упомянуты в разделе HEDT [Sandy и Ivy Bridge-E DeviceProperties](config-HEDT/ivy-bridge-e.md#deviceproperties). Кекст не требуется.
  * Требуется OS X 10.10 или новее

::: details Legacy Ethernet кексты

Актуальны как для legacy установок macOS, так и для устаревшего ПК оборудования.

* [AppleIntele1000e](https://github.com/chris1111/AppleIntelE1000e/releases)
  * В основном актуально для 10/100Мбит Ethernet контроллеров Intel
  * Требуется 10.6 или новее
* [RealtekRTL8100](https://www.insanelymac.com/forum/files/file/259-realtekrtl8100-binary/)
  * В основном актуально для 10/100Мбит Ethernet контроллеров Realtek
  * Требуется macOS 10.12 или с v2.0.0+
* [BCM5722D](https://github.com/chris1111/BCM5722D/releases)
  * В основном актуально для контроллеров Broadcom Ethernet на базе BCM5722
  * Требуется OS X 10.6 или новее

:::

А также, имейте ввиду, что некоторые сетевые контролеры нативно поддерживаются в macOS:

::: details Нативные Ethernet контроллеры

#### Серии Aquantia

```md
# AppleEthernetAquantiaAqtion.kext
pci1d6a,1    = Aquantia AQC107
pci1d6a,d107 = Aquantia AQC107
pci1d6a,7b1  = Aquantia AQC107
pci1d6a,80b1 = Aquantia AQC107
pci1d6a,87b1 = Aquantia AQC107
pci1d6a,88b1 = Aquantia AQC107
pci1d6a,89b1 = Aquantia AQC107
pci1d6a,91b1 = Aquantia AQC107
pci1d6a,92b1 = Aquantia AQC107
pci1d6a,c0   = Aquantia AQC113
pci1d6a,4c0  = Aquantia AQC113
```

**Примечание**: Из-за того, что многие сетевые карты Aquantia поставляются с устаревшей прошивкой, вам может понадобиться обновить прошивку в Linux/Windows, чтобы убедиться, что она совместима с macOS.

#### Серии Intel

```md
# AppleIntel8254XEthernet.kext
pci8086,1096 = Intel 80003ES2LAN
pci8086,100f = Intel 82545EM
pci8086,105e = Intel 82571EB/82571GB

# AppleIntelI210Ethernet.kext
pci8086,1533 = Intel I210
pci8086,15f2 = Intel I225LM (Added in macOS 10.15)

# Intel82574L.kext
pci8086,104b = Intel 82566DC
pci8086,10f6 = Intel 82574L

```

#### Серии Broadcom

```md
# AppleBCM5701Ethernet.kext
pci14e4,1684 = Broadcom BCM5764M
pci14e4,16b0 = Broadcom BCM57761
pci14e4,16b4 = Broadcom BCM57765
pci14e4,1682 = Broadcom BCM57762
pci14e4,1686 = Broadcom BCM57766
```

:::

### USB

* [USBInjectAll](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/)
  * Используется для инжектирования USB контроллеров Intel на системах без определённых в ACPI USB портов
  * Не требуется на настольных (desktop) Skylake и новее
    * AsRock тупой и нуждается в этом
    * Однако, ноутбукам с Coffee Lake и старее, рекомендуется использовать этот кекст
  * Не работает на процессорах AMD **совсем**
  * Требуется OS X 10.11 или новее

* [XHCI-unsupported](https://github.com/RehabMan/OS-X-USB-Inject-All)
  * Требуется для не-нативных USB контроллеров
  * Системам на процессорах AMD это не нужно
  * Обычно чипсеты, которым это нужно:
    * H370
    * B360
    * H310
    * Z390(Не требуется в Mojave и новее)
    * X79
    * X99
    * AsRock платы(В частности, материнским платам Intel, однако B460/Z490+ платы не нуждаются в этом)

### WiFi и Bluetooth

#### Intel

* [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases)
  * Добавляет поддержку большого разнообразия беспроводных карт Intel, и работает нативно в рекавери, спасибо интеграции IO80211Family
  * Требуется macOS 10.13 или новее и требуется Apple Secure Boot для правильной работы
* [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases)
  * Добавляет поддержку Bluetooth в macOS при сопряжении с беспроводной картой Intel
  * Требуется macOS 10.13 или новее

::: details Более подробная информация о включении AirportItlwm

Чтобы включить поддержку AirportItlwm в OpenCore, вам нужно:

* Включить `Misc -> Security -> SecureBootModel`, установив значение `Default` или другое допустимое значение
  * Это обсуждается позже в этом руководстве и в руководстве После установки: [Apple Secure Boot](https://dortania.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html)
* Если вы не можете включить SecureBootModel, вы все равно можете принудительно (force) заинжектировать IO80211Family(**Крайне не рекомендуется**)
  * Установите следующее в вашем config.plist в разделе `Kernel -> Force`(discussed later in this guide):
  
![](../img/ktext-md/force-io80211.png)

:::

#### Broadcom

* [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
  * Используется для патчинга карт Broadcom не от Apple/Fenvi, **не будет работать с Intel, Killer, Realtek, etc**
  * Требуется OS X 10.10 или новее
  * Для Big Sur см. [Известные проблемы Big Sur](./extras/big-sur#known-issues),  чтобы узнать о дополнительных действиях, касающихся драйверов AirPortBrcm4360.
* [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases)
  * Используется для загрузки прошивки на Bluetooth чипсет от Broadcom, требуется для всех Airport карт не от Apple/Fenvi.
  * Для сопряжения с BrcmFirmwareData.kext
    * BrcmPatchRAM3 для 10.15+ (должен быть сопряжен с BrcmBluetoothInjector)
    * BrcmPatchRAM2 для 10.11-10.14
    * BrcmPatchRAM для 10.8-10.10

::: details Порядок загрузки BrcmPatchRAM

Порядок в `Kernel -> Add` должен быть следующим:

1. BrcmBluetoothInjector
2. BrcmFirmwareData
3. BrcmPatchRAM3

Однако, ProperTree сделает это за вас, поэтому вам не нужно беспокоиться

:::

### Кексты для процессоров AMD

* [XLNCUSBFIX](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)
  * Исправление USB для AMD FX систем, не рекомендуется с Ryzen
  * Требуется macOS 10.13 или новее
* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * Звук для систем на FX и поддержка передней панели Mic+Audio для систем на Ryzen, не смешивайте с AppleALC. Качество звука заметно хуже чем с AppleALC на процессорах Zen
  * Требуется OS X 10.6 или новее

### Дополнительно

* [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * Полезно, начиная с Catalina, чтобы отключать кекст AppleMCEReporter, который вызывает панику ядра на процессорах AMD и двухпроцессорных системах.
  * Затронутые SMBIOS:
    * MacPro6,1
    * MacPro7,1
    * iMacPro1,1
  * Требуется macOS 10.15 или новее
* [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  * Необходим для синхронизирования TSC на некоторых HEDT Intel и серверных материнских платах, без этого macOS может быть очень медленной или даже не загружаться.
  * **Не работает на процессорах AMD**
  * Требуется OS X 10.8 или новее
* [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
  * Используется для исправления управления питанием и инициализации NVMe не от Apple
  * Требуется macOS 10.14 или новее
* [SATA-Unsupported](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * Добавляет поддержку большого разнообразия SATA контроллеров, в основном актуально для ноутбуков, которые имеют проблемы с отображением SATA диска в macOS. Мы рекомендуем протестировать сначала без него.
  * Заметка о macOS Big Sur: нужно будет использовать вместо него [CtlnaAHCIPort](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip) из-за того, что множество контроллеров будут удалены из бинарного файла
    * Не нужно беспокоиться на Catalina и старее

::: details Legacy SATA Кексты

* [AHCIPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/AHCIPortInjector.kext.zip)
  * Legacy инжектор SATA/AHCI, в основном актуально для старых компьютеров эпохи Penryn
* [ATAPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/ATAPortInjector.kext.zip)
  * Legacy ATA инжектор, в основном актуально для IDE и ATA устройств(т.е. когда в BIOS нет ACHI опции)
  
:::

### Особенности ноутбуков

Чтобы узнать, какая у вас клавиатура и трекпад, посмотрите Диспетчер Устройств в Windows или `dmesg | grep input` в Linux

#### Драйверы ввода

* [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases)
  * Для систем с PS2 клавиатурами, мышками, и трекпадами
  * Требуется macOS 10.11 или новее для функций MT2 (Magic Trackpad 2)
* [RehabMan's VoodooPS2](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/)
  * Для старых систем с PS2 клавиатурами, мышками, и трекпадами, или когда вы не хотите использовать VoodooInput
  * Поддерживается macOS 10.6+
* [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/)
  * Для систем с Synaptics SMBUS устройствами, в основном для трекпадов и trackpoints.
  * Требуется macOS 10.11 или новее для функций MT2
* [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases)
  * Для систем с ELAN SMBUS устройствами, в основном для трекпадов и trackpoints.
  * Поддерживается в настоящее время macOS 10.14 или новее
* [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases)
  * Используется для исправления I2C устройств, найдено с некоторыми модными тачпадами и в устройствах с сенсорным экраном
  * Требуется macOS 10.11 или новее для функций MT2
::: details Плагины VoodooI2C
| Тип подключения | Плагин | Примечание |
| :--- | :--- | :--- |
| Microsoft HID | VoodooI2CHID | Может использоваться для поддержки некоторых USB сенсорных экранов |
| ELAN Proprietary | VoodooI2CElan | ELAN1200+ требует вместо этого VoodooI2CHID |
| Synaptics Proprietary | VoodooI2CSynaptics | Протокол Synaptics F12 требует вместо этого VoodooI2CHID |
| ^^ | VoodooRMI | Поддерживает протоколы Synaptics F12/F3A - они обычно поддерживают стандарт Microsoft HID, поэтому сначала вам следует попробовать VoodooI2CHID |
| FTE1001 touchpad | VoodooI2CFTE | |
| Atmel Multitouch Protocol | VoodooI2CAtmelMXT | |
:::

#### Разное

Пожалуйста, обратитесь к [Kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md) для получения списка поддерживаемых кекстов

## SSDT

И так, вы видите все SSDT в папке AcpiSamples и задаетесь вопросом, нужны ли они вам. Мы рассмотрим, какие SSDT вам нужны в **вашем конкретном ACPI разделе config.plist**, поскольку нужные вам SSDT зависят от платформы. Некоторые из них могут быть специфичными для конкретной системы, где они должны быть настроены. Вы можете легко потеряться, если я дам вам список SSDT на выбор прямо сейчас.

[Начало работы с ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) имеет обширный раздел с SSDT, включая их компиляцию на разных платформах

Быстрый TL;DR необходимых SSDT (это исходный код, который вам нужно будет скомпилировать в .aml файл):

### Настольный ПК

| Platforms | **CPU** | **EC** | **AWAC** | **NVRAM** | **USB** |
| :-------: | :-----: | :----: | :------: | :-------: | :-----: |
| Penryn | N/A | [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A | N/A |
| Lynnfield и Clarkdale | ^^ | ^^ | ^^ | ^^ | ^^ |
| SandyBridge | [CPU-PM](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management) (Run in Post-Install) | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake | ^^ | ^^ | [SSDT-AWAC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) | [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | N/A | [SSDT-RHUB](https://dortania.github.io/Getting-Started-With-ACPI/Universal/rhub.html) |
| AMD (15/16h) | N/A | ^^ | N/A | ^^ | N/A |
| AMD (17/19h) | [SSDT-CPUR для B550 и A520](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml) | ^^ | ^^ | ^^ | ^^ |

### Высокопроизводительный настольный ПК

| Platforms | **CPU** | **EC** | **RTC** | **PCI** |
| :-------: | :-----: | :----: | :-----: | :-----: |
| Nehalem and Westmere | N/A | [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A |
| Sandy Bridge-E | ^^ | ^^ | ^^ | [SSDT-UNC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/unc0) |
| Ivy Bridge-E | ^^ | ^^ | ^^ | ^^ |
| Haswell-E | [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) | [SSDT-EC-USBX](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-RTC0-RANGE](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ |
| Broadwell-E | ^^ | ^^ | ^^ | ^^ |
| Skylake-X | ^^ | ^^ | ^^ | N/A |

### Ноутбук

| Platforms | **CPU** | **EC** | **Backlight** | **I2C Trackpad** | **AWAC** | **USB** | **IRQ** |
| :-------: | :-----: | :----: | :-----------: | :--------------: | :------: | :-----: | :-----: |
| Clarksfield и Arrandale | N/A | [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-PNLF](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | N/A | N/A | N/A | [IRQ SSDT](https://dortania.github.io/Getting-Started-With-ACPI/Universal/irq.html) |
| SandyBridge | [CPU-PM](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management) (Run in Post-Install) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | [SSDT-GPI0](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/trackpad.html) | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ | ^^ | N/A |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake (8th Gen) и Whiskey Lake | ^^ | ^^ | [SSDT-PNLF-CFL](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | ^^ | [SSDT-AWAC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ | ^^ |
| Coffee Lake (9th Gen) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ice Lake | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-RHUB](https://dortania.github.io/Getting-Started-With-ACPI/Universal/rhub.html) | ^^ |

Продолжение:

| Platforms | **NVRAM** | **IMEI** |
| :-------: | :-------: | :------: |
|  Clarksfield и Arrandale | N/A | N/A |
| Sandy Bridge | ^^| [SSDT-IMEI](https://dortania.github.io/Getting-Started-With-ACPI/Universal/imei.html) |
| Ivy Bridge | ^^ | ^^ |
| Haswell | ^^ | N/A |
| Broadwell | ^^ | ^^ |
| Skylake | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ |
| Coffee Lake (8th Gen) и Whiskey Lake | ^^ | ^^ |
| Coffee Lake (9th Gen) | [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | N/A | ^^ |
| Ice Lake | ^^ | ^^ |

# Теперь, когда это всё сделано, перейдите к [Началу работы с ACPI (на английском)](https://dortania.github.io/Getting-Started-With-ACPI/)
