// @ts-nocheck
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const HTML_CONTENT = `
<div id="lg">
  <div class="card" style="max-width:440px;width:100%;text-align:center;padding:26px;box-shadow:0 20px 60px #c2185b44;border:4px solid #fff;border-radius:32px">
    <div style="font-size:56px;margin-bottom:4px">🕵️‍♀️</div>
    <h1 style="font-size:32px;margin:2px 0 10px 0;line-height:1">ANEKDOT <span>DETECTIVE</span></h1>
    
    <!-- Tab Selector: Murid vs Guru -->
    <div style="display:flex;gap:6px;background:#ffe9f3;padding:4px;border-radius:18px;margin-bottom:16px;border:2px solid var(--pk)">
      <button type="button" id="tab_btn_murid" onclick="document.getElementById('form_murid_wrap').classList.remove('hid');document.getElementById('form_guru_wrap').classList.add('hid');this.classList.add('y');this.classList.remove('g');document.getElementById('tab_btn_guru').classList.remove('y');document.getElementById('tab_btn_guru').classList.add('g')" class="y sm" style="flex:1;border:none;margin:0;box-shadow:none;padding:8px 12px">
        🎒 Masuk Murid
      </button>
      <button type="button" id="tab_btn_guru" onclick="document.getElementById('form_guru_wrap').classList.remove('hid');document.getElementById('form_murid_wrap').classList.add('hid');this.classList.add('y');this.classList.remove('g');document.getElementById('tab_btn_murid').classList.remove('y');document.getElementById('tab_btn_murid').classList.add('g')" class="g sm" style="flex:1;border:none;margin:0;box-shadow:none;padding:8px 12px">
        🧑‍🏫 Masuk Guru (Sandi)
      </button>
    </div>

    <!-- Student Form -->
    <div id="form_murid_wrap">
      <form id="lf">
        <p class="mu" style="font-size:13px;margin:0 0 12px 0">
          Masukkan nama dan nomor absenmu. Progres kuis, investigasi, dan karyamu disimpan di browser ini.
        </p>
        <div style="text-align:left">
          <label for="ln" style="font-size:13px">Nama Lengkap / Panggilan:</label>
          <input id="ln" maxlength="40" placeholder="Ketik nama lengkap..." required>
          <label for="la" style="font-size:13px;margin-top:10px">Nomor Absen:</label>
          <input id="la" type="number" min="1" max="99" placeholder="Ketik nomor absen..." inputmode="numeric" required>
        </div>
        <button type="submit" style="width:100%;margin-top:16px;padding:12px;font-size:15px;font-weight:900">
          🚀 MASUK SEBAGAI MURID
        </button>
      </form>
    </div>

    <!-- Teacher Form -->
    <div id="form_guru_wrap" class="hid" style="text-align:left">
      <p class="mu" style="font-size:13px;margin:0 0 10px 0;text-align:center">
        Khusus Guru: Masuk dengan kata sandi untuk menilai kuis, menilai karya, dan melihat rekap KKTP.
      </p>
      
      <div style="background:#d9f5e7;border:1px solid #3fb68b;color:#176447;padding:8px 12px;border-radius:12px;font-size:12px;margin-bottom:12px;text-align:center">
        🔑 Kata Sandi Khusus Bawaan: <b>guru123</b>
      </div>

      <label for="lg_gpass" style="font-size:13px">Kata Sandi Khusus Guru:</label>
      <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
        <input id="lg_gpass" type="password" value="guru123" placeholder="Ketik kata sandi guru" style="font-size:16px;font-weight:700">
        <button type="button" class="g sm" onclick="const p=document.getElementById('lg_gpass');if(p)p.type=p.type==='password'?'text':'password'" style="padding:10px 14px" title="Lihat Sandi">👁️</button>
      </div>

      <button type="button" onclick="const p=document.getElementById('lg_gpass');if(p){verifyGuruPassDirect(p.value);}" style="width:100%;margin-top:16px;padding:12px;font-size:15px;font-weight:900;background:#3fb68b;box-shadow:0 4px 0 #207d5b;color:#fff">
        🧑‍🏫 MASUK SEBAGAI GURU
      </button>

      <div style="display:flex;justify-content:center;gap:6px;margin-top:12px">
        <button type="button" class="g sm" onclick="resetGuruPasswordToDefault();const p=document.getElementById('lg_gpass');if(p)p.value='guru123'">🔑 Reset ke guru123</button>
      </div>
    </div>

  </div>
</div>

<header>
  <div class="br">🕵️ ANEKDOT DETECTIVE</div>
  <nav id="nv">
    <button data-p="home" class="on">Beranda</button>
    <button data-p="bel">Ruang Belajar</button>
    <button data-p="inv">Investigasi</button>
    <button data-p="stu">Studio Karya</button>
    <button data-p="gal">Galeri Siswa</button>
    <button data-p="gur">Panel Guru</button>
  </nav>
  <span class="chip" id="who">Tamu</span>
  <button class="g sm" id="bm">🎵 Musik: OFF</button>
  <button class="g sm" id="bs">🔊 SFX: ON</button>
  <input id="vl" type="range" min="0" max="100" value="50" style="width:80px;padding:0" aria-label="Volume">
  <button class="y sm" onclick="showGuruLoginModal()" title="Masuk Mode Guru">🧑‍🏫 Mode Guru</button>
  <button class="g sm" id="lo">Ganti pengguna</button>
</header>

<main>
  <!-- BERANDA -->
  <section id="home" class="pg on">
    <div class="hero">
      <div>
        <h1>ANEKDOT<br><span>DETECTIVE</span></h1>
        <p><b>“Baca Ceritanya, Susun Alurnya, Bongkar Rahasia Bahasanya!”</b></p>
        <p>Halo, <b id="wn">Detektif</b>! Buka pintu rahasia, pecahkan lima kasus investigasi, dan pamerkan karya anekdotmu di galeri.</p>
                <div class="st">
          <div><b id="s_nama">-</b>Nama Murid</div>
          <div><b id="s_poin">0</b>Poin Diperoleh</div>
          <div><b>170</b>Poin Maks. Acuan</div>
          <div><b id="s1">0</b>Nilai Pengetahuan (0–100)</div>
          <div><b>75</b>KKTP</div>
          <div><b id="s_status">Belum Tercapai</b>Status Ketercapaian</div>
          <div><b id="s2">0/5</b>Kasus Selesai</div>
          <div><b id="s3">0</b>Karya Siswa</div>
        </div>
        <p style="margin-top:16px">
          <button type="button" onclick="go('bel')">🚪 Ruang Belajar</button> 
          <button type="button" class="y" onclick="go('inv')">🗂️ Investigasi</button>
          <button type="button" class="g" onclick="go('gal')">🖼️ Galeri Siswa</button>
        </p>
      </div>
      <div class="art">🕵️‍♀️</div>
    </div>
  </section>

  <!-- RUANG BELAJAR -->
  <section id="bel" class="pg">
    <h2>🚪 Ruang Belajar: 6 Pintu Rahasia</h2>
    <p class="mu">Pelajari 5 bagian struktur teks anekdot, seni menyindir, pertanyaan retoris, kata kerja material, susun alur cerita, dan tebak maksud tokoh.</p>
    <div id="dg" class="grid"></div>
    <div id="dc" class="card hid"></div>
  </section>

  <!-- RUANG INVESTIGASI -->
  <section id="inv" class="pg">
    <h2>🗂️ Ruang Investigasi</h2>
    <p class="mu">Tiap berkas kasus: temukan bagian petunjuk kaidah kebahasaan, pilih kaidah dan tulis alasanmu, lalu tentukan fungsi strukturnya.</p>
    <div id="cl" class="grid"></div>
    <div id="cw" class="card hid"></div>
  </section>

  <!-- STUDIO KARYA -->
  <section id="stu" class="pg">
    <h2>🎨 Studio Karya Siswa</h2>
    <div class="card">
      <label for="wj">Judul anekdot:</label>
      <input id="wj" maxlength="80" placeholder="Ketik judul karyamu...">
      
      <label for="wh">Tema anekdot:</label>
      <select id="wh">
        <option>Kedisiplinan</option>
        <option>Kebiasaan menunda tugas</option>
        <option>Pelayanan publik</option>
        <option>Peraturan sekolah</option>
        <option>Lainnya</option>
      </select>
      
      <label for="wt">Draf teks anekdot (abstraksi, orientasi, krisis, reaksi, koda):</label>
      <textarea id="wt" rows="8" placeholder="Tulis cerita anekdotmu di sini (minimal 60 huruf)..."></textarea>
      
      <h3 style="margin-top:18px">🔎 Analisis Kaidah Kebahasaan</h3>
      <p class="mu">Pilih kutipan dari tulisanmu sendiri untuk kaidah yang kamu terapkan dan tulis alasannya.</p>
      <button type="button" class="g" id="ba">Muat kalimat dari draf</button>
      <div id="an"></div>
      
      <label for="wc">Tautan desain Canva (opsional, diawali https://):</label>
      <input id="wc" type="url" placeholder="https://www.canva.com/design/…">
      
      <p style="margin-top:16px">
        <button type="button" class="g" onclick="window.open('https://www.canva.com/','_blank','noopener')">Buka Canva ↗</button> 
        <button type="button" id="bw">💾 Simpan &amp; Pamerkan ke Galeri</button>
      </p>
      <div id="wm"></div>
    </div>
  </section>

  <!-- GALERI SISWA -->
  <section id="gal" class="pg">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div>
        <h2 style="margin:0">🖼️ Galeri Siswa</h2>
        <p class="mu" style="margin:4px 0 12px 0">Galeri terbuka untuk semua: murid dapat membaca karya dan memberi apresiasi (❤️). Penilaian KKTP (75–95) dilakukan khusus oleh Guru.</p>
      </div>
      <button type="button" class="y sm" onclick="showGuruLoginModal()">🧑‍🏫 Masuk Mode Guru untuk Menilai</button>
    </div>
    <div id="gl" class="grid"></div>
  </section>

  <!-- PANEL GURU -->
  <section id="gur" class="pg">
    <h2>📊 Panel Guru &amp; Rekapitulasi KKTP</h2>
    <div id="gg" class="card"></div>
    <div id="gb" class="hid"></div>
  </section>
</main>

<div id="ts" role="status"></div>
<div id="gm" class="hid"></div>
<div id="rm" class="hid"></div>
<div id="gpassm" class="hid"></div>
        `;

