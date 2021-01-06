# Аппаратные ограничения

В macOS присутсвует множество аппаратных ограничений, о которых вы должны знать, прежде чем приступать к установке. Это связанно с ограниченным количеством оборудования поддерживаемым Apple, так что мы либо ограничены либо самой компанией Apple, либо патчами которые были созданы сообществом.

Основные разделы для проверки оборудования:

* [CPU](#поддержка-cpu)
* [GPU](#поддержка-gpu)
* [Материнская плата](#поддержка-материнскои-платы)
* [Накопитель](#поддержка-накопителеи)
* [Проводная сеть](#проводная-сеть)
* [Беспроводная сеть](#беспроводная-сеть)
* [Прочее](#прочее)

Более подробные руководства по этой теме, смотрите здесь:

* [Руководство по покупке GPU (на английском)](https://dortania.github.io/GPU-Buyers-Guide/)
  * Проверьте, поддерживается ли ваш графический процессор и какую версию macOS вы сможете запустить.
* [Руководство по покупке оборудования поддерживающие беспроводные сети (на английском)](https://dortania.github.io/Wireless-Buyers-Guide/)
  * Проверьте, поддерживается ли ваша Wi-Fi карта
* [Какое оборудование не стоит покупать (на английском)](https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/)
  * Общее руководство, какого оборудования стоит избегать и с какими подводными камнями ваше оборудование может столкнуться.

## Поддержка CPU

Для поддержки процессора, мы следуем этой разбивке:

* Поддерживаются как 32-битные, так и 64-битные процессоры
  * Однако, требуется поддержка вашей архитектуры в ОС; смотрите раздел ниже "Требования к процессору"
* Поддерживаются процессоры Intel для настольных ПК.
  * В этом руководстве поддерживаются процессоры начиная с Yonah и заканчивая Comet Lake
* Процессоры Intel для высокопроизводительных ПК (High-End Desktops) и серверные процессоры Intel.
  * В этом руководстве поддерживаются процессоры начиная с Nehalem и заканчивая Cascade Lake X
* Процессоры Intel для ноутбуков серии Core "i" и Xeon
  * В этом руководстве поддерживаются процессоры начиная с Arrendale и заканчивая Ice Lake.
  * Обратите внимание на то, что серии мобильных процессоров Atom, Celeron и Pentium не поддерживаются
* Процессоры AMD для настольных ПК: Bulldozer (15h), Jaguar (16h) и Ryzen (17h)
  * Процессоры для ноутбуков **не** поддерживаются
  * Обратите внимание на то, что не все функции macOS поддерживаются с AMD процессорами, смотрите ниже

**Для получения более подробной информации, смотрите здесь: [Какое оборудование не стоит покупать (на английском)](https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/)**

::: details Требования к процессору

Требования к архитектуре:

* 32-битные процессоры поддерживаются с 10.4.1 по 10.6.8
  * Обратите внимание, что версии 10.7.x требуется 64-разрядный пользовательское пространство (userspace), поэтому 32-битные процессоры ограничены версией 10.6
* 64-битные процессоры поддерживаются с 10.4.1 по текущую версию

Требования к SEE:

* SSE3 требуется для всех Intel версий OS X/macOS
* SSSE3 требуется для всех 64-битных версий OS X/macOS
  * Для процессоров с отсутствующим SSSE3 (т.е. определенные 64-битных Pentium), мы рекомендуем запускать 32-битный userspace (`i386-user32`)
* SSE4 требуется для macOS 10.12 и новее
* SSE4.2 требуется для macOS 10.14 и новее
  * SSE4.1 процессоры поддерживаются с помощью [telemetrap.kext](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/post-28447707)
  * Новые AMD драйвера [?] также требуют SSE4.2 для поддержки Metal API. Чтобы разрешить эту проблему, смотрите здесь: [MouSSE: SSE4.2 emulation](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/)

Требования к микропрограммному обеспечению (firmware):

* С OS X 10.4.1 по 10.4.7 требуется EFI32 (т.е. IA32 (32-битная) версия OpenCore)
  * С OS X 10.4.8 по 10.7.5 поддерживает как EFI32, так и EFI64
* OS X 10.8 и новее требуют EFI64 (т.е. x64 (64-битная) версия OpenCore)
* С OS X 10.7 по 10.9 требуется PartitionDxe.efi чтобы загружать раздел Recovery

Требования к ядру:

* OS X 10.4 и 10.5 требуют 32-битные кексты из-за поддержки только 32-битного пространства ядра (kernelspace)
  * OS X 10.6 и 10.7 поддерживают как 32-битное, так и 64-битное пространство ядра
* OS X 10.8 и новее требуют 64-битные кексты из-за поддержки только 64-битного пространства ядра
  * Запустите `lipo -archs`, чтобы узнать, какие архитектуры поддерживаются вашим кекстом (не забудьте запустить её в бинарном виде, а не в пакете .kext)

Особые примечания:

* Lilu и плагины к нему требуют версии 10.8 или новее для его работы
  * Мы рекомендуем использовать FakeSMC для более старых версий OS X
* OS X 10.6 и старее требуют включенного RebuildAppleMemoryMap
  * Это необходимо для того, чтобы исправить раннее ядро (resolve an early kernel)

:::

::: details Таблица поддержки процессоров Intel

Поддержка на базе ванильных ядер (т.е. без модификаций):

| Поколение процессора | Первоначальная поддержка | Последняя поддерживаемая версия | Примечания | CPUID |
| :--- | :--- | :--- | :--- | :--- |
| [Pentium 4](https://en.wikipedia.org/wiki/Pentium_4) | 10.4.1 | 10.5.8 | Используется только в наборах для разработчиков | 0x0F41 |
| [Yonah](https://en.wikipedia.org/wiki/Yonah_(microprocessor)) | 10.4.4 | 10.6.8 | 32-бит | 0x0006E6 |
| [Conroe](https://en.wikipedia.org/wiki/Conroe_(microprocessor)), [Merom](https://en.wikipedia.org/wiki/Merom_(microprocessor)) | 10.4.7 | 10.11.6 | No SSE4 | 0x0006F2 |
| [Penryn](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 10.4.10 | 10.13.6 | Без SSE4.2 | 0x010676 |
| [Nehalem](https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)) | 10.5.6 | <span style="color:green"> Текущая </span> | N/A | 0x0106A2 |
| [Lynnfield](https://en.wikipedia.org/wiki/Lynnfield_(microprocessor)), [Clarksfield](https://en.wikipedia.org/wiki/Clarksfield_(microprocessor)) | 10.6.3 | ^^ | Нет поддержки iGPU в 10.14+ | 0x0106E0 |
| [Westmere, Clarkdale, Arrandale](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | 10.6.4 | ^^ | ^^ | 0x0206C0 |
| [Sandy Bridge](https://en.wikipedia.org/wiki/Sandy_Bridge) | 10.6.7 | ^^ | ^^ | 0x0206A0(M/H) |
| [Ivy Bridge](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.7.3 | ^^ | Нет поддержки iGPU в 11+ | 0x0306A0(M/H/G) |
| [Ivy Bridge-E5](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.9.2 | ^^ | N/A | 0x0306E0 |
| [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture)) | 10.8.5 | ^^ | ^^ | 0x0306C0(S) |
| [Broadwell](https://en.wikipedia.org/wiki/Broadwell_(microarchitecture)) | 10.10.0 | ^^ | ^^ | 0x0306D4(U/Y) |
| [Skylake](https://en.wikipedia.org/wiki/Skylake_(microarchitecture)) | 10.11.0 | ^^ | ^^ | 0x0506e3(H/S) 0x0406E3(U/Y) |
| [Kaby Lake](https://en.wikipedia.org/wiki/Kaby_Lake) | 10.12.4 | ^^ | ^^ | 0x0906E9(H/S/G) 0x0806E9(U/Y) |
| [Coffee Lake](https://en.wikipedia.org/wiki/Coffee_Lake) | 10.12.6 | ^^ | ^^ | 0x0906EA(S/H/E) 0x0806EA(U)|
| [Amber](https://en.wikipedia.org/wiki/Kaby_Lake#List_of_8th_generation_Amber_Lake_Y_processors), [Whiskey](https://en.wikipedia.org/wiki/Whiskey_Lake_(microarchitecture)), [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.14.1 | ^^ | ^^ | 0x0806E0(U/Y) |
| [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.15.4 | ^^ | ^^ | 0x0906E0(S/H)|
| [Ice Lake](https://en.wikipedia.org/wiki/Ice_Lake_(microprocessor)) | ^^ | ^^ | ^^ | 0x0706E5(U) |
| [Tiger Lake](https://en.wikipedia.org/wiki/Tiger_Lake_(microprocessor)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Не тестировалось </span> | 0x0806C0(U) |

:::

::: details Ограничения процессоров AMD в macOS

К сожалению, многие функции в macOS полностью не поддерживаются с AMD процессорами и многие другие частично сломаны. Они включают:

* Виртуальные машины базирующуюся на AppleHV
  * Сюда входят VMWare, Parallels, Docker, Android Studios, и т.д.
  * VirtualBox - единственное исключение, потому что у него есть собственный гипервизор
  * VMware 10 и Parallels 13.1.0 поддерживают собственный гипервизор, однако использование такого устаревшего ПО для виртуальных машин представляет большую угрозу безопасности
* Поддержка Adobe программ
  * Большая часть программ Adobe используют набор инструкций Intel Memfast, что в итоге вызывает краши с AMD процессорами
  * Вы можете выключить такие функции, как поддержка RAW, во избежания крашей: [Adobe Fixes](https://gist.github.com/naveenkrdy/26760ac5135deed6d0bb8902f6ceb6bd)
* 32-битная поддержка
  * Для тех, кто полагается на 32-битное ПО в Mojave и ниже, обратите внимание на то, что ванильные патчи не поддерживают 32-битные инструкции
  * Обходное решение - установить [кастомное ядро (на английском)](https://amd-osx.com/download/kernel.html), однако вы потеряете поддержку iMessage
* Проблема стабильности во многих приложениях
  * Аудио-приложения больше всего подвержены этим проблемам, к примеру - Logic Pro
  * Известно, что в DaVinci Resolve также возникают нерегулярные проблемы

:::

## Поддержка GPU

Поддержка графических процессоров усложняется из-за почти бесконечного количества графических процессоров на рынке, но общая разбивка выглядит так:

* Графические процессоры AMD на базе GCN поддерживаются в последних версиях macOS
  * Однако, APU AMD не поддерживаются
  * Графические процессоры AMD [на базе ядра Lexa](https://www.techpowerup.com/gpu-specs/amd-lexa.g806) из серии Polaris также не поддерживаются
  * Специальное примечание для пользователей MSI Navi: [Installer not working with 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901)
    * Этой проблемы больше нет в macOS 11 (Big Sur).
* Поддержка графических процессоров Nvidia сложна:
  * Графические процессоры [Maxwell(9XX)](https://en.wikipedia.org/wiki/GeForce_900_series) и [Pascal(10XX)](https://en.wikipedia.org/wiki/GeForce_10_series) ограничены версией macOS 10.13 High Sierra
  * Графические процессоры [Nvidia Turing(20XX,](https://en.wikipedia.org/wiki/GeForce_20_series)[16XX)](https://en.wikipedia.org/wiki/GeForce_16_series) **не поддерживаются ни в какой версии macOS**
  * Графические процессоры [Nvidia Ampere(30XX)](https://en.wikipedia.org/wiki/GeForce_30_series) **не поддерживаются ни в какой версии macOS**
  * Графические процессоры [Nvidia Kepler(6XX,](https://en.wikipedia.org/wiki/GeForce_600_series)[7XX)](https://en.wikipedia.org/wiki/GeForce_700_series) поддерживаются в последних версиях macOS (включая macOS 11 Big Sur)
    * Это связано с тем, что Apple всё ещё поддерживают некоторые [MacBook Pro с графическими процессорами Nvidia](https://dortania.github.io/GPU-Buyers-Guide/modern-gpus/nvidia-gpu.html)
* Интегрированные графические процессоры (iGPU) Intel серии [GT2+ tier](https://en.wikipedia.org/wiki/Intel_Graphics_Technology)
  * В этом руководстве рассматривается поддержка iGPU начиная с Ivy Bridge заканчивая Ice Lake
    * Информацию про iGPU серии GMA можно найти здесь: [GMA Patching](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/)
  * Следует отметить, что GT2 относится к серии iGPU, младшие (low-end) iGPU серии GT1 найденные на Pentium, Celeron и Atom не поддерживаются в macOS

И важное примечание для **ноутбуков с дискретными графическими процессорами**:

* 90% дискретных графических процессоров не будут работать, потому что они подключены в конфигурации, которую macOS не поддерживает (переключаемая графика; англ. - switchable graphics). У дискретных графических процессоров NVIDIA это обычно называется Optimus. Использовать эти дискретные графические процессоры для дисплея ноутбука невозможно, поэтому обычно рекомендуется отключить его (об этом будет рассказано позже в этом руководстве).
* Однако, в некоторых случаях, дискретный графический процессор "питает" любые внешние выходы (HDMI, mini DisplayPort и т.д.), которые могут работать или не работать; в том случае, если он будет работать, вам придётся оставить карту работающей
* Однако, есть ноутбуки, которые редко не имеют переключаемой графики, поэтому можно использовать дискретную карту (если она поддерживается macOS), но подключение и настройка её обычно вызывает проблемы.

**Для получения полного списка поддерживаемых графических процессоров, смотрите [Руководство по покупке GPU (на английском)](https://dortania.github.io/GPU-Buyers-Guide/)**

::: details Таблица поддержки графических процессоров Intel

| Поколение GPU | Первоначальная поддержка | Последняя поддерживаемая версия | Примечания |
| :--- | :--- | :--- | :--- |
| [3е поколение GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Third_generation) | 10.4.1 | 10.7.5 | [Требуется 32-битное ядро и патчи (на английском)](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/legacy-intel/) |
| [4ое поколение GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen4) | 10.5.0 | ^^ | ^^ |
| [Arrendale(HD Graphics)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen5) | 10.6.4 | 10.13.6 | Поддерживается только LVDS, eDP и внешние выходы не поддерживаются |
| [Sandy Bridge(HD 3000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen6) | 10.6.7 | ^^ | N/A |
| [Ivy Bridge(HD 4000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.7.3 | 10.15.7 | ^^ |
| [Haswell(HD 4XXX, 5XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.8.5 | <span style="color:green"> Текущая </span> | ^^ |
| [Broadwell(5XXX, 6XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen8) | 10.10.0 | ^^ | ^^ |
| [Skylake(HD 5XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.11.0 | ^^ | ^^ |
| [Kaby Lake(HD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.12.4 | ^^ | ^^ |
| [Coffee Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.13.6 | ^^ | ^^ |
| [Comet Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.15.4 | ^^ | ^^ |
| [Ice Lake(Gx)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen11) | 10.15.4 | ^^ | Требует добавления `-igfxcdc` и `-igfxdvmt` в boot-args |
| [Tiger Lake(Xe)](https://en.wikipedia.org/wiki/Intel_Xe) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Нет доступных драйверов </span> |

Примечание: Apple оставила драйвера iGPU Ivy Bridge в macOS 11 Big Sur, однако их планируются удалить. Пожалуйста, имейте в виду то, что они могут быть удалены позже.

:::

::: details Таблица поддержки графических процессоров AMD

| Поколение GPU | Первоначальная поддержка | Последняя поддерживаемая версия | Примечания |
| :--- | :--- | :--- | :--- |
| [X800](https://en.wikipedia.org/wiki/Radeon_X800_series) | 10.3.x | 10.7.5 | Требуется 32-битное ядро |
| [X1000](https://en.wikipedia.org/wiki/Radeon_X1000_series) | 10.4.x | ^^ | N/A |
| [Terascale](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Terascale 2/3](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.6.x | ^^ | ^^ |
| [GCN 1](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.8.3 | <span style="color:green"> Текущая </span> | ^^ |
| [GCN 2/3](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.10.x | ^^ | ^^ |
| [Polaris 10](https://en.wikipedia.org/wiki/Radeon_RX_400_series), [20](https://en.wikipedia.org/wiki/Radeon_RX_500_series) | 10.12.1 | ^^ | ^^ |
| [Vega 10](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.12.6 | ^^ | ^^ |
| [Vega 20](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.14.5 | ^^ | ^^ |
| [Navi 10](https://en.wikipedia.org/wiki/Radeon_RX_5000_series) | 10.15.1 | ^^ | Требует добавления `agdpmod=pikera` в boot-args |
| [Navi 20](https://en.wikipedia.org/wiki/Radeon_RX_6000_series) | 11.2? | ^^ | Текущие драйверы не работают |

:::

::: details Таблица поддержки графических процессоров Nvidia

| Поколение GPU | Первоначальная поддержка | Последняя поддерживаемая версия | Примечания |
| :--- | :--- | :--- | :--- |
| [GeForce 6](https://en.wikipedia.org/wiki/GeForce_6_series) | 10.2.x | 10.7.5 | Требуется 32-битное ядро и [патчинг NVCAP (на английском)](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [GeForce 7](https://en.wikipedia.org/wiki/GeForce_7_series) | 10.4.x | ^^ | [Требуется патчинг NVCAP (на английском)](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [Tesla](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Tesla V2](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)#Tesla_2.0) | 10.5.x | ^^ | ^^ |
| [Fermi](https://en.wikipedia.org/wiki/Fermi_(microarchitecture)) | 10.7.x | ^^ | ^^ |
| [Kepler](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.7.x | <span style="color:green"> Текущая </span> | N/A |
| [Kepler V2](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.8.x | ^^ | ^^ |
| [Maxwell](https://en.wikipedia.org/wiki/Maxwell_(microarchitecture)) | 10.10.x | 10.13.6 | [Требуются веб-драйвера](https://www.nvidia.com/download/driverResults.aspx/149652/) |
| [Pascal](https://en.wikipedia.org/wiki/Pascal_(microarchitecture)) | 10.12.4 | ^^ | ^^ |
| [Turing](https://en.wikipedia.org/wiki/Turing_(microarchitecture)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Нет доступных драйверов </span> |
| [Ampere](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) | ^^ | ^^ | ^^ |

:::

## Поддержка материнской платы

По большей части, все материнские платы поддерживаются до тех пор, пока в ней есть процессор. Ранее на платах B550 были проблемы:

* [~~Платы AMD B550~~](https://en.wikipedia.org/wiki/List_of_AMD_chipsets)

Однако, благодаря недавним разработкам, на платах B550 теперь можно загружаться в macOS с добавлением [SSDT-CPUR](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/SSDT-CPUR.dsl). Более подробная информация будет предоставлена в разделах [Сбор файлов](./ktext.md) и [секции config.plist Zen](./AMD/zen.md)

## Поддержка накопителей

По большей части, все SATA накопители поддерживаются, а также большинство NVMe накопителей. Есть несколько исключений:

* **Samsung PM981, PM991 и Micron 2200S NVMe SSD**
  * Эти SSD несовместимы из коробки (вызывая паники ядра) и, следовательно, требует [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases), чтобы починить эти паники ядра. Обратите внимание, что эти накопители могут вызывать проблемы с загрузкой, даже с NVMeFix.kext.
  * В связи с этим же, Samsung 970 EVO Plus NVMe SSD имел такую же проблему, но она была починена в обновлении прошивки; получить обновление (в Windows через Samsung Magician или загрузочный ISO) [здесь](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/).
  * Также следует отметить, что ноутбуки которые используют [Intel Optane Memory](https://www.intel.com/content/www/us/en/architecture-and-technology/optane-memory.html) или [Micron 3D XPoint](https://www.micron.com/products/advanced-solutions/3d-xpoint-technology) для ускорения жёсткого диска - не поддерживаются в macOS. Некоторые пользователи рассказали об удачном запуске памяти в Catalina, даже с поддержкой чтения и записи, но мы настоятельно рекомендуем убрать этот накопитель, чтобы исключить любые потенциальные проблемы при загрузке.

## Проводная сеть

Практически все проводные сетевые адаптеры в той или иной форме поддерживаются в macOS, ибо с помощью встроенных драйверов, либо с помощью кекстами, созданных сообществом. Основные исключения:

* Сеть Intel 2.5GBe i225
  * Найдено на плате Comet Lake высокопроизводительного ПК (high-end Desktop)
  * Возможны обходные пути: [Источник](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059) и [Пример](../config.plist/comet-lake.md#deviceproperties)
* Серверные сетевые карты Intel
  * Обходные пути возможны для [X520 и X540 чипсетов](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)
* Серверные сетевые карты Mellanox и Qlogic

## Беспроводная сеть

Большинство Wi-Fi карт, которые поставляются с ноутбуками - не поддерживаются, поскольку это обычно Intel/Qualcomm. Если вам повезет, у вас может быть поддерживаемая карта Atheros, но поддерживается только до High Sierra.

Лучшим вариантом является получение поддерживаемой карты от Broadcom; смотрите [Руководство по покупке оборудования поддерживающие беспроводные сети (на английском)](https://dortania.github.io/Wireless-Buyers-Guide/) для получения рекомендаций.

## Прочее

* **Сенсоры отпечатков пальцев**
  * В настоящее время нет возможности эмулировать сенсор Touch ID, поэтому сенсоры отпечатков пальцев не будут работать.
* **Распознавание лиц Windows Hello (Windows Hello Face Recognition; сокр. - WHFR)**
  * Некоторые ноутбуки поставляются с WHFR, которые подключены по I2C (и используется через ваш iGPU), то это не будут работать.
  * Некоторые ноутбуки поставляются с WHFR, которые подключены по USB, если вам повезет, вы сможете получить функциональность камеры, но ничего больше.
* **Технология Intel Smart Sound**
  * Ноутбуки с Intel SST не будут иметь ничего рабочего, подключенного через неё (обычно внутренний микрофон), так как эта технология не поддерживается. Вы можете проверить это с помощью диспетчера устройств в Windows.
* **Комбинированный разъем для наушников**
  * Некоторые ноутбуки с комбинированным разъемом для наушников могут быть с не совсем рабочим аудиовходом, поэтому придётся использовать либо встроенный микрофон, либо внешнее устройство аудиовхода через USB
* **Порты Thunderbolt USB-C**
  * (Хакинтош) Поддержка Thunderbolt в настоящее время остаётся сомнительной в macOS, особенно с контроллерами Alpine Ridge, которые есть в большинстве современных ноутбуков. Были попытки оставить контроллер включенным, что позволяет работать горячему подключению Thunderbolt и USB-C, но это происходит ценой паники ядра и/или выхода из строя USB-C после сна. Если вы хотите использовать порт USB-C и иметь возможность спать, вы должны подключить его при загрузке и оставить подключенным.
  * Примечание: это не относится к портам USB-C - только к комбинированным портам Thunderbolt 3 и USB-C.
  * Отключение Thunderbolt в BIOS также решит эту проблему.
