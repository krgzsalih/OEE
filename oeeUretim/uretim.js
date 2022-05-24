const moment = require("moment");
const mysql = require("mysql");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require('axios');

class sayac {
  constructor() {
    this.gelen = 0;
    this.sayacIntervali = null;
    this.durus = false;
    this.sayCb = null;
  }
  duraklat() {
    this.durus = true;
  }
  devamEt() {
    this.durus = false;
    this.say(this.sayCb);
  }

  say(cb = null) {
    this.sayCb = cb;
    if (!this.durus) {
      this.gelen += 1;
      if (cb) {
        cb(this.gelen);
      }
      setTimeout(() => this.say(cb), 1000);
    }
  }
  sifirla(cb = null) {
    this.durus = true;
    if (cb) {
      cb(this.gelen);
    }
    this.gelen = 0;
  }
}


var makineS = 1;
var uretimS = 0;
var makineSayac;
var uretimSayac;
var durusSayac;

var makineBaslangic;
var uretimBaslangic;

var cevrimSuresi = 1;
var uretimSuresi = 0;
var durusSuresi = 0;

uretimSayac = new sayac();
makineSayac = new sayac();
durusSayac = new sayac();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function makinedenBirGeldi() {
  makineBaslangic = toplamTime;
  makineSayac = new sayac();
  makineSayac.say((sayi) => {
    ////console.log(sayi);
  });
}

function uretimdenBirGeldi() {
  uretimBaslangic = time;
  uretimSayac = new sayac();
  uretimSayac.say();
}

function uretimdenSifirGeldi() {
  uretimSayac = new sayac();
  uretimSayac.duraklat();
}

function makinedenSifirGeldi() {
  makineSayac.sifirla((gelen) => {

    //console.log(uretimSay + "  adet ürün üretilmiştir...");
    uretimSuresi = uretimSay * cevrimSuresi;
    durusSuresi = gelen - uretimSuresi;
    //console.log(durusSuresi + "  sn Duruş gerçekleşmiştir.");
    durusGir2(uretim2.durusZaman, 3, durusSuresi);
    //console.log(toplamZaman.mKapanisZaman, 4, gelen, uretimSay, performans);
    makineZamanGir2(toplamZaman.mKapanisZaman, 4, gelen, uretimSay, performans);
  });
  /*uretimSayac.sifirla((gelen)=>{
      ////console.log('uretim bitti '+gelen+'sn sürdü! Başlangıç Zamanı:'+ uretimBaslangic);
  })*/
}

var mCredidentals = {
  host: '85.106.7.126', //localhost
  port: '3306',
  user: 'root',
  password: 'Apra!2561', //
  database: 'fabrika'
}


var uretimSay = 0;
var performans = 0;

var durusNedeni;
var durusId;
var hurdaGelen = 0;
var yeniDurus = 0;

var uretim2 = {
  uretimZaman: null,
  durusZaman: null,
  var: false,
};
var toplamZaman = {
  mAcilisZaman: null,
  mKapanisZaman: null,
  var: false,
};

var anDegeri = null;
var uretimStart = moment().format("YYYY-MM-DD HH:mm:ss");
var netFark;
var time;
var toplamTime;
var uretimSinyaliZaman;


baslat();

// OPERATOR EKRANINDAN "BİTİR" BUTONUNA BASINCA TETİKLENİR VE BURAYA MAKİNE BİTİŞ SİNYALİ " 0 " GETİRİR, ÜRETİM DURUR 
function bitisSinyali(res, paket) {
  makineS = paket.makineBitisSinyali;
}

