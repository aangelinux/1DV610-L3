<!-- Screenshots från kod för varje kapitel! -->
## Kapitel 2 Namn
I kapitel 2 beskriver principerna **Use Intention-Revealing Names** och **Make Meaningful Distinctions** att namn ska vara informativa, beskriva syftet, och att de ska göra det tydligt hur funktionen/variabeln/klassen skiljer sig från andra objekt. Tidigare hade jag två funktioner med liknande namn, fetch() och tryFetch(), så jag ändrade tryFetch() till tryAPIThenFiles() eftersom det gör det mer tydligt vad funktionen gör och hur den skiljer sig från fetch().  
  
I en del fall hade jag svårt att bedöma hur tydligt ett namn behöver vara. Det kändes ibland som att **Use Intention-Revealing Names** och **Don't Add Gratuitous Context** hamnade i konflikt. Till exempel har mina klasser DataExtractor, DataFilter, och DataParser varsin publik metod; extract(), filter(), och parse(). Utan kontext är namnen inte helt tydliga, men tillsammans med deras parametrar och klasserna de ligger i kändes det tydligt nog, och att döpa om dem (tex till extractDataset()) kändes onödigt.  
    
![C2](/images/code/chapter2.png)

---
## Kapitel 3 Funktioner
Funktioner ska vara små, göra en sak, och ha en nivå av abstraktation enligt principerna **Small!**, **Do One Thing**, och **One Level of Abstraction per Function**. Tidigare samlade jag all logik för att skapa diagram i en och samma funktion, vilket bröt mot de tre principerna plus **Error Handling is One Thing**. Jag delade därför upp dem i olika funktioner enligt bilden nedan. Det innebär ju mer kod och större klasser- men funktionerna är lättare att läsa och förstå, de följer **SRP** och namnen beskriver tydligt vad de gör. Dessutom blir de enklare att testa och debugga.  
  
![C3](/images/code/chapter3.png)
  
---
## Kapitel 4 Kommentarer
Enligt kapitel 4 är kommentarer nästan alltid överflödiga; endast kommentarer som förklarar otydlig logik, varnar om konsekvenser, eller uppmärksammar viktiga operationer är tillåtna enligt principerna **Explanation of Intent**, **Clarification**, **Warning of Consequences**, och **Amplification**. Jag har därför få kommentarer här i L3 och i L2. Koden är nu lättare att läsa, men det finns ju en risk att man offrar tydlighet om koden inte är självklar. Och det som är självklart för en själv behöver ju inte vara självklart för någon annan.  
  
I funktionen nedan har jag lagt till en kommentar som förklarar att det andra objektet i arrayen som returneras av World Banks API innehåller den faktiska datan, eftersom det inte är tydligt för någon som aldrig anropat detta API.  
  
![C4](/images/code/chapter4.png)
  
---
## Kapitel 5 Formatering
Enligt kapitel 5 bör man formatera kod i en logisk vertikal order med relaterad logik nära varandra och metodanrop i en nedåtgående sekvens enligt principerna **Vertical Density**, **Vertical Distance**, och **Vertical Ordering**. Jag har därför försökt strukturera koden så att alla anropade metoder ligger precis nedanför (eller så nära som möjligt) den anropande metoden.  
  
I L2 hade jag problem med principen **Horizontal Formatting** som säger att man inte ska ha för långa kodrader. Problemet var att många av mina metod- och variabelnamn var långa eftersom jag försökte följa kapitel 2s principer **Use Meaningful Names**, och för att jag försökte skriva tydliga exception-meddelanden, vilket ledde till att kodraderna blev långa. I vissa fall kunde jag dela upp koden på flera rader (tex metodargument, objekt), men i andra fall behövde jag välja mellan att korta ned namnen/meddelanden eller låta kodraderna vara långa.  
  
Jag använde också **The Newspaper Metaphor** till hjälp för att skapa strukturen, enligt bilden nedan.
  
![C5](/images/code/chapter5.png)
  
---
## Kapitel 6 Objekt och Data Strukturer
I L2 hade jag en klass, Config, som både utförde operationer på sin egen data och exponerade dem för andra klasser via publika accessors. Detta bröt mot kapitel 6s princip om **Data/Object Anti-Symmetry** och skapade en sk **Hybrid**. Jag flyttade därför datan till en separat klass, en DTO, som endast definierar klassvariabler och exponerar dem via getters men inte har några andra metoder eller beteende.  
  
Dock var Config en relativt liten klass redan innan jag flyttade ut datan till en separat DTO, så man kan ju argumentera för att den här ändringen mest tillförde onödig komplexitet och extra kod. Å andra sidan gör det Config mer testbar; eftersom DTOn skickas in med dependency injection skulle det vara lätt att mocka DTOn om man vill testa Configs metoder med annan data.  
  
