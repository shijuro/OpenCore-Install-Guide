# Устаревшие версии macOS: онлайн метод

Этот метод позволяет нам загрузить устаревшие версии macOS включая с 10.7 по текущую, однако это установщики только Recovery, поэтому требуется интернет соединение внутри самого установщика

Чтобы начать, вы захотите использовать macrecovery.py. Эта утилита уже входит в состав OpenCorePkg

![](../../img/installer-guide/legacy-mac-install-md/macrecovery.png)

Инструкции для запуска довольно просты, выберите ниже команду, в зависимости от того, какую ОС вы хотите загрузить:

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

Как только это будет сделано, отформатируете USB накопитель как FAT32 со схемой разделов GUID:

![](../../img/installer-guide/legacy-mac-install-md/fat32-erase.png)

И наконец-то, создайте папку в корне этого накопителя назвав `com.apple.recovery.boot` и положите в неё загруженные BaseSystem/RecoveryImage файлы.

![](../../img/installer-guide/legacy-mac-install-md/dmg-chunklist.png)

Отсюда, вы можете перейти к [Настройке EFI окружения OpenCore](./mac-install.md#настроика-efi-окружения-opencore)
