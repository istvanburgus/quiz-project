# Quiz-projekti

Tämä projekti on yksinkertainen full stack -tietovisapeli, joka on tehty kouluprojektina.

## Ominaisuudet

- Monivalintakysymyksiin perustuva tietovisa
- Käyttäjän rekisteröinti ja kirjautuminen
- Kirjautuneen käyttäjän tulokset tallennetaan tietokantaan
- Pisteiden laskenta ja parhaiden tulosten tallennus
- Ranking-lista käyttäjien parhaiden pisteiden perusteella
- Erillinen frontend ja backend

## Käytetyt teknologiat

### Frontend
- React
- React Router
- Fetch API

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT-autentikointi

## Backendin käynnistys

1. Siirry backend-kansioon: cd backend
2. Asenna riippuvuudet: npm install
3. Luo `.env`-tiedosto:
PORT=3001  
MONGODB_URI=MongoDB-yhteysosoite  
JWT_SECRET=salainen_avain
4. Käynnistä backend: npm run dev

Backend toimii osoitteessa: http://localhost:3001

## Kysymysten lisääminen tietokantaan

Kysymykset tallennetaan MongoDB-tietokantaan. Kysymyksiä voidaan lisätä MongoDB Atlas -käyttöliittymän kautta tai seed-skriptillä.
node src/seedQuestions.js

## Frontendin käynnistys

1. Siirry frontend-kansioon: cd frontend
2. Asenna riippuvuudet: npm install
3. Käynnistä frontend: npm run dev
Frontend toimii osoitteessa: http://localhost:5173

## Sovelluksen käyttö

1. Käyttäjä rekisteröityy tai kirjautuu sisään
2. Käyttäjä pelaa tietovisan
3. Kysymykset haetaan tietokannasta
4. Vastaukset arvioidaan
5. Pisteet tallennetaan kirjautuneelle käyttäjälle
6. Ranking-sivulla näkyvät parhaat tulokset

## Huomioita

- Projekti on pidetty tarkoituksella yksinkertaisena
- Painopiste on toiminnallisuudessa, ei monimutkaisessa ulkoasussa
- Projekti on toteutettu oppimistarkoituksessa
