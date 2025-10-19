<!-- Screenshots från kod för varje kapitel! -->
## Kapitel 2 Namn

  
---
## Kapitel 3 Funktioner
Enligt kapitel 3 ska funktioner vara små, göra en sak, och ha en nivå av abstraktation, enligt principerna **Small!**, **Do One Thing**, och **One Level of Abstraction per Function**. Tidigare samlade jag all logik för att skapa diagram i en och samma funktion, vilket bröt mot alla dessa principer och även **Error Handling is One Thing**. Jag delade därför upp dem i olika funktioner enligt bilden nedan. Koden är nu mcyekt lättare att förstå. Den är även mer robust och lättare att debugga eftersom alla anrop till min L2 modul är isolerade i en egen funktion, och denna funktion anropas inuti ett try-catch block.  
  
![C3](/images/code/chapter3.png)
  
---
## Kapitel 4 Kommentarer
Enligt kapitel 4 är kommentarer nästan alltid överflödiga och ett behov av kommentarer är tecken på dålig kod. Endast kommentarer som förklarar otydlig logik, varnar om konsekvenser, eller uppmärksammar viktiga operationer är tillåtna, enligt principerna **Explanation of Intent**, **Clarification**, **Warning of Consequences**, och **Amplification**. För att följa dessa principer (och principer från andra kapitel) har jag försökt skriva kod som är så tydlig att det inte finns något behov av kommentarer. Det finns därför ytterst få kommentarer i koden. Att följa dessa principer gör koden mer läsbar och 'elegant', men det finns en risk att man offrar tydlighet, och det ger endast förbättringar om koden i sig redan är tydlig nog; otydlig kod och färre kommentarer gör bara koden svårare att förstå.
  
I funktionen nedan har jag lagt till en kommentar som förklarar att det andra objektet i arrayen som returneras av World Banks API innehåller den faktiska datan, eftersom det inte är tydligt för någon som aldrig anropat detta API.  
  
![C4](/images/code/chapter4.png)
  
---
## Kapitel 5 Formatering
Enligt kapitel 5 är det viktigt att formatera kod i en logisk vertikal order, med relaterad logik nära varandra och metodanrop i en nedgående sekvens enligt principerna **Vertical Density**, **Vertical Distance**, och **Vertical Ordering**. Jag har därför försökt strukturera koden så att alla anropade metoder ligger precis nedanför (eller så nära som möjligt) den anropande metoden. Jag använde **The Newspaper Metaphor** för att hjälpa med strukturen; det gjorde det extra viktigt att ha tydliga metodnamn enligt kapitel 2s principer.  
  
![C5](/images/code/chapter5.png)
  
---
## Kapitel 6 Objekt och Data Strukturer
Enligt kapitel 6 bör man exponera data via data strukturer, och låta separata objekt utföra operationer på datan. Enligt principen om **Data/Object Anti-Symmetry** ska dessa aldrig blandas. I L2 lät jag varje klass hantera både deras data och beteende, vilket ledde till att vissa klasser med mycket data blev **Hybrids**. Därför valde jag att dela upp en av dessa klasser, Validator, i två; en klass är ett DTO som lagrar alla valideringsregler, och den andra klassen är ett objekt som utför operationer på dessa regler. Det finns nu fler klasser och filer att hantera, men varje klass är mindre och enklare att förstå.  
  
![C6]()
  
---
## Kapitel 7 Felhantering
**Use Exceptions Rather than Return Codes**
**Write Your Try-Catch-Finally Statement First**
**Don't Return Null**
**Don't Pass Null**.  
  
![C7](/images/code/chapter7.png)

---
## Kapitel 8 Gränser
Enligt kapitel 8s princip **Clean Boundaries** ska extern kod alltid isoleras från ens egen kod, eftersom man inte har kontroll över ändringar som görs i den externa koden. I den här applikation är det två externa system som anropas, min L2 modul och World Banks API. För att isolera dessa från resten av applikationen har jag lagt modulanropen i en separat webbkomponent, och för att hantera eventuella problem med anrop till World Banks API har jag sparat all data i JSON-filer, så att de kan användas som fallback.  
  
![C8](/images/code/chapter8.png)
  
---
## Kapitel 9 Enhetstester  


---
## Kapitel 10 Klasser


---
## Kapitel 11 System
