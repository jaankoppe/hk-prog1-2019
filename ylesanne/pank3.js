// Loo klass konto
class Konto {
    constructor(kontonumber, pank) {
        // konto lisatakse panga kaudu "looKonto()" meetodiga, kus panga
        // viide antakse kaasa "this" võtmesõnaga (3.punkt)
        this.pank = pank;
        // lisan omaduse kontonumber
        this.kontonumber = kontonumber;
        // lisan omaduse saldo, annan vaikimisi väärtuseks 100
        this.saldo = 100;
        // lisan aasta intressi protsentides (2.punkt)
        this.aastaintress = 2.5
    }

    // lisan meetodi "lisa()"
    lisa(summa) {
        // kontrollin kas sisestatud väärtus on number
        // kui ei ole, siis login välja põhjuse ja tagastan false
        if(typeof summa != "number") {
            console.log("Summa ei ole number");
            return false;
        }
        // kontrollin kas summa on suurem kui 0
        if(summa > 0) {
            // suurendan saldo väärtust
            this.saldo += summa;
            // tagastan uue saldo
            return this.saldo;
        }else{
            // kui summa on väiksem või võrdne kui 0, siis login välja
            // ja tagastan false
            console.log("Summa on väiksem või võrdne kui 0.")
            return false;
        }
    }
    // lisan meetodi "eemalda()"
    eemalda(summa) {
        // kontrollin kas sisestatud väärtus on number
        // kui ei ole, siis login välja põhjuse ja tagastan false
        if(typeof summa != "number") {
            console.log("Summa ei ole number");
            return false;
        }
        // kontrollin kas summa on suurem kui 0
        if(summa > 0) {
            // vähendan saldo väärtust
            this.saldo -= summa;
            // tagastan uue saldo
            return this.saldo;
        }else{
            // kui summa on väiksem või võrdne kui 0, siis login välja
            // ja tagastan false
            console.log("Summa on väiksem või võrdne kui 0.")
            return false;
        }
    }

    // lisan meetodi "saada()" (3.punkt)
    saada(kontonumber, summa) {
        // kontrollin et saldo ei oleks tühi ning
        // saadetav summa ei ületa saldo suurust
        if (this.saldo >= summa && this.saldo > 0) {
            // kontrollin kas sellise kontonumbriga kontot on pangas
            let saaja = this.pank.otsiKonto(kontonumber);
            // kui ei ole, tagastan false
            if(saaja == null) {
                console.log("Kontot ei leitud");
                return false;
            }
            // lisan saaja kontole summa
            saaja.lisa(summa);
            // eemaldan saatja kontolt summa
            this.eemalda(summa);
            console.log("Ülekanne sooritatud");
            // tagastan õnnestunud ülekande info objektina
            return {
                saaja: saaja.kontonumber,
                saatja: this.kontonumber,
                summa: summa
            }
        } else {
            console.log("Kontol pole piisavalt raha!");
            console.log({
                summa: summa,
                saldo: this.saldo
            })
            return false;
        }
    }

    // lisan meetodi saldo küsimiseks etteantud arvu aastate pärast
    // n - arv, mitme aasta pärast saldot kuvatakse (2.punkt)
    kysiSaldot(n) {
        // lisan hekte saldo muutujasse
        let saldo = this.saldo;
        // käin tsükli n arv korda läbi:
        // igal korral 
        for(var i = 1; i <= n; i++) {
            // leian intressi summa
            let aastaIntressiSumma = saldo * (this.aastaintress / 100);
            // lisan intressi summa muutujale saldo
            saldo = saldo + aastaIntressiSumma;
        }
        return saldo;
    }
}

// loo klass Pank
class Pank {
    constructor() {
        // siin massiivis hoitakse kõiki kontosid
        this.kontod = [];
    }
    // abi meetod kontonumbri genereerimiseks.
    // See sisu võib ka otse looKonto() all olla,
    // kuid nii on paremini loetav ja mõistetav
    genereeriKontoNumber() {
        let randomNr = Math.random().toString().substr(2, 10);
        let kontoNr = "EE" + randomNr;
        return kontoNr;
    }
    // lisan meetodi mille abil saab luua uusi kontosid.
    // Meetod tagastab uue konto objekti
    looKonto() {
        let kontoNr = this.genereeriKontoNumber();
        let uusKonto = new Konto(kontoNr, this);
        this.kontod.push(uusKonto);
        return uusKonto;
    }
    // lisan meetodi, mille abil otsida pangast kontot
    // kontonumbri alusel
    otsiKonto(nr) {
        // käin for tsükliga kõik kontod läbi
        for (var i = 0; i < this.kontod.length; i++) {
            // iga konto puhul kontrollin
            // kas konto kontonumber klapib otsitava numbriga
            if (this.kontod[i].kontonumber == nr) {
                // kui konto leitakse, tagastatakse konto objekt
                return this.kontod[i];
            }
        }
        // kui ei leita tagastatakse null
        return null;
    }
}

// loon uue panga (3.punkt)
var seb = new Pank();

// loon uue Konto tüüpi objekti (muudetud konto loomise viisi 3.punktis)
var konto1 = seb.looKonto();
// kontrollin kas saan kontole lisada negatiivset arvu
konto1.lisa(-100);
// kontrollin kas saan kontole lisada positiivset arvu
konto1.lisa(100);
// kontrollin kas saan kontolt eemaldada negatiivset arvu
konto1.eemalda(-100);
// kontrollin kas saan kontolt eemaldada positiivset arvu
konto1.eemalda(100);
// kontrollin kas saan lisada numbrit kasutades String tüüpi argumenti
konto1.lisa("100");
// kontrollin muud teksti
konto1.eemalda("kümme");

// kontrollin kui palju on konto saldo 5 aasta pärast arvestades iga aastast intressi (2.punkt)
var saldoViieAastaPärast = konto1.kysiSaldot(5);
console.log("Saldo on viie aasta pärast " + saldoViieAastaPärast);

// lisan ühe konto juurde (3.punkt)
var konto2 = seb.looKonto();
// saadan konto2 alt raha konto1-le (3.punkt)
konto2.saada(konto1.kontonumber, 50);
/*
Antud teemad mida siin kasutatud on loengutes läbi võetud:

class - https://github.com/jaankoppe/hk-prog1-2019/blob/master/class/Pall.js
typeof - https://github.com/jaankoppe/hk-prog1-2019/blob/master/numbrid.js
object, function, for tsükkel - https://github.com/jaankoppe/hk-prog1-2019/blob/master/teine.html


Lisaks googeldasin teie eest materjale ka natuke nendel teemadel millest tundides ka rääkisin:
for ehk iteratsioonid - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code
if ehk tingimuslaused - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals
object - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
function - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
function return - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values
*/