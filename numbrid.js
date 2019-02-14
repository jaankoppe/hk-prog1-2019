var a = 1;
var b = "2";

if (typeof b == "string") {
    b = parseInt(b); // täisarvuks teisendamine (vt. ka "parseFloat")
}
var c = a + b;

c = c.toString(); // Tekstiks teisendamine

