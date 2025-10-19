<!-- Screenshots från kod för varje kapitel! -->
## Kapitel 2 Namn
I kapitel 2 beskriver principerna **Use Intention-Revealing Names** och **Make Meaningful Distinctions** att namn ska vara informativa, beskriva syftet med klassen/funktionen/variabeln, och att de ska göra det tydligt hur den skiljer sig från andra objekt. Tidigare hade jag två funktioner med liknande namn, fetch() och tryFetch(). Enligt principerna ändrade jag tryFetch() till tryAPIThenFiles(), eftersom det gör det mer tydligt vad funktionen gör och hur den skiljer sig från fetch().  
  
I en del fall hade jag svårt att bedöma hur tydligt ett namn behövde vara. Det kändes ibland som att **Use Intention-Revealing Names** och **Don't Add Gratuitous Context** hamnade i konflikt. Till exempel har klasserna DataExtractor, DataFilter, och DataParser varsin publik metod; extract(), filter(), och parse(). Utan kontext är namnen inte särskilt tydliga, men tillsammans med deras parametrar och klasserna de ligger i kändes det som att döpa om dem (tex till extractDataset()) skulle vara onödigt.  
    
![C2](/images/code/chapter2.png)

---
## Kapitel 3 Funktioner
Enligt kapitel 3 ska funktioner vara små, göra en sak, och ha en nivå av abstraktation, enligt principerna **Small!**, **Do One Thing**, och **One Level of Abstraction per Function**. Tidigare samlade jag all logik för att skapa diagram i en och samma funktion, vilket bröt mot dessa principer och även **Error Handling is One Thing**. Jag delade därför upp dem i olika funktioner enligt bilden nedan. Koden är nu mcyekt lättare att förstå. Den är även mer robust och lättare att debugga eftersom alla anrop till min L2 modul är isolerade i en egen funktion, och denna funktion anropas inuti ett try-catch block.  
  
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
Enligt kapitel 6 bör man exponera data via data strukturer, och låta separata objekt utföra operationer på datan. Enligt principen om **Data/Object Anti-Symmetry** ska dessa aldrig blandas. I L2 lät jag varje klass hantera både deras data och beteende, vilket ledde till att vissa klasser med mycket data blev **Hybrids**. Därför valde jag att dela upp en av dessa klasser, Validator, i två; en klass är ett DTO som lagrar alla valideringsregler, och den andra klassen är ett objekt som utför operationer på dessa regler. Resultatt är att det finns fler klasser och filer att hantera, men varje klass är mindre och enklare att förstå.  
  
![C6]()
  
---
## Kapitel 7 Felhantering
I kapitel 7 beskriver principerna **Use Exceptions Rather than Return Codes** och **Write Your Try-Catch-Finally Statement First** att fel ska hanteras med undantag, och try-catch block ska skrivas först. Där min kod anropar ett externt API lät jag den kasta undantag om anropet misslyckas eller responsen är inkorrekt, och jag definierade ett try-catch block som fångar dessa undantag och returnerar en tom sträng. Om en tom sträng returneras stoppar controller-klassen dataflödet och applikationen visar upp ett användarvänligt felmeddelande. Jag valde att returnera en tom sträng istället för null pga bokens regel **Don't Return Null**. Men jag var osäker på om det var en okej lösning eftersom det är otydligt varför en tom sträng returneras, och utan kontrollsatsen i controller-klassen som ser till att dataflödet stoppas kan applikationen fortsätta köra på ogiltig data.  
  
![C7](/images/code/chapter7.png)  
![C7.2](/images/code/chapter7_2.png)

---
## Kapitel 8 Gränser
Enligt kapitel 8s princip **Clean Boundaries** ska extern kod alltid isoleras från ens egen kod, eftersom man inte har kontroll över ändringar som görs i den externa koden. I den här applikation är det två externa system som anropas, min L2 modul och World Banks API. För att isolera dessa från resten av applikationen har jag lagt modulanropen i en separat webbkomponent, och för att hantera eventuella problem med anrop till World Banks API har jag sparat all data i JSON-filer, så att de kan användas som fallback.  
  
![C8](/images/code/chapter8.png)
  
---
## Kapitel 9 Enhetstester  
I kapitel 9 beskriver principerna **Clean Tests** och **Single Concept Per Test** att tester, precis som produktionskod, ska vara läsbara och endast hantera en sak per test. Jag försökte därför definiera olika koncept och edge cases som behövde testas, och skrev sen ett test var per koncept/edge case. För att skriva testerna följde jag principen **F.I.R.S.T**. Jag hade dock inte följt **TTD** eftersom jag läste kapitlet efter att mycket av koden redan var skriven, så precis som det stod i boken hade jag svårt att skapa enhetstester. Efter att jag refaktorerat koden enligt kapitel 10 (mindre klasser), kapitel 11 (dependency injection), och förbättrat delar av logiken blev den även mycket enklare att testa.  
  
![C9](/images/code/chapter9.png)

---
## Kapitel 10 Klasser
I kapitel 10 beskrivs principer som **Classes Should Be Small!**, **Single Responsibility Principle**, och **Cohesion**, som säger att klasser ska vara små, fokuserade, och hantera en uppgift var. Initiellt hade jag endast en klass för att hantera data, vilket bröt mot alla dessa principer. Jag delade därför upp den i tre klasser: DataExtractor, DataFilter, och DataParser. Klasserna är nu mycket mindre och fokuserade, vilket gör koden enklare att testa, debugga, och underhålla. Det gjorde det även enklare att följa kapitel 5s regel om att filer ska vara små, och kapitel 2s principer om att skapa tydliga namn; eftersom varje klass endast gör en sak var det lättare att komma på beskrivande namn.  
  
![C10](/images/code/chapter10.png)

---
## Kapitel 11 System
I kapitel 11 beskrivs principen **Separate Constructing a System from Using It**, som säger att objekt initialisering ska hållas separat från användning. För att följa den principen skapade jag en funktion, ```main()``` som ansvarar för att initiera alla objekt som applikationen använder, enligt **Separation of Main**, och skicka in dem i konstruktorn enligt **Dependency Injection**. Detta gjorde det mycket enklare att skapa enhetstester eftersom objekt inte längre är tätt kopplade till varandra och man kan skapa mocks av objekt.
  
För systemets arkitektur valde jag ett MVC-mönster; jag tänkte att design patterns inte är nödvändiga här eftersom applikationen är relativt liten och enkel och inte kommer bli större.  
  
![C11](/images/code/chapter11.png)