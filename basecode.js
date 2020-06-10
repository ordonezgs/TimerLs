// ==UserScript==
// @name         WME TimerLS
// @namespace    https://greasyfork.org/es/scripts/27787-wme-timerls
// @version      0.2.0
// @description  It is a visual and hearing helper that shows a timer of last saved.
// @author       Ing. José Roberto Cuello Alcaraz '2015, arreglado por parches de JustinS83 ' 2017
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @icon		 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA7wAKACUVVLrgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwCEQYjqZw+YwAABUpJREFUaN7tmG1olWUYx3/Xc+61zNJcmEhaiKEWbWqr9LiskXDCExFEMJwv4UuvUEFkUQTphyKKpCCsUSKRL9kHQ6xDnbBMbJtLP7jm0soMMsxymU6dm/d5/n14jnvLHc22M4Ndn55znuu+n+t/X//r7YYB6V+xzj9WxSfdFKBnDW4VKgJ2VdbUTwJYUTZ55KAwfBNImCmU2HhC/rFFtY2H+xOAO/2wZtoNM41wA1gB0i4zqiWOn34/KAzXmzFVYp9kmDH7EgqKgGS/e2BJeXlsfNvhn4FRiAWzanau7Ky0ekrxjUEs2AFqyvgTY3zbpUHhIO3DGHYq9NfNq921e028+BEInjC4BuOIxLZTnqfu/2bnD33ugXEnD5URxEYJtlR2Mx7AguAmAMS2OXU/NgOsiU+sNZhZYC6+qqx4qClYDjoKvCfZSDOmnAzdwbxQSMSKLXpoXBsv+QTsDsEBmV6ZXV3/tsFwAJk1dbhOTZEDNcJEU7ScZm/hO/OqG3YsKS+PLanenOlrAAFAYFyetWoBMEyQBl0dYG+tjhdPl4XqaQOZAvmWL4W+M+yqAsW2r51Wsnls61+35CMGgujk1JylyKZZNfXTKmt23mNGVYQpmBHC79F7FbUbjl0R/RX8Mafux+YWa70F6VmkA2C3O/TFmrKJ1+cFACE7srQYWVVa6rIWDmkHF1KbjfgpK8rGX1pVWjrEYGq0NtxRVVo6aOHXe47Nqql/+WhbwVjBFoyLFVKenywENi4+8Sszpkv6HuMPw8qETmRCXzK3tnHv2vjETRh3IH4SmBljJGora3bGV8dL5gTY0tDYChwOxCyMKxVmbq+sbdjS5x5YAmprsbsR7xoUIStBbM3AnXNrG/cCtMSsQtI6RQE9XOijliC4F0CBfpDpiIkKQw/K1JQJ9XBfGz8gAzIgAzIgvTvQ9PrmSa7Cc1nH1HEe4glxHFKKP/MKwJI8BCwVjDCf7Z/OEYj5qE9Wh5ENwGylqD8vAL/s3d2lGx09dkLOdZZgDFAjxwiDN4CTgmfMsx/HOjytOebD4cBCwX6D9/GMBuYBdUozpceRsjdFjiKik39VaZ7OeuQZHD8DzylNWw7PXYtnPo6flOL5TlSckXMm7u3AUrT7EQCSXJTlc4CjEHoGABRmaRQogVm03fHc7XQ+koQ/n6uGjn16ih+Xt3zn/lXmOed1+QJgRJklxHO2OflU5wzUm+dy/pKiVUlC80yQYxoJ9vXw5RBPBY7APMeURiSwXFbmjULmWSzHawaf5/xqdPpHzfH6hUQhlGYZSXbLU5bNRD3JX8CnSrH9wqFQB5VSQKq/ckNvtxrFwOB/pFdHm6CBVM5a0c8AknwAJASDu1tgcBL4lgR3kc4WwgsKQJKHzFMhx2/mqcYRdqsBxTjKzLFMsPCCA2BwG46MwSPK0GiOSUrxYbtCgvFAA57xJM/eKQR594AnhifEc5RCVuJ5z5Lc3LkWmAc5dC7dcv4p5LrUhkI5PFBwppngXOaHdpUVy5f1WL3Tn3XNfLl0Fz76pHV6qZz9TkSlQsArt57Mn3mzLhgr5szPifZEc+6ksHHD+q7ttGfoPwoaZLITWoFgLp6ppKnrpNLa3lakyCgakAbntxv1/GmOg3IstgSFOI51Os/JcsQMFhnswSGSvIRHOMBThCMQjLEkL+IZJccM89QpXwCUZp8lecFgqRyPd+d11kP3nckS68hWowXP2emZ2PFAXoNYKaosycfAZea7DexnSy9ddUI8h5Q+861En2Yhpfg1dyT/d8l/HRgAkINC61at/N8B6JOLrQH5F/I36cEbPOHTJu4AAAAASUVORK5CYII=
// ==/UserScript==
(function() {
    'use strict';
    function bootstrap(tries = 1) {
        if (W && W.map &&
            W.model && W.loginManager.user &&
            $ && WazeWrap.Ready) {
            init();
        } else if (tries < 1000)
            setTimeout(function () {bootstrap(++tries);}, 200);
    }

    function init()
    {
        var $section = $("<div>");
        $section.html([
            '<div>',
            '<h2>Timer LS</h2>',
            '</div>'
        ].join(' '));

        new WazeWrap.Interface.Tab('TimerLS', $section.html(), initializeSettings);
    }

    function initializeSettings()
    {
    }

    bootstrap();
})();
