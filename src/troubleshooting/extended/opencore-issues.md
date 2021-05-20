# Проблемы с загрузкой OpenCore

* Поддерживаемая версия: 0.6.9

Проблемы связанные с начальной загрузкой самого USB-накопителя до того, как вы решите загрузить установщик macOS

* [Зависает на чёрном экране перед появлением меню выбора или постоянно перезагружается](#зависает-на-черном-экране-перед-появлением-меню-выбора)
* [Зависает на `no vault provided!`](#зависает-на-no-vault-provided)
* [Зависает на `OC: Invalid Vault mode`](#зависает-на-oc-invalid-vault-mode)
* [Зависает на `OCB: OcScanForBootEntries failure - Not Found`](#зависает-на-ocb-ocscanforbootentries-failure-not-found)
* [Зависает на `OCB: failed to match a default boot option`](#зависает-на-ocb-failed-to-match-a-default-boot-option)
* [Зависает на `OCB: System has no boot entries`](#зависает-на-ocb-system-has-no-boot-entries)
* [Зависает на `OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...`](#зависает-на-ocs-no-schema-for-dsdt-kernelandkextpatch-rtvariable-smbios-systemparameters)
* [Зависает на `OC: Driver XXX.efi at 0 cannot be found`](#зависает-на-oc-driver-xxx-efi-at-0-cannot-be-found)
* [Получение `Failed to parse real field of type 1`](#получение-failed-to-parse-real-field-of-type-1)
* [Невозможно ничего выбрать в меню выбора](#невозможно-ничего-выбрать-в-меню-выбора)
* [SSDT не добавляются](#ssdt-не-добавляются)
* [При загрузке OpenCore - происходит перезагрузка в BIOS](#при-загрузке-opencore-происходит-перезагрузка-в-bios)
* [OCABC: Incompatible OpenRuntime r4, require r10](#ocabc-incompatible-openruntime-r4-require-r10)
* [Failed to open OpenCore image - Access Denied](#failed-to-open-opencore-image-access-denied)
* [OC: Failed to find SB model disable halting on critical error](#oc-failed-to-find-sb-model-disable-halting-on-critical-error)

## Зависает на чёрном экране перед появлением меню выбора

Скорее всего, это какая-то ошибка либо в вашей прошивке, либо в OpenCore, в частности, возникают проблемы с загрузкой всех драйверов и отображением меню. Лучший способ диагностировать это - использовать [DEBUG сборку OpenCore](./../debug.md), и проверить журналы, действительно ли OpenCore загружен, и если да, то на чем он зависает.

**Ситуации, когда OpenCore не загружается**:

* Если логи отсутствуют, даже после настройки DEBUG версии OpenCore с Target установленным в 67, то вероятно проблема связана с:
  * Неправильной структурой папок на USB-накопителе
    * См. [При загрузке OpenCore - происходит перезагрузка в BIOS](#booting-opencore-reboots-to-bios) для получения дополнительной информации
  * Прошивкой не поддерживающей UEFI
    * Вам нужно установить DuetPkg, это описано на страницах [macOS](../../installer-guide/mac-install.md) и [Windows](../../installer-guide/winblows-install.md)

**Ситуации, когда OpenCore загружается**:

* Проверьте последнюю строку в ваших логах, здесь, скорее всего, будут либо загруженные .efi драйверы, либо какие-либо формы ASSERT
  * Если ASSERT, то вы захотите проинформировать разработчиков об этой проблеме здесь: [Acidanthera's Bugtracker](https://github.com/acidanthera/bugtracker)
  * Если .efi драйверы зависают, проверьте следующее:
    * **Проблемы с загрузкой HfsPlus.efi:**
      * Вместо этого - попробуйте использовать [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlusLegacy.efi)
      * Это рекомендуется для процессоров без поддержки RDRAND инструкций, в основном актуально для i3 Ivy Bridge и старее
      * [VBoxHfs.efi](https://github.com/acidanthera/AppleSupportPkg/releases/tag/2.1.7) - другой вариант, однако он гораздо медленее, чем HfsPlus
    * **Проблемы с загрузкой HiiDatabase.efi:**
      * Скорее всего, ваша прошивка уже поддерживает HiiDatabase, поэтому драйвер конфликтует. Просто удалите драйвер, поскольку он вам не нужен.

## Зависает на `no vault provided!`

Отключите Vaulting в вашем config.plist в разделе `Misc -> Security -> Vault`, установив его в:

* `Optional`

Если вы уже выполнили `sign.command`, вам нужно будет восстановить файл OpenCore.efi, так как он был подписан RSA-2048. Вы можете получить новую копию OpenCore.efi здесь: [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

**Примечание**: Vault и FileVault - это две разные вещи, см. [Безопасность и FileVault](https://dortania.github.io/OpenCore-Post-Install/universal/security.html) для получения дополнительной информации

## Зависает на `OC: Invalid Vault mode`

Скорее всего, это орфографическая ошибка, параметры в OpenCore чувствительны к регистру, поэтому убедитесь, что вы внимательно проверили написание, **O**ptional - правильное написание, которое вы должны ввести в разделе `Misc -> Security -> Vault`

## Не отображаются разделы с macOS

Главное, что нужно проверить:

* ScanPolicy установлен в `0`, чтобы отображать все диски
* Присутствие подходящих драйверов прошивки, такие как HfsPlus(Обратите внимание, что ApfsDriverLoader не должен использоваться в 0.5.8)
* Установите UnblockFsConnect в True в config.plist -> UEFI -> Quirks. Необходимо для некоторых систем HP
* Установите **SATA Mode**: `AHCI` в BIOS
* Установите в разделе `UEFI -> APFS`, чтобы видеть APFS диски:
  * **EnableJumpstart**: YES
  * **HideVerbose**: NO
  * Если вы и спользуете более старые версии High Sierra(т.е. 10.13.5 или старее), установите следующее:
    * **MinDate**: `-1`
    * **MinVersion**: `-1`

## Зависает на `OCB: OcScanForBootEntries failure - Not Found`

Это связано с тем, что OpenCore не может найти ни одного диска с текущим ScanPolicy, установка значения `0` позволит отобразить все варианты загрузки

* `Misc -> Security -> ScanPolicy -> 0`

## Зависает на `OCB: failed to match a default boot option`

То же самое, что и с `OCB: OcScanForBootEntries failure - Not Found`, OpenCore не может найти ни одного диска с текущим ScanPolicy, установка значения `0` позволит отобразить все варианты загрузки

* `Misc -> Security -> ScanPolicy -> 0`

## Зависает на `OCB: System has no boot entries`

То же самое, что и с двумя выше:

* `Misc -> Security -> ScanPolicy -> 0`

## Зависает на `OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...`

Это связано либо с использованием файла конфигурации для Clover с OpenCore, или с использованием конфигураторов, таких как Clover и OpenCore конфигуратор от Mackie. Вам нужно будет начать заново создавать новую конфигурацию, либо узнать какой мусор вам нужно удалить из конфигурации. **Это то, почему мы не поддерживаем конфигураторы, они известны такими проблемами**

* Примечание: Такие же проблемы возникнут и при смешивании устаревших файлов конфигурации с более новыми версиями OpenCore. Пожалуйста, обновите их соответствующим образом

## Зависает на `OC: Driver XXX.efi at 0 cannot be found`

Это из-за того, что запись о драйвере присутствует в вашем config.plist, но самого драйвера нет в вашем EFI. Чтобы решить:

* Убедитесь, что ваш EFI/OC/Drivers совпадает с вашим config.plist -> UEFI -> Drivers
  * Если нет, запустите Cmd/Ctrl+R чтобы повторно сделать снапшот вашего config.plist

Обратите внимание, что записи чувствительны к регистру.

## Получение "Failed to parse real field of type 1"

Это связано с тем, что значение установлено как `real`, когда оно не должно быть таковым, обычно Xcode преобразовывает `HaltLevel` случайно:

```xml
<key>HaltLevel</key>
 <real>2147483648</real>
```

Чтобы исправить, измените `real` на `integer`:

```xml
<key>HaltLevel</key>
 <integer>2147483648</integer>
```

## Невозможно ничего выбрать в меню выбора

Это связанно с несколькими вещами

* Несовместимый драйвер клавиатуры:
  * Отключите `PollAppleHotKeys` и включите `KeySupport`, затем удалите [OpenUsbKbDxe](https://github.com/acidanthera/OpenCorePkg/releases) из вашего config.plist -> UEFI -> Drivers
  * Если способ выше не работает, сделайте наоборот: отключите `KeySupport`, затем добавьте [OpenUsbKbDxe](https://github.com/acidanthera/OpenCorePkg/releases) в ваш config.plist -> UEFI -> Drivers

* Отсутствующий драйвер PS2 клавиатуры(игнорируйте, если используете USB-клавиатуру):
  * Хотя в многих прошивках он будет включен по умолчанию, некоторые ноутбуки и старые компьютеры могут все еще нуждаться в [Ps2KeyboardDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases) для правильной работы. Не забудьте также это добавить в свой config.plist

## SSDT не добавляются

Таким образом, в OpenCore есть некоторые дополнительные проверки безопасности для ACPI файлов, в частности, что длина заголовка таблицы должна быть равна размеру файла. На самом деле, это ошибка iASL при компиляции файла. Пример того, как его найти:

```c
* Оригинальный заголовок таблицы:
*     Signature        "SSDT"
*     Length           0x0000015D (349)
*     Revision         0x02
*     Checksum         0xCF
*     OEM ID           "ACDT"
*     OEM Table ID     "SsdtEC"
*     OEM Revision     0x00001000 (4096)
*     Compiler ID      "INTL"
*     Compiler Version 0x20190509 (538510601)
```

Значения `Length` и `checksum` - это то, о чем мы заботимся, поэтому, если наш SSDT на самом деле весит 347 байтов, то мы захотим изменить `Length` на `0x0000015B (347)`(`015B` - это HEX)

Лучший способ исправить это - получить новую купию iASL или копию [MaciASL](https://github.com/acidanthera/MaciASL/releases) от Acidanthera и переделать SSDT

* Примечание: MaciASL распространяемый Rehabman, подвержен повреждению ACPI, пожалуйста, избегайте его, поскольку он не поддерживает свои репозитории

## При загрузке OpenCore - происходит перезагрузка в BIOS

* Неправильная структура EFI папки, убедитесь, что все ваши файлы OC (OpenCore) находятся в EFI папке, расположенной на вашем ESP(системный раздел EFI)

::: details Пример структуры папок

![Directory Structure from OpenCore's DOC](../../../img/troubleshooting/troubleshooting-md/oc-structure.png)

:::

## OCABC: Incompatible OpenRuntime r4, require r10

Устаревший OpenRuntime.efi, убедитесь что BOOTx64.efi, OpenCore.efi и OpenRuntime **из одной и той же сборки**. Несоответствие приведет к поломке загрузки

* **Примечание**: FwRuntimeServices был переименован OpenRuntime с версии 0.5.7 и новее

## Failed to open OpenCore image - Access Denied

На новых прошивках устройств Microsoft Surface, загрузка OpenCore приводит к нарушению безопасности, даже когда отключен Secure Boot. Чтобы решить эту проблему, включите `UEFI -> Quirks -> DisableSecurityPolicy` в своём config.plist. Более подробно см. здесь: [Failed to open OpenCore image - Access Denied #1446](https://github.com/acidanthera/bugtracker/issues/1446)

## OC: Failed to find SB model disable halting on critical error

Это опечатка. Убедитесь, что `Misc -> Secuirty -> SecureBootModel` в вашем config.plist установлен в Disable**d**
