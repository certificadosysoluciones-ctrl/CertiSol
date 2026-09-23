// Función independiente: todos los valores comerciales proceden de config.js.
(function(root){
  root.calculateQuote=function(config,type,area,postcode,express){
    if(!Number.isFinite(area)||area<=0||!Number.isInteger(area))return {status:'invalid',reason:'Introduce una superficie válida en m² enteros.'};
    if(!/^\d{5}$/.test(postcode))return {status:'invalid',reason:'Introduce un código postal de 5 cifras.'};
    if(!Object.hasOwn(config.postalSupplements,postcode))return {status:'custom',reason:'Esta ubicación necesita un presupuesto a medida.'};
    const band=config.bands.find(b=>area<=b.max);
    if(!band||config.base[type]==null)return {status:'custom',reason:'Prepararemos un presupuesto a medida para tu inmueble.'};
    const postal=config.postalSupplements[postcode];
    const net=config.base[type]+band.extra+postal+(postal===0?band.city:0);
    return {status:'priced',total:Math.round((net*(1+config.vat)+(express?config.expressSupplement:0)+Number.EPSILON)*100)/100};
  };
})(typeof window==='undefined'?globalThis:window);
