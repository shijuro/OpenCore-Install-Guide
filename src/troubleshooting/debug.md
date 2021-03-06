# Отладка OpenCore

* Поддерживаемая версия: 0.6.9

Вам нужно выяснить, почему у вас возникают проблемы или зависания? Что ж, вы пришли по нужному адресу:

* [Изменения файлов](#изменения-фаилов)
* [Изменения в конфигурационном файле](#изменения-в-конфигурационном-фаиле)
* [Отключение всего логирования](#отключение-всего-логирования)

## Изменения файлов

Для начала убедитесь, что вы используете либо `DEBUG`, либо `NOOPT` версии OpenCore. Это предоставит больше информации, чем `RELEASE` версия. Конкретные файлы, которые нужно поменять:

* EFI/BOOT/
  * `BOOTx64.efi`
* EFI/OC/Bootstrap/
  * `Bootstrap.efi`
* EFI/OC/Drivers/
  * `OpenRuntime.efi`
  * `OpenCanopy.efi`(если вы используете это)
* EFI/OC/
  * `OpenCore.efi`

![](../../img/troubleshooting/debug-md/replace.png)

* **Примечание**: Как правило, лучше всего отлаживать системы без OpenCanopy, если он требуется, убедитесь, что этот файл взят из DEBUG версии, в противном случае отладочной информации практически не будет.

## Изменения в конфигурационном файле

Затем, перейдите к своему config.plist и найдите раздел `Misc`, у нас есть пара записей, с которыми мы хотим поиграть здесь:

### Misc

Здесь мы хотим включить следующее:

* **AppleDebug**: YES
  * Предоставляет гораздо больше отладочной информации, относящейся к boot.efi, а также сохраняет логи на диск.

* **ApplePanic**: YES
  * Позволяет хранится логам паники ядра на диске, настоятельно рекомендуется оставить `keepsyms=1` в boot-args, чтобы сохранить как можно больше информации.

* **DisableWatchdog**: YES
  * Отключает сторожевой таймер (англ. watchdog) UEFI, используемый когда OpenCore останавливается на чем-то некритичном.

* **Target**: `67`(или рассчитайте значение ниже)
  * Используется для включения различных уровней отладки

| Значение | Комментарий |
| :--- | :--- |
| `0x01` | Включает логирование |
| `0x02` | Включает вывод отладки на экран |
| `0x04` | Включает логирование в Data Hub. |
| `0x08` | Включает логирование последовательных портов. |
| `0x10` | Включает логирование переменных UEFI. |
| `0x20` | Включает логирование энергонезависимых переменных UEFI. |
| `0x40` | Включает логирование в файл. |

Для вычисления значения Target, мы можем использовать HEX калькулятор, а затем конвертировать в десятичное значение. Для нас, мы хотим чтобы наши значения хранились в .txt файле для последующего просмотра:

* `0x01` — Включает логирование
* `0x02` — Включает вывод отладки на экран
  * Обратите внимание, что это может сильно увеличить время загрузки на прошивках с плохой имплементацией GOP
* `0x10` — Включает логирование переменных UEFI.
* `0x40` — Включает логирование в файл.

`0x01` + `0x02` + `0x10` + `0x40` = `0x53`

`0x53` конвертацией в десятичное значение становится `83`

Итак, мы можем установить `Misc` -> `Debug` -> `Target` -> `83`

* **DisplayLevel**: `2147483714`(или рассчитайте значение ниже)
  * Используется для настройки того, что логируется

| Значение | Комментарий |
| :--- | :--- |
| `0x00000002` | DEBUG_WARN в DEBUG, NOOPT, RELEASE. |
| `0x00000040` | DEBUG_INFO в DEBUG, NOOPT. |
| `0x00400000` | DEBUG_VERBOSE в Custom Builds. |
| `0x80000000` | DEBUG_ERROR в DEBUG, NOOPT, RELEASE. |

  Полный список можно найти в [DebugLib.h](https://github.com/tianocore/edk2/blob/UDK2018/MdePkg/Include/Library/DebugLib.h).

Нам просто нужно следующее:

* `0x00000002` — DEBUG_WARN в DEBUG, NOOPT, RELEASE.
* `0x00000040` — DEBUG_INFO в DEBUG, NOOPT.
* `0x80000000` — DEBUG_ERROR в DEBUG, NOOPT, RELEASE.

Как и с `Target`, мы используем HEX калькулятор, а затем конвертируем в десятичное значение:

`0x80000042` конвертированное в десятичное `Misc` -> `Debug` -> `DisplayLevel` -> `2147483714`

После этого, ваш config.plist должен выглядеть так:

![](../../img/troubleshooting/debug-md/debug.png)

## Отключение всего логирования

Чтобы убрать всё логирование в файлы, и отладочные сообщения, просто замените все файлы на те, которые находится в RELEASE версии, как мы делали до этого в разделе [File Swap](#file-swap)

А для того, чтобы убрать запись на диск, установите следующее:

* AppleDebug = `NO`
* ApplePanic = `NO`
* Target = `0`