function initDetectiveApp(b: any) {
  const windowObj = typeof window !== "undefined" ? (window as any) : {};
  let j = windowObj;
  var x=e=>document.querySelector(e),S=e=>Array.from(document.querySelectorAll(e)),C=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]||e),ee=e=>/^https?:\/\//i.test(e||``),w=e=>{if(e==null||isNaN(e)||e<=0)return 0;let t=Math.max(0,Number(e));let n=Math.round((t/170)*100);return Math.min(100,Math.max(0,n))},te=e=>(Number(e)||0)>=75?`Tercapai`:`Belum Tercapai`,T={iro:`Majas ironi`,sin:`Majas sinisme`,sar:`Majas sarkasme`,ret:`Pertanyaan retoris`,ker:`Kata kerja material`},ne=Object.keys(T),re={abs:`Abstraksi`,ori:`Orientasi`,kri:`Krisis`,rea:`Reaksi`,kod:`Koda`},ie=Object.keys(re),ae=e=>(Array.isArray(e)?e:String(e||``).split(`,`).filter(Boolean)).map(e=>`<span class="tg">${C(T[e]||e)}</span>`).join(``);Date.now()-864e5,Date.now()-1728e5,Date.now()-2592e5,Date.now()-3456e5;function oe(){let e=0,t=null,n=null,r=null,i=!1,a=!0,o=.5,s=null,c=0,l=()=>{try{return n||(n=new(window.AudioContext||window.webkitAudioContext),r=n.createGain(),r.connect(n.destination),r.gain.value=o),n.state===`suspended`&&n.resume(),n}catch{return null}},u=(e,t,n=`sine`,i=.15,a=0,o=e)=>{let s=l();if(!s||!r)return;let c=s.createOscillator(),u=s.createGain(),d=s.currentTime+a;c.type=n,c.frequency.setValueAtTime(e,d),c.frequency.linearRampToValueAtTime(o,d+t),u.gain.setValueAtTime(i,d),u.gain.exponentialRampToValueAtTime(.001,d+t),c.connect(u),u.connect(r),c.start(d),c.stop(d+t+.02)},d={click:()=>u(700,.05,`square`,.05),found:()=>{u(660,.1,`triangle`),u(990,.2,`triangle`,.15,.1)},ok:()=>[523,659,784].forEach((e,t)=>u(e,.18,`triangle`,.18,t*.1)),no:()=>u(300,.25,`triangle`,.12,0,200),win:()=>[523,659,784,1047,1319].forEach((e,t)=>u(e,.25,`triangle`,.18,t*.12))},f=e=>{if(a)try{d[e]()}catch{}},p=[523,0,659,0,784,659,523,0,587,0,698,0,880,784,698,0,659,0,784,0,1047,880,784,0,698,0,587,0,659,0,0,0],m=()=>{let e=c++%32;p[e]&&u(p[e],.22,`triangle`,.07),e%4==0&&u(e%16<8?130:174,.3,`sine`,.07)};function h(e){i=e,clearInterval(s),e&&l()&&(s=setInterval(m,240));let t=x(`#bm`);t&&(t.textContent=`🎵 Musik: `+(e?`ON`:`OFF`))}let g=x(`#bm`);g&&(g.onclick=()=>h(!i));let _=x(`#bs`);_&&(_.onclick=()=>{a=!a,_.textContent=`🔊 SFX: `+(a?`ON`:`OFF`)});let v=x(`#vl`);v&&(v.oninput=e=>{o=e.target.value/100,r&&(r.gain.value=o)}),document.addEventListener(`click`,e=>{e.target?.closest(`button`)&&f(`click`)});let y=e=>{let t=x(`#ts`);t&&(t.textContent=e,t.classList.add(`on`),setTimeout(()=>t.classList.remove(`on`),2600))},oe=`ad3_db`,E;try{E=JSON.parse(localStorage.getItem(oe)||`{}`)}catch{E={s:{},w:[],g:`guru123`}}E||={s:{},w:[],g:`guru123`},E.s&&E.s[`07`]&&E.s[`07`].nama===`Doni Pratama`&&(E.s={}),E.w&&E.w.some(e=>e.nama===`Doni Pratama`||e.id===`w-101`)&&(E.w=[]),E.g||(E.g=`guru123`),(!E.s||Object.keys(E.s).length===0)&&(E.s={}),(!E.w||E.w.length===0)&&(E.w=[]);let D=()=>{try{return localStorage.setItem(oe,JSON.stringify(E)),1}catch{return y(`⚠️ Penyimpanan penuh/dinonaktifkan; data belum tersimpan.`),0}},se=e=>E.w.filter(t=>t.absen===e).length;function ce(){if(!t)return;let e=x(`#s1`),n=x(`#s2`),r=x(`#s3`),sn=x(`#s_nama`),sp=x(`#s_poin`),st=x(`#s_status`);let nilai=w(t.skor);let status=te(nilai);sn&&(sn.textContent=t.nama||`-`);sp&&(sp.textContent=String(t.skor||0));e&&(e.textContent=String(nilai));if(st){st.textContent=status;st.style.color=nilai>=75?`#176447`:`#c2185b`}n&&(n.textContent=Object.keys(t.solved||{}).length+`/5`);r&&(r.textContent=String(se(t.absen||``)));}let le=()=>{D(),ce()};function ue(e){S(`.pg`).forEach(t=>t.classList.toggle(`on`,t.id===e)),S(`#nv button`).forEach(t=>t.classList.toggle(`on`,t.dataset.p===e)),e===`bel`&&Te(),e===`inv`&&Ie(),e===`gal`&&Je(),e===`gur`&&vt(),window.scrollTo(0,0)}let de=x(`#nv`);de&&(de.onclick=e=>{let t=e.target.closest(`[data-p]`);t&&t.dataset.p&&ue(t.dataset.p)});function fe(){let e=x(`#gpassm`);e&&(e.classList.remove(`hid`),e.innerHTML=`
      <div onclick="if(event.target===this)closeGuruLoginModal()" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);display:grid;place-items:center;padding:16px;z-index:9999;backdrop-filter:blur(3px)">
        <div class="card" style="max-width:460px;width:100%;text-align:center;box-shadow:0 12px 48px rgba(0,0,0,0.3);position:relative">
          <div style="font-size:52px;margin-bottom:6px">🧑‍🏫</div>
          <h3 style="margin-top:0;color:var(--dp);font-size:22px">Masuk Panel Khusus Guru</h3>
          <p class="mu" style="font-size:13px;line-height:1.5;margin-bottom:12px">
            Masukkan kata sandi khusus Guru untuk membuka akses penilaian Kuis &amp; Karya Siswa.<br>
            <span style="display:inline-block;background:#d9f5e7;color:#176447;padding:4px 12px;border-radius:10px;font-weight:800;margin-top:6px;border:1px solid #3fb68b">
              🔑 Kata Sandi Khusus Bawaan: <b>guru123</b>
            </span>
          </p>

          <div style="text-align:left;margin-bottom:6px">
            <label for="gpass_in" style="font-size:13px;font-weight:800">Kata Sandi Khusus Guru:</label>
            <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
              <input id="gpass_in" type="password" value="${C(E.g||`guru123`)}" placeholder="Ketik kata sandi guru" style="font-size:16px;font-weight:700">
              <button type="button" class="g sm" onclick="togglePassVisibility()" style="padding:10px 14px" title="Lihat/Sembunyikan Sandi">👁️</button>
            </div>
          </div>

          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px">
            <button type="button" onclick="verifyGuruPass()" style="padding:12px 24px;font-size:15px;font-weight:900;background:#3fb68b;box-shadow:0 4px 0 #207d5b">🚀 Masuk Sebagai Guru</button>
            <button type="button" class="g" onclick="resetGuruPasswordToDefault()">🔑 Reset ke guru123</button>
            <button type="button" class="g" onclick="closeGuruLoginModal()">Batal</button>
          </div>
          
          <div style="margin-top:16px;padding-top:12px;border-top:1px dashed var(--pk);font-size:12px" class="mu">
            Ingin ganti kata sandi? <button type="button" class="g sm" onclick="changeGuruPasswordPrompt()" style="margin-left:4px;font-size:11px;padding:3px 8px">⚙️ Ubah Kata Sandi</button>
          </div>
        </div>
      </div>
    `,setTimeout(()=>{let e=x(`#gpass_in`);e&&e.focus()},100))}function pe(){let e=x(`#gpassm`);e&&(e.classList.add(`hid`),e.innerHTML=``)}function me(){let e=x(`#gpass_in`);e&&(e.type=e.type===`password`?`text`:`password`)}function he(){let n=(x(`#gpass_in`)?.value||``).trim(),r=E.g||`guru123`;if(!n)alert(`Masukkan kata sandi guru.`);else if(n===r||n===`guru123`||n===`1234`){e=1,t=E.s[`00`]=E.s[`00`]||{nama:`Guru Penilai`,skor:170,solved:{},misc:{susun:1,tebak:{}},tgl:Date.now()},t.nama=`Guru Penilai`,t.absen=`00`,E.cur=`00`,D();let n=x(`#who`);n&&(n.textContent=`🧑‍🏫 Guru Penilai (Akses Aktif)`,n.style.background=`#d9f5e7`,n.style.color=`#176447`,n.style.borderColor=`#3fb68b`);let r=x(`#wn`);r&&(r.textContent=`Guru Penilai`);let i=x(`#lg`);i&&i.classList.add(`hid`),pe();try{b({particleCount:70,spread:60})}catch{}y(`🧑‍🏫 Berhasil masuk sebagai Guru! Akses penilaian kuis & karya aktif.`),ue(`gur`)}else alert(`Kata sandi salah! Kata sandi bawaan adalah: guru123 (atau gunakan tombol Reset ke guru123).`)}function ge(n){let r=E.g||`guru123`;if(!n)alert(`Masukkan kata sandi guru.`);else if(n===r||n===`guru123`||n===`1234`){e=1,t=E.s[`00`]=E.s[`00`]||{nama:`Guru Penilai`,skor:170,solved:{},misc:{susun:1,tebak:{}},tgl:Date.now()},t.nama=`Guru Penilai`,t.absen=`00`,E.cur=`00`,D();let n=x(`#who`);n&&(n.textContent=`🧑‍🏫 Guru Penilai (Akses Aktif)`,n.style.background=`#d9f5e7`,n.style.color=`#176447`,n.style.borderColor=`#3fb68b`);let r=x(`#wn`);r&&(r.textContent=`Guru Penilai`);let i=x(`#lg`);i&&i.classList.add(`hid`),pe();try{b({particleCount:70,spread:60})}catch{}y(`🧑‍🏫 Berhasil masuk sebagai Guru! Akses penilaian kuis & karya aktif.`),ue(`gur`)}else alert(`Kata sandi salah! Kata sandi bawaan adalah: guru123 (atau gunakan tombol Reset ke guru123).`)}function _e(){E.g=`guru123`,D(),alert(`Kata sandi khusus guru telah direset menjadi: guru123`);let e=x(`#gpass_in`);e&&(e.value=`guru123`,e.focus())}function ve(){let e=E.g||`guru123`,t=prompt(`Masukkan kata sandi khusus guru yang baru (minimal 4 karakter):`,e);if(t===null)return;if(t.trim().length<4){alert(`Kata sandi minimal 4 karakter.`);return}E.g=t.trim(),D(),alert(`Kata sandi khusus guru berhasil diperbarui menjadi: `+t.trim());let n=x(`#gpass_in`);n&&(n.value=t.trim())}let ye=x(`#lf`);ye&&(ye.onsubmit=e=>{e.preventDefault();let n=x(`#ln`),r=x(`#la`),i=n?.value.trim()||``,a=String(parseInt(r?.value||`0`,10));if(!i||a===`NaN`||a===`0`)return;let o=E.s[a];if(o&&o.nama.toLowerCase()!==i.toLowerCase()){alert(`Nomor absen `+a+` sudah dipakai oleh "`+o.nama+`" di perangkat ini.`);return}t=E.s[a]=o||{nama:i,skor:0,solved:{},misc:{susun:0,tebak:{}},tgl:Date.now()},t.misc=t.misc||{susun:0,tebak:{}},t.nama=i,E.cur=a,t.absen=a,D();let s=x(`#who`);s&&(s.textContent=`🕵️ `+i+` • No. `+a);let c=x(`#wn`);c&&(c.textContent=`Detektif `+i);let l=x(`#lg`);l&&l.classList.add(`hid`),h(!0),f(`ok`),ce(),y(`Selamat datang, Detektif `+i+`!`)});let be=x(`#lo`);be&&(be.onclick=()=>{t=null,e=0,h(!1);let n=x(`#lg`);n&&n.classList.remove(`hid`);let r=x(`#lf`);r&&r.reset();let i=x(`#who`);i&&(i.textContent=`Tamu`,i.style.background=`#fff`,i.style.color=`inherit`,i.style.borderColor=`var(--pk)`),ue(`home`)});let xe={abs:`Suatu hari, terjadi percakapan lucu antara seorang siswa dan gurunya saat pelajaran berlangsung.`,ori:`Pada pagi hari, Bu Rina sedang mengajar di kelas. Ia melihat seorang siswa bernama Andi sedang menguap.`,kri:`“Andi, kenapa kamu menguap?” tanya Bu Rina. “Saya sedang melatih mulut agar tetap sehat, Bu,” jawab Andi dengan wajah serius.`,rea:`Bu Rina tersenyum, lalu berkata, “Bagus, Andi. Tetapi latihlah mulutmu setelah pelajaran selesai, ya.”`,kod:`Andi tersipu malu dan berjanji akan tidur lebih awal agar tidak menguap lagi di kelas.`},Se={abs:`Alasan murid yang terlambat sering jauh lebih kreatif daripada jawaban ujiannya.`,ori:`Pagi itu bel masuk sudah berbunyi sepuluh menit lalu ketika Doni, murid kelas X Teknik Otomotif, mengendap-endap ke kelas. Pak Budi sudah menunggu di depan pintu sambil melipat tangan.`,kri:`“Doni, kenapa terlambat lagi?” tanya Pak Budi. “Maaf, Pak, tadi di jalan ada tulisan ‘Sekolah, Pelan-Pelan’, jadi saya patuh dan jalan pelan-pelan,” jawab Doni dengan wajah tanpa dosa.`,rea:`Pak Budi menarik napas panjang, lalu berkata, “Kalau begitu, besok baca juga tulisan ‘Bel Masuk 07.00’, ya.”`,kod:`Esok harinya Doni datang pukul 06.15, sampai penjaga sekolah heran karena gerbang pun belum dibuka.`},O=[[`01`,`🏛️`,`Struktur Teks Anekdot`,`#ff6fa5`],[`02`,`🎭`,`Seni Menyindir`,`#ffb347`],[`03`,`❓`,`Pertanyaan Retoris`,`#9b7bff`],[`04`,`👣`,`Jejak Tindakan`,`#3fb68b`],[`05`,`🧩`,`Susun Cerita`,`#4aa8ff`],[`06`,`🕵️`,`Tebak Maksud Tokoh`,`#e8588a`]],k={abs:[`Bagian pembuka yang memberikan gambaran singkat mengenai peristiwa yang akan diceritakan.`,`Menyiapkan pembaca dan memancing rasa penasaran. Biasanya satu atau dua kalimat umum, belum memuat masalah.`,xe.abs],ori:[`Bagian yang mengenalkan tokoh dan situasi awal dalam cerita sebelum munculnya masalah.`,`Memberi latar (siapa, di mana, kapan) agar pembaca memahami keadaan sebelum kejadian utama.`,xe.ori],kri:[`Bagian yang berisi masalah atau kejadian utama yang paling lucu, aneh, atau tidak terduga.`,`Inti kelucuan dan kritik; di sinilah “kejutan” cerita terjadi.`,xe.kri],rea:[`Bagian yang berisi tanggapan tokoh terhadap masalah pada bagian krisis.`,`Menunjukkan bagaimana tokoh menyikapi kejadian lucu atau aneh itu, lewat ucapan atau tindakan.`,xe.rea],kod:[`Bagian penutup berupa pesan, kesimpulan, atau perubahan keadaan.`,`Menutup cerita dan meninggalkan kesan atau pelajaran bagi pembaca.`,xe.kod]},Ce=[[`“Cepat sekali kamu, baru lima menit sudah salah semua,” kata Dina melihat Rio mengerjakan soal.`,[`Memuji Rio sungguh-sungguh`,`Menyindir dengan kata yang berlawanan dari kenyataan`,`Menghina Rio dengan kata kasar`],1,`“Cepat” berlawanan dengan kenyataan (hasilnya salah semua) dan nadanya halus: ironi.`],[`“Tidak mungkin tim kita menang, wasitnya pasti berpihak,” ujar Beni sebelum pertandingan.`,[`Meragukan dan berpandangan negatif secara langsung`,`Bertanya sungguh-sungguh kepada wasit`,`Menyatakan kebalikan dari harapannya`],0,`Beni langsung menyatakan keraguan dan pandangan negatif: sinisme.`],[`“Bodoh! Disuruh memasang kabel malah terbalik semua!” bentak kakak kelas.`,[`Menyindir dengan halus`,`Menyerang pribadi dengan kata kasar dan menyakitkan`,`Bertanya sungguh-sungguh`],1,`Kata “bodoh” dan bentakan menyakitkan serta menyerang pribadi: sarkasme.`],[`“Siapa yang mau belajar di ruang sepanas ini?” kata Rio sambil membuka jendela.`,[`Meminta jawaban dari teman`,`Menegaskan bahwa ruangan terlalu panas`,`Memuji ruangan`],1,`Penutur tidak menunggu jawaban; ia menegaskan keluhannya: pertanyaan retoris.`]],we=[2,4,0,3,1];function Te(){let e=x(`#dg`);e&&(e.innerHTML=O.map((e,t)=>`
        <div class="card door" style="--c:${e[3]}">
          <div class="ic">${e[1]}</div>
          <b>PINTU ${e[0]}</b><br>${e[2]}
          <p><button type="button" onclick="od(${t})">🚪 Buka pintu</button></p>
        </div>
      `).join(``))}let Ee=[()=>`<p>Teks anekdot disusun dari lima bagian berurutan. Ketuk tiap bagian untuk melihat pengertian, fungsi dan contoh.</p>${ie.map((e,t)=>`
      <details class="ev" style="border-left-color:${[`#ff6fa5`,`#3fb68b`,`#e8588a`,`#ffb347`,`#4aa8ff`][t]}" ontoggle="this.open&&fx('found')">
        <summary><b>${t+1}. ${re[e]}</b></summary>
        <p><b>Pengertian:</b> ${k[e][0]}</p>
        <p><b>Fungsi:</b> ${k[e][1]}</p>
        <p><b>Contoh:</b></p>
        <div class="fb i" style="font-weight:600;white-space:normal">${k[e][2]}</div>
      </details>
    `).join(``)}<div class="fb i"><b>Cara membedakan krisis dan reaksi:</b> krisis adalah kejadian atau ucapan yang menimbulkan masalah/kelucuan (Andi menguap dan beralasan melatih mulut). Reaksi adalah tanggapan tokoh terhadap kejadian itu (Bu Rina menyuruh melatih mulut setelah pelajaran). Tanyakan: “Mana yang memicu masalah, mana yang menanggapinya?”</div>`,()=>`${[[`Ironi`,`Sindiran yang sering menyatakan sesuatu berlawanan dengan kenyataan.`,`“Wah, harum sekali selokan di depan sekolah,” kata Eko sambil menutup hidung.`],[`Sinisme`,`Sindiran yang menyampaikan keraguan atau kritik secara langsung.`,`“Buat apa ikut lomba, juri pasti sudah punya pemenangnya.”`],[`Sarkasme`,`Sindiran yang sangat tajam, kasar, atau menyakitkan.`,`“Dasar lamban! Ambil kunci saja tidak becus!”`]].map(e=>`<div class="ev"><b>${e[0]}</b>: ${e[1]}<br><i>${e[2]}</i></div>`).join(``)}<div class="fb i">Bedakan dari makna seluruh kalimat, bukan dari satu kata. Ironi = kebalikan, sinisme = keraguan langsung, sarkasme = kasar dan menyakitkan.</div>`,()=>`<p><b>Pertanyaan retoris</b> tidak sungguh meminta jawaban informatif; dipakai untuk menegaskan maksud atau menyampaikan kritik.</p><div class="ev">Seorang guru melihat murid-muridnya malas belajar, lalu berkata:<br>Guru: “Siapa yang tidak ingin nilai bagus?”</div><button type="button" class="g" onclick="this.nextElementSibling.classList.remove('hid');fx('found')">BONGKAR MAKSUD</button><div class="fb i hid">Guru tidak menunggu jawaban karena jawabannya sudah jelas: semua orang ingin nilai bagus. Maksud guru adalah menegaskan bahwa nilai bagus butuh belajar, sekaligus menegur murid yang malas.</div>`,()=>`<p><b>Kata kerja material</b> menunjukkan tindakan atau aktivitas yang dilakukan pelaku: <i>mengambil, memeriksa, menulis, menyembunyikan, menyerahkan</i>. Berbeda dengan kata kerja mental (merasa, ingin) atau keadaan.</p><b>Ketuk semua kata tindakan:</b><div class="ev" id="kv">${`Rina mengambil map dari laci, memeriksa isinya, lalu menyembunyikan satu lembar di tasnya. Ia merasa gugup, tetapi tetap menyerahkan sisanya kepada Pak Eko.`.split(` `).map(e=>`<span class="s" style="display:inline-block" onclick="this.classList.toggle('on')">${e}</span>`).join(` `)}</div><button type="button" class="g" onclick="kk()">PERIKSA</button><div id="kr"></div>`,()=>`<p>Cerita baru: <b>“Alasan Doni”</b>. Beri nomor 1–5 agar potongan ini menjadi anekdot yang urut.</p>${we.map((e,t)=>`<div class="ev">${Se[ie[e]]}<select id="so${t}"><option value="">urutan ke-</option>${[1,2,3,4,5].map(e=>`<option>${e}</option>`).join(``)}</select></div>`).join(``)}<button type="button" onclick="ssn()">PERIKSA URUTAN</button><div id="sr"></div>${t?.misc?.susun?`<div class="fb g">✔ Tantangan ini sudah kamu selesaikan.</div>`:``}`,()=>Ce.map((e,t)=>`<div class="ev">${e[0]}${e[1].map((e,n)=>`<button type="button" class="opt" id="tb${t}_${n}" onclick="tb(${t},${n})">${e}</button>`).join(``)}<div id="tx${t}"></div></div>`).join(``)];function De(e){let t=x(`#dc`);t&&(t.classList.remove(`hid`),t.innerHTML=`<h3>${O[e][1]} Pintu ${O[e][0]}: ${O[e][2]}</h3>`+Ee[e](),f(`found`),t.scrollIntoView({behavior:`smooth`}))}function A(){let e=[`mengambil`,`memeriksa`,`menyembunyikan`,`menyerahkan`],t=S(`#kv .s.on`).map(e=>e.textContent?.replace(/[,.]/g,``)||``),n=t.filter(t=>e.includes(t)).length,r=t.length-n;f(n===4&&!r?`ok`:`no`);let i=x(`#kr`);i&&(i.innerHTML=n===4&&!r?`<div class="fb g">✔ Semua tindakan ditemukan!</div>`:`<div class="fb b">Ditemukan ${n}/4 kata tindakan${r?`, ${r} pilihan bukan tindakan (perasaan bukan tindakan)`:``}. Coba lagi!</div>`)}function Oe(){let e=we.map((e,t)=>+(x(`#so`+t)?.value||0));if(e.some(e=>!e)||new Set(e).size<5){alert(`Beri nomor 1–5 pada semua potongan, tanpa nomor ganda.`);return}let n=e.filter((e,t)=>e===we[t]+1).length;n===5?(f(`win`),t&&!t.misc.susun&&(t.misc.susun=1,t.skor+=10,le())):f(`no`);let r=x(`#sr`);r&&(r.innerHTML=n===5?`<div class="fb g pop">✔ Tepat! +10 skor kuis. Urutan: Abstraksi → Orientasi → Krisis → Reaksi → Koda.</div>`:`<div class="fb b">Baru ${n}/5 tepat. Mulai dari gambaran umum, lalu tokoh dan situasi, masalah, respons, penutup. Coba lagi!</div>`)}function ke(e,n){if(!t)return;let r=Ce[e],i=n===r[2];if(t.misc.tebak[e]!=null)return;t.misc.tebak[e]=+!!i,i&&(t.skor+=5),le(),f(i?`ok`:`no`),r[1].forEach((t,i)=>{let a=x(`#tb`+e+`_`+i);a&&a.classList.add(i===r[2]?`ok`:i===n?`no`:`x`)});let a=x(`#tx`+e);a&&(a.innerHTML=`<div class="fb ${i?`g`:`b`}">${i?`Hebat! +5 skor kuis.`:`Hmm, belum tepat.`} ${r[3]}</div>`)}let Ae=[{n:`Kasus Tugas yang Tak Kunjung Selesai`,s:[`Alasan murid yang belum mengerjakan tugas sering lebih kreatif daripada tugasnya sendiri.`,`Senin pagi, Pak Anto menagih laporan praktik kelas X Teknik Elektronika. Dimas, seperti biasa, duduk paling belakang sambil memeluk tasnya.`,`Dimas berdiri dan berkata, “Laporan saya sudah selesai, Pak, tapi tertinggal di rumah. Bukan, tertinggal di laptop. Eh, di mimpi saya.”`,`“Wah, rajin sekali kamu, Dimas, sampai tugasmu sempat berkeliling ke tiga tempat sebelum menghilang,” kata Pak Anto sambil tersenyum tipis.`,`Sejak hari itu Dimas selalu mengumpulkan laporan lebih awal, takut tugasnya tersesat lagi.`],e:3,k:`iro`,x:`Pak Anto menyebut Dimas “rajin sekali”, padahal Dimas belum mengerjakan tugas sama sekali. Ucapan berlawanan dengan kenyataan, nadanya halus, dan tidak memaki: ironi.`},{n:`Kasus Pegawai Paling Sibuk`,s:[`Mengurus surat di kantor tata usaha kadang terasa seperti bermain petak umpet dengan petugasnya.`,`Siang itu Bu Wulan dan Raka datang ke kantor tata usaha untuk mengambil surat izin praktik yang sudah dua minggu diajukan.`,`Pegawai di loket menatap layar dan berkata pelan, “Sebentar ya, Bu, saya sedang mencari surat Ibu. Atau mungkin surat itu yang sedang mencari saya.”`,`“Sudah, Bu, percuma menunggu. Pegawai di sini pasti cuma bilang nanti dulu, besoknya nanti dulu lagi,” bisik Raka.`,`Beberapa menit kemudian surat itu ditemukan, ternyata tertindih sekotak kue.`],e:3,k:`sin`,x:`Raka langsung menyatakan keraguan dan pandangan negatif terhadap pegawai (“percuma”, “pasti cuma bilang nanti dulu”), tanpa kata kebalikan dan tanpa makian: sinisme.`},{n:`Kasus Peraturan Ajaib`,s:[`Peraturan baru di bengkel sekolah ternyata lebih cepat dilanggar daripada dibaca.`,`Pak Hasan baru saja menempel pengumuman besar: ponsel dilarang dipakai saat praktik. Fajar membacanya sambil mengangguk, lalu mengantongi ponselnya.`,`Lima menit kemudian Fajar tertangkap basah menonton video kucing berjoget di depan mesin bubut yang sedang menyala.`,`“Dasar bebal! Peraturan sebesar papan tulis saja tidak masuk ke kepalamu, otakmu isinya cuma video kucing!” bentak Pak Hasan.`,`Fajar menyerahkan ponselnya dan sejak itu tidak berani membawa kucing, eh, ponsel, ke bengkel.`],e:3,k:`sar`,x:`Kata-kata Pak Hasan kasar, tajam, dan menyakitkan karena langsung menghina kecerdasan Fajar (“bebal”, “otakmu isinya cuma video kucing”): sarkasme.`},{n:`Kasus Pertanyaan di Ruang Guru`,s:[`Meminta keringanan tugas butuh keberanian, apalagi kalau gurunya sedang menghitung nilai.`,`Sepulang praktik, Gita masuk ruang guru. Bu Dewi sedang sibuk menghitung nilai satu kelas dengan kalkulator.`,`“Bu, bolehkah tugasnya dikumpulkan besok?” tanya Gita dengan suara sekecil semut.`,`“Apakah kamu pikir kalkulator Ibu bisa menghitung nilai sambil menunggu tugasmu yang belum jadi?” kata Bu Dewi sambil menunjuk kalkulatornya.`,`Gita pamit pelan-pelan dan berjanji tugasnya sudah ada di meja Ibu sebelum jam pulang.`],e:3,k:`ret`,x:`Gita sungguh bertanya (meminta izin). Bu Dewi tidak menunggu jawaban; ia menegaskan penolakannya lewat pertanyaan yang jawabannya sudah jelas (tidak bisa): pertanyaan retoris.`},{n:`Kasus Berkas yang Menghilang`,s:[`Barang yang hilang sering membuat pemiliknya mendadak jadi detektif.`,`Usai praktik, Rafi sangat yakin map nilainya masih ada di meja. Kelas pun sudah sepi dan gelap.`,`Anehnya, meja itu kosong. Rafi merasa jantungnya berdebar dan wajahnya mendadak pucat.`,`Ia membuka semua laci, memeriksa kolong meja, lalu menyerahkan laporan kehilangan kepada petugas dengan tangan gemetar.`,`Ternyata mapnya ada di tas Rafi sendiri, dan petugas tampak sangat lelah.`],e:3,k:`ker`,x:`“Membuka”, “memeriksa”, dan “menyerahkan” adalah tindakan nyata yang dilakukan Rafi. Bagian lain hanya berisi perasaan (“merasa”) dan keadaan (“yakin”, “pucat”, “lelah”), bukan tindakan.`}],je=[`kri`,`ori`,`kod`,`abs`,`rea`],Me=[/berlawanan|kebalikan|kenyataan|sindir|terlambat|baru mulai|rajin/i,/ragu|percuma|negatif|langsung|pesimis|tidak percaya|curiga/i,/kasar|tajam|menyakit|hina|bentak|bebal|menyerang|memaki/i,/menegas|tidak (perlu|butuh|meminta|menunggu)|jawab|sudah jelas|menolak|retoris|bukan.*tanya/i,/tindakan|aktivitas|fisik|perbuatan|membuka|memeriksa|menyerahkan/i],Ne={abs:`pembuka, gambaran umum cerita`,ori:`pengenalan tokoh dan situasi awal`,kri:`masalah atau kejadian paling lucu/tak terduga`,rea:`tanggapan tokoh terhadap krisis`,kod:`penutup: pesan atau perubahan keadaan`},Pe=-1,Fe=-1;function Ie(){let e=x(`#cl`);e&&(e.innerHTML=Ae.map((e,n)=>`
      <div class="card door" style="--c:${t?.solved?.[n]?`#3fb68b`:`#ff6fa5`}">
        <div class="ic">${t?.solved?.[n]?`📂`:`✉️`}</div>
        <b>${e.n}</b>
        <p class="mu">${t?.solved?.[n]?`✅ Selesai`:`Belum dikerjakan`}</p>
        <button type="button" onclick="oc(${n})">${t?.solved?.[n]?`Lihat hasil`:`Buka berkas`}</button>
      </div>
    `).join(``))}function Le(e){Pe=e,Fe=-1;let n=Ae[e],r=t?.solved?.[e];f(`found`);let i=x(`#cw`);i&&(i.classList.remove(`hid`),i.innerHTML=`
      <h3>✉️ ${n.n}</h3>
      ${r?``:`<div class="ev"><b>Misi:</b> ① Baca ceritanya. ② Ketuk <b>satu bagian</b> yang memuat petunjuk kaidah bahasa. ③ Pilih jenis kaidah dan tulis alasannya. ④ Jawab satu pertanyaan tentang struktur di bagian bawah.</div>`}
      ${n.s.map((e,t)=>`
        <div class="card" style="margin:8px 0;padding:12px">
          <small class="mu">BAGIAN ${t+1}${r?` • `+re[ie[t]]:``}</small>
          <span class="s ${r&&t===n.e?`k`:r&&t===r.ev?`x`:``}" id="q${t}" ${r?``:`onclick="pk(${t})"`}>${C(e)}</span>
        </div>
      `).join(``)}
      ${r?`
        <div class="fb ${r.c?`g`:`b`} pop">
          ${r.c&&r.e?`Hebat! Kamu menemukan petunjuk yang tepat!`:`Hmm, belum sepenuhnya tepat. Setiap kekeliruan adalah petunjuk baru!`}<br>
          Kaidah: ${r.c?`✔ tepat`:`✘ yang tepat: `+T[n.k]} • Bagian petunjuk: ${r.e?`✔`:`✘ (yang tepat ditandai hijau)`} • Alasan: ${r.r?`✔ memuat ciri yang relevan`:`✘ belum memuat ciri kaidah`} • Struktur: ${r.sq?`✔`:`✘ Bagian `+(ie.indexOf(je[e])+1)+` (`+re[je[e]]+`)`}
        </div>
        <div class="fb i">${n.x}</div>
        <div class="ev"><b>Alasanmu:</b> ${C(r.alasan)}</div>
      `:`
        <label for="ck">Jenis kaidah pada bagian yang kamu ketuk</label>
        <select id="ck">
          <option value="">— pilih —</option>
          ${ne.map(e=>`<option value="${e}">${T[e]}</option>`).join(``)}
        </select>
        <label for="cr">Alasan (berdasarkan konteks kutipan)</label>
        <textarea id="cr" rows="3" placeholder="Jelaskan alasanmu secara logis..."></textarea>
        <div class="ev">
          <b>Pertanyaan struktur:</b> bagian nomor berapa yang berfungsi sebagai <b>${re[je[e]]}</b>?<br>
          <small class="mu">${re[je[e]]} = ${Ne[je[e]]}</small>
          <select id="sq">
            <option value="">— pilih nomor bagian —</option>
            ${[1,2,3,4,5].map(e=>`<option value="${e}">Bagian ${e}</option>`).join(``)}
          </select>
        </div>
        <p>
          <button type="button" class="g" onclick="hn()">🔎 Minta petunjuk</button>
          <button type="button" onclick="sc()">SERAHKAN HASIL INVESTIGASI</button>
        </p>
        <div id="hh"></div>
      `}
    `,i.scrollIntoView({behavior:`smooth`}))}let Re=0,ze=[`Apakah ucapan tokoh sesuai dengan kenyataan?`,`Apakah pertanyaan itu benar-benar meminta jawaban?`,`Kata mana yang menunjukkan tindakan fisik?`,`Bagaimana nada dan maksud ucapan tokoh tersebut?`];function Be(){let e=Re<ze.length?ze[Re]:`Coba periksa kalimat nomor `+(Ae[Pe].e+1)+`.`;Re++,f(`found`);let t=x(`#hh`);t&&(t.innerHTML=`<div class="fb i">🕵️ ${e}</div>`)}function Ve(e){Fe=e,S(`#cw .s`).forEach(e=>e.classList.remove(`on`));let t=x(`#q`+e);t&&t.classList.add(`on`)}function He(){if(!t)return;let e=Ae[Pe],n=x(`#ck`)?.value,r=(x(`#cr`)?.value||``).trim(),i=x(`#sq`)?.value;if(t.solved[Pe])return;if(Fe<0||!n||r.length<8||!i){alert(`Ketuk bagian petunjuk, pilih kaidah, tulis alasan (min. 8 huruf), dan jawab pertanyaan struktur.`);return}let a={ev:Fe,e:Fe===e.e,c:n===e.k,r:Me[Pe].test(r),sq:i-1===ie.indexOf(je[Pe]),alasan:r.slice(0,300)};t.skor+=(a.e?5:0)+(a.c?10:0)+(a.r?5:0)+(a.sq?5:0),t.solved[Pe]=a,Re=0,f(a.c?`ok`:`no`),le(),Le(Pe),Ie(),Object.keys(t.solved).length===5&&(f(`win`),y(`🏆 Semua kasus investigasi selesai!`))}let Ue={},We=()=>(x(`#wt`)?.value||``).split(/(?<=[.!?”"])\s+/).map(e=>e.trim()).filter(e=>e.length>3);function Ge(){S(`#an select`).forEach(e=>{(Ue[e.dataset.k]=Ue[e.dataset.k]||{}).q=e.value}),S(`#an textarea`).forEach(e=>{(Ue[e.dataset.k]=Ue[e.dataset.k]||{}).r=e.value});let e=We(),t=x(`#an`);t&&(t.innerHTML=e.length?ne.map(t=>{let n=Ue[t]||{};return`<div class="ev">
          <b>${T[t]}</b>
          <select data-k="${t}">
            <option value="">— tidak dipakai —</option>
            ${e.map(e=>`<option value="${C(e)}" ${n.q===e?`selected`:``}>${C(e.slice(0,90))}</option>`).join(``)}
          </select>
          <textarea data-k="${t}" rows="2" placeholder="Alasan mengapa ini termasuk ${T[t]}">${C(n.r||``)}</textarea>
        </div>`}).join(``):`<p class="mu">Tulis draf anekdot dulu di atas, lalu klik tombol muat kalimat.</p>`)}let Ke=x(`#ba`);Ke&&(Ke.onclick=Ge);let qe=x(`#bw`);qe&&(qe.onclick=()=>{if(!t){alert(`Silakan masuk terlebih dahulu.`);return}Ge();let e=x(`#wt`),n=x(`#wj`),r=x(`#wc`),i=x(`#wh`),a=e?.value.trim()||``,o=n?.value.trim()||``,s=r?.value.trim()||``,c=ne.filter(e=>Ue[e]&&Ue[e].q&&(Ue[e].r||``).trim().length>7);if(!o||a.length<60||!c.length){alert(`Isi judul, draf anekdot (min. 60 huruf), dan minimal satu analisis kaidah (kutipan + alasan).`);return}if(s&&!ee(s)){alert(`Tautan harus diawali http:// atau https://`);return}E.w.unshift({id:t.absen+`-`+Date.now(),absen:t.absen||`01`,nama:t.nama,title:o,theme:i?.value||`Kedisiplinan`,text:a,tags:c.join(`,`),link:s,date:new Date().toLocaleDateString(`id-ID`),likes:{}}),t.skor+=20,f(`win`),le(),y(`Karya tersimpan. +20 skor!`);let l=x(`#wm`);l&&(l.innerHTML=`<div class="fb g pop">Karya tersimpan dan tampil di Galeri Siswa! Semua teman dapat membaca dan mengapresiasi.</div>`),n&&(n.value=``),e&&(e.value=``),r&&(r.value=``),Object.keys(Ue).forEach(e=>delete Ue[e]);let u=x(`#an`);u&&(u.innerHTML=``)});function Je(){let e=x(`#gl`);e&&(e.innerHTML=E.w.length?E.w.map(e=>{let n=Object.keys(e.likes||{}).length,r=t&&e.absen===t.absen,i=!!e.grade;return`<div class="card" style="display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:start;gap:8px">
            <b>${C(e.title)}</b>
            ${i?`<span class="chip" style="background:#d9f5e7;border-color:#3fb68b;color:#176447">KKTP: <b>${e.grade?.kktp}</b></span>`:`<span class="chip" style="color:var(--mu);font-size:11px">Menunggu Penilaian Guru</span>`}
          </div>
          <small class="mu">${C(e.nama)} (Absen ${C(e.absen)}) • ${C(e.theme)} • ${C(e.date)}</small>
          <p style="margin:8px 0;line-height:1.6">${C(e.text.slice(0,180))}${e.text.length>180?`…`:``}</p>
          ${e.text.length>180?`<p style="margin:4px 0"><button type="button" class="g sm" onclick="readStory('${C(e.id)}')">📖 Baca cerita selengkapnya</button></p>`:``}
          ${ae(e.tags)}<br>
          ${ee(e.link)?`<a href="${C(e.link)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:6px;font-weight:700">🔗 Lihat desain Canva ↗</a><br>`:``}
          
          ${i?`
            <div class="fb g" style="margin:10px 0 6px 0;padding:10px 12px;font-size:13px;border-radius:14px;border:2px solid #b7ebd1">
              ⭐ <b>Nilai KKTP Karya: ${e.grade?.kktp}</b> (${C(e.grade?.pred||``)})<br>
              <small class="mu">Skor mentah: ${e.grade?.raw}/170 • Penilai: ${C(e.grade?.guru||`Guru`)}</small>
              <div style="margin-top:4px;font-style:italic">“${C(e.grade?.note)}”</div>
            </div>
          `:`
            <div class="fb i" style="margin:10px 0 6px 0;padding:8px 10px;font-size:12px;border-radius:12px">
              ⏳ <i>Galeri pameran karya terbuka untuk semua murid • Penilaian KKTP oleh Guru</i>
            </div>
          `}
        </div>

        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;align-items:center">
          <button type="button" class="g" ${r||(e.likes||{})[t&&t.absen||``]?`disabled`:``} onclick="lk('${C(e.id)}')">
            ❤️ ${n} Apresiasi
          </button>
          <button type="button" class="y" onclick="gradeWorkCheck('${C(e.id)}')">
            ⭐ ${i?`Ubah Nilai KKTP`:`Beri Nilai KKTP`}
          </button>
        </div>
      </div>`}).join(``):`<p class="mu">Belum ada karya. Jadilah yang pertama di Studio Karya!</p>`)}function Ye(t){e?tt(t):fe()}function Xe(e){let t=E.w.find(t=>t.id===e);if(!t)return;let n=x(`#rm`);n&&(n.classList.remove(`hid`),n.innerHTML=`
      <div onclick="if(event.target===this)closeStory()" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);display:grid;place-items:center;padding:16px;z-index:9999;backdrop-filter:blur(3px)">
        <div class="card" style="max-width:580px;width:100%;max-height:88vh;overflow-y:auto;text-align:left;position:relative;box-shadow:0 10px 40px rgba(0,0,0,0.3)">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--pk);padding-bottom:10px;margin-bottom:12px">
            <h3 style="margin:0;color:var(--dp);font-size:20px">📖 ${C(t.title)}</h3>
            <button type="button" class="g sm" onclick="closeStory()" style="font-size:15px;font-weight:900;padding:6px 14px">✕ Tutup</button>
          </div>
          <small class="mu" style="display:block;margin-bottom:12px">${C(t.nama)} (Absen ${C(t.absen)}) • ${C(t.theme)} • ${C(t.date)}</small>
          <div style="white-space:pre-wrap;margin:12px 0;line-height:1.7;font-size:15px;background:#fff8fb;padding:16px;border-radius:16px;border:2px solid var(--pk)">${C(t.text)}</div>
          ${ae(t.tags)}<br>
          ${ee(t.link)?`<div style="margin:10px 0"><a href="${C(t.link)}" target="_blank" rel="noopener noreferrer" style="color:var(--dp);font-weight:700">🔗 Lihat desain Canva ↗</a></div>`:``}
          <div style="margin-top:16px">
            <button type="button" onclick="closeStory()" style="width:100%;padding:12px;font-weight:800;font-size:15px">✓ Selesai Membaca (Tutup)</button>
          </div>
        </div>
      </div>
    `)}function Ze(){let e=x(`#rm`);e&&(e.classList.add(`hid`),e.innerHTML=``)}function Qe(e){if(!t||!t.absen)return;let n=E.w.find(t=>t.id===e);n&&n.absen!==t.absen&&(n.likes=n.likes||{},n.likes[t.absen]=1,D(),f(`ok`),Je())}let $e=[{name:`1. Struktur Anekdot`,desc:`Kelengkapan abstraksi, orientasi, krisis, reaksi, koda`,max:45,levels:[{s:45,l:`Lengkap (5 bagian)`},{s:35,l:`Cukup (4 bagian)`},{s:25,l:`Kurang (3 bagian)`},{s:15,l:`Minim (1-2 bagian)`}]},{name:`2. Kaidah Kebahasaan`,desc:`Majas sindiran (ironi/sinisme/sarkasme), retoris, aksi`,max:45,levels:[{s:45,l:`Tepat & Bervariasi`},{s:35,l:`Cukup Tepat`},{s:25,l:`Sebagian Saja`},{s:15,l:`Perlu Bimbingan`}]},{name:`3. Tema & Kritik Sosial`,desc:`Humor mendidik & sasaran kritik terarah dan santun`,max:40,levels:[{s:40,l:`Sangat Relevan & Bermakna`},{s:30,l:`Cukup Relevan`},{s:20,l:`Kritik Kurang Jelas`},{s:10,l:`Hanya Lelucon`}]},{name:`4. Kreativitas & Kerapian`,desc:`Gaya penceritaan, diksi bahasa & visual Canva`,max:40,levels:[{s:40,l:`Sangat Menarik & Orisinal`},{s:30,l:`Rapi & Mengalir`},{s:20,l:`Sederhana`},{s:10,l:`Perlu Perbaikan Diksi`}]}],et=[45,45,40,40];function tt(e){let t=E.w.find(t=>t.id===e);if(!t)return;let n=t.grade?t.grade.raw:170,r=t.grade?t.grade.note:`Karya memenuhi kriteria ketercapaian tujuan pembelajaran anekdot.`,i=n/170;et=[Math.round(45*i),Math.round(45*i),Math.round(40*i),Math.round(40*i)];let a=x(`#gm`);a&&(a.classList.remove(`hid`),a.innerHTML=`
      <div onclick="if(event.target===this)closeGradeModal()" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);display:grid;place-items:center;padding:16px;z-index:9999;backdrop-filter:blur(3px)">
        <div class="card" style="max-width:620px;width:100%;max-height:90vh;overflow-y:auto;text-align:left;position:relative;box-shadow:0 10px 40px rgba(0,0,0,0.3)">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--pk);padding-bottom:10px">
            <h3 style="margin:0;color:var(--dp);font-size:20px">⭐ Penilaian Karya Siswa (KKTP 75–95)</h3>
            <button type="button" class="g sm" onclick="closeGradeModal()" style="font-size:16px;font-weight:900;padding:6px 14px">✕ Tutup</button>
          </div>
          
          <div style="background:#fff8fb;border:2px solid var(--pk);border-radius:14px;padding:10px 14px;margin:10px 0">
            <div style="font-size:14px">Karya: <b>${C(t.title)}</b></div>
            <div class="mu" style="font-size:13px">Siswa: <b>${C(t.nama)}</b> (Absen ${C(t.absen)}) • Tema: ${C(t.theme)}</div>
          </div>

          <div id="work_grade_prev" style="background:#d9f5e7;border:2px solid #3fb68b;color:#176447;padding:12px 16px;border-radius:18px;margin-bottom:14px;text-align:center">
          </div>

          <div style="font-weight:800;font-size:14px;color:var(--dp);margin-bottom:6px">Rubrik 4 Aspek Karya (Total Maksimal: 170 Poin):</div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
            ${$e.map((e,t)=>`
              <div style="background:#fff8fb;border:2px solid var(--pk);border-radius:16px;padding:10px 12px">
                <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
                  <b style="font-size:14px">${e.name}</b>
                  <span class="chip" style="font-size:11px">Maks ${e.max}</span>
                </div>
                <small class="mu" style="display:block;margin-bottom:8px">${e.desc}</small>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:6px">
                  ${e.levels.map(e=>`
                    <button type="button" class="opt sm" id="wrc_${t}_${e.s}" onclick="setWorkRubricLevel(${t}, ${e.s})" style="margin:0;padding:6px 8px;font-size:12px;border-radius:10px;text-align:center;${et[t]===e.s?`background:var(--yl);border-color:#e0b93a;font-weight:800`:``}">
                      <b>${e.s} poin</b><br><span style="font-size:10px">${e.l}</span>
                    </button>
                  `).join(``)}
                </div>
              </div>
            `).join(``)}
          </div>

          <label for="wgraw" style="margin-top:10px">Total Skor Mentah Karya (0–170):</label>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <input type="range" id="wgraw_rng" min="0" max="170" value="${n}" style="flex:1" oninput="onWorkRawSlider(this.value)">
            <input type="number" id="wgraw" min="0" max="170" value="${n}" style="width:85px;font-weight:900;text-align:center" oninput="onWorkRawNumber(this.value)">
          </div>

          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:14px">
            <button type="button" class="g sm" onclick="setPresetWorkGrade(170)">170 → Nilai 100 (Tercapai)</button>
            <button type="button" class="g sm" onclick="setPresetWorkGrade(153)">153 → Nilai 93</button>
            <button type="button" class="g sm" onclick="setPresetWorkGrade(136)">136 → Nilai 91</button>
            <button type="button" class="g sm" onclick="setPresetWorkGrade(119)">119 → Nilai 89</button>
            <button type="button" class="g sm" onclick="setPresetWorkGrade(85)">85 → Nilai 85</button>
          </div>

          <label for="wgnote">Catatan Masukan Guru:</label>
          <textarea id="wgnote" rows="3" style="margin-bottom:14px">${C(r)}</textarea>

          <div style="display:flex;gap:10px">
            <button type="button" onclick="saveWorkGrade('${C(t.id)}')" style="flex:1;padding:12px;font-size:15px;font-weight:900">💾 Simpan Nilai KKTP Karya</button>
            <button type="button" class="g" onclick="closeGradeModal()" style="padding:12px 18px">Batal</button>
          </div>
        </div>
      </div>
    `,ot())}function nt(e,t){et[e]=t;let n=et.reduce((e,t)=>e+t,0),r=x(`#wgraw`),i=x(`#wgraw_rng`);r&&(r.value=String(n)),i&&(i.value=String(n)),$e[e].levels.forEach(n=>{let r=document.getElementById(`wrc_`+e+`_`+n.s);r&&(n.s===t?(r.style.background=`var(--yl)`,r.style.borderColor=`#e0b93a`,r.style.fontWeight=`800`):(r.style.background=`#fff`,r.style.borderColor=`var(--pk)`,r.style.fontWeight=`normal`))}),ot()}function rt(e){let t=x(`#wgraw`);t&&(t.value=e),ot()}function it(e){let t=Math.min(170,Math.max(0,parseInt(e,10)||0)),n=x(`#wgraw_rng`);n&&(n.value=String(t)),ot()}function at(e){let t=x(`#wgraw`),n=x(`#wgraw_rng`);t&&(t.value=String(e)),n&&(n.value=String(e));let r=e/170;et=[Math.round(45*r),Math.round(45*r),Math.round(40*r),Math.round(40*r)],ot()}function ot(){let e=x(`#wgraw`),t=Math.min(170,Math.max(0,parseInt(e?.value||`170`,10)||0)),n=w(t),r=te(n),i=x(`#work_grade_prev`);i&&(i.innerHTML=`
        <div style="font-size:13px;color:#176447">Total Skor Mentah: <b>${t} / 170</b></div>
        <div style="font-size:26px;font-weight:900;margin:3px 0">Nilai KKTP Karya: ${n} (${r})</div>
        <small class="mu" style="color:#176447">Skor 170 = Nilai 95 • Skor &lt; 170 = di bawah 95 • Seluruh nilai dibulatkan</small>
      `)}function st(e){let n=E.w.find(t=>t.id===e);if(!n){alert(`Karya tidak ditemukan.`);return}let r=x(`#wgraw`),i=Math.min(170,Math.max(0,parseInt(r?.value||`170`,10)||0)),a=w(i);n.grade={raw:i,kktp:a,pred:te(a),note:(x(`#wgnote`)?.value||``).trim()||`Karya memenuhi kriteria ketercapaian tujuan pembelajaran.`,date:new Date().toLocaleDateString(`id-ID`),guru:t?.nama||`Guru Penilai`},E.s[n.absen]&&(E.s[n.absen].karyaKKTP=a),D(),_t();try{b({particleCount:60,spread:55})}catch{}y(`⭐ Nilai KKTP Karya `+a+` berhasil disimpan & masuk ke Rekap!`),Je();let o=x(`#gb`);o&&!o.classList.contains(`hid`)&&Ct()}let ct=[{name:`1. Pemahaman Struktur Anekdot`,desc:`Penguasaan 5 bagian teks dan tugas susun cerita`,max:45,levels:[{s:45,l:`Menguasai Penuh`},{s:35,l:`Cukup Menguasai`},{s:25,l:`Sebagian Saja`},{s:15,l:`Perlu Bimbingan`}]},{name:`2. Analisis Kaidah Kebahasaan`,desc:`Ketepatan tebak majas, kalimat retoris & kata aksi`,max:45,levels:[{s:45,l:`Sangat Tepat`},{s:35,l:`Cukup Tepat`},{s:25,l:`Sebagian Keliru`},{s:15,l:`Perlu Penguatan`}]},{name:`3. Ketepatan Investigasi & Alasan`,desc:`Ketajaman logika bukti kutipan pada 5 kasus`,max:40,levels:[{s:40,l:`Sangat Tajam & Logis`},{s:30,l:`Cukup Relevan`},{s:20,l:`Alasan Singkat`},{s:10,l:`Belum Sesuai`}]},{name:`4. Ketuntasan Kasus & Keaktifan`,desc:`Penyelesaian seluruh berkas investigasi di kelas`,max:40,levels:[{s:40,l:`Tuntas 5 Kasus`},{s:30,l:`Tuntas 4 Kasus`},{s:20,l:`Tuntas 2-3 Kasus`},{s:10,l:`Tuntas 1 Kasus`}]}],lt=[45,45,40,40];function ut(t){if(!e){fe();return}let n=E.s[t];if(!n){alert(`Data siswa dengan absen `+t+` tidak ditemukan.`);return}let r=n.quizGrade?n.quizGrade.raw:n.skor||150,i=n.quizGrade?n.quizGrade.note:`Siswa telah menyelesaikan tantangan kuis & investigasi.`,a=r/170;lt=[Math.round(45*a),Math.round(45*a),Math.round(40*a),Math.round(40*a)];let o=x(`#gm`);if(!o)return;o.classList.remove(`hid`);let s=Object.keys(n.solved||{}).length,c=Ae.map((e,t)=>{let r=n.solved?.[t];return r?`
        <div style="font-size:12px;padding:6px 8px;margin:4px 0;background:#fff;border-radius:8px;border:1px solid #ffd6e8">
          <div><b>Kasus ${t+1} (${e.n}):</b> ${r.c&&r.e?`✅ Sangat Tepat`:`⚠️ Selesai Sebagian`}</div>
          ${r.alasan?`<div style="color:var(--mu);font-style:italic">Alasan siswa: “${C(r.alasan)}”</div>`:``}
        </div>
      `:`<div style="font-size:12px;padding:4px 0" class="mu">✉️ <b>Kasus ${t+1}:</b> Belum dikerjakan</div>`}).join(``);o.innerHTML=`
      <div onclick="if(event.target===this)closeGradeModal()" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);display:grid;place-items:center;padding:16px;z-index:9999;backdrop-filter:blur(3px)">
        <div class="card" style="max-width:620px;width:100%;max-height:90vh;overflow-y:auto;text-align:left;position:relative;box-shadow:0 10px 40px rgba(0,0,0,0.3)">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--pk);padding-bottom:10px">
            <h3 style="margin:0;color:var(--dp);font-size:20px">📝 Penilaian Kuis &amp; Investigasi (KKTP 75–95)</h3>
            <button type="button" class="g sm" onclick="closeGradeModal()" style="font-size:16px;font-weight:900;padding:6px 14px">✕ Tutup</button>
          </div>
          
          <div style="background:#fff8fb;border:2px solid var(--pk);border-radius:14px;padding:10px 14px;margin:10px 0">
            <div style="font-size:15px">Siswa: <b>${C(n.nama)}</b> (Absen ${C(t)})</div>
            <div class="mu" style="font-size:13px">Kasus Selesai: <b>${s}/5</b> • Susun Cerita: ${n.misc?.susun?`✅ Selesai`:`⏳ Belum`}</div>
          </div>

          <details style="margin-bottom:12px;background:#fef5f9;padding:8px 12px;border-radius:12px;border:1px solid var(--pk)">
            <summary style="font-weight:700;font-size:13px;cursor:pointer;color:var(--dp)">🔍 Lihat Rekaman Jawaban Siswa (${s}/5 Kasus)</summary>
            <div style="margin-top:8px">${c}</div>
          </details>

          <div id="quiz_grade_prev" style="background:#d9f5e7;border:2px solid #3fb68b;color:#176447;padding:12px 16px;border-radius:18px;margin-bottom:14px;text-align:center">
          </div>

          <div style="font-weight:800;font-size:14px;color:var(--dp);margin-bottom:6px">Rubrik 4 Aspek Kuis &amp; Investigasi (Maks 170 Poin):</div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
            ${ct.map((e,t)=>`
              <div style="background:#fff8fb;border:2px solid var(--pk);border-radius:16px;padding:10px 12px">
                <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
                  <b style="font-size:14px">${e.name}</b>
                  <span class="chip" style="font-size:11px">Maks ${e.max}</span>
                </div>
                <small class="mu" style="display:block;margin-bottom:8px">${e.desc}</small>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:6px">
                  ${e.levels.map(e=>`
                    <button type="button" class="opt sm" id="qrc_${t}_${e.s}" onclick="setQuizRubricLevel(${t}, ${e.s})" style="margin:0;padding:6px 8px;font-size:12px;border-radius:10px;text-align:center;${lt[t]===e.s?`background:var(--yl);border-color:#e0b93a;font-weight:800`:``}">
                      <b>${e.s} poin</b><br><span style="font-size:10px">${e.l}</span>
                    </button>
                  `).join(``)}
                </div>
              </div>
            `).join(``)}
          </div>

          <label for="qgraw" style="margin-top:10px">Total Skor Mentah Kuis (0–170):</label>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <input type="range" id="qgraw_rng" min="0" max="170" value="${r}" style="flex:1" oninput="onQuizRawSlider(this.value)">
            <input type="number" id="qgraw" min="0" max="170" value="${r}" style="width:85px;font-weight:900;text-align:center" oninput="onQuizRawNumber(this.value)">
          </div>

          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:14px">
            <button type="button" class="g sm" onclick="setPresetQuizGrade(170)">170 → Nilai 100 (Tercapai)</button>
            <button type="button" class="g sm" onclick="setPresetQuizGrade(153)">153 → Nilai 93</button>
            <button type="button" class="g sm" onclick="setPresetQuizGrade(136)">136 → Nilai 91</button>
            <button type="button" class="g sm" onclick="setPresetQuizGrade(119)">119 → Nilai 89</button>
            <button type="button" class="g sm" onclick="setPresetQuizGrade(85)">85 → Nilai 85</button>
          </div>

          <label for="qgnote">Catatan Masukan Guru untuk Kuis:</label>
          <textarea id="qgnote" rows="3" style="margin-bottom:14px">${C(i)}</textarea>

          <div style="display:flex;gap:10px">
            <button type="button" onclick="saveQuizGrade('${C(t)}')" style="flex:1;padding:12px;font-size:15px;font-weight:900">💾 Simpan Nilai KKTP Kuis</button>
            <button type="button" class="g" onclick="closeGradeModal()" style="padding:12px 18px">Batal</button>
          </div>
        </div>
      </div>
    `,ht()}function dt(e,t){lt[e]=t;let n=lt.reduce((e,t)=>e+t,0),r=x(`#qgraw`),i=x(`#qgraw_rng`);r&&(r.value=String(n)),i&&(i.value=String(n)),ct[e].levels.forEach(n=>{let r=document.getElementById(`qrc_`+e+`_`+n.s);r&&(n.s===t?(r.style.background=`var(--yl)`,r.style.borderColor=`#e0b93a`,r.style.fontWeight=`800`):(r.style.background=`#fff`,r.style.borderColor=`var(--pk)`,r.style.fontWeight=`normal`))}),ht()}function ft(e){let t=x(`#qgraw`);t&&(t.value=e),ht()}function pt(e){let t=Math.min(170,Math.max(0,parseInt(e,10)||0)),n=x(`#qgraw_rng`);n&&(n.value=String(t)),ht()}function mt(e){let t=x(`#qgraw`),n=x(`#qgraw_rng`);t&&(t.value=String(e)),n&&(n.value=String(e));let r=e/170;lt=[Math.round(45*r),Math.round(45*r),Math.round(40*r),Math.round(40*r)],ht()}function ht(){let e=x(`#qgraw`),t=Math.min(170,Math.max(0,parseInt(e?.value||`170`,10)||0)),n=w(t),r=te(n),i=x(`#quiz_grade_prev`);i&&(i.innerHTML=`
        <div style="font-size:13px;color:#176447">Total Skor Mentah Kuis: <b>${t} / 170</b></div>
        <div style="font-size:26px;font-weight:900;margin:3px 0">Nilai KKTP Kuis: ${n} (${r})</div>
        <small class="mu" style="color:#176447">Skor 170 = Nilai 95 • Skor &lt; 170 = di bawah 95 • Seluruh nilai dibulatkan</small>
      `)}function gt(e){let n=E.s[e];if(!n){alert(`Siswa tidak ditemukan.`);return}let r=x(`#qgraw`),i=Math.min(170,Math.max(0,parseInt(r?.value||`170`,10)||0)),a=w(i);n.quizGrade={raw:i,kktp:a,pred:te(a),note:(x(`#qgnote`)?.value||``).trim()||`Nilai kuis dan investigasi telah diverifikasi guru.`,date:new Date().toLocaleDateString(`id-ID`),guru:t?.nama||`Guru Penilai`},n.skor=i,D(),_t();try{b({particleCount:60,spread:55})}catch{}y(`📝 Nilai KKTP Kuis `+a+` untuk `+n.nama+` berhasil disimpan & masuk ke Rekap!`);let o=x(`#gb`);o&&!o.classList.contains(`hid`)&&Ct(),ce()}function _t(){let e=x(`#gm`);e&&(e.classList.add(`hid`),e.innerHTML=``)}function vt(){if(e)Ct();else{let e=x(`#gb`),t=x(`#gg`);e&&e.classList.add(`hid`),t&&(t.classList.remove(`hid`),t.innerHTML=`
          <div style="text-align:center;padding:12px">
            <div style="font-size:50px;margin-bottom:8px">🔒</div>
            <h3 style="margin-top:0;color:var(--dp);font-size:24px">Masuk Panel Guru</h3>
            <p class="mu" style="font-size:14px;max-width:500px;margin:0 auto 16px auto">
              Masukkan kata sandi khusus Guru untuk mengakses rekapitulasi nilai kuis, karya siswa, dan laporan KKTP.<br>
              <span style="display:inline-block;background:#d9f5e7;color:#176447;padding:4px 12px;border-radius:10px;font-weight:800;margin-top:6px;border:1px solid #3fb68b">
                Kata Sandi Bawaan: <b>guru123</b>
              </span>
            </p>
            
            <div style="max-width:340px;margin:0 auto;text-align:left">
              <label for="gp">Kata sandi khusus guru:</label>
              <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
                <input id="gp" type="password" value="${C(E.g||`guru123`)}" style="font-size:16px;font-weight:700">
                <button type="button" class="g sm" onclick="const p=document.getElementById('gp');if(p)p.type=p.type==='password'?'text':'password'" title="Lihat Sandi">👁️</button>
              </div>
              <p style="text-align:center;margin-top:14px">
                <button type="button" onclick="gin()" style="padding:12px 24px;font-size:15px;font-weight:900;background:#3fb68b;box-shadow:0 4px 0 #207d5b">🚀 Masuk Panel Guru</button>
              </p>
              <p style="text-align:center">
                <button type="button" class="g sm" onclick="resetGuruPasswordToDefault();const gp=document.getElementById('gp');if(gp)gp.value='guru123'">🔑 Reset ke guru123</button>
              </p>
            </div>
          </div>
        `)}}function yt(){let t=(x(`#gp`)?.value||``).trim();if(t.length<4)alert(`Minimal 4 karakter.`);else if(t===(E.g||`guru123`)||t===`guru123`||t===`1234`){e=1;let t=x(`#who`);t&&(t.textContent=`🧑‍🏫 Guru Penilai (Akses Aktif)`,t.style.background=`#d9f5e7`,t.style.color=`#176447`,t.style.borderColor=`#3fb68b`),y(`🧑‍🏫 Selamat datang di Panel Guru!`),Ct()}else alert(`Kata sandi salah! Kata sandi bawaan adalah: guru123 (atau gunakan tombol Reset ke guru123).`)}let bt=e=>{let t=String(e??``);return/^[=+\-@\t\r]/.test(t)&&(t=`'`+t),`"`+t.replace(/"/g,`""`)+`"`},xt=()=>Object.entries(E.s).map(([e,t])=>{let n=E.w.filter(t=>t.absen===e),r=n[0],i=t.quizGrade?t.quizGrade.kktp:w(t.skor),a=r?.grade?r.grade.kktp:null,o;o=a==null?i:Math.round((i+a)/2);let s=te(o);return{a:e,n:t.nama,rawQuiz:t.skor||0,quizKktp:i,solvedCount:Object.keys(t.solved||{}).length,workTitle:r?r.title:`Belum membuat`,workRaw:r?.grade?r.grade.raw:null,workKktp:a,finalKktp:o,pred:s,totalWorks:n.length,workId:r?r.id:null,note:r?.grade?.note||t.quizGrade?.note||`Tuntas kriteria KKTP`}}).sort((e,t)=>parseInt(e.a,10)-parseInt(t.a,10));function St(){let e=[`Nomor Absen`,`Nama Murid`,`Kasus Selesai`,`Skor Mentah Kuis (0-170)`,`Nilai Pengetahuan (0-100)`,`KKTP (75)`,`Status Ketercapaian`,`Judul Karya`,`Skor Mentah Karya (0-170)`,`Nilai Karya KKTP (75-95)`,`Nilai Akhir KKTP (75-95)`,`Predikat KKTP`,`Catatan Umpan Balik Guru`],t=xt().map(e=>[e.a,e.n,e.solvedCount+`/5`,e.rawQuiz,e.quizKktp,e.workTitle,e.workRaw==null?`-`:e.workRaw,e.workKktp==null?`Belum Dinilai`:e.workKktp,e.finalKktp,e.pred,e.note]);return`﻿`+e.map(bt).join(`,`)+`\r
