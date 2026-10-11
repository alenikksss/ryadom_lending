const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*.12+'s';io.observe(el)});

/* Форма волонтёра. Статическая страница не может отправить письмо сама,
   поэтому открывается почтовое приложение с готовым письмом на нужный адрес.
   Для автоотправки подключи Formspree/FormSubmit: поменяй этот обработчик на fetch(...) к их адресу. */
const TO='alyona.ahapkina@yandex.ru';
const vf=document.getElementById('volunteer'),vmsg=document.getElementById('vmsg');
vf.addEventListener('submit',e=>{
  e.preventDefault();
  const fio=vf.fio.value.trim(),what=vf.what.value.trim();
  if(!fio||!what){vmsg.textContent='Заполни, пожалуйста, оба поля.';return}
  const a=document.createElement('a');
  a.href='mailto:'+TO+'?subject='+encodeURIComponent('Заявка волонтёра: '+fio)+'&body='+encodeURIComponent('ФИО: '+fio+'\nЧем хочет заниматься: '+what);
  document.body.appendChild(a);a.click();a.remove();
  vmsg.textContent='Открываем почту: нажми «Отправить» в письме. Если ничего не открылось, напиши на '+TO+'.';
});
