# Поддержка руководства

***ОБРАТИТЕ ВНИМАНИЕ, ЧТО ЭТА СТРАНИЦА ОТНОСИТСЯ ТОЛЬКО К ОРИГИНАЛЬНОМУ РУКОВОДСТВУ НА АНГЛИЙСКОМ ЯЗЫКЕ. ЭТО ВСЕГО ЛИШЬ ПЕРЕВОД С АНГЛИЙСКОГО ЯЗЫКА.***

**ВАЖНОЕ ПРИМЕЧАНИЕ**: Прежде чем следовать этой странице, убедитесь, что ваш вклад не касается самого перевода:

* Для этого, прочтите раздел по которому у вас возникли сомнения [в оригинальном руководстве](https://dortania.github.io/OpenCore-Install-Guide/) на английском языке.
* Если же это касается перевода (ошибка при переводе или что-то другое), либо же вы просто хотите помочь с переводом этого руководства, пожалуйста, обратитесь к [этой странице](https://github.com/shijuro/OpenCore-Install-Guide/blob/master/CONTRIBUTING.md).

**Примечание**: Это руководство поддерживается сообществом, и которое официально не одобрено Acidanthera. Пожалуйста, не сообщайте Acidanthera о проблемах, связанных с этим руководством.

Хотите помочь поддержать руководство? Что ж, есть несколько способов помочь!

* [Содействие через Issues](#содеиствие-через-issues)
* [Содействие через PRs](#содеиствие-через-prs)
* [Содействие через Переводы](#содеиствие-через-переводы)

Примечание: Для тех, кто хочет внести свой финансовый вклад, мы серьёзно это ценим, но мы являемся некоммерческой организацией. Мы делаем это, чтобы обучать, а не зарабатывать на этом деньги. Если у вас есть лишние деньги, мы можем порекомендовать пожертвовать их на благотворительность. [Crohn's and Colitis Canada](https://crohnsandcolitis.donorportal.ca/Donation/DonationDetails.aspx?L=en-CA&G=159&F=1097&T=GENER) - это то, что мы рекомендуем в этом случае, если вы ничего не думаете.

## Содействие через Issues

 Внести свой вклад через Issues довольно просто, но есть некоторые правила:

* Вкладка "Issues" посвящена только проблемам с руководствами, **никаких личных проблем с Хакинтошем**. Это не место для обсуждения проблем с установкой.
* Если это опечатка или улучшения объяснения каких-то моментов, пожалуйста, укажите на какой странице эта проблема присутствует. Были бы признательны, если бы не отправились на охоту за чепухой в то место, где находятся эти проблемы.

Вы можете найти баг-трекер здесь: [Bugtracker](https://github.com/dortania/bugtracker)

## Содействие через PRs

Некоторые рекомендации при внесении вклада через PR:

* Используйте свой мозг (пожалуйста).
* Корректируйте свои материалы.
* Pull Requests могут быть отклонены, если мы считаем, что они не подходят или содержат неточную информацию. Как правило, мы сообщаем вам, почему он отклонен или просим внести изменения.
  * Мы также будем признательны за источники для любых крупных коммитов, чтобы упростить нам проверку достоверности предоставленной вами информации
* Изображения должны размещаться локально в репозитории в папке `../images/`
* Вам PR должен проходить линтинг markdown и исправлять проблемы.
* В общем, старайтесь по возможности избегать использования инструментов не от Acidanthera. Как правило, мы хотим избежать использования сторонних инструментов - однако, когда иначе это совсем невозможно, вы можете использовать их.
  * Явно запрещенные инструменты:
    * UniBeast, MultiBeast и KextBeast
      * Более подробнее о них можно найти здесь: [Tonymacx86-stance (на английском)](https://github.com/khronokernel/Tonymcx86-stance)
    * TransMac
      * Известен за создание заблокированных USB-накопителей
    * Установщики Niresh
      * Мы бы хотели избежать пиратства в этих руководствах

### Как внести свой вклад

Лучший способ проверить ваши коммиты и убедиться, что они правильно отформатированны, - это загрузить Node.js и запустить `npm install`, чтобы установить зависимости. Когда вы запустите `npm run dev`, он настроит локальный веб-сервер, к которому вы можете подключиться для просмотра внесенных вами изменений. `npm test` также выдаст вам любые ошибки, касающиеся форматирования и орфографии. Если вы хотите, чтобы `markdownlint` автоматически пытался исправить линтинг, запустите `npm run fix-lint`.

Шаг за шагом:

* [Создайте форк этого репозитория](https://github.com/dortania/OpenCore-Install-Guide/fork/)
* Установите необходимые инструменты:
  * [Node.js](https://nodejs.org/)
* Внесите свои изменения.
* Постройте сайт:
  * `npm install` (Для установки всех необходимых плагинов)
  * `npm run dev` (Предпросмотр сайта)
    * Сайт можно найти по адресу `http://localhost:8080`
* Проверьте линтинг и орфографию:
  * `npm test`
  * `npm run lint` и `npm run spellcheck` (для индивидуальной проверки)
  * `npm run fix-lint` (Чтобы исправить любые потенциальные проблемы)
  * Для слов, не поддерживаемых проверкой орфографии по умолчанию, пожалуйста, добавьте их в [dictionary.txt](./dictionary/dictionary.txt) и запустите `npm run sort-dict`

### Подсказка

Некоторые инструменты, которые немного упростят создание вклада:

* [Visual Studio Code](https://code.visualstudio.com)
* [Typora](https://typora.io) для рендеринга markdown в реальном времени.
* [TextMate](https://macromates.com) для простого и эффективного массового поиска/замены.
* [Github Desktop](https://desktop.github.com) для более дружелюбного пользовательского интерфейса.

## Содействие через Переводы

Хотя руководства от Dortania написаны на базовом английском, мы знаем, что в мире есть много других языков, и что не все свободно владеют английским. Если вы хотите помочь перевести наши руководства на разные языки, мы будем более чем рады помочь вам.

Главное, что нужно иметь в виду:

* Переводы должны быть отдельным форком и не будут объединены с руководством от Dortania
* Форки должны указывать на то, что они являются переводом Dortania и не являются официальными
* Форки также должны соответствовать нашей [Лицензии](https://github.com/dortania/OpenCore-Install-Guide/blob/master/LICENSE.md)

Если все вышеперечисленное выполнено, вы можете разместить свой перевод без проблем! Сайты Dortania построены на [VuePress](https://vuepress.vuejs.org) используя [Travis-CI](https://travis-ci.org) и размещаются на [Github Pages](https://pages.github.com), поэтому размещение вашего собственного перевода - бесплатно.

Если у вас есть какие-либо вопросы или проблемы с переводом или хостингом, не стесняйтесь обращаться к нашему [Bugtracker](https://github.com/dortania/bugtracker).

Текущие известные переводы:

* [InyextcionES](https://github.com/InyextcionES/OpenCore-Install-Guide)(Испанский)
* [macOS86](https://macos86.gitbook.io/guida-opencore/)(Итальянский, больше не поддерживается)
* [Technopat](https://www.technopat.net/sosyal/konu/opencore-ile-macos-kurulum-rehberi.963661/)(Турецкий)
* [ThrRip](https://github.com/ThrRip/OpenCore-Install-Guide)(Китайский)
* [Shijuro](https://github.com/shijuro/OpenCore-Install-Guide)(Русский)

И обратите внимание, что эти переводы зависят от предпочтений авторов, могут быть внесены изменения при переводе и присутствовать человческие ошибки. Пожалуйста, имейте это в виду, когда читаете их, поскольку они не являются официальными руководствами от Dortania.