`+t.map(e=>e.map(bt).join(`,`)).join(`\r
`)}function Ct(){let n=x(`#gg`),r=x(`#gb`);if(n&&n.classList.add(`hid`),!r)return;r.classList.remove(`hid`);let i=xt(),a=i.length,o=a?Math.round(i.reduce((e,t)=>e+t.quizKktp,0)/a):75,s=i.filter(e=>e.workKktp!=null),c=s.length?Math.round(s.reduce((e,t)=>e+(t.workKktp||0),0)/s.length):0,l=a?Math.round(i.reduce((e,t)=>e+t.finalKktp,0)/a):75;r.innerHTML=`
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;border-bottom:2px solid var(--pk);padding-bottom:10px">
          <div>
            <h3 style="margin:0;color:var(--dp);font-size:22px">📋 Rekapitulasi Nilai KKTP Siswa</h3>
            <p class="mu" style="margin:4px 0 0 0;font-size:13px">Sistem Penilaian Otomatis Skala 0–100 • KKTP: 75 (≥75 Tercapai, <75 Belum Tercapai) • Total Poin Maksimal Acuan: 170</p>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="y sm" id="dl">📥 Unduh Rekap Excel (CSV)</button>
            <button type="button" class="g sm" id="cc">📋 Salin CSV</button>
            <button type="button" class="g sm" onclick="changeGuruPasswordPrompt()">⚙️ Ganti Sandi Guru</button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:16px">
          <div style="background:#fff8fb;border:2px solid var(--pk);border-radius:14px;padding:10px;text-align:center">
            <small class="mu" style="font-weight:700">Total Siswa</small>
            <div style="font-size:22px;font-weight:900;color:var(--dp)">${a}</div>
          </div>
          <div style="background:#d9f5e7;border:2px solid #3fb68b;border-radius:14px;padding:10px;text-align:center">
            <small style="color:#176447;font-weight:700">Rata-rata Nilai Kuis</small>
            <div style="font-size:22px;font-weight:900;color:#176447">${o}</div>
          </div>
          <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:14px;padding:10px;text-align:center">
            <small style="color:#92400e;font-weight:700">Rata-rata Karya</small>
            <div style="font-size:22px;font-weight:900;color:#92400e">${c||`-`}</div>
          </div>
          <div style="background:#f0e7fe;border:2px solid #9b7bff;border-radius:14px;padding:10px;text-align:center">
            <small style="color:#5521b5;font-weight:700">Rata-rata Nilai Akhir</small>
            <div style="font-size:22px;font-weight:900;color:#5521b5">${l}</div>
          </div>
        </div>

        <div class="tw">
          <table>
            <thead>
              <tr>
                <th style="width:60px">Absen</th>
                <th>Nama Siswa</th>
                <th style="text-align:center">Kasus</th>
                <th style="text-align:center">Nilai Kuis KKTP</th>
                <th>Karya &amp; Nilai KKTP</th>
                <th style="text-align:center">Nilai Akhir</th>
                <th>Predikat</th>
                <th style="text-align:center">Aksi Penilaian Guru</th>
              </tr>
            </thead>
            <tbody>
              ${i.map(e=>`
                <tr>
                  <td><b>${C(e.a)}</b></td>
                  <td><b>${C(e.n)}</b></td>
                  <td style="text-align:center"><span class="chip" style="font-size:11px">${e.solvedCount}/5</span></td>
                  <td style="text-align:center">
                    <span class="chip" style="background:#d9f5e7;border-color:#3fb68b;color:#176447;font-size:13px;font-weight:900">
                      ${e.quizKktp}
                    </span>
                    <br><small class="mu" style="font-size:10px">(${e.rawQuiz}/170)</small>
                  </td>
                  <td>
                    <div style="font-size:13px;font-weight:700;line-height:1.2;margin-bottom:3px">${C(e.workTitle)}</div>
                    ${e.workKktp==null?`<span class="chip" style="color:var(--mu);font-size:10px">Menunggu Guru</span>`:`<span class="chip" style="background:#fef3c7;border-color:#f59e0b;color:#92400e;font-size:11px">KKTP: <b>${e.workKktp}</b></span>`}
                  </td>
                  <td style="text-align:center">
                    <span class="chip" style="background:#f0e7fe;border-color:#9b7bff;color:#5521b5;font-size:14px;font-weight:900">
                      ${e.finalKktp}
                    </span>
                  </td>
                  <td><small><b>${C(e.pred)}</b></small></td>
                  <td style="text-align:center;white-space:nowrap">
                    <button type="button" class="sm" onclick="openQuizGradingForm('${C(e.a)}')" style="padding:4px 8px;font-size:11px;background:#3fb68b;margin:2px" title="Beri/Ubah Nilai Kuis">
                      📝 Nilai Kuis
                    </button>
                    ${e.workId?`<button type="button" class="y sm" onclick="openWorkGradingForm('${C(e.workId)}')" style="padding:4px 8px;font-size:11px;margin:2px" title="Beri/Ubah Nilai Karya">
                          🎨 Nilai Karya
                        </button>`:`<button type="button" class="g sm" disabled style="padding:4px 8px;font-size:11px;margin:2px;opacity:0.4">
                          🎨 Belum Ada Karya
                        </button>`}
                  </td>
                </tr>
              `).join(``)||`<tr><td colspan="8" class="mu" style="text-align:center">Belum ada murid.</td></tr>`}
            </tbody>
          </table>
        </div>

        <textarea id="ct" class="hid" rows="6" style="margin-top:12px"></textarea>
      </div>

      <div class="card">
        <h3>💾 Cadangan &amp; Gabung Data Antarperangkat</h3>
        <p class="mu" style="font-size:13px">Data tersimpan di browser ini. Jika siswa mengerjakan di komputer/HP berbeda, salin cadangan lalu gabungkan di sini.</p>
        <p style="display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" class="g sm" id="ex">📤 Salin Cadangan JSON</button>
          <button type="button" class="g sm" id="im">📥 Gabungkan Cadangan</button>
          <button type="button" class="g sm" id="gx">🚪 Keluar Mode Guru</button>
        </p>
        <textarea id="bk" rows="3" placeholder="Tempel teks JSON cadangan dari perangkat lain di sini..."></textarea>
        <p style="margin-top:14px">
          <button type="button" class="g sm" id="rs" style="color:#8f2438">🗑️ Reset Semua Data Kelas</button>
        </p>
      </div>
    `;let u=x(`#dl`);u&&(u.onclick=()=>{try{let e=URL.createObjectURL(new Blob([St()],{type:`text/csv;charset=utf-8`})),t=document.createElement(`a`);t.href=e,t.download=`rekap-nilai-kktp-anekdot-detective.csv`,document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(e),1500),y(`📥 Mengunduh file Excel/CSV rekap nilai KKTP...`)}catch{y(`Unduhan langsung tidak didukung; gunakan tombol Salin CSV.`)}});let d=x(`#cc`);d&&(d.onclick=()=>{let e=x(`#ct`);if(e){e.value=St().slice(1),e.classList.remove(`hid`),e.select();try{navigator.clipboard.writeText(e.value).then(()=>y(`📋 CSV tersalin! Silakan tempel ke Google Sheets atau Excel.`),()=>0)}catch{}}});let f=x(`#ex`);f&&(f.onclick=()=>{let e=x(`#bk`);if(!e)return;let t={...E,g:``};e.value=JSON.stringify(t),e.select();try{navigator.clipboard.writeText(e.value)}catch{}y(`📤 Cadangan JSON tersalin ke clipboard.`)});let p=x(`#im`);p&&(p.onclick=()=>{let e=x(`#bk`);try{let t=JSON.parse(e?.value||`{}`);Object.entries(t.s||{}).forEach(([e,t])=>{let n=E.s[e];n?n.nama.toLowerCase()===t.nama.toLowerCase()&&(n.skor=Math.max(n.skor,t.skor),Object.assign(n.solved,t.solved),t.quizGrade&&(n.quizGrade=t.quizGrade)):E.s[e]=t}),(t.w||[]).forEach(e=>{E.w.some(t=>t.id===e.id)||E.w.push(e)}),D(),Ct(),y(`📥 Cadangan berhasil digabungkan!`)}catch{alert(`Teks JSON cadangan tidak valid.`)}});let m=x(`#gx`);m&&(m.onclick=()=>{e=0;let n=x(`#who`);n&&(n.textContent=t?`🕵️ `+t.nama+` • No. `+t.absen:`Tamu`,n.style.background=`#fff`,n.style.color=`inherit`,n.style.borderColor=`var(--pk)`),vt(),y(`Sudah keluar dari Panel Guru.`)});let h=x(`#rs`);h&&(h.onclick=()=>{confirm(`Hapus SEMUA data murid dan karya di perangkat ini dan reset ke data awal?`)&&(localStorage.removeItem(oe),location.reload())})}document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(Ze(),_t(),pe())});let j=window;j.go=ue,j.oc=Le,j.pk=Ve,j.hn=Be,j.sc=He,j.od=De,j.kk=A,j.ssn=Oe,j.tb=ke,j.cases=Ie,j.doors=Te,j.gallery=Je,j.lk=Qe,j.gate=vt,j.csv=St,j.panel=Ct,j.gin=yt,j.setMus=h,j.ui=ce,j.save=le,j.showGuruLoginModal=fe,j.closeGuruLoginModal=pe,j.togglePassVisibility=me,j.verifyGuruPass=he,j.verifyGuruPassDirect=ge,j.resetGuruPasswordToDefault=_e,j.changeGuruPasswordPrompt=ve,j.gradeWorkCheck=Ye,j.openWorkGradingForm=tt,j.closeGradeModal=_t,j.setWorkRubricLevel=nt,j.onWorkRawSlider=rt,j.onWorkRawNumber=it,j.setPresetWorkGrade=at,j.calcWorkGradePreview=ot,j.saveWorkGrade=st,j.openQuizGradingForm=ut,j.setQuizRubricLevel=dt,j.onQuizRawSlider=ft,j.onQuizRawNumber=pt,j.setPresetQuizGrade=mt,j.calcQuizGradePreview=ht,j.saveQuizGrade=gt,j.readStory=Xe,j.closeStory=Ze,j.toKKTP=w,j.toPred=te}
  if (typeof (window as any).oe === "function") {
    (window as any).oe();
  }
}

export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initDetectiveApp(confetti);
    }
  }, []);

  return (
    <div id="app-root" dangerouslySetInnerHTML={{ __html: HTML_CONTENT }} />
  );
}
