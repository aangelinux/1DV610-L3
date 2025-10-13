<!-- Screenshots från kod för varje kapitel! -->
## Kapitel 2 Namn


---
## Kapitel 3 Funktioner
![C3](/images/code/chapter3.png)
  
Tidigare hade jag all kod från de här två metoderna i samma metod, vilket bröt mot flera regler i Clean Code, bla **Small!**, **Do One Thing**, **One Level of Abstraction per Function**, och **Extract Try/Catch Blocks**. Men kanske hade det varit bättre om #displayChart() refaktorerades till ännu mindre metoder, så att try-blocket endast anropar en metod istället för flera och catch-blocket också anropar en metod.

---
## Kapitel 4 Kommentarer
Enligt Clean Code är kommentarer nästan alltid överflödiga och behov av kommentarer är tecken på dålig kod. Så för att följa deras principer valde jag att endast lägga till kommentarer om koden fortfarande är otydlig efter refaktorering.
  
![C4](/images/code/chapter4.png)

Denna metod innehåller en del kommentarer eftersom logiken kan vara svår att följa. Jag la till "Don't include countries without data" för **Explanation of Intent**, och "Remove everything that isn't a digit or parsing wont work" både för **Warning of Consequences** och **Amplification**. Men det var svårare att bedöma om jag skulle behålla "Contains name and value", eller istället göra koden tydligare, till exempel genom att döpa om variabeln till ```const nameAndValue```.

---
## Kapitel 5 Formatering


---
## Kapitel 6 Objekt och Data Strukturer
Enligt kapitel 6 bör all data exponeras via data strukturer, och separata objekt utför operationer på denna data; de ska aldrig blandas. I L2 lät jag klasserna hantera både deras egna data och operationer, men för att följa Clean Code's principer här separerade jag dem i olika klasser.  

![C6](/images/code/chapter6.png)
![C6](/images/code/chapter6_2.png)
  
All data ligger i klassen RegionConfig; den innehåller inga metoder förutom en getter. I kontrast innehåller DataParser ingen egen data, endast operationer som kan hantera data. Så å ena sidan finns det fler klasser och filer, men klasserna är enklare att förstå och underhålla.

---
## Kapitel 7 Felhantering


---
## Kapitel 8 Gränser


---
## Kapitel 9 Enhetstester


---
## Kapitel 10 Klasser


---
## Kapitel 11 System