// ANA FONKSİYONDUR. MAKİNE AÇIK İSE YANİ MAKİNE SİNYALİ 1 İSE ZAMANLARI ALIR, URETİM() FONKSİYONUNU ÇALIŞTIRIR.
// DEĞİLSE MAKİNE KAPALI KONUMDA BEKLER 
function baslat() {
  let con = mysql.createConnection(mCredidentals);

  con.connect(function (err) {
    if (err) throw err;
    //console.log("Bağlandı !");
  });

  var myVar = setInterval(function () {
    if (makineS == 1) {
      console.log("Makine Açık");
      time = moment().format("YYYY-MM-DD HH:mm:ss");
      toplamTime = moment().format("YYYY-MM-DD HH:mm:ss");

      if (!toplamZaman.var) {
        toplamZaman.var = true;
        toplamZaman.mAcilisZaman = toplamTime;
        
        // MAKİNE SAYAC ZAMANLARINI TANIMLAR
        makinedenBirGeldi();

        // MAKİNE AÇILDIĞI TARİHİ TÜRÜ İLE VERİTABANINA GÖNDERİR
        makineZamanGir(toplamZaman.mAcilisZaman, 1);
      }


      // ÜRETİM SİNYALİ 0 İSE ÜRETİM YOK 1 İSE VAR.
      // 1 OLDUĞUNDA ANLIK ÜRETİM ADET SAYAR VE ANLIK PERFORMANS HESAPLAR
      uretim(uretimS);


    } else {
      console.log("Makine Kapalı");
      if (toplamZaman.var) {
        toplamZaman.var = false;
        toplamZaman.mKapanisZaman = toplamTime;
        //console.log(toplamZaman.mKapanisZaman);
        makinedenSifirGeldi();
      }
    }
  }, 1000);
}

//////////////////  ZAMANLAR TABLOSU TÜR AÇIKLAMASI //////////////////////////////////
/*
        1 = MAKİNE AÇILIŞ ZAMANI
        2 = ÜRETİM BAŞLANGIÇ ZAMANI
        3 = ÜRETİM DURUŞ ZAMANI 
        4 = MAKİNE KAPANIŞ ZAMANI
        
*/
var my = setInterval(performansDusur, 1000);

// ÜRETİM DE VS BİR DURUŞ OLDUĞUNDA PERFORMANSI DÜŞÜRMEYE YARAR
function performansDusur() {

  anDegeri = moment().format("YYYY-MM-DD HH:mm:ss");
  //console.log("an değeri " + anDegeri, "uretimstart " + uretimStart);
  var fark = moment
    .utc(
      moment(anDegeri, "YYYY-MM-DD HH:mm:ss").diff(
        moment(uretimStart, "YYYY-MM-DD HH:mm:ss")
      )
    )
    .format("HH:mm:ss");
  //console.log("fark  " + fark);
  var parts = fark.split(":"),
    hours = +parts[0],
    minutes = +parts[1],
    seconds = +parts[2];

  netFark = (hours * 60 + minutes * 60 + seconds).toFixed(2);

  var yapilmasiGereken = netFark / cevrimSuresi;
  performans = ((uretimSay / yapilmasiGereken) * 100).toFixed(1);
  //console.log("fark  " + netFark);
  //console.log(uretimSay, " Adet üretildi!");
  //console.log(performans + " : Performans ile üretim devam ediyor...");
  

  // HESAPLANAN PERFORMANSI GÖNDERİR 
  performansGir(performans);
  
  // OLUŞAN VERİLERE GÖRE OEE, KALİTE, PERFORMANS, KULLANILABİLİRLİK VS. FRONTEND E GÖNDERİR. (YÖNETİCİ EKRANINDAKİ OEE SEKMESİNE GİDEN VERİLER)
  verim();
}



// URETİM ESNASINDA URETİM VEYA DURUŞ SİNYALLERİNİ ÇEKER.
// DURUŞ SİNYALİ GELDİĞİNDE ( YANİ "0") ÜRETİMİ DURDURUR, DURUŞ AÇIKLAMASINI VE İD SİNİ KAYDEDER, PERFORMANSI DÜŞÜRMEYE BAŞLAR

// ÜRETİM SİNYALİ GELDİĞİNDE ( YANİ "1") ÜRETİMİ DEVAM ETTİRİR, 
//   - DURUŞ BAŞLADIĞI ANDAN İTİBAREN SAYILAN SAYACI DURDURUR, ZAMANI ALIR
//   - durusDegerleriGir() fonksiyonu çalışır.

