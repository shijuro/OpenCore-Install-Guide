# Создание установщика в Linux

* Поддерживаемая версия: 0.6.5

В то время как вам не нужна чистая установка macOS чтобы использовать OpenCore, некоторые пользователи предпочитают иметь свежую версию ОС с обновлением их Boot Manager.

Чтобы начать, вам нужно:

* 4Гб USB флешка
* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)

## Скачивание macOS

Для начала, cd в [папку macrecovery](https://github.com/acidanthera/OpenCorePkg/releases) и запустите одну из следующих команд:

![](../../img/installer-guide/legacy-mac-install-md/macrecovery.png)

```sh
# Настройте команду ниже в нужную папку
cd ~/Downloads/OpenCore-0/Utilities/macrecovery/
```

Далее, запустите одну из следующих команд, в зависимости от того, какую ОС вы хотите загружать:

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
```

Начиная отсюда, выполните одну из этих команд в терминале и, когда вы закончите, вы получите результат, похожий на этот:

![](../../img/installer-guide/legacy-mac-install-md/download-done.png)

* **Примечание**: В зависимости от ОС, вы получите BaseSystem или RecoveryImage файлы. Они оба действуют одинаково, поэтому, когда мы ссылаемся на BaseSystem, та же информация относит и к RecoveryImage

* **Примечание к macOS 11, Big Sur**: Так как эта ОС совершенна новая, есть некоторые проблемы с определенными системами, которые нужно решить. Для получения дополнительной информации, смотрите здесь: [OpenCore и macOS 11: Big Sur](../extras/big-sur/README.md)
  * Для начинающих пользователей, мы рекомендуем macOS 10.15, Catalina
* **Примечание к GPU Nvidia**: напоминание о том, чтобы проверить, поддерживает ли ваше оборудование новые ОС, смотрите [Аппаратные ограничения](../macos-limits.md)

## Создание установщика

Этот раздел предназначен для создания необходимых разделов на USB накопителе. Вы можете использовать свою любимую программу, будь то `gdisk`, `fdisk`, `parted`, `gparted` или `gnome-disks`. Это руководство будет сосредоточено на `gdisk`, поскольку он приятен и может изменить тип раздела позже, так как это нам надо, чтобы macOS Recovery HD смог загрузиться. (дистрибутив используемый здесь - Ubuntu 18.04, другие версии или дистрибутивы тоже могут работать)

Благодарим [midi1996](https://github.com/midi1996) за его работу над [Internet Install Guide](https://midi1996.github.io/hackintosh-internet-install-gitbook/), которое является основой для этого.

### Метод 1

В терминале:

1. запустите `lsblk` и определите блок вашего USB накопителя
  ![lsblk](../../img/installer-guide/linux-install-md/unknown-5.png)
2. запустите `sudo gdisk /dev/<ваш USB блок>`
   1. если вас спросят, какую таблицу разделов использовать, выберите GPT.
      ![Select GPT](../../img/installer-guide/linux-install-md/unknown-6.png)
   2. отправьте `p` чтобы показать your разделы вашего блока \(и убедитесь, что это именно тот, который нужен\)
      ![](../../img/installer-guide/linux-install-md/unknown-13.png)
   3. отправьте `o` чтобы очистить таблицу разделов и создать новый GPT (если он не пустой)
      1. подтвердите с помощью `y`
         ![](../../img/installer-guide/linux-install-md/unknown-8.png)
   4. отправьте `n`
      1. `partition number`: оставьте пустым по умолчанию
      2. `first sector`: оставьте пустым по умолчанию
      3. `last sector`: оставить пустым для всего диска
      4. `Hex code or GUID`: `0700` для типа раздела Microsoft basic data
   5. отправьте `w`
      * подтвердите с помощью `y`
      ![](../../img/installer-guide/linux-install-md/unknown-9.png)
      * В некоторых случаях потребуется перезагрузка, но это редко, если вы хотите быть уверены, перезагрузите компьютер. Вы также можете попробовать переподключить ваш USB накопитель.
   6. закройте `gdisk`, отправив `q` (обычно он должен сам закрываться)
3. используйте `lsblk` для определения идентификаторов вашего раздела
4. запустите `sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<блок раздела вашего USB>`, чтобы отформатировать ваш USB накопитель в FAT32 и назвать OPENCORE
5. затем `cd` в `/OpenCore/Utilities/macrecovery/` и вы должны попасть к `.dmg` и `.chunklist` файлам
   1. смонтируйте ваш USB раздел с помощью `udisksctl` (`udisksctl mount -b /dev/<блок раздела вашего USB>`, sudo не требуется в большинстве случаев) или с помощью `mount` (`sudo mount /dev/<блок раздела вашего USB> /где/ваш/смонтированный/стафф`, требуется sudo)
   2. `cd` в USB накопитель и `mkdir com.apple.recovery.boot` в корне вашего USB FAT32 раздела
   3. теперь `cp` или `rsync` как `BaseSystem.dmg`, так и `BaseSystem.chunklist` в папку `com.apple.recovery.boot`.

### Метод 2 (в случае, если метод 1 не работает)

В терминале:

1. запустите `lsblk` и определите блок вашего USB накопителя
   ![](../../img/installer-guide/linux-install-md/unknown-11.png)
2. запустите `sudo gdisk /dev/<ваш USB блок>`
   1. если вас спросят, какую таблицу разделов использовать, выберите GPT.
      ![](../../img/installer-guide/linux-install-md/unknown-12.png)
   2. отправьте `p` чтобы показать your разделы вашего блока \(и убедитесь, что это именно тот, который нужен\)
      ![](../../img/installer-guide/linux-install-md/unknown-13.png)
   3. отправьте `o` чтобы очистить таблицу разделов и создать новый GPT (если он не пустой)
      1. подтвердите с помощью `y`
         ![](../../img/installer-guide/linux-install-md/unknown-14.png)
   4. отправьте `n`
      1. partition number: оставьте пустым по умолчанию
      2. first sector: оставьте пустым по умолчанию
      3. last sector: `+200M` чтобы создать 200Мб раздел, который позже будет назван OPENCORE
      4. Hex code or GUID: `0700` для типа раздела Microsoft basic data
      ![](../../img/installer-guide/linux-install-md/unknown-15.png)
   5. отправьте `n`
      1. partition number: оставьте пустым по умолчанию
      2. first sector: оставьте пустым по умолчанию
      3. last sector: оставьте пустым по умолчанию \(или вы можете сделать его `+3G`, если вы хотите разделить остальную часть USB\)
      4. Hex code or GUID: `af00` для типа раздела Apple HFS/HFS+
      ![](../../img/installer-guide/linux-install-md/unknown-16.png)
   6. отправьте `w`
      * подтвердите с помощью `y`
      ![](../../img/installer-guide/linux-install-md/unknown-17.png)
      * В некоторых случаях потребуется перезагрузка, но это редко, если вы хотите быть уверены, перезагрузите компьютер. Вы также можете попробовать переподключить свой USB накопитель.
   7. закройте `gdisk`, отправив `q` (обычно он должен сам закрываться)
3. Используйте `lsblk` снова для определения 200Мб и других разделов
   ![](../../img/installer-guide/linux-install-md/unknown-18.png)
4. запустите `sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<ваш 200Мб блок раздела>`, чтобы отформатировать 200Мб раздел в FAT32 и назвать OPENCORE
5. затем `cd` в `/OpenCore/Utilities/macrecovery/` и вы должны попасть к `.dmg` и `.chunklist` файлам
   1. смонтируйте ваш USB раздел с помощью `udisksctl` (`udisksctl mount -b /dev/<блок раздела вашего USB>`, sudo не требуется в большинстве случаев) или с помощью `mount` (`sudo mount /dev/<блок раздела вашего USB> /где/ваш/смонтированный/стафф`, требуется sudo)
   2. `cd` в USB накопитель и `mkdir com.apple.recovery.boot` в корне вашего USB FAT32 раздела
   3. загрузите `dmg2img` (доступно на большинстве дистрибутивов)
   4. запустите `dmg2img -l BaseSystem.dmg` и определите, какой раздел имеет свойство `disk image`
      ![](../../img/installer-guide/linux-install-md/unknown-20.png)
   5. запустите `dmg2img -p <номер раздела> -i BaseSystem.dmg -o <ваш 3Гб+ блок раздела>` для извлечения и записи образа восстановления на диск раздела
      * Это займет некоторое время. МНОГО, если вы используете медленный USB.
      ![](../../img/installer-guide/linux-install-md/unknown-21.png)

## Теперь, когда это всё сделано, перейдите к [Настройке EFI](./opencore-efi.md), чтобы закончить работу
