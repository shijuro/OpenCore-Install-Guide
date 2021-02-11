# Процесс установки

Теперь, когда вы закончили настройку OpenCore, вы наконец-то можете загрузиться, главное иметь в виду:

* Включите настройки BIOS оптимальные для macOS
* Прочитайте [Руководство по Multiboot (на английском)](https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/) и взгляните на специфичные квирки в разделе [Multiboot](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html#prerequisites)
  * В основном актуально для тех, кто использует один диск для нескольких ОС
* Скопируйте страницу [Устранение общих неполадок](../troubleshooting/troubleshooting.md)
* Прочитайте [Процесс загрузки macOS](../troubleshooting/boot.md)
  * Может помочь начинающим пользователям лучше понять, где они могут застрять
* И тонна терпения

## Двойная проверка вашей работы

И последнее, что мы должны обсудить перед загрузкой - это то, как настроен ваш EFI:

Хороший EFI          |  Плохой EFI
:-------------------------:|:-------------------------:
![](../../img/installation/install-md/good-efi.png)  |  ![](../../img/installation/install-md/bad-efi.png)
Папка EFI находится в разделе EFI | Папка EFI отсутствует
ACPI файлы скомпилированы(.aml)| ACPI файлы не скомпилированы(.dsl)
Отсутствует DSDT  |* Присутствует DSDT
Удалены ненужные Drivers(.efi) | Оставлены Drivers по умолчанию
Удалены ненужные Tools(.efi) | Оставлены Tools по умолчанию
Все файлы в папке Kexts заканчиваются на .kext | Включает исходный код и папки
config.plist находится в EFI/OC | Не переименован или не помещен файл .plist в правильное место
Используются только необходимые кексты | Скачаны все перечисленные кексты

И помните, что сайт slowgeek - ваш друг:

* [**Sanity Checker**](https://opencore.slowgeek.com)

## Загрузка с USB-накопителя с OpenCore

Итак, теперь вы наконец-то готовы вставить ваш USB-накопитель в ваш компьютер и загрузиться с него. Помните, что многие ноутбуки и некоторые настольные ПК по-прежнему будут грузится со внутреннего накопителя с Windows, и вам надо будет вручную выбрать OpenCore в загрузочном меню BIOS. Вам нужно будет посмотреть руководство пользователя или немного погуглить, чтобы узнать, какая Fn клавиша обеспечивает доступ к BIOS и меню загрузки(например, Esc, F2, F10 или F12)

Когда вы загрузитесь с USB, вас скорее всего, встретят следующие варианты загрузки:

1. Windows
2. macOS Base System (External) / Install macOS Catalina (External)
3. OpenShell.efi
4. Reset NVRAM

Нам нужен **вариант под цифрой 2**. В зависимости от того, как был сделан установщик, он может отображаться как **"macOS Base System (External)"**, если он создан в Linux или Windows, или как **"Install macOS Catalina (External)"**, если он создан в macOS.

## Установщик macOS

Итак, вы наконец-то в установщике, прошли через verbose и попали в установщик! Теперь, когда вы зашли так далеко, главное помнить:

* Диски, на которые вы хотите установить macOS **должны** иметь схему раздела GUID **и** быть в APFS.
  * High Sierra на жестком диске и все пользователи Sierra должны будут использовать macOS Journaled(HFS+)
* Диск **должен** также иметь раздел объемом 200 Мб
  * По умолчанию, macOS устанавливается на свежеотформатированные диски, создавая 200 Мб раздел
  * См. [Руководство по Multiboot](https://hackintosh-multiboot.gitbook.io/hackintosh-multiboot/) для получения информации о разбивке Windows диска

Как только начнётся установка, вам нужно будет подождать до момента перезагрузки системы. После, вы снова загружаетесь в OpenCore, но вместо того чтобы выбрать installer/recovery с USB - вы захотите выбрать macOS installer на жестком диске, чтобы продолжить установку. У вас должен появится логотип Apple, и через несколько минут внизу появится таймер с надписью "осталось около x мин". Может быть это хорошее время, чтобы попить или перекусить, поскольку это займет некоторое время. Он может перезагрузиться ещё пару раз, но если всё пойдёт хорошо, он должен вывести вас на экран "Настройка вашего Mac"

Вы в деле! 🎉
Вам нужно будет пройти через страницы после установки, чтобы завершить настройку вашей системы.