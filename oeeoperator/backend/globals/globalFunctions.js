const moment = require("moment");
const mysql = require("mysql");


var mCredidentals={
    host     : '85.106.7.126', //localhost
    port     : '3306',
    user     : 'root',
    password : 'Apra!2561', //
    database : 'fabrika'
}

// GİRİLEN HATALI ÜRÜNÜ VERİTABANINA YAZAR
function hataliUrun(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen paket " + paket);
    connection.connect();
    var q="INSERT INTO iskarta (hataKodu, adet) values('"+paket.inputUc+"','"+paket.inputDort+"')";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('kaydedildi ')
        connection.end();
    });    
}

///////////////// FABRİKA GİR-ÇEK /////////////////////

function fabrikaGir(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen paket " + paket);
    var answer='';
    connection.connect();
    var q="INSERT INTO fabrikalar (fabrikaAdi, sehir) values('"+paket.fabrika+"','"+paket.sehir+"')";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error){
            console.log(error)
            res.json({sonuc:'ERR'})
        }else{
            res.json({sonuc:'OK'})

            console.log(results);
            connection.end();
        } 
    });    
}
function fabrikaCek(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    connection.connect();
    var q="SELECT id, id as value, fabrikaAdi as text FROM fabrikalar";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('veriler çekildi' + results);
        res.json({results})
        connection.end();
    });   
}

//////////////// HAT GİR-ÇEK ///////////////////////

function hatGir(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen paket " , paket);
    var answer='';
    connection.connect();
    var q="INSERT INTO hatlar (hatAdi, fabrikaId) values('"+paket.hat+"','"+paket.secilenFabrika+"')";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('kaydedildi ')
        connection.end();
    });    
}
function hatCek(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    connection.connect();
    var q="SELECT id, id as value, hatAdi as text FROM hatlar";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('veriler çekildi' + results);
        res.json({results})
        connection.end();
    });   
}


////////////////// MAKİNE GİR-ÇEK /////////////////////////

function makineGir(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen paket " + paket);
    var answer='';
    connection.connect();
    var q="INSERT INTO makineler (hatId, makineAdi) values('"+paket.secilenHat+"','"+paket.makine+"')";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('kaydedildi ')
        connection.end();
    });    
}
function makineCek(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    connection.connect();
    var q="SELECT id, id as value, makineAdi as text FROM makineler";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('veriler çekildi' + results);
        res.json({results})
        connection.end();
    });   
}

///////////////////////// TÜKETİM GİR-ÇEK ///////////////////// 

function tuketimGir(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen paket " + paket);
    var answer='';
    connection.connect();
    var q="INSERT INTO makinetuketim (makineId, tur, miktar) values('"+paket.secilenMakine+"','"+paket.secilenTur+"','"+paket.tuketimMiktari+"')";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('kaydedildi ')
        connection.end();
    });    
}

function isEmriGir(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen paket " + paket);
    connection.connect();
    var q="INSERT INTO uretim (uretimPlanNo, hatNumarasi, uretimNoktasi, urunKodu, urunAdi, planlananUretimAdedi, uretimBarkod, planlananSure) values('"+paket.uretimPlanNo+"','"+paket.hatNumarasi+"','"+paket.uretimNoktasi+"','"+paket.urunKodu+"','"+paket.urunAdi+"','"+paket.planlananUretimAdedi+"','"+paket.urunBarkod+"','"+paket.planlananSure+"')";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        console.log('kaydedildi ')
        connection.end();
    });    
}

var time;
var ornek= 1;
function login(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen giriş paket " + paket);
    connection.connect();
    var q="SELECT * FROM users WHERE calisanAdi='"+paket.kullaniciAdi+"' AND sifre='"+paket.sifre+ "';";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if(error)throw error;
        if(results.length > 0){
            
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(time, 'Tarihli saatte Giriş Yapıldı!!!');
            res.json({results});
        }else{
                console.log('Yanlış isim veya şifre girdiniz!');
        } 
        connection.end();
    });    
}

// FRONTEND TE SERİ NO OKUT İLE OKUTULAN BARKODA KAYITLI ÜRÜN BİLGİLERİNİ GETİRİR
function urunGetir(res, paket){

    var connection = mysql.createConnection(mCredidentals);
    console.log("gelen ürün paket " + paket);
    connection.connect();
    var q="SELECT * FROM uretim WHERE uretimBarkod='"+paket.urunBilgileri+"';";
    console.log(q);
    connection.query(q, function (error, results, fields) {
        if(error)throw error;
        if(results.length > 0){
            res.json({results});
        }else{
            console.log(error);
        } 
        connection.end();
    });    
}

module.exports = {
    hataliUrun:hataliUrun,

    fabrikaGir:fabrikaGir,
    fabrikaCek:fabrikaCek,
    
    hatGir:hatGir,
    hatCek:hatCek,
    
    makineGir:makineGir,
    makineCek:makineCek,
    
    tuketimGir:tuketimGir,
    
    isEmriGir:isEmriGir,
    
    urunGetir:urunGetir,
    
    login:login,
};