![C6](/images/code/chapter6.png)
  
---
## Kapitel 7 Felhantering
I kapitel 7 beskriver principerna **Use Exceptions Rather than Return Codes** och **Write Your Try-Catch-Finally Statement First** att fel ska hanteras med undantag, och try-catch block ska skrivas först. I L2 modulen kastas undantag om valideringsfel uppstår. I applikationen kan det främst inträffa fel där externa API:er anropas, så jag har använt try-catch block för att fånga alla eventuella fel och sedan låtit controller-klassen visa upp ett användarvänligt felmeddelande på appen.  
  
I klassen DataExtractor använde jag dock en lösning som förmodligen inte var bra. Ifall API-anropet misslyckas låter jag klassen fånga felet i en try-catch och returnera en tom sträng, vilket gör att controller-klassen stoppar applikationsflödet och visar upp ett felmeddelande. Jag valde en tom sträng istället för null pga bokens princip **Don't Return Null**. Men lösningen är otydlig och känns inte så robust, så det hade kanske varit bättre att låta DataExtractor kasta undantaget och sedan fånga och hantera det i controllern, eller hitta en annan lösning.  
  
![C7](/images/code/chapter7.png)  
![C7.2](/images/code/chapter7_2.png)

---
## Kapitel 8 Gränser
Enligt kapitel 8s princip **Clean Boundaries** ska extern kod alltid isoleras från ens egen kod eftersom man inte har kontroll över ändringar som kan göras i den externa modulen. I den här applikation är det två externa system som anropas, L2 modulen och World Banks API. Jag har isolerat modulanropen i en separat webbkomponent så att resten av applikation fungerar som vanligt ifall problem skulle inträffa i modulen.  
  
För att isolera anropen till World Banks API har jag lagt dem i en separat klass, DataExtractor, och lagrat data i JSON-filer som kan användas som fallback ifall det blir problem med API:et. Jag valde JSON-filer eftersom det är lätt att spara ned dem i public/ mappen och låta applikationen hämta dem ifall det behövs. De innehåller samma data så slutanvändare skulle inte märka någon skillnad när de använder appen. Men det finns säkerligen andra och bättre lösningar på problemet.  
  
![C8](/images/code/chapter8.png)
  
---
## Kapitel 9 Enhetstester  
I kapitel 9 beskriver principerna **Clean Tests** och **Single Concept Per Test** att tester, precis som produktionskod, ska vara läsbara och endast hantera en sak per test. Jag uppdaterade därför enhetstesterna från L2 för att göra dem mer läsbara. För att skriva testerna följde jag principen **F.I.R.S.T**. Jag följde dock inte **TTD** eftersom jag läste kapitlet efter att mycket av koden redan var skriven, så precis som det stod i boken hade jag svårt att skapa enhetstester. Efter att jag refaktorerat koden enligt kapitel 10 (mindre klasser), kapitel 11 (dependency injection), och förbättrat delar av logiken blev den även mycket enklare att testa.  
  
![C9](/images/code/chapter9.png)
![C9.2](/images/code/chapter9_2.png)

---
## Kapitel 10 Klasser
Initiellt hade jag bara en klass för att hantera data, vilket bröt mot kapitel 10s principer **Classes Should Be Small!**, **Single Responsibility Principle**, och **Cohesion**. Jag delade därför upp den i tre klasser: DataExtractor, DataFilter, och DataParser. Systemet har alltså blivit större med fler klasser och kodrader, men det har å andra sidan lett till att klasserna i sig är mindre, enklare att förstå, och mer sammanhängande. De följer principen om Separation of Concerns bättre, och det är enklare att enhetstesta klasserna i isolering. 
  
![C10](/images/code/chapter10.png)  
![C10.2](/images/code/chapter10_2.png)

---
## Kapitel 11 System
I kapitel 11 beskriver principen **Separate Constructing a System from Using It** att initialisering och användning av objekt ska ske separat. För att följa principen skapade jag en funktion ```main()``` som ansvarar för att initiera alla objekt som applikationen använder, enligt **Separation of Main**, och skicka in dem via konstruktorn enligt **Dependency Injection**. Detta gjorde även att objekten inte längre är tätt kopplade till varandra, och att skapa enhetstester är enklare eftersom man kan mocka objekt.  
  
För systemets arkitektur valde jag ett eventdrivet MVC-mönster eftersom applikationen är så pass liten och enkel att design patterns eller mer komplicerad arkitektur inte kändes nödvändig. MVC kändes som en rimlig lösning eftersom jag hade vyerna i webbkomponenter, och de behövde kommunicera med datalogiken. Så för att de inte skulle vara tätt kopplade till varandra la jag till en controller som mellanhand.  
  
![C11](/images/code/chapter11.png)