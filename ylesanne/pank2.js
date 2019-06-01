// Loo klass konto
class Konto {
    constructor(kontonumber) {
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

// loon uue Konto tüüpi objekti
var konto1 = new Konto("10010500101010");
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
/*
Antud teemad mida siin kasutatud on loengutes läbi võetud:

class - https://github.com/jaankoppe/hk-prog1-2019/blob/master/class/Pall.js
typeof - https://github.com/jaankoppe/hk-prog1-2019/blob/master/numbrid.js
object, function, for tsükkel - https://github.com/jaankoppe/hk-prog1-2019/blob/master/teine.html
*/