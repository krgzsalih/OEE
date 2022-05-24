const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');
const { default: axios } = require('axios');
const cors = require('cors');
const app = express();

var port = 6161;
app.use(bodyParser());
app.use(cors());
app.use(express.static('public'));

var mC = {
    host: '85.106.7.126',
    user: 'root',
    password: 'Apra!2561',
    database: 'fabrika'
};

app.post('/insertYap1', function (req, res) {
    console.log(req.body)

    let coni = mysql.createConnection(mC);

    coni.connect(() => {
        var sql = "INSERT INTO zamanlar (zaman, tur) VALUES ('" + req.body.mAcilisZaman + "','" + req.body.mTur + "')";
        console.log(sql);
        coni.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.json({ sonuc: 'ERR' })
            } else {
                res.json({ sonuc: 'OK' })

                console.log(result);
                coni.end();
            }
        })
    })
})
app.post('/insertYap2', function (req, res) {
    console.log(req.body)

    let coni = mysql.createConnection(mC);
    coni.connect(() => {
        var sql = "INSERT INTO zamanlar (zaman, tur, sure) VALUES ('" + req.body.durusZaman2 + "','" + req.body.durusTur2 + "','" + req.body.durusSure2 + "')";
        console.log(sql);
        coni.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.json({ sonuc: 'ERR' })
            } else {
                res.json({ sonuc: 'OK' })

                console.log(result);
                coni.end();
            }
        })
    })
})
app.post('/insertYap3', function (req, res) {
    console.log(req.body)

    let coni = mysql.createConnection(mC);
    coni.connect(() => {
        var sql = "INSERT INTO zamanlar (zaman, tur) VALUES ('" + req.body.durusZaman + "','" + req.body.durusTur + "')";
        console.log(sql)
        coni.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.json({ sonuc: 'ERR' })
            } else {
                res.json({ sonuc: 'OK' })

                console.log(result);
                coni.end();
            }
        })
    })
})
app.post('/insertYap', function (req, res) {
    console.log(req.body)

    let conis = mysql.createConnection(mC);
    conis.connect(() => {
        var sql1 = "INSERT INTO zamanlar (zaman, tur, sure, adet, performans) VALUES ('" + req.body.zaman + "','" + req.body.tur + "','" + req.body.sure + "','" + req.body.adet + "','" + req.body.performans + "')";
        console.log(sql1)
        conis.query(sql1, function (err, result) {
            if (err) {
                console.log(err)
                res.json({ sonuc: 'ERR' })
            } else {
                res.json({ sonuc: 'OK' })

                console.log(result);
                conis.end();
            }
        })

    })
})


app.post('/durusDegerleriGir', function (req, res) {
    console.log(req.body, '  geldi');

    let conis = mysql.createConnection(mC);
    conis.connect(() => {
        var sql1 = "INSERT INTO planliduruslar (durusId, durusAdi, durusBaslangic, durusSuresi) VALUES ('" + req.body.durusId + "','" + req.body.durusAdi + "','" + req.body.durusBaslangic + "','" + req.body.durusSuresi + "')";
        console.log(sql1)
        conis.query(sql1, function (err, result) {
            if (err) {
                console.log(err)
                res.json({ sonuc: 'ERR' })
            } else {
                res.json({ sonuc: 'OK' })

                console.log(result);
                conis.end();
            }
        })

    })
    durusDetay();
    pastayaDurusGetir();

})

var prfmns;
app.post('/performans', function (req, res) {
    //console.log(req.body);
    prfmns = req.body;
});

app.post('/performansGauge', function (err, res) {
    res.send(prfmns);
})


//verim();

var paket;
var paket2;
var durusPaket;
var pastaDurusPaket;


// function verim() {
//     let con = mysql.createConnection(mC);

//     con.connect(function (err) {
//         if (err) throw err;
//         console.log('Bağlandı !');
//     });

//     var sql2 = "select tur,sure,adet,performans from zamanlar where tur in ('3','4') order by id DESC LIMIT 2;";
//     con.query(sql2, function (err, result) {
//         if (err) throw err;
//         console.log(result);

//         for (let i = 0; i < result.length; i++) {
//             var toplamCalisma;
//             var durus;
//             var uretimAdet;
//             var performans;
//             if (result[i].tur == 3) {
//                 durus = result[i].sure;
//             } else {
//                 toplamCalisma = result[i].sure;
//                 uretimAdet = result[i].adet;
//                 performans = result[i].performans;
//             }
//         }
//         var uretimSuresi = toplamCalisma - durus;

//         console.log(toplamCalisma + " çalışma");
//         console.log(uretimSuresi + " üretim");
//         console.log(durus + " duruş");
//         console.log(uretimAdet + " adet");

//         var vardiyaUzunlugu = 480;

//         var molalar = durus;
//         var planliDurus = 5;
//         var idealUretimHızı = 10;
//         var toplamUretim = uretimAdet;
//         var hurda = 2;

//         var planlanmisUretim = vardiyaUzunlugu - planliDurus;
//         var hazırBulunmaSuresi = planlanmisUretim - molalar;
//         var kusursuzUretim = toplamUretim - hurda;

//         var kullanilabilirlik = Number(((uretimSuresi / toplamCalisma) * 100).toFixed(1));

//         var kaliteOrani = Number(((kusursuzUretim / toplamUretim) * 100).toFixed(1));

//         var oee = Number(((kullanilabilirlik * performans * kaliteOrani) / 10000).toFixed(1));

//         console.log(performans + " %  Performans");
//         console.log(kullanilabilirlik + ' %   kullanilabilirlik');
//         console.log(kaliteOrani + " %  Kalite");
//         console.log(oee + " %  OEE");

//         paket = {
//             performans,
//             kullanilabilirlik,
//             kaliteOrani,
//             oee,
//             toplamUretim,
//             planlanmisUretim,
//             kusursuzUretim,

//         }
//     });
//     //setInterval( durusDetay, 1000);
// }

durusKodlari();

function durusKodlari() {
    var con = mysql.createConnection(mC);

    con.connect(function (err) {
        if (err) throw err;
        console.log('Bağlandı !');
    });
    var sql2 = "select * from duruskodlari";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log(result);
        paket2 = result;

    });
    con.end();
}
pastayaDurusGetir();

function durusDetay() {
    var con = mysql.createConnection(mC);

    con.connect(function (err) {
        if (err) throw err;
        console.log('Bağlandı !');
    });
    var sql2 = "select * from planliduruslar";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log(result);
        durusPaket = result;

    });
    con.end();
}


function pastayaDurusGetir() {
    var con = mysql.createConnection(mC);
    var gelenPaket;
    con.connect(function (err) {
        if (err) throw err;
        console.log('Bağlandı !');
    });
    var sql2 = "SELECT sum(durusSuresi) as durusSuresi, durusAdi FROM fabrika.planliduruslar GROUP BY durusAdi;";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log(result, "   GÖNDERİLDİ");
        pastaDurusPaket = result;
    });
    con.end();
}


// app.post('/oee', function (req, res) {
//     console.log(paket)
//     res.send(paket);
// })


app.post('/durusKodlari', function (err, res) {
    res.send(paket2);
})

app.post('/durusDetay', function (err, res) {
    res.send(durusPaket);
})

app.post('/pastayaDurusGetir', function (err, res) {
    res.send(pastaDurusPaket);
})

app.listen(port, () => {
    console.log('server ', port, ' başladı')
})