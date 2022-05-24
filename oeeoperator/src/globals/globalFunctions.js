import axios from 'axios';

export function form(inputUc, inputDort,cb){
    var paket={inputUc, inputDort}
    axios.post('http://localhost:6162/admin/hataliUrun',paket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function hataliGonder(iskarta,cb){
    var iskartaPaket={iskarta}
    axios.post('http://localhost:6163/admin/iskarta',iskartaPaket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function girisForm(kullaniciAdi, sifre,cb){
    var girisPaket={kullaniciAdi, sifre};
    axios.post('http://localhost:6162/admin/login',girisPaket).then(({data})=>{
        //console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}


export function urunGetir(urunBilgileri,cb){
    var urunPaket={urunBilgileri};
    axios.post('http://localhost:6162/admin/urunGetir',urunPaket).then(({data})=>{
        //console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function uretimSinyaliGonder(sinyal,cb){
    var uretimPaket ={sinyal};
    axios.post('http://localhost:6163/admin/uretimSinyali',uretimPaket).then(({data})=>{
        //console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}


export function sinyalGonder(durusSinyali, durusAciklamasi, durusSinyalId, cb){
    var durusPaket ={durusSinyali, durusAciklamasi, durusSinyalId};
    console.log(durusPaket)
    axios.post('http://localhost:6163/admin/durusSinyali',durusPaket).then(({data})=>{
        //console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function bitisSinyaliGonder(makineBitisSinyali,cb){
    var bitisPaket ={makineBitisSinyali};
    axios.post('http://localhost:6163/admin/bitisSinyali',bitisPaket).then(({data})=>{
        //console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function fabrikaGir(fabrika, sehir,cb){
    var fabrikaPaket={fabrika, sehir};
    axios.post('http://localhost:6162/admin/fabrikaGir',fabrikaPaket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function hatGir(secilenFabrika, hat,cb){
    var hatPaket={secilenFabrika, hat};
    axios.post('http://localhost:6162/admin/hatGir',hatPaket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function makineGir(secilenHat, makine,cb){
    var makinePaket={secilenHat, makine};
    axios.post('http://localhost:6162/admin/makineGir',makinePaket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

export function tuketimGir(secilenMakine, secilenTur, tuketimMiktari,cb){
    var tuketimPaket={secilenMakine, secilenTur, tuketimMiktari};
    axios.post('http://localhost:6162/admin/tuketimGir',tuketimPaket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}
export function isEmriGir(uretimPlanNo, hatNumarasi, uretimNoktasi, urunKodu, urunAdi, planlananUretimAdedi, urunBarkod, planlananSure,cb){
    var isEmriPaket={uretimPlanNo, hatNumarasi, uretimNoktasi, urunKodu, urunAdi, planlananUretimAdedi, urunBarkod, planlananSure};
    axios.post('http://localhost:6162/admin/isEmriGir',isEmriPaket).then(({data})=>{
        console.log(data);
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}


// export function fabrikaCek(fabrikaListem){
    
//     axios.post('http://localhost:6162/admin/fabrikaCek').then(res=>{
//         fabrikaListem = res.data;
//     }).catch((err)=>{
//         console.log(err);
//     })
// }

export function liste(listem){
    
    axios.post('http://localhost:6161/admin/liste').then(res=>{
        listem = res.data;
    }).catch((err)=>{
        console.log(err);
    })
}
