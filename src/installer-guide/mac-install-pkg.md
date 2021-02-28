# Устаревшие версии macOS: автономный метод

Этот метод позволит нам загрузить полные установщики от Apple, однако он ограничен 10.10 Yosemite, поэтому более более старые ОС должны быть загружены с помощью "Онлайн метода", упомянотого ниже.

Чтобы начать, перейдите по следующей ссылке:

* [Как получить старые версии macOS](https://support.apple.com/ru-ru/HT211683)

Загрузите желаемую версию.

В зависимости от того, на какой ОС вы находитесь, вы можете запустить этот скрипт и перейти к [Настройка установщика](#setting-up-the-installer), однако если вы получили эту ошибку:

![](../../img/installer-guide/legacy-mac-install-md/unsupported.png)

Это означает то, что нам надо вручную распаковать установщик.

### Распаковка установщика

Чтобы начать, возьмите InstallMacOSX/InstallOS.dmg и смонтируйте его:

![](../../img/installer-guide/legacy-mac-install-md/mount.png)

Дальше, давайте откроем окно терминала и создадим папку на нашем рабочем столе. Запускайте по одной:

```sh
cd ~/Desktop
mkdir MacInstall && cd MacInstall
```

Теперь, мы переходим к интересной части, распаковка установщика (обратите внимание, что это может занять несколько минут):

* Для El Capitan(10.11) и старее:

```sh
xar -xf /Volumes/Install\ OS\ X/InstallMacOSX.pkg
```

* Для Sierra(10.12):

```sh
xar -xf /Volumes/Install\ macOS/InstallOS.pkg
```

Затем, выполните следующее(по одному):

* Yosemite:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ Yosemite.app/Contents/SharedSupport/
mv Install\ OS\ X\ Yosemite.app /Applications
```

* El Capitan:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ El\ Capitan.app/Contents/SharedSupport/
mv Install\ OS\ X\ El\ Capitan.app /Applications
```

* Sierra:

```sh
cd InstallOS.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ macOS\ Sierra.app/Contents/SharedSupport/
mv Install\ macOS\ Sierra.app /Applications
```

Как только это будет сделано, вы можете переходить к [Настройке установщика](./mac-install.md#настроика-установщика)!
