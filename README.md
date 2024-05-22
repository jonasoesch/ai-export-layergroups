Illustrator-Skripts für die Grafik-Produktion bei NZZ Visuals.

## Installation

* Terminal öffnen
* Folgenden Befehl kopieren, einfügen und mit Enter ausführen: `cd /Applications/Adobe\ Illustrator\ 2024/Presets.localized/de_DE/Skripten`
* Danach folgenden Befehl kopieren, einfügen und ausführen: `sudo git clone https://github.com/nzzdev/nzz-illustrator-scripts.git`
* Illustrator neu starten

Der Befehl funktioniert nur, wenn der `Skripten`-Ordner vorher leer ist. Ist Illustrator auf Englisch oder einer anderen Sprache installiert, kann der Ordnernamen im ersten Befehl leicht variieren. Statt `de_DE` zum Beispiel `en_GB`.

Alternativ kann man die Skripte auch von Hand in Ordner `/Applications/Adobe Illustrator 2022/Presets.l/de_DE/Skripten` kopiert werden. Dazu auf [https://github.com/nzzdev/nzz-illustrator-scripts](https://github.com/nzzdev/nzz-illustrator-scripts) oben rechts auf "Code" und danach auf "Download ZIP" klicken.

## Verwendung

Die Skripte finden sich danach in Illustrator unter `Datei -> Skripten`

## ScrollyLayerGroups

Eine bestimmte Ebenenkonfiguration bzw. Schritt einer Grafikabfolge anzeigen.

Soll eine Ebene bei Schritt "a" angezeigt werden, muss sie im Namen "@a" enthalten. Eine andere Ebene soll z. B. nur bei Schritt "b" eingeblendet werden, sie muss "@b" im Namen enthalten. Eine Hintergrundebene wiederum, soll sowohl bei Schritt "a" und "b" eingeblendet sein. Ihr Name muss also "@a @b" enthalten.

`ScrollyLayerGroups` zeigt eine Liste all dieser @-Text an. Im obigen Fall also [a, b]. Mit einem Klick auf "b" werden nur die Ebenen mit "@b" eingeblendet.

Das Skript ignoriert Ebenen, die kein "@" im Namen haben. Ausserdem beachtet es nur Ebenen auf der ersten und zweiten Hierarchiestufe.

## ScrollyLayerGroupsExport

Exportiert die mw-, cw- und fw-Artboards für jeden Schritt als PNG.

Die Logik zum ein- und ausblenden funktioniert genau gleich, wie bei ScrollyLayerGroups. Das Skript geht jeden Schritt durch, blendet die korrekten Ebenen ein, und exportier alle Artboards die `mw`, `cw` und `fw` im Namen haben als PNG.

Auflösung, Bittiefe und Exportordner können eingestellt werden.

## ai2html

Exportiert Texte als HTML und den Rest als Bilder. 

## area.jsx

Berechnet die Fläche einer Form (oder die kumulierte Fläche von mehreren Formen).
Anzeige in in² und cm².
Basiert auf einem Script von hier: [Calculating Area in Adobe Illustrator - Graphics Mob](https://graphicsmob.com/how-to-calculate-area-in-adobe-illustrator/)


## Skripte mit einem Tastaturkurzbefehl starten

Das ist in Illustrator leider etwas kompliziert, lässt sich aber machen, indem man eine Action erstellt. [Anleitung](https://creative-scripts.com/keyboard-shortcuts-for-illustrator-scripts/)
