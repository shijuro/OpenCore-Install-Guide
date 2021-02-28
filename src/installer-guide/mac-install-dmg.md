# Устаревшие версии macOS: образы дисков

Этот метод полагается на размещенные образы от Apple или Acidanthera, и восстанавливаются на ваш диск.

#### Образы Acidanthera

Ниже, установщики были извлечены с подлинных дисков восстановления Mac с удаленной блокировкой SMBIOS, сожержимое самой OS X не было никаким образом модифицированно.

* [OS X 10.4.10(8R4088)](https://archive.org/details/10.4.10-8-r-4088-acdt)[Зеркало на MEGA](https://mega.nz/folder/D3ASzLzA#7sjYXE2X09f6aGjol_C7dg)

* [OS X 10.5.7(9J3050)](https://archive.org/details/10.5.7-9-j-3050)[Зеркало на MEGA](https://mega.nz/folder/inRBTarD#zanf7fUbviwz3WHBU5xpCg)

* [OS X 10.6.7(10J4139)](https://archive.org/details/10.6.7-10j3250-disk-images)[Зеркало на MEGA](https://mega.nz/folder/z5YUhYTb#gA_IRY5KMuYpnNCg7kR3ug/file/ioQkTagI)

#### Образы Apple

Обратите внимание на то, что для получения доступа к этим образам, требуется аккаунт разработчика Apple.

* [OS X 10.5.0 Golden Master(9a581)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_v10.5_leopard_9a581/leopard_9a581_userdvd.dmg)

* [OS X 10.6.0 Golden Master(10a432)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_version_10.6_snow_leopard_build_10a432/mac_os_x_v10.6_build_10a432_user_dvd.dmg)

### Восстановление диска

Сейчас наступает интересная часть; в первую очередь, вы захотите открыть dmg, который вы скачали, и смонтировать его. Теперь открывайте Дисковую Утилиту и отформатируйте ваш накопитель как macOS Extended (HFS+) со схемой разделов GUID:

![Форматирование USB](../../img/installer-guide/mac-install-md/format-usb.png)

Теперь у нас есть два варианта:

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

Это может занять некоторое время, но когда вы закончите, вы можете переходить к [Настройке EFI окружения OpenCore](./mac-install.md#настроика-efi-окружения-opencore)
  
#### Дисковая Утилита

Из-за некоторых неприятных проблем с Дисковой Утилитой, многие попытки восстановления могут оказаться неудачными, если включен SIP. Если у вас есть проблемы, мы рекомендуем либо воспользоваться [Методом ASR](#asr), либо отключить SIP.

Чтобы начать, откройте Дисковую Утилиту и вы должны увидеть ваш USB накопитель и образ диска в боковой панели.

![](../../img/installer-guide/legacy-mac-install-md/pre-restore.png)
![](../../img/installer-guide/legacy-mac-install-md/restore.png)

::: details Решение проблем

Если вы во время восстановления получили ошибку похожую на эту:

![](../../img/installer-guide/legacy-mac-install-md/sip-fail.png)

Это означает то, что SIP должен быть выключен, однако мы вместого этого рекомендуем использовать [Метод ASR](#asr).

:::

Это может занять некоторое время, но когда вы закончите, вы можете переходить к [Настройке EFI окружения OpenCore](#настроика-efi-окружения-opencore)
