const config=window.SITE_CONFIG;
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n);
const names={piso:'Piso',chalet:'Chalet',local:'Local',oficina:'Oficina',edificio:'Edificio completo'};
let customService=false;
document.querySelectorAll('[data-brand]').forEach(el=>el.textContent=config.name);
document.title=config.name+' · Certificados sin complicaciones';
if(config.logo)document.querySelectorAll('.brand-icon').forEach(el=>{const img=document.createElement('img');img.src=config.logo;img.alt=config.name;el.replaceWith(img)});
$('year').textContent=new Date().getFullYear();
$('express-cost').textContent='+'+money(config.expressSupplement);
$('example-note').textContent=config.examplePrices?'Tarifas de demostración. No constituyen una oferta comercial.':'Tarifas de referencia para Madrid. Importe sujeto a confirmación.';
function selection(){return {type:$('more-property').value||document.querySelector('[name="property"]:checked')?.value||'piso',area:Number($('area').value),postcode:$('postcode').value.trim(),express:$('express').checked}}
function summary(){
 if(customService)return 'Consulta de otro certificado o informe técnico.';
 const s=selection(),q=calculateQuote(config,s.type,s.area,s.postcode,s.express);
 return `${names[s.type]} · ${s.area||'—'} m² · CP ${s.postcode||'—'}\nCertificado energético${s.express?' · Tramitación prioritaria':''}\n${q.status==='priced'?'Estimación: '+money(q.total)+' (IVA incluido)':'Presupuesto a medida'}\nImporte y disponibilidad sujetos a confirmación.`;
}
function update(){const s=selection(),q=calculateQuote(config,s.type,s.area,s.postcode,s.express);$('price').textContent=q.status==='priced'?money(q.total):q.status==='custom'?'A consultar':'—';$('price').style.fontSize=q.status==='custom'?'30px':'';$('price-detail').textContent=q.status==='priced'?'IVA incluido · Precio orientativo':q.reason;$('coverage-note').textContent=q.status==='custom'?q.reason:'Calculadora para Madrid. Otras ubicaciones: consultar.';$('request-summary').textContent=summary()}
document.querySelectorAll('[name="property"]').forEach(el=>el.addEventListener('change',()=>{$('more-property').value='';customService=false;update()}));
$('more-property').addEventListener('change',()=>{if($('more-property').value)document.querySelectorAll('[name="property"]').forEach(el=>el.checked=false);else document.querySelector('[name="property"][value="piso"]').checked=true;customService=false;update()});
['area','postcode','express'].forEach(id=>$(id).addEventListener('input',()=>{customService=false;update()}));
$('calculator-form').addEventListener('submit',e=>{e.preventDefault();customService=false;update();$('solicitud').scrollIntoView({behavior:'smooth'});$('request-form').elements.name.focus({preventScroll:true})});
$('other-service').addEventListener('click',()=>{customService=true;update()});
$('request-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const text=`Hola, quisiera solicitar un presupuesto.\n\n${summary()}\n\nNombre: ${data.get('name')}\nTeléfono: ${data.get('phone')||'No indicado'}\nEmail: ${data.get('email')}\n\nConsulta: ${data.get('message')}`;if(config.whatsapp){window.open('https://wa.me/'+config.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');$('request-status').textContent='Solicitud preparada. Completa el envío en WhatsApp; todavía no se ha enviado desde esta web.'}else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download='solicitud-certificado.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);$('request-status').textContent='Solicitud descargada. No se ha enviado ningún dato.'}});
if(!config.whatsapp){$('request-button').textContent='Descargar mi solicitud';$('contact-notice').textContent='Canal de contacto pendiente. La solicitud se descargará sin enviar tus datos.'}
update();