function durusSinyali(res, paket) {  //// GELENLER =>  durusPaket ={durusSinyali, durusAciklamasi, durusSinyalId}
  console.log('geldi' , paket)
  if (paket.durusSinyali == 0) {
    uretim2.var = false;
    uretimS = 0;

    durusNedeni = paket.durusAciklamasi;
    durusId = paket.durusSinyalId;
    //uretim2.uretimZaman = time;
    durusSayac = new sayac();
    durusSayac.say((sayi) => {
      //console.log(sayi);
    });

    performansDusur();

  } else {
    uretim2.var = true;
    uretimS = 1;
    //durusNedeni = '';

    durusSayac.sifirla((gelen) => {
      yeniDurus = gelen;
      uretim2.durusZaman = time;
      console.log(durusNedeni, ' Nedeni ile ', gelen, ' : sn duruş olmuştur');


      // GELEN DURUSID DURUSNEDENİ DURUSZAMANINI VE TOPLAM SÜREYİ VERİTABANINA YAZILMAK ÜZERE uretimYaz.js E GÖNDERİR.
      durusDegerleriGir(durusId, durusNedeni, uretim2.durusZaman, gelen);
    });

  }
  res.json({ durum: 'OK' });
  //uretimS = paket.durusSinyali;
  //console.log(uretimS, paket.durusAciklamasi, "  SİNYAL GELDİ");
}

function durusDegerleriGir(durusId, durusAdi, durusBaslangic, durusSuresi) {
  //console.log(durusId, durusAdi, durusBaslangic, durusSuresi, "  LOG");
  axios.post('http://localhost:6161/durusDegerleriGir', { durusId, durusAdi, durusBaslangic, durusSuresi }).then((res) => {
    //console.log(res);
  }).catch((err) => {
    //console.log(err);
  })
}

function uretim() {
  if (uretimS == 0) {
    console.log("Üretim Yok");
    if (uretim2.var) {
      console.log('durdu');
      uretim2.var = false;
      uretim2.durusZaman = time;
      //console.log(uretim2.durusZaman);

      // URETİM DURUŞ ZAMANINI VE TÜRÜNÜ VERİTABANINA YAZAR
      durusGir(uretim2.durusZaman, 3);
    } else {
      ////console.log("çalıştı");
    }
  } else {
    if (!uretim2.var) {
      console.log('başladı');
      uretim2.var = true;
      uretim2.uretimZaman = time;
      //console.log(uretim2.uretimZaman);
      uretimdenBirGeldi();

      // URETİM BAŞLANGIÇ ZAMANINI VE TÜRÜNÜ VERİTABANINA YAZAR
      durusGir(uretim2.uretimZaman, 2);
    } else {
      ////console.log("şimdi bura çalıştı");
    }

    uretimSay++;

    ///////// PERFORMANS ///////
    anDegeri = moment().format("YYYY-MM-DD HH:mm:ss");
    //console.log("an değeri " + anDegeri, "uretimstart " + uretimStart);
    var fark = moment
      .utc(
        moment(anDegeri, "YYYY-MM-DD HH:mm:ss").diff(
          moment(uretimStart, "YYYY-MM-DD HH:mm:ss")
        )
      )
      .format("HH:mm:ss");
    //console.log("fark  " + fark);

    var parts = fark.split(":"),
      hours = +parts[0],
      minutes = +parts[1],
      seconds = +parts[2];

    netFark = (hours * 60 + minutes * 60 + seconds).toFixed(2);

    var yapilmasiGereken = netFark / cevrimSuresi;
    performans = ((uretimSay / yapilmasiGereken) * 100).toFixed(1);
    //console.log("fark  " + netFark);
    console.log("Üretim Var : " , uretimSay , " Adet üretildi!");
    //console.log(performans + " : Performans ile üretim devam ediyor...");


    performansGir(performans);

    verim();
  }
}

function performansGir(performans) {
  axios.post('http://localhost:6161/performans', { performans }).then((res) => {
    ////console.log(res);
  }).catch((err) => {
    //console.log(err);
  })
}

function durusGir(durusZaman, durusTur) {
  axios.post('http://localhost:6161/insertYap3', { durusZaman, durusTur }).then((res) => {
    //console.log(res);
  }).catch((err) => {
    //console.log(err);
  })
}

