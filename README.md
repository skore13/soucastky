# Databáze součástek
## Autor
Jakub Skořepa pro Radioklub lázeňského města Karlovy Vary OK1KVK

7.10.2014 - ?

## Struktura složek
data -> potenciálně dynamicky generované soubory

dependencies -> soubory třetích stran (např. jQuery)

static -> statické soubory (js, css)

index.html -> hlavní vstupní bod aplikace

## Datové soubory
### data/cathegories.data
Obsahuje hierarchii kategorií

Formát:

*	Kategorie se zapisuje ve formátu id: Název kategorie
*	Mezera je nutná
*	id je celé číslo a je v celém dokumentu unikátní
*	Hierarchie se znázorňuje tabulátorem
*	Podkategorie jsou pod hlavní kategorií a jsou o jeden tabulátor víc odsazeny
*	Řádky začínající # jsou komentáře

### data/parts.data
Obsahuje seznam součástek

Ve formátu dsv(delimiter separated values) se znakem tabulátoru jako oddělovačem

Řádky začínající # jsou komentáře

Sloupce jsou popořadě:

1.	X - značí pořadí šuplíčku od horního okraje skříně (počítáme od 0)
1.	Y - značí pořadí šuplíčku od levého okraje skříně (počítáme od 0)
1.	CAT - ID kategorie ze souboru cathegories.data
1.	NAME - Název součástky
