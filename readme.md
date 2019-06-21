# ordsky

Dette er et forsøk på å lage et program som tar linker som input og outputer en ordsky

### Finne ord
Funksjonen getKeywordsFromUrls(urls, htmlElement) tar imot et array av nettaddresser og returnerer et array med et aggregat av ordene på siden. Man kan også velge hvilket html element man vil ha teksten fra ved å legge det til som et andre argument. Default element er <body>.

Hjelpefunksjonen combineCountsFromArray(array) kombinerer resultatet.

getRelevantKeyWords(object, options) gjennomgår dataene for å luke bort uinteressante ord. Options er ikke et krav, men har formen: options = {minNumberOfWords, wordsToRemove}. Default er minNumberOfWords = 2, mens wordsToRemove er en egenprodusert liste som man finner i common-words.json.