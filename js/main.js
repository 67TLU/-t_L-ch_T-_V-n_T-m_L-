/* Screen 07 - data + BookingWizard (p1: data) */
var BOOKING_DATA = {
  services: [
    { id:'srv-01', name:'Tư vấn cá nhân 1-1', duration:'45 phút', format:'Trực tiếp tại cơ sở chính', summary:'Gặp chuyên viên tâm lý để trao đổi về áp lực học tập, cảm xúc và định hướng.' },
    { id:'srv-02', name:'Workshop quản trị cảm xúc', duration:'90 phút', format:'Trực tiếp tại Hội trường B', summary:'Buổi học nhóm về kỹ thuật nhận diện và điều hòa cảm xúc trong mùa thi.' },
    { id:'srv-03', name:'Chuỗi bài tập thư giãn', duration:'12 bài · 40 phút', format:'Online - Tự học', summary:'Hướng dẫn thở, thiền ngắn và bài tập thư giãn cơ tiến triển.' },
    { id:'srv-04', name:'Tư vấn phương pháp học tập & động lực', duration:'30 phút', format:'Trực tiếp / Online', summary:'Cải thiện chiến lược quản lý thời gian và vượt qua cảm giác chán nản khi học.' },
    { id:'srv-05', name:'Nhóm hỗ trợ đồng đẳng K64 - K67', duration:'60 phút', format:'Trực tiếp (Phòng sinh hoạt chung)', summary:'Không gian an toàn chia sẻ khó khăn đồng trang lứa cùng chuyên viên điều phối.' },
    { id:'srv-06', name:'Tham vấn giấc ngủ & phục hồi năng lượng', duration:'40 phút', format:'Online / Trực tiếp', summary:'Đánh giá thói quen ngủ và xây dựng lịch phục hồi năng lượng khoa học.' }
  ],
  counselors: [
    { id:'counselor-01', name:'TS. Nguyễn Minh Hà', title:'Tâm lý học đường · 9 năm kinh nghiệm', office:'Phòng H-204, Cơ sở chính',
      slots:[ {day:'T2 · 02/06',time:'08:30 – 09:15',status:'available'}, {day:'T4 · 04/06',time:'08:30 – 09:15',status:'available'}, {day:'T4 · 04/06',time:'13:30 – 14:15',status:'available'}, {day:'T5 · 05/06',time:'10:00 – 10:45',status:'available'}, {day:'T5 · 05/06',time:'15:00 – 15:45',status:'available'} ] },
    { id:'counselor-02', name:'ThS. Trần Quang Duy', title:'Tâm lý thanh thiếu niên · 6 năm kinh nghiệm', office:'Hội trường B & Phòng tư vấn 3',
      slots:[ {day:'T2 · 02/06',time:'09:00 – 10:30',status:'available'}, {day:'T4 · 04/06',time:'09:00 – 10:30',status:'available'}, {day:'T4 · 04/06',time:'14:00 – 15:30',status:'available'}, {day:'T6 · 06/06',time:'14:00 – 15:30',status:'available'} ] },
    { id:'counselor-03', name:'ThS. Phạm Thu Trang', title:'Tâm lý học đường & Định hướng · 5 năm kinh nghiệm', office:'Phòng Tư vấn 2, Nhà Thư viện',
      slots:[ {day:'T3 · 03/06',time:'08:30 – 09:15',status:'available'}, {day:'T3 · 03/06',time:'10:00 – 10:45',status:'available'}, {day:'T5 · 05/06',time:'13:30 – 14:15',status:'available'}, {day:'T7 · 07/06',time:'08:30 – 09:15',status:'available'} ] }
  ]
};
var BookingWizard = {
  currentStep: 1, selectedServiceId: 'srv-01',
  selectedCounselorId: 'counselor-01', selectedSlotTime: '',
  formData: { studentName:'Le Ngoc An', studentEmail:'ngocan@student.edu.vn', topic:'Ap luc hoc tap', notes:'', prepExercise:true },
  init: function(){ this.renderServices(); this.renderCounselors(); this.renderTimeSlots(); if(window.lucide) lucide.createIcons(); },
  renderServices: function(){
    var c = document.getElementById('service-options-container'); if(!c) return;
    var html = '';
    for(var i=0;i<BOOKING_DATA.services.length;i++){
      var s = BOOKING_DATA.services[i];
      var sel = (BookingWizard.selectedServiceId === s.id);
      html += '<div onclick="BookingWizard.selectService(\''+s.id+'\')" class="service-option-card input'+(sel?' selected':'')+'" style="background:#fff;display:flex;gap:.7rem;margin-bottom:.6rem">'
        + '<input type="radio"'+(sel?' checked':'')+' style="margin-top:4px;accent-color:#2F7A66">'
        + '<div style="flex:1"><div style="display:flex;justify-content:space-between;gap:.5rem"><strong style="font-size:.82rem">'+s.name+'</strong>'
        + '<span style="font-size:.68rem;font-weight:700;color:#2F7A66;white-space:nowrap">'+s.duration+'</span></div>'
        + '<p style="font-size:.75rem;opacity:.7;margin:.25rem 0 0">'+s.summary+'</p></div></div>';
    }
    c.innerHTML = html;
  },
  selectService: function(id){ this.selectedServiceId=id; this.renderServices(); document.getElementById('service-error').textContent=''; },
  renderCounselors: function(){
    var sel = document.getElementById('counselor-select'); if(!sel) return;
    var html='';
    for(var i=0;i<BOOKING_DATA.counselors.length;i++){ var c=BOOKING_DATA.counselors[i];
      html += '<option value="'+c.id+'"'+(c.id===this.selectedCounselorId?' selected':'')+'>'+c.name+' - '+c.title+'</option>'; }
    sel.innerHTML = html;
  },
  onCounselorChange: function(){ this.selectedCounselorId=document.getElementById('counselor-select').value; this.selectedSlotTime=''; this.renderTimeSlots(); },
  renderTimeSlots: function(){
    var box=document.getElementById('time-slots-container'); if(!box) return;
    var found=BOOKING_DATA.counselors[0];
    for(var i=0;i<BOOKING_DATA.counselors.length;i++){ if(BOOKING_DATA.counselors[i].id===this.selectedCounselorId) found=BOOKING_DATA.counselors[i]; }
    var html='';
    for(var j=0;j<found.slots.length;j++){ var s=found.slots[j]; var label=s.day+' · '+s.time; var sel=(this.selectedSlotTime===label);
      html += '<button type="button" onclick="BookingWizard.selectSlot(\''+label+'\')" class="time-slot-btn'+(sel?' selected':'')+'"><strong>'+s.day+'</strong><br><span>'+s.time+'</span></button>'; }
    box.innerHTML=html;
    if(!this.selectedSlotTime && found.slots.length){ this.selectedSlotTime=found.slots[0].day+' · '+found.slots[0].time; this.renderTimeSlots(); }
  },
  selectSlot: function(label){ this.selectedSlotTime=label; document.getElementById('selected-slot').value=label; document.getElementById('slot-error').textContent=''; this.renderTimeSlots(); },
  goToStep: function(n){
    if(n===2 && !this.selectedServiceId){ document.getElementById('service-error').textContent='Vui lòng chọn dịch vụ'; return; }
    if(n===3 && !this.selectedSlotTime){ document.getElementById('slot-error').textContent='Vui lòng chọn khung giờ'; return; }
    this.currentStep=n;
    for(var i=1;i<=4;i++){
      var sec=document.getElementById('step-content-'+i);
      var nav=document.getElementById('step-nav-'+i);
      var line=document.getElementById('line-'+i);
      if(sec) sec.classList.toggle('hidden', i!==n);
      if(nav){ nav.classList.toggle('active', i<=n); var num=nav.querySelector('.step-number');
        if(num){ if(i<n){ num.textContent='v'; num.style.background='#2F7A66'; num.style.color='#fff'; }
          else if(i===n){ num.textContent=i; num.style.background='#2F7A66'; num.style.color='#fff'; }
          else { num.textContent=i; num.style.background=''; num.style.color=''; } } }
      if(line) line.classList.toggle('completed', i<n);
    }
    if(n===4) this.renderSummary();
    window.scrollTo({top:120, behavior:'smooth'});
  },
  validateStep3AndProceed: function(){
    var name=document.getElementById('student-name'), email=document.getElementById('student-email');
    var topic=document.getElementById('booking-topic'), notes=document.getElementById('booking-notes');
    var prep=document.getElementById('prep-exercise-checkbox');
    var ne=document.getElementById('name-error'), ee=document.getElementById('email-error'), te=document.getElementById('topic-error');
    var ok=true;
    name.classList.remove('input-error'); email.classList.remove('input-error'); topic.classList.remove('input-error');
    ne.textContent=''; ee.textContent=''; te.textContent='';
    if(!name.value.trim()){ ne.textContent='Họ tên không được để trống'; name.classList.add('input-error'); ok=false; }
    var ev=email.value.trim();
    if(!ev){ ee.textContent='Email không được để trống'; email.classList.add('input-error'); ok=false; }
    else if(ev.indexOf('@')<0 || ev.slice(-7)!=='.edu.vn'){ ee.textContent='Email phải đúng đuôi .edu.vn'; email.classList.add('input-error'); ok=false; }
    if(!topic.value.trim()){ te.textContent='Vui lòng nhập chủ đề'; topic.classList.add('input-error'); ok=false; }
    if(ok){ this.formData={studentName:name.value.trim(), studentEmail:ev, topic:topic.value.trim(), notes:notes.value.trim(), prepExercise:prep.checked}; this.goToStep(4); }
  },
  renderSummary: function(){
    var card=document.getElementById('summary-review-card'); if(!card) return;
    var svc=BOOKING_DATA.services[0], coun=BOOKING_DATA.counselors[0], i;
    for(i=0;i<BOOKING_DATA.services.length;i++){ if(BOOKING_DATA.services[i].id===this.selectedServiceId) svc=BOOKING_DATA.services[i]; }
    for(i=0;i<BOOKING_DATA.counselors.length;i++){ if(BOOKING_DATA.counselors[i].id===this.selectedCounselorId) coun=BOOKING_DATA.counselors[i]; }
    var h='<p><strong>Dich vu:</strong> '+svc.name+' · '+svc.duration+' · '+svc.format+'</p>';
    h+='<p><strong>Chuyen gia:</strong> '+coun.name+' · '+coun.office+'</p>';
    h+='<p><strong>Khung gio:</strong> '+this.selectedSlotTime+'</p>';
    h+='<p><strong>Sinh vien:</strong> '+this.formData.studentName+' ('+this.formData.studentEmail+')</p>';
    h+='<p><strong>Chu de:</strong> '+this.formData.topic+'</p>';
    card.innerHTML=h;
  },
  submitBooking: function(){
    var code='APT-'+Math.floor(1000+Math.random()*9000);
    var coun=BOOKING_DATA.counselors[0];
    for(var i=0;i<BOOKING_DATA.counselors.length;i++){ if(BOOKING_DATA.counselors[i].id===this.selectedCounselorId) coun=BOOKING_DATA.counselors[i]; }
    document.getElementById('modal-apt-code').textContent=code;
    document.getElementById('modal-apt-time').textContent=this.selectedSlotTime;
    document.getElementById('modal-apt-counselor').textContent=coun.name;
    document.getElementById('success-modal').classList.remove('hidden');
    if(window.lucide) lucide.createIcons();
  },
  resetBooking: function(){ document.getElementById('success-modal').classList.add('hidden'); this.goToStep(1); }
};
window.BookingWizard=BookingWizard;
document.addEventListener('DOMContentLoaded', function(){ BookingWizard.init(); });
