<!-- Screenshots från kod för varje kapitel! -->
## Kapitel 2 Namn
I klassen DataParser hade jag tidigare metodnamn som ```process, #fetch, #filter, #match, #parse```. Det var lätt att läsa, men det var inte väldigt tydligt vad funktionerna gjorde och de bröt mot kapitel 2s regler **Use Intention-Revealing Names** och **Add Meaningful Context**. Jag ändrade därör namnen till ```getParsedData, #fetchDataFrom, #createArrayFrom, #findMatch, #parseToObject```. Enligt principen om **Verbs and Keywords** från kapitel 3 försökte jag matcha metodnamnen med deras parametrar, tex #fetchDataFrom(url). Det känns dock svårt att bedöma när ett namn går från tydligt till övertydligt (**Don't Add Gratiutous Context**).
  
![C5](/images/code/chapter5.png)
  
---
## Kapitel 3 Funktioner
![C3](/images/code/chapter3.png)
  
Tidigare hade jag all kod från de här två metoderna i samma metod, vilket bröt mot flera regler i Clean Code, bla **Small!**, **Do One Thing**, **One Level of Abstraction per Function**, och **Extract Try/Catch Blocks**. Men kanske hade det varit bättre om #displayChart() refaktorerades till ännu mindre metoder, så att try-blocket endast anropar en metod istället för flera och catch-blocket också anropar en metod.

---
## Kapitel 4 Kommentarer
Enligt Clean Code är kommentarer nästan alltid överflödiga och behov av kommentarer är tecken på dålig kod. Så för att följa deras principer valde jag att endast lägga till kommentarer om koden fortfarande är otydlig efter refaktorering.
  
![C4](/images/code/chapter4.png)

Denna metod innehåller en del kommentarer eftersom logiken kan vara svår att följa. Jag la till "Don't include countries without data" för **Explanation of Intent**, och "Remove everything that isn't a digit or parsing wont work" både för **Warning of Consequences** och **Amplification**. Men det var svårare att bedöma om jag skulle behålla "Contains name and value", eller istället göra koden tydligare, till exempel genom att döpa om variabeln till ```const nameAndValue```. Att ha få kommentarer gör att koden ser mer elegant ut, men det är bara bra om koden faktiskt förklarar sig själv; annars kanske man offrar tydlighet.

---
## Kapitel 5 Formatering
I enlighet med kapitel 5s regler för formatering har jag endast små filer, de flesta mellan 50-120 rader långa. 
  
![C5](/images/code/chapter5.png)  
  
I den här klassen har jag placerat funktioner enligt principerna om **The Newspaper Method**, **Dependent Functions**, och **Vertical Ordering**. Den enda publika metoden ligger längst upp och dess namn berättar vad klassens huvudfunktion är. Funktioner som anropar andra metoder ligger precis ovanför de anropade metoderna, så att ordningen är logisk.

---
## Kapitel 6 Objekt och Data Strukturer
Enligt kapitel 6 bör all data exponeras via data strukturer, och separata objekt utför operationer på denna data; de ska aldrig blandas enligt **Data/Object Anti-Symmetry**. I L2 lät jag klasserna hantera både deras egna data och operationer, men för att följa Clean Code's principer här separerade jag dem i olika klasser.  
  
RegionConfig (data struktur)  
![C6](/images/code/chapter6.png)  
  
DataParser (objekt)  
![C6](/images/code/chapter6_2.png)
   
All data ligger i klassen RegionConfig och den innehåller inga metoder förutom en getter- det är alltså ett **Data Transfer Object**. I motsats innehåller DataParser endast operationer som kan hantera data men lagrar ingen egen data, enligt regeln **Hiding Structure**. Resultatet är att å ena sidan finns det nu fler klasser och filer att hantera, men å andra sidan är klasserna enklare att förstå och underhålla.

---
## Kapitel 7 Felhantering
För att hantera eventuella undantag från L2 modulen har jag lagt alla metodanrop till den i ett try-catch block. L2 kastar undantag i enlighet med **Use Exceptions Rather than Return Codes**. För att hantera dem på ett användarvanligt sätt fångas de först- **Write Your Try-Catch-Finally Statement First**- och ett enkelt felmeddelande skrivs ut på webbsidan. Jag har undvikt att använda "null" enligt bokens principer för **Don't Return Null** och **Don't Pass Null**.  
  
![C7](/images/code/chapter7.png)

---
## Kapitel 8 Gränser
Kapitel 8 argumenterar för att kod från en tredje part alltid ska isoleras från sin egen kod, eftersom man inte har kontroll över vilka förändringar som görs i den externa koden. Nu är det ju min egen kod, men för att följa dessa principer isolerade jag metodanrop till L2 modulen inuti en webbkomponent. Webbkomponenten är oberoende av andra klasser och kommunicerar endast via custom events, så om någonting skulle gå fel i modulens kod påverkas endast denna webbkomponent. Den agerar därför som en wrapper runt den externa koden.
  
![C8](/images/code/chapter8.png)
  
---
## Kapitel 9 Enhetstester
För att följa kapitel 9s principer la jag till enhetstester för all datahantering (UI hanteras av manuella tester). Jag missade dock att följa TTD eftersom jag började koda innan jag läste detta kapitel, och jag var osäker på hur jag skulle testa applikationen. De flesta metoderna är privata och kan inte anropas utifrån, och jag visste inte om jag borde testa all data som slutanvändare kan välja mellan eller endast testa att metoderna fungerar. I slutändan valde jag det första alternativet eftersom de privata metoderna ändå testas implicit. Jag skrev tester utifrån reglerna **Single Concept Per Test** och **FIRST**; alla tester är snabba, självständiga, returnerar true eller false och kan upprepas i olika miljöer.

![C9](/images/code/chapter9.png)  
  
![C9](/images/code/chapter9_2.png)

---
## Kapitel 10 Klasser


---
## Kapitel 11 System