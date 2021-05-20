# Создание установщика в Windows

* Поддерживаемая версия: 0.6.9

В то время как вам не нужна чистая установка macOS чтобы использовать OpenCore, некоторые пользователи предпочитают иметь свежую версию ОС с обновлением их Boot Manager.

Чтобы начать, вам нужно:

* USB флешка объемом 4 Гб

* Для USB-накопителей объемом свыше 16 Гб для форматирования в FAT32 используйте [Rufus](#через-rufus)

* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)
  * Требуется [установленный Python](https://www.python.org/downloads/)

## Скачивание macOS

Получение устаревших установщиков очень простое, для начала получите копию [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases) и перейдите в `/Utilities/macrecovery/`. Затем скопируйте путь к папке macrecovery:

![](../../img/installer-guide/winblows-install-md/file-path.png)

Отсюда, вы захотите открыть Командную Строку и "cd" в папку macrecovery, путь которой мы скопировали ранее:

```sh
cd Вставьте_Путь_К_Папке
```

![](../../img/installer-guide/winblows-install-md/command-prompt.png)

Теперь запустите одну из следующих команд, в зависимости от того, какую версию macOS вы хотите (Обратите внимание на то, что эти скрипты написаны на [Python](https://www.python.org/downloads/), пожалуйста, установите его, если вы ещё это не сделали):

```sh
# Lion(10.7):
python macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# Mountain Lion(10.8):
python macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# Mavericks(10.9):
python macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# Yosemite(10.10):
python macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# El Capitan(10.11):
python macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# Sierra(10.12):
python macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# High Sierra(10.13)
python macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# Mojave(10.14)
python macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# Catalina(10.15)
python macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Последняя версия
# т.е. Big Sur(11)
python macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download
```

* **Примечание к macOS 11, Big Sur**: Так как эта ОС совершенна новая, есть некоторые проблемы с определенными системами, которые нужно решить. Для получения дополнительной информации, смотрите здесь: [OpenCore и macOS 11: Big Sur](../extras/big-sur/README.md)
  * Для начинающих пользователей, мы рекомендуем macOS 10.15, Catalina
* **Примечание к GPU Nvidia**: напоминание о том, чтобы проверить, поддерживает ли ваше оборудование новые ОС, смотрите [Аппаратные ограничения](../macos-limits.md)

Это займёт некоторое время, однако когда вы закончите, вы должны получить BaseSystem или RecoveryImage файлы:

![](../../img/installer-guide/winblows-install-md/macrecovery-done.png)

| BaseSystem | RecoveryImage |
| :--- | :--- |
|![](../../img/installer-guide/winblows-install-md/basesystem-example.png) | ![](../../img/installer-guide/winblows-install-md/macrecovery-after.jpg) |

Теперь, когда наш установщик загружен, мы дальше захотим отформатировать USB.

## Создание установщика

Здесь мы будем форматировать наш USB накопитель и записывать на него macOS. Для этого у нас есть несколько вариантов:

* [Через Управление Дисками](#через-управление-дисками)
  * На базе графического интерфейса, самый простой вариант
  * Поддерживаются системы только с UEFI(напр. 2012 г.+)
* [Через Rufus](#через-rufus)
  * На базе графического интерфейса, самый простой вариант
  * Для USB-накопителей большего размера (16Гб+)
* [Через diskpart](#через-diskpart)
  * На базе командной строки, требует немного больше работы
  * Требуется для устаревших (Legacy) систем (т.е. не UEFI, до 2012 г.)

### Через Управление Дисками

Просто откройте Управление Дисками, и отформатируйте ваш USB накопитель в FAT32:

1. Щелкните правой кнопкой мыши (ПКМ) по кнопке "Пуск" на вашей панели задач (task bar) и выберите Управление Дисками
2. Вы должны видеть все разделы и диски. В нижней половине, вы видете ваши накопители. Найдите свой USB накопитель.
3. Вы захотите отформатировать USB накопитель, чтобы он имел раздел в FAT32

* Если у вас есть множество разделов на USB накопителе, щелкните правой кнопкой мыши по каждому разделу и кликните Удалить том (Delete Volume) на вашем USB накопителе (Это удалит ваши данные, убедитесь, что вы имеете резервные копии, и после удалите только разделы с вашего USB накопителя)
  * Щелкните ПКМ по нераспределенному (unallocated) пространству и создайте новый простой том. Убедитесь в том, что он в FAT32 и не меньше одного-двух гигабайтов. Назовите его "EFI".
* В противном случае, щелкните ПКМ по разделу на USB накопителе, щелкните форматировать (Format) и поставьте его в FAT32.  

![](../../img/installer-guide/winblows-install-md/DiskManagement.jpg)

Далее, перейдите в корень USB накопителя и создайте папку с названием `com.apple.recovery.boot`. Дальше, переместите загруженные BaseSystem или RecoveryImage файлы. Пожалуйста, убедитесь, что вы скопировали .dmg и .chunklist файлы в эту папку:

![](../../img/installer-guide/winblows-install-md/com-recovery.png)

Теперь возьмите OpenCorePkg, который вы ранее загрузили и откройте его:

![](../../img/installer-guide/winblows-install-md/base-oc-folder.png)

Здесь мы видим папки IA32 (32-битные процессоры) и X64 (64-битные процессоры), выберите подходящую для вашего оборудования, и откройте её. Затем возьмите папку EFI внутри и поместите в корень USB накопителя, рядом с com.apple.recovery.boot. После этого, оно должно выглядеть так:

![](../../img/installer-guide/winblows-install-md/com-efi-done.png)

### Через Rufus

1. Загрузите [Rufus](https://rufus.ie/)
2. Выберите метод загрузки как незагрузочный образ
3. Выберите файловую систему Large FAT32
4. Кликните по кнопке Старт
5. Удалите все файлы autorun в разделе USB-накопителя

![](../../img/installer-guide/winblows-install-md/format-usb-rufus.png)

Далее, перейдите в корень USB накопителя и создайте папку с названием `com.apple.recovery.boot`. Дальше, переместите загруженные BaseSystem или RecoveryImage файлы. Пожалуйста, убедитесь, что вы скопировали .dmg и .chunklist файлы в эту папку:

![](../../img/installer-guide/winblows-install-md/com-recovery.png)

Теперь возьмите OpenCorePkg, который вы ранее загрузили и откройте его:

![](../../img/installer-guide/winblows-install-md/base-oc-folder.png)

Здесь мы видим папки IA32 (32-битные процессоры) и X64 (64-битные процессоры), выберите подходящую для вашего оборудования, и откройте её. Затем возьмите папку EFI внутри и поместите в корень USB накопителя, рядом с com.apple.recovery.boot. После этого, оно должно выглядеть так:

![](../../img/installer-guide/winblows-install-md/com-efi-done.png)

### Через diskpart

::: details через diskpart

Нажмите Windows + R и введите `diskpart`.

Теперь запустите следующее:

```sh
# Список доступных дисков
list disk
# Выберите ваш диск (т.е. disk 1)
select disk 1
# Отформатируйте накопитель
clean
# Конвертируйте в GPT
# Из-за странного бага с BOOTICE и DuetPkg, MBR диски не смогут загрузиться
convert gpt
# Создайте новый раздел
create partition primary
# Select your partition Выберите ваш раздел
# Запуск clean гарантирует, что у нас будет один раздел, поэтому это будет "partition 1"
select partition 1
# Отформатируйте накопитель в FAT32
format fs=fat32 quick
# Назначьте букву диску (т.е. диск E; убедитесь, что она в настоящее время не используется)
ASSIGN LETTER=E
```

Далее, перейдите в корень USB накопителя и создайте папку с названием `com.apple.recovery.boot`. Дальше, переместите загруженные BaseSystem или RecoveryImage файлы. Пожалуйста, убедитесь, что вы скопировали .dmg и .chunklist файлы в эту папку:

![](../../img/installer-guide/winblows-install-md/com-recovery.png)

Теперь возьмите OpenCorePkg, который вы ранее загрузили и откройте его:

![](../../img/installer-guide/winblows-install-md/base-oc-folder.png)

Здесь мы видим папки IA32 (32-битные процессоры) и X64 (64-битные процессоры), выберите подходящую для вашего оборудования, и откройте её. Затем возьмите папку EFI внутри и поместите в корень USB накопителя, рядом с com.apple.recovery.boot. После этого, оно должно выглядеть так:

![](../../img/installer-guide/winblows-install-md/com-efi-done.png)

::: details Настройка установки в Legacy

Если ваше оборудование не поддерживает UEFI, смотрите инструкции ниже.

Для начала, вам понадобится следующее:

* [7-Zip](https://www.7-zip.org)
* [BOOTICE](https://www.majorgeeks.com/files/details/bootice_64_bit.html)
* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

Далее, откройте BOOTICE и убедитесь, что вы выбрали правильный накопитель.

![](../../img/installer-guide/winblows-install-md/bootice.png)

Затем, войдите в "Process MBR", потом нажмите на "Restore MBR" и выберите **boot0** файл из `Utilities/LegacyBoot/` в OpenCorePkg:

| Восстановление MBR | Восстановление boot0 файла |
| :--- | :--- |
| ![](../../img/installer-guide/winblows-install-md/restore-mbr.png) | ![](../../img/installer-guide/winblows-install-md/restore-mbr-file.png) |

После, вернитесь на главный экран и выберите "Process PBR", затем "Restore PBR". Здесь, выберите **Boot1f32** файл из `Utilities/LegacyBoot/` в OpenCorePkg:

| Восстановление PBR | Восстановление boot1f32 файла |
| :--- | :--- |
| ![](../../img/installer-guide/winblows-install-md/restore-pbr.png) | ![](../../img/installer-guide/winblows-install-md/restore-pbr-file.png) |

Как только это будет сделано, вернитесь к вашему USB накопителю и сделайте последнюю вещь. Возьмите либо **bootx64**(64-битные процессоры), либо **bootia32**(32-битные процессоры) файл из `Utilities/LegacyBoot/` и поместите его в корень вашего накопителя. **Переименуйте этот файл в `boot`**, чтобы DuetPkg мог правильно функционировать:

![](../../img/installer-guide/winblows-install-md/final-boot-file.png)

:::

## Теперь, когда это всё сделано, перейдите к [Настройке EFI](./opencore-efi.md), чтобы закончить работу