// DURUS ZAMANINI, DURUS TÜRÜNÜ VE DURUS SÜRESİNİ VERİTABANINA KAYDEDİLMEK ÜZERE  "uretimYaz.js" E GÖNDERİR 
function durusGir2(durusZaman2, durusTur2, durusSure2) {

  axios.post('http://localhost:6161/insertYap2', { durusZaman2, durusTur2, durusSure2 }).then((res) => {
    //console.log(res);
  }).catch((err) => {
    //console.log(err);
  })
}

// MAKİNENİN AÇILDIĞI ZAMANI VE TÜRÜNÜ VERİTABANINA KAYDEDİLMEK ÜZERE  "uretimYaz.js" E GÖNDERİR
function makineZamanGir(mAcilisZaman, mTur) {

  axios.post('http://localhost:6161/insertYap1', { mAcilisZaman, mTur }).then((res) => {
    //console.log(res);
  }).catch((err) => {
    //console.log(err);
  })

}

// EN SONUNDA MAKİNENİN KAPANDIĞI ZAMANI, TÜRÜNÜ, TOPLAM ÇALIŞTIĞI SÜREYİ, TOPLAM ÜRETİM ADEDİNİ VE PERFORMANS DEĞERİNİ VERİTABANINA KAYDEDİLMEK ÜZERE  "uretimYaz.js" E GÖNDERİR 
function makineZamanGir2(zaman, tur, sure, adet, performans) {

  axios.post('http://localhost:6161/insertYap', { zaman, tur, sure, adet, performans }).then((res) => {
    //console.log(res);
  }).catch((err) => {
    //console.log(err);
  })

}


// CANLI ÜRETİMDE İKEN FRONTEND TEN ( YÖNETİCİ EKRANINDAKİ OEE SEKMESİNDEN ) GİRİLEN HATALI PARÇAYI BURAYA ÇEKER
// VE ALLTA Kİ VERİM() FONKSİYONUNDA OEE, KALİTE VS HESAPLARINDA KULLANILMAK ÜZERE DEĞİŞKENE KAYDEDER
function iskarta(res, iskartaPaket){
  hurdaGelen = iskartaPaket.iskarta;
  res.json({ durum : 'GELDİ'});
}


var paket;
function verim() {
  ////console.log(uretimStart, ' burayada geldi');
  var toplamCalisma = netFark;
  var durus = 0;
  var uretimAdet = uretimSay;
  var uretimSuresi = toplamCalisma - durus;

  //console.log(toplamCalisma + " çalışma");
  //console.log(uretimSuresi + " üretim");
  //console.log(durus + " duruş");
  //console.log(uretimAdet + " adet");

  var vardiyaUzunlugu = 480;

  var molalar = durus;
  var planliDurus = 5;
  var idealUretimHızı = 10;
  var toplamUretim = uretimAdet;
  var hurda = hurdaGelen;

  var planlanmisUretim = vardiyaUzunlugu - planliDurus;
  var hazırBulunmaSuresi = planlanmisUretim - molalar;
  var kusursuzUretim = toplamUretim - hurda;

  var kullanilabilirlik = Number(((uretimSuresi / toplamCalisma) * 100).toFixed(1));

  var kaliteOrani = Number(((kusursuzUretim / toplamUretim) * 100).toFixed(1));

  var oee = Number(((kullanilabilirlik * performans * kaliteOrani) / 10000).toFixed(1));

  paket = {
    performans,
    kullanilabilirlik,
    kaliteOrani,
    oee,
    toplamUretim,
    planlanmisUretim,
    kusursuzUretim,
  }

}


// HESAPLANAN OEE VERİLERİNİ OEE EKRANINDA GÖSTERİLMEK ÜZERE FRONTEND E GÖNDERİR
function oee(res) {
  res.send(paket);
}


module.exports = {
  //uretimSinyali: uretimSinyali,
  bitisSinyali: bitisSinyali,
  durusSinyali: durusSinyali,
  oee: oee,
  oeePie: oeePie,
  iskarta: iskarta,
  //heartbit: heartbit,
};