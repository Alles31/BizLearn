document.addEventListener('DOMContentLoaded', () => {
  const articles = [
  { id:1, title: "Cara Mengatur Modal Usaha", desc: "Pelajari langkah dasar dalam mengatur modal awal bisnismu, termasuk membuat catatan arus kas sederhana.", content: "<p>Mengatur modal usaha merupakan langkah penting agar bisnis dapat berjalan dengan lancar dan berkelanjutan.</p><p>Langkah pertama: tentukan kebutuhan awal seperti biaya peralatan, bahan baku, dan tempat usaha. Setelah itu, pisahkan antara modal pribadi dan modal usaha agar keuangan lebih terkontrol.</p><p>Tips singkat:</p><ul><li>Pisahkan rekening modal pribadi dan modal usaha.</li><li>Catat setiap pemasukan dan pengeluaran secara rutin untuk memantau arus kas.</li><li>Sisihkan sebagian keuntungan sebagai dana cadangan guna menghadapi situasi tak terduga.</li></ul><p>Dengan perencanaan keuangan yang baik dan disiplin dalam pengelolaan modal, usaha dapat berkembang lebih stabil dan terhindar dari risiko kerugian besar.</p>", image: "images/art1.svg" 
    },
  { id:2, title: "Tips Meningkatkan Penjualan di Media Sosial", desc: "Strategi sederhana agar produkmu mudah ditemukan dan diminati lewat konten dan interaksi.", content: "<p>Untuk meningkatkan penjualan di media sosial, pahami dulu siapa target pembelimu dan apa yang mereka butuhkan.</p><p>Buat konten yang menarik, seperti foto atau video produk yang jelas dan berkualitas, serta gunakan caption yang singkat namun meyakinkan.</p><p>Praktik yang efektif:</p><ul><li>Aktif berinteraksi dengan pengikut melalui komentar dan pesan untuk membangun kedekatan.</li><li>Unggah konten secara rutin pada waktu yang tepat agar audiens melihat konsistensi.</li><li>Manfaatkan fitur promosi berbayar untuk menjangkau audiens baru.</li></ul><p>Konsistensi dan interaksi membantu meningkatkan kepercayaan dan penjualan.</p>", image: "images/art2.svg" 
    },
  { id:3, title: "Langkah Awal Membuka Bisnis Online", desc: "Panduan singkat dari ide menjadi toko online sederhana.", content: "<p>Sebelum memulai bisnis online, tentukan produk atau jasa yang ingin dijual dan pastikan memiliki nilai unik dibanding pesaing.</p><p>Buat identitas bisnis: nama merek, logo, dan deskripsi yang menarik.</p><p>Langkah praktis:</p><ul><li>Pilih platform penjualan (marketplace, website, atau media sosial).</li><li>Tawarkan pelayanan cepat, ramah, dan responsif untuk membangun reputasi.</li><li>Pelajari tren pasar dan terus adaptasi produk sesuai kebutuhan pelanggan.</li></ul><p>Mulailah dari skala kecil, uji penjualan, lalu kembangkan sambil meningkatkan kualitas layanan.</p>", image: "images/art3.svg" 
    },
  { id:4, title: "Mengelola Waktu untuk Pelajar Wirausaha", desc: "Tips mengatur waktu antara sekolah dan bisnis agar keduanya berjalan lancar.", content: "<p>Bagi pelajar yang juga menjalankan usaha, kemampuan mengatur waktu adalah kunci utama.</p><p>Buat jadwal harian yang seimbang antara belajar, beristirahat, dan menjalankan bisnis.</p><p>Strategi praktis:</p><ul><li>Manfaatkan waktu luang, seperti sepulang sekolah atau akhir pekan, untuk mengurus usaha kecil tanpa mengganggu kegiatan belajar.</li><li>Prioritaskan tugas penting dan hindari menunda pekerjaan.</li><li>Libatkan bantuan keluarga atau teman jika perlu agar beban tugas lebih ringan.</li></ul><p>Dengan disiplin dan manajemen waktu yang baik, pelajar dapat tetap berprestasi di sekolah sekaligus mengembangkan usaha.</p>", image: "images/art4.svg"
    }
  ,{ id:5, title: "Lean Canvas — Ringkasan Model Bisnis", desc: "Alat satu-halaman untuk merangkum model bisnis dan menguji ide dengan cepat.", content: "<p>Lean Canvas adalah versi sederhana dari Business Model Canvas yang dirancang untuk startup dan ide bisnis cepat. Tujuannya membantu kamu merangkum aspek penting model bisnis di satu halaman sehingga mudah diuji dan dibagikan.</p><h4>Komponen utama (singkat):</h4><ul><li><strong>Problem</strong>: Masalah utama yang ingin diselesaikan.</li><li><strong>Customer Segments</strong>: Siapa pelanggan/target utamamu.</li><li><strong>Unique Value Proposition</strong>: Janji nilai singkat yang membedakan produkmu.</li><li><strong>Solution</strong>: Solusi inti yang kamu tawarkan.</li><li><strong>Channels</strong>: Cara menjangkau pelanggan (online/offline).</li><li><strong>Revenue Streams</strong>: Bagaimana kamu menghasilkan uang.</li><li><strong>Cost Structure</strong>: Biaya utama yang harus ditanggung.</li><li><strong>Key Metrics</strong>: Angka yang dipantau untuk tahu apakah berjalan.</li><li><strong>Unfair Advantage</strong>: Keunggulan sulit ditiru pesaing.</li></ul><p><strong>Cara pakai singkat:</strong> Isi setiap kotak dengan poin pendek (1–2 kalimat), lalu prioritaskan hipotesis yang paling berisiko dan uji cepat dengan pelanggan nyata.</p><p><strong>Contoh sederhana:</strong> Jualan kue — Problem: susah dapat kue sehat; UVP: kue sehat rasa enak; Channels: Instagram, marketplace; Revenue: penjualan per pcs; Cost: bahan + tenaga; Key Metric: konversi order; Unfair Advantage: resep rahasia.</p>", image: "images/lean.svg" }
  ];

  const articlesList = document.getElementById('articles-list');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');
  const themeToggle = document.getElementById('theme-toggle');
  const learnMoreBtn = document.getElementById('learn-more');

  function renderArticles(){
    articlesList.innerHTML = '';
    articles.forEach(a => {
      const card = document.createElement('article');
      card.className = 'card';
      const imgUrl = a.image || `https://via.placeholder.com/800x420?text=Artikel+${a.id}`;
      card.innerHTML = `
        <img src="${imgUrl}" onerror="this.onerror=null;this.src='images/art1.svg'" alt="${a.title}" style="width:100%;height:160px;border-radius:8px;object-fit:cover;margin-bottom:12px" />
        <h3 style="margin:0 0 8px">${a.title}</h3>
        <p class="muted" style="margin:0 0 12px">${a.desc}</p>
        <div style="text-align:right"><button class="btn primary btn-read" data-id="${a.id}">Baca Selengkapnya</button></div>
      `;
      articlesList.appendChild(card);
    });

    document.querySelectorAll('.btn-read').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.target.dataset.id);
        const art = articles.find(x => x.id === id);
        if(art){
          modalTitle.textContent = art.title;
          modalDesc.innerHTML = art.content;
          modal.setAttribute('aria-hidden','false');
        }
      });
    });
  }

  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true') });

  renderArticles();


  if(learnMoreBtn){
    learnMoreBtn.addEventListener('click', ()=>{
      modalTitle.textContent = 'Pelatihan & Panduan Singkat';
      modalDesc.innerHTML = `
        <strong>Materi singkat:</strong>
        <ul>
          <li>Dasar menghitung modal dan keuntungan</li>
          <li>Menentukan harga jual yang sehat</li>
          <li>Strategi promosi sederhana menggunakan sosial media</li>
        </ul>
        <p>Jangan lupa juga untuk menentukan bisnis yang sempurna pelajari lebih lanjut tentang lean canvas dan isi isinya.<p>
        <p>Mentor: <strong>Alles</strong> — Pengembang yang berfokus pada pendidikan wirausaha untuk pelajar.</p>
      `;
      modal.setAttribute('aria-hidden','false');
    });
  }

  const $modal = document.getElementById('input-modal');
  const $harga = document.getElementById('input-harga');
  const $biaya = document.getElementById('input-biaya');
  const $terjual = document.getElementById('input-terjual');
  const $list = document.getElementById('input-list');
  const $btnHitung = document.getElementById('btn-hitung');
  const $resultArea = document.getElementById('result-area');
  const $simMode = document.getElementById('sim-mode');
  const $btnSample = document.getElementById('btn-sample');

  function toRp(n){
    return 'Rp ' + Number(n).toLocaleString('id-ID');
  }

  let _animHandle = null;
  function animateNumber(target, { duration = 800, start = 0, formatter = v => v, onUpdate } = {}){
    if(_animHandle) cancelAnimationFrame(_animHandle);
    const startTime = performance.now();
    const from = start;
    const diff = target - from;
    return new Promise(resolve => {
      function step(now){
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - (1 - t) * (1 - t);
        const val = from + diff * eased;
        if(onUpdate) onUpdate(val);
        if(t < 1){
          _animHandle = requestAnimationFrame(step);
        } else {
          _animHandle = null;
          if(onUpdate) onUpdate(target);
          resolve();
        }
      }
      _animHandle = requestAnimationFrame(step);
    });
  }
  let __chartInstance = null;
  const chartCanvas = document.getElementById('result-chart');
  function destroyChart(){ if(__chartInstance){ __chartInstance.destroy(); __chartInstance = null; } }
  function renderChartForResult(r){
    if(!chartCanvas) return;
    destroyChart();
    try{
      if(!r) return;
      let labels = [], data = [], colors = [];
      if(r.mode === 'profit' && r.inputs){
        const modal = Number(r.inputs.modalAwal || 0);
        const keuntungan = Math.max(0, Number(r.value) || 0);
        const lossPart = Math.max(0, modal - (Number(r.value) < 0 ? Math.abs(Number(r.value)) : 0));
        labels = ['Modal','Laba / (Rugi)'];
        data = [modal, Math.abs(Number(r.value))];
        colors = ['#0b6fb2','#10b981'];
      } else if(r.mode === 'omzet' && r.inputs){
        labels = ['Omzet','HPP/Laba'];
        const omzet = Number(r.value) || 0;
        const approxCost = Number(r.inputs.hargaJual||0) * 0.6 * (Number(r.inputs.units||1));
        data = [omzet, Math.max(0, approxCost)];
        colors = ['#0b6fb2','#f59e0b'];
      } else {
        labels = [r.label || 'Hasil', 'Sisa'];
        const v = Number(r.value) || 0;
        data = [Math.abs(v), Math.max(0, (Math.abs(v) * 0.2))];
        colors = ['#0b6fb2','#e5e7eb'];
      }
      const cfg = {
        type: 'pie',
        data: { labels, datasets: [{ data, backgroundColor: colors }] },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      };
      __chartInstance = new Chart(chartCanvas.getContext('2d'), cfg);
    }catch(e){ console.warn('Chart error', e); }
  }
  function runSimulation(){
    const mode = $simMode?.value || 'profit';
    let lastResult = null;
    if(mode === 'profit'){
      const modalAwal = Number($modal.value || 0);
      const harga = Number($harga.value || 0);
      const biaya = Number($biaya.value || 0);
      const terjual = Number($terjual.value || 0);
      if(harga <= 0 || biaya < 0 || terjual <= 0){ $resultArea.innerHTML = `<p class="muted">Mohon masukkan harga (>0), biaya (>=0), dan jumlah terjual (>0).</p>`; return; }
      const keuntunganKotor = (harga - biaya) * terjual;
      const keuntunganBersih = keuntunganKotor - modalAwal;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung...</p></div>`;
      const elNum = document.getElementById('result-number');
      const elMsg = document.getElementById('result-msg');
      animateNumber(keuntunganBersih, { duration: 900, start: 0, formatter: toRp, onUpdate(v){ elNum.textContent = toRp(Math.round(v)); } })
        .then(()=>{ elMsg.textContent = (keuntunganBersih>=0? 'Keren! Kamu untung ':'Hati-hati, kamu rugi ') + toRp(Math.abs(keuntunganBersih)); });
      lastResult = { mode: 'profit', label: 'Keuntungan Bersih', value: keuntunganBersih, currency: true, inputs: { modalAwal, harga, biaya, terjual } };
      window.__lastSimResult = lastResult;
      renderChartForResult(lastResult);
      return;
    }
    if(mode === 'average'){
      const raw = String($list?.value || '');
      const parts = raw.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
      const nums = parts.map(p => Number(p)).filter(n => !Number.isNaN(n));
      if(nums.length === 0){ $resultArea.innerHTML = `<p class="muted">Masukkan beberapa angka (pisah koma atau spasi) di field "Daftar Nilai" untuk menghitung rata-rata.</p>`; return; }
      const sum = nums.reduce((s,v)=>s+v,0);
      const avg = sum / nums.length;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">0</strong><p id="result-msg" class="muted">Menghitung rata-rata...</p></div>`;
      const elNumA = document.getElementById('result-number');
      const elMsgA = document.getElementById('result-msg');
      animateNumber(avg, { duration: 800, start: 0, onUpdate(v){ elNumA.textContent = Number(v).toFixed(2); } })
        .then(()=>{ elMsgA.textContent = `Rata-rata dari ${nums.length} nilai.`; });
  lastResult = { mode: 'average', label: 'Rata-rata', value: avg, currency: false, inputs: { values: nums } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    if(mode === 'hpp'){
      const raw = String($list?.value || '');
      const parts = raw.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
      const nums = parts.map(p => Number(p)).filter(n => !Number.isNaN(n));
      if(nums.length === 0){ $resultArea.innerHTML = `<p class="muted">Masukkan daftar biaya langsung (pisah koma/spasi) pada field Daftar Nilai.</p>`; return; }
      const total = nums.reduce((s,v)=>s+v,0);
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung HPP total...</p></div>`;
      const elNum = document.getElementById('result-number'); const elMsg = document.getElementById('result-msg');
      animateNumber(total, { duration: 800, onUpdate(v){ elNum.textContent = toRp(Math.round(v)); } }).then(()=>{ elMsg.textContent = `HPP total dari ${nums.length} item.`; });
  lastResult = { mode: 'hpp', label: 'HPP Total', value: total, currency: true, inputs: { items: nums } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    if(mode === 'hpu'){
      const raw = String($list?.value || '');
      const parts = raw.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
      const nums = parts.map(p => Number(p)).filter(n => !Number.isNaN(n));
      const units = Number($terjual.value || 0);
      if(nums.length === 0 || units <= 0){ $resultArea.innerHTML = `<p class="muted">Masukkan HPP (daftar biaya) dan jumlah unit (>0).</p>`; return; }
      const total = nums.reduce((s,v)=>s+v,0); const hpu = total / units;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung HPU per unit...</p></div>`;
      const elNum = document.getElementById('result-number'); const elMsg = document.getElementById('result-msg');
      animateNumber(hpu, { duration: 800, onUpdate(v){ elNum.textContent = toRp(Math.round(v)); } }).then(()=>{ elMsg.textContent = `HPU = ${toRp(Math.round(hpu))} per unit (dari HPP ${toRp(total)} ÷ ${units} unit).`; });
  lastResult = { mode: 'hpu', label: 'HPU per unit', value: hpu, currency: true, inputs: { total, units } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    if(mode === 'harga_jual'){
      const biayaPer = Number($biaya.value || 0);
      const marginPct = Number($modal.value || 0); // reuse modal as margin %
      if(biayaPer <= 0 || Number.isNaN(marginPct)){ $resultArea.innerHTML = `<p class="muted">Masukkan biaya per unit (>0) dan margin (%) yang valid.</p>`; return; }
      const harga = biayaPer + (marginPct / 100) * biayaPer;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung Harga Jual...</p></div>`;
      const elNum = document.getElementById('result-number'); const elMsg = document.getElementById('result-msg');
      animateNumber(harga, { duration: 800, onUpdate(v){ elNum.textContent = toRp(Math.round(v)); } }).then(()=>{ elMsg.textContent = `Harga jual dengan margin ${marginPct}% = ${toRp(Math.round(harga))}`; });
  lastResult = { mode: 'harga_jual', label: 'Harga Jual', value: harga, currency: true, inputs: { biayaPer, marginPct } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    if(mode === 'laba'){
      const hargaJual = Number($harga.value || 0);
      const hppPer = Number($biaya.value || 0); // biaya per unit
      const units = Number($terjual.value || 0);
      if(hargaJual <= 0 || hppPer < 0 || units <= 0){ $resultArea.innerHTML = `<p class="muted">Masukkan Harga Jual (>0), HPP per unit (>=0), dan jumlah unit (>0).</p>`; return; }
      const labaPer = hargaJual - hppPer;
      const labaTotal = labaPer * units;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung laba...</p></div>`;
      const elNum = document.getElementById('result-number'); const elMsg = document.getElementById('result-msg');
      animateNumber(labaTotal, { duration: 900, onUpdate(v){ elNum.textContent = toRp(Math.round(v)); } }).then(()=>{ elMsg.textContent = `Laba per unit ${toRp(Math.round(labaPer))} · Total ${toRp(Math.round(labaTotal))} dari ${units} unit.`; });
  lastResult = { mode: 'laba', label: 'Laba Total', value: labaTotal, currency: true, inputs: { hargaJual, hppPer, units } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    if(mode === 'omzet'){
      const hargaJual = Number($harga.value || 0);
      const units = Number($terjual.value || 0);
      if(hargaJual <= 0 || units <= 0){ $resultArea.innerHTML = `<p class="muted">Masukkan Harga Jual (>0) dan jumlah terjual (>0) untuk menghitung omzet.</p>`; return; }
      const omzet = hargaJual * units;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung omzet...</p></div>`;
      const elNum = document.getElementById('result-number'); const elMsg = document.getElementById('result-msg');
      animateNumber(omzet, { duration: 800, onUpdate(v){ elNum.textContent = toRp(Math.round(v)); } }).then(()=>{ elMsg.textContent = `Omzet total = ${toRp(Math.round(omzet))} dari ${units} unit.`; });
  lastResult = { mode: 'omzet', label: 'Omzet', value: omzet, currency: true, inputs: { hargaJual, units } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    if(mode === 'custom'){
      const biayaVal = Number($biaya.value || 0);
      const qty = Number($terjual.value || 0);
      if(biayaVal < 0 || qty <= 0){ $resultArea.innerHTML = `<p class="muted">Masukkan Biaya (>=0) dan Jumlah (>0) untuk simulasi custom.</p>`; return; }
      const total = biayaVal * qty;
      $resultArea.innerHTML = `<div><strong id="result-number" style="font-size:20px">${toRp(0)}</strong><p id="result-msg" class="muted">Menghitung total...</p></div>`;
      const elNumC = document.getElementById('result-number');
      const elMsgC = document.getElementById('result-msg');
      animateNumber(total, { duration: 850, start: 0, onUpdate(v){ elNumC.textContent = toRp(Math.round(v)); } })
        .then(()=>{ elMsgC.textContent = 'Total estimasi biaya.'; });
  lastResult = { mode: 'custom', label: 'Total Estimasi', value: total, currency: true, inputs: { biayaVal, qty } };
  window.__lastSimResult = lastResult;
  renderChartForResult(lastResult);
  return;
    }
    // expose lastResult for external use (save button)
    window.__lastSimResult = lastResult;
  }

  $btnHitung.addEventListener('click', runSimulation);

  const simFields = Array.from(document.querySelectorAll('.sim-field'));
  function setModeFields(mode){
    simFields.forEach(f => f.style.display = 'none');
    if(mode === 'profit'){
      simFields.filter(s => ['modal','harga','biaya','terjual'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    } else if(mode === 'average'){
      simFields.filter(s => ['list'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    } else if(mode === 'custom'){
      simFields.filter(s => ['biaya','terjual'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    } else if(mode === 'hpp'){
      simFields.filter(s => ['list'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    } else if(mode === 'hpu'){
      simFields.filter(s => ['list','terjual'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    } else if(mode === 'harga_jual'){
      simFields.filter(s => ['biaya','modal'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
      const modalLabel = document.querySelector('.sim-field[data-key="modal"] label');
      if(modalLabel) modalLabel.textContent = 'Margin (%)';
    } else if(mode === 'laba'){
      simFields.filter(s => ['harga','biaya','terjual'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    } else if(mode === 'omzet'){
      simFields.filter(s => ['harga','terjual'].includes(s.dataset.key)).forEach(s => s.style.display = 'block');
    }
  }
  setModeFields($simMode?.value || 'profit');
  $simMode?.addEventListener('change', (e)=>{ setModeFields(e.target.value); });

  const simInfoEl = document.getElementById('sim-info');
  const SIM_EXPLANATIONS = {
    profit: {
      title: 'Menghitung Keuntungan (Profit)',
      body: `
        <p class="muted">Gunakan mode ini untuk memperkirakan keuntungan bersih bisnis setelah memperhitungkan modal awal dan biaya per produk.</p>
        <ul>
          <li><strong>Langkah:</strong> Isi Harga Jual, Biaya per unit, Jumlah terjual, lalu tambahkan Modal Awal.</li>
          <li><strong>Perhatikan:</strong> Biaya bisa meliputi bahan, upah, dan ongkos produksi.</li>
        </ul>
        <p><strong>Rumus:</strong> (Harga Jual − Biaya per unit) × Jumlah terjual − Modal Awal</p>
        <p><em>Contoh:</em> (15.000 − 8.000) × 50 − 100.000 = 250.000</p>
      `
    },
    average: {
      title: 'Menghitung Nilai Rata-rata',
      body: `
        <p class="muted">Mode ini menghitung rata-rata dari daftar angka. Cocok untuk menghitung rata-rata harga, skor, atau estimasi berkala.</p>
        <ul>
          <li>Masukkan nilai dipisah koma atau spasi (mis. <code>80, 90, 75, 85</code>).</li>
          <li>Sistem akan mengabaikan nilai yang bukan angka.</li>
        </ul>
        <p><strong>Rumus:</strong> Jumlah semua nilai ÷ Banyak nilai</p>
        <p><em>Contoh:</em> (80+90+75+85)/4 = 82.5</p>
      `
    },
    custom: {
      title: 'Simulasi Sederhana (Biaya × Jumlah)',
      body: `
        <p class="muted">Untuk menghitung total biaya sederhana: biaya per unit dikalikan jumlah unit atau durasi (mis. upah per jam × jam kerja).</p>
        <ul>
          <li>Masukkan Biaya per unit dan Jumlah.</li>
          <li>Cocok untuk estimasi jasa atau pekerjaan sementara.</li>
        </ul>
        <p><strong>Rumus:</strong> Total = Biaya per unit × Jumlah</p>
        <p><em>Contoh:</em> 20.000 × 3 = 60.000</p>
      `
    },
    hpp: {
      title: 'HPP — Harga Pokok Penjualan (total biaya langsung)',
      body: `
        <p class="muted">HPP adalah total semua biaya langsung yang terkait pembuatan barang (bahan baku, upah produksi, ongkos langsung).</p>
        <ul>
          <li>Masukkan setiap komponen biaya sebagai daftar (pisah koma/spasi).</li>
          <li>Pastikan memasukkan semua biaya langsung agar HPP akurat.</li>
        </ul>
        <p><strong>Rumus:</strong> HPP = jumlah semua biaya langsung</p>
        <p><em>Contoh:</em> Tepung 50.000 + Gula 30.000 + Telur 20.000 = HPP 100.000</p>
      `
    },
    hpu: {
      title: 'HPU — Harga Pokok Unit',
      body: `
        <p class="muted">HPU menunjukkan biaya per unit yang dihasilkan. Gunakan HPP total dan bagi dengan jumlah unit.</p>
        <ul>
          <li>Isi HPP (daftar biaya) dan Jumlah unit yang dibuat.</li>
          <li>Hasil membantu menentukan harga minimal agar tidak merugi.</li>
        </ul>
        <p><strong>Rumus:</strong> HPU = HPP ÷ Jumlah unit</p>
        <p><em>Contoh:</em> HPP 200.000 ÷ 100 unit = 2.000 per unit</p>
      `
    },
    harga_jual: {
      title: 'Menentukan Harga Jual dengan Margin (%)',
      body: `
        <p class="muted">Mode ini membantu menghitung harga jual dengan menambahkan margin persentase di atas biaya per unit.</p>
        <ul>
          <li>Isi Biaya per unit (HPU atau biaya langsung) dan Margin (%) yang diinginkan.</li>
          <li>Margin umum: 20%–50% tergantung jenis produk dan pasar.</li>
        </ul>
        <p><strong>Rumus:</strong> Harga Jual = Biaya per unit + (Margin% × Biaya per unit)</p>
        <p><em>Contoh:</em> Biaya 2.000, Margin 50% → Harga Jual = 3.000</p>
      `
    },
    laba: {
      title: 'Menghitung Laba (per unit & total)',
      body: `
        <p class="muted">Laba menunjukkan selisih yang tersisa setelah biaya pokok ditanggung. Tampilkan laba per unit dan total.</p>
        <ul>
          <li>Isi Harga Jual per unit, HPP per unit, dan Jumlah terjual.</li>
          <li>Perhatikan: laba bisa negatif (rugi) bila Harga Jual < HPP.</li>
        </ul>
        <p><strong>Rumus:</strong> Laba per unit = Harga Jual − HPP per unit; Laba total = Laba per unit × Jumlah terjual</p>
        <p><em>Contoh:</em> Harga 3.000 − HPP 2.000 = 1.000 per unit; 1.000 × 100 = 100.000</p>
      `
    },
    omzet: {
      title: 'Omzet (Total Penjualan)',
      body: `
        <p class="muted">Omzet adalah jumlah seluruh pendapatan penjualan sebelum dikurangi biaya.</p>
        <ul>
          <li>Isi Harga Jual per unit dan Jumlah terjual untuk melihat omzet total.</li>
          <li>Omzet membantu menilai skala penjualan, bukan keuntungan.</li>
        </ul>
        <p><strong>Rumus:</strong> Omzet = Harga Jual × Jumlah terjual</p>
        <p><em>Contoh:</em> 3.000 × 50 = 150.000</p>
      `
    }
  };

  function renderSimInfo(mode){
    const info = SIM_EXPLANATIONS[mode] || SIM_EXPLANATIONS.profit;
    simInfoEl.innerHTML = `<div class="card"><h4 style="margin:0 0 8px">${info.title}</h4><div class="muted">${info.body}</div></div>`;
  }
  renderSimInfo($simMode?.value || 'profit');
  $simMode?.addEventListener('change', (e)=>{ renderSimInfo(e.target.value);
    if(e.target.value !== 'harga_jual'){ const modalLabel = document.querySelector('.sim-field[data-key="modal"] label'); if(modalLabel) modalLabel.textContent = 'Modal Awal (Rp)'; }
  });

  if(articlesList){
    let isDown = false, startX = 0, scrollLeft = 0;
    articlesList.addEventListener('mousedown', (e)=>{ isDown = true; articlesList.classList.add('dragging'); startX = e.pageX - articlesList.offsetLeft; scrollLeft = articlesList.scrollLeft; });
    articlesList.addEventListener('mouseleave', ()=>{ isDown = false; articlesList.classList.remove('dragging'); });
    articlesList.addEventListener('mouseup', ()=>{ isDown = false; articlesList.classList.remove('dragging'); });
    articlesList.addEventListener('mousemove', (e)=>{ if(!isDown) return; e.preventDefault(); const x = e.pageX - articlesList.offsetLeft; const walk = (x - startX) * 1; articlesList.scrollLeft = scrollLeft - walk; });
    articlesList.addEventListener('touchstart', (e)=>{ startX = e.touches[0].pageX - articlesList.offsetLeft; scrollLeft = articlesList.scrollLeft; });
    articlesList.addEventListener('touchmove', (e)=>{ const x = e.touches[0].pageX - articlesList.offsetLeft; const walk = (x - startX) * 1; articlesList.scrollLeft = scrollLeft - walk; });
  }

  if($btnSample){
    $btnSample.addEventListener('click', ()=>{
      const mode = $simMode?.value || 'profit';
      if(mode === 'profit'){
        $modal.value = 100000; $harga.value = 15000; $biaya.value = 8000; $terjual.value = 50;
      } else if(mode === 'average'){
        $modal.value = 0; $list.value = '80,90,75,85'; $harga.value = 0; $biaya.value = 0; $terjual.value = 0;
      } else {
        $modal.value = 0; $harga.value = 0; $biaya.value = 20000; $terjual.value = 3;
      }
      runSimulation();
    });
  }

  const $message = document.getElementById('forum-message');
  const $btnPost = document.getElementById('btn-post');
  const $btnClear = document.getElementById('btn-clear');
  const $comments = document.getElementById('comments');

  // --- Simple local auth / user store ---
  const USER_KEY = 'bizlearn_users_v1';
  const SESSION_KEY = 'bizlearn_session_v1';
  const userArea = document.getElementById('user-area');
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close');
  const showLogin = document.getElementById('show-login');
  const showRegister = document.getElementById('show-register');
  const authLoginBox = document.getElementById('auth-login');
  const authRegisterBox = document.getElementById('auth-register');
  const loginUsername = document.getElementById('login-username');
  const loginPassword = document.getElementById('login-password');
  const btnLogin = document.getElementById('btn-login');
  const regUsername = document.getElementById('reg-username');
  const regPassword = document.getElementById('reg-password');
  const btnRegister = document.getElementById('btn-register');
  const authFeedback = document.getElementById('auth-feedback');

  function loadUsers(){ try{ const raw = localStorage.getItem(USER_KEY); return raw?JSON.parse(raw):[] }catch(e){return []} }
  function saveUsers(list){ localStorage.setItem(USER_KEY, JSON.stringify(list)); }
  function loadSession(){ try{ const raw = localStorage.getItem(SESSION_KEY); return raw?JSON.parse(raw):null }catch(e){return null} }
  function saveSession(sess){ localStorage.setItem(SESSION_KEY, JSON.stringify(sess)); }
  function clearSession(){ localStorage.removeItem(SESSION_KEY); }

  // seed admin if missing
  (function ensureAdmin(){ const users = loadUsers(); if(!users.find(u=>u.username==='admin')){ users.push({ username:'admin', password:'admin', role:'admin' }); saveUsers(users); }})();

  function renderUserArea(){ const sess = loadSession(); if(!userArea) return; userArea.innerHTML = ''; if(!sess){ const a = document.createElement('button'); a.className='btn ghost'; a.textContent='Masuk'; a.addEventListener('click', ()=>{ authModal.setAttribute('aria-hidden','false'); authLoginBox.style.display='block'; authRegisterBox.style.display='none'; authFeedback.textContent=''; }); userArea.appendChild(a); } else { const span = document.createElement('div'); span.style.display='flex'; span.style.alignItems='center'; span.style.gap='8px'; span.innerHTML = `<div style="color:#fff;font-weight:700">${escapeHtml(sess.username)}</div>`; const btnOut = document.createElement('button'); btnOut.className='btn small'; btnOut.textContent='Keluar'; btnOut.addEventListener('click', ()=>{ clearSession(); renderUserArea(); renderComments(); renderHistory(); }); span.appendChild(btnOut); userArea.appendChild(span); } updateForumStatus(); }
  renderUserArea();

  if(authClose) authClose.addEventListener('click', ()=>{ authModal.setAttribute('aria-hidden','true'); });
  if(showLogin) showLogin.addEventListener('click', ()=>{ authLoginBox.style.display='block'; authRegisterBox.style.display='none'; authFeedback.textContent=''; });
  if(showRegister) showRegister.addEventListener('click', ()=>{ authRegisterBox.style.display='block'; authLoginBox.style.display='none'; authFeedback.textContent=''; });

  btnRegister?.addEventListener('click', ()=>{
    const u = String(regUsername.value||'').trim(); const p = String(regPassword.value||'').trim(); if(!u||!p){ authFeedback.textContent='Isi username & password.'; return; }
    const users = loadUsers(); if(users.find(x=>x.username===u)){ authFeedback.textContent='Username sudah terpakai.'; return; }
    users.push({ username:u, password:p, role:'user' }); saveUsers(users); authFeedback.textContent='Akun dibuat. Silakan login.'; regUsername.value=''; regPassword.value=''; authLoginBox.style.display='block'; authRegisterBox.style.display='none';
  });

  btnLogin?.addEventListener('click', ()=>{
    const u = String(loginUsername.value||'').trim(); const p = String(loginPassword.value||'').trim(); if(!u||!p){ authFeedback.textContent='Isi username & password.'; return; }
    const users = loadUsers(); const found = users.find(x=>x.username===u && x.password===p);
    if(!found){ authFeedback.textContent='Username atau password salah.'; return; }
    saveSession({ username: found.username, role: found.role }); authModal.setAttribute('aria-hidden','true'); renderUserArea(); renderComments(); renderHistory(); updateForumStatus();
  });


  // --- Simulation history / export UI wiring ---
  const $btnSaveResult = document.getElementById('btn-save-result');
  const $btnExportCsv = document.getElementById('btn-export-csv');
  const $btnPrint = document.getElementById('btn-print');
  const $historyList = document.getElementById('history-list');
  const $historyEmpty = document.getElementById('history-empty');
  const $btnClearHistory = document.getElementById('btn-clear-history');
  const $btnQuiz = document.getElementById('btn-quiz');
  const $quizModal = document.getElementById('quiz-modal');
  const $quizClose = document.getElementById('quiz-close');
  const $quizQuestion = document.getElementById('quiz-question');
  const $quizAnswer = document.getElementById('quiz-answer');
  const $quizSubmit = document.getElementById('quiz-submit');
  const $quizSkip = document.getElementById('quiz-skip');
  const $quizFeedback = document.getElementById('quiz-feedback');

  const HISTORY_KEY = 'bizlearn_sim_history_v1';

  function getUserHistoryKey(){ const sess = loadSession(); return sess ? `${HISTORY_KEY}_user_${sess.username}` : HISTORY_KEY; }
  function loadHistory(){ try{ const raw = localStorage.getItem(getUserHistoryKey()); return raw ? JSON.parse(raw) : []; }catch(e){ return []; } }
  function saveHistory(list){ localStorage.setItem(getUserHistoryKey(), JSON.stringify(list)); }

  function renderHistory(){
    const list = loadHistory();
    $historyList.innerHTML = '';
    if(list.length === 0){ $historyEmpty.style.display = 'block'; return; } else { $historyEmpty.style.display = 'none'; }
    list.slice().reverse().forEach((r, idx)=>{
      const id = Date.now() + '-' + idx;
      const item = document.createElement('div'); item.className = 'history-item';
      const ts = new Date(r.time).toLocaleString();
      const valueText = r.currency ? toRp(Math.round(r.value)) : (typeof r.value === 'number' ? Number(r.value).toFixed(2) : String(r.value));
  item.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${escapeHtml(r.label)}</strong> <small class="muted">(${escapeHtml(r.mode)})</small><div class="muted">${escapeHtml(ts)}</div></div><div style="text-align:right"><div>${escapeHtml(valueText)}</div><div style="margin-top:6px"><button class="btn small btn-load" data-idx="${list.length-1-idx}">Muat</button> <button class="btn small btn-delete" data-idx="${list.length-1-idx}">Hapus</button></div></div></div>`;
      $historyList.appendChild(item);
    });

    // attach handlers
    $historyList.querySelectorAll('.btn-delete').forEach(b => b.addEventListener('click', (e)=>{
      const i = Number(e.target.dataset.idx);
      const arr = loadHistory(); arr.splice(i,1); saveHistory(arr); renderHistory();
    }));
    $historyList.querySelectorAll('.btn-load').forEach(b => b.addEventListener('click', (e)=>{
      const i = Number(e.target.dataset.idx);
      const arr = loadHistory(); const r = arr[i];
      if(r){
        // populate inputs based on saved mode inputs (best-effort)
        if(r.inputs){
          if(r.inputs.modalAwal !== undefined) $modal.value = r.inputs.modalAwal;
          if(r.inputs.harga !== undefined) $harga.value = r.inputs.harga;
          if(r.inputs.biaya !== undefined) $biaya.value = r.inputs.biaya;
          if(r.inputs.terjual !== undefined) $terjual.value = r.inputs.terjual;
          if(r.inputs.values !== undefined) $list.value = (r.inputs.values || []).join(',');
        }
        // set mode
        if(r.mode) $simMode.value = r.mode; setModeFields($simMode.value); renderSimInfo($simMode.value);
      }
    }));
  }

  function addToHistory(result){
    if(!result){ alert('Tidak ada hasil simulasi untuk disimpan. Jalankan simulasi terlebih dahulu.'); return; }
    const list = loadHistory();
    const entry = Object.assign({}, result, { time: Date.now() });
    list.push(entry); saveHistory(list); renderHistory();
    // brief feedback
    const prev = $resultArea.innerHTML;
    $resultArea.innerHTML = `<p class="muted">Hasil disimpan ke riwayat.</p>`;
    setTimeout(()=>{ $resultArea.innerHTML = prev; }, 900);
  }

  function clearHistory(){ if(!confirm('Bersihkan seluruh riwayat simulasi?')) return; localStorage.removeItem(getUserHistoryKey()); renderHistory(); }

  function exportHistoryCsv(){
    const list = loadHistory(); if(list.length === 0){ alert('Tidak ada riwayat untuk diekspor.'); return; }
    const rows = [['waktu','mode','label','nilai','currency','inputs']];
    list.forEach(r=>{
      const when = new Date(r.time).toISOString();
      const val = r.currency ? Number(Math.round(r.value)) : r.value;
      rows.push([when, r.mode, r.label, String(val), r.currency ? '1' : '0', JSON.stringify(r.inputs || {})]);
    });
    const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'bizlearn_sim_history.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }

  function printHistory(){
    const list = loadHistory(); if(list.length === 0){ alert('Tidak ada riwayat untuk dicetak.'); return; }
    const w = window.open('', '_blank');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Riwayat Simulasi</title><link rel="stylesheet" href="css/style.css"></head><body><div class="container"><h2>Riwayat Simulasi</h2>${list.map(r=>`<div class="card" style="margin-bottom:8px"><strong>${r.label}</strong> <small class="muted">(${r.mode})</small><div class="muted">${new Date(r.time).toLocaleString()}</div><div>${r.currency? toRp(Math.round(r.value)) : String(r.value)}</div><pre>${escapeHtml(JSON.stringify(r.inputs || {}, null, 2))}</pre></div>`).join('')}<p class="muted">Dicetak dari BizLearn</p></div></body></html>`;
    w.document.open(); w.document.write(html); w.document.close();
  }

  // wire buttons
  if($btnSaveResult) $btnSaveResult.addEventListener('click', ()=>{ addToHistory(window.__lastSimResult); });
  if($btnExportCsv) $btnExportCsv.addEventListener('click', exportHistoryCsv);
  if($btnPrint) $btnPrint.addEventListener('click', printHistory);
  if($btnClearHistory) $btnClearHistory.addEventListener('click', clearHistory);
  // quiz wiring
  if($btnQuiz) $btnQuiz.addEventListener('click', ()=>{ openQuiz(); });
  if($quizClose) $quizClose.addEventListener('click', ()=>{ closeQuiz(); });
  if($quizSkip) $quizSkip.addEventListener('click', ()=>{ closeQuiz(); });
  if($quizSubmit) $quizSubmit.addEventListener('click', ()=>{ checkQuizAnswer(); });

  function openQuiz(){
    const r = window.__lastSimResult;
    if(!r){ alert('Jalankan simulasi dulu untuk mendapatkan tantangan.'); return; }
    // generate a simple question depending on mode
    const q = generateQuizFromResult(r);
    $quizQuestion.textContent = q.question;
    $quizQuestion.dataset.answer = q.answer; // store correct answer
    $quizAnswer.value = '';
    $quizFeedback.innerHTML = '';
    $quizModal.setAttribute('aria-hidden','false');
  }

  function closeQuiz(){ $quizModal.setAttribute('aria-hidden','true'); }

  function generateQuizFromResult(r){
    // default: ask to compute profit/omzet depending on available inputs
    try{
      if(r.mode === 'profit' || r.inputs && r.inputs.modalAwal!==undefined){
        const modal = Number(r.inputs.modalAwal || 0);
        const harga = Number(r.inputs.harga || 0);
        const biaya = Number(r.inputs.biaya || 0);
        const terjual = Number(r.inputs.terjual || 0);
        const answer = (harga - biaya) * terjual - modal;
        return { question: `Jika omzet = ${toRp(harga*terjual)} dan modal = ${toRp(modal)}, berapa profitnya? (jawab angka saja)`, answer: Math.round(answer) };
      }
      if(r.mode === 'omzet' || (r.inputs && r.inputs.hargaJual!==undefined && r.inputs.units!==undefined)){
        const harga = Number(r.inputs.hargaJual || 0); const units = Number(r.inputs.units || 0);
        const answer = harga * units;
        return { question: `Jika Harga Jual = ${toRp(harga)} dan jumlah terjual = ${units}, berapa omzet totalnya?`, answer: Math.round(answer) };
      }
      // fallback: ask for the numeric value computed
      return { question: `Berapa hasil simulasi terakhir (${r.label})? (jawab angka saja)`, answer: Math.round(Number(r.value) || 0) };
    }catch(e){ return { question: `Berapa hasil simulasi terakhir (${r.label})? (jawab angka saja)`, answer: Math.round(Number(r.value) || 0) }; }
  }

  function checkQuizAnswer(){
    const correct = Number($quizQuestion.dataset.answer || 0);
    const given = Number($quizAnswer.value.replace(/[^0-9\-\.]/g,''));
    if(Number.isNaN(given)) { $quizFeedback.innerHTML = `<p class="muted">Masukkan angka sebagai jawaban.</p>`; return; }
    if(Math.abs(given - correct) <= 0){ // exact match
      $quizFeedback.innerHTML = `<p style="color:var(--primary);font-weight:700">Benar! 🎉</p>`;
      runConfetti();
    } else {
      $quizFeedback.innerHTML = `<p style="color:#b91c1c;font-weight:700">Belum tepat.</p><div class="muted">Langkah: hitung (Harga − Biaya) × Jumlah terjual − Modal. Contoh: masukkan angka sesuai format.</div>`;
    }
  }

  // simple confetti: create and animate small colored divs
  function runConfetti(){
    const root = document.body;
    const colors = ['#0b6fb2','#f59e0b','#10b981','#ef4444','#8b5cf6'];
    for(let i=0;i<30;i++){
      const el = document.createElement('div');
      el.style.position='fixed'; el.style.zIndex=9999; el.style.left=(50+Math.random()*300-150)+'px'; el.style.top='20px';
      el.style.width='10px'; el.style.height='14px'; el.style.background=colors[Math.floor(Math.random()*colors.length)]; el.style.opacity='0.95'; el.style.borderRadius='2px';
      el.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
      root.appendChild(el);
      const dx = (Math.random()*400-200); const dy = 600 + Math.random()*200; const rot = (Math.random()*720-360);
      el.animate([{ transform: `translate(0,0) rotate(0deg)`, opacity:1 },{ transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity:0 }], { duration: 1700+Math.random()*800, easing: 'cubic-bezier(.2,.8,.2,1)' });
      setTimeout(()=>{ el.remove(); }, 2600);
    }
  }


  const STORAGE_KEY = 'bizlearn_comments_v1';

  function loadComments(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){return []}
  }

  function saveComments(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function updateForumStatus(){
    const statusEl = document.getElementById('forum-user-status');
    if(!statusEl) return;
    
    const sess = loadSession();
    if(sess){
      statusEl.innerHTML = `<span style="color: var(--primary); font-weight: 600;">✓ Masuk sebagai: ${escapeHtml(sess.username)}</span>`;
    } else {
      statusEl.innerHTML = `<span style="color: #6b7280;">⚠️ <a href="#" onclick="document.getElementById('user-area').querySelector('button').click(); return false;" style="color: var(--primary); text-decoration: underline;">Login diperlukan</a> untuk mengirim pesan</span>`;
    }
  }

  function renderComments(){
    const list = loadComments();
    updateForumStatus();
    $comments.innerHTML = '';
    if(list.length===0){
      $comments.innerHTML = '<p class="muted">Belum ada komentar. Jadilah yang pertama!</p>';
      return;
    }

    const sess = loadSession();
    list.slice().reverse().forEach((c, idx) => {
      const el = document.createElement('div');
      el.className = 'comment';
      const isAdmin = sess && sess.role === 'admin';
      const canEdit = sess && (sess.username === c.name || isAdmin);
      const small = document.createElement('small'); small.innerHTML = `${escapeHtml(c.name)} · ${new Date(c.time).toLocaleString()}`;
      const body = document.createElement('div'); body.innerHTML = escapeHtml(c.message);
      el.appendChild(small); el.appendChild(body);
      // admin controls
      if(isAdmin){
        const ctrl = document.createElement('div'); ctrl.style.marginTop='8px';
        const del = document.createElement('button'); del.className='btn small btn-delete'; del.textContent='Hapus'; del.addEventListener('click', ()=>{ const arr = loadComments(); arr.splice(list.length-1-idx,1); saveComments(arr); renderComments(); });
        ctrl.appendChild(del);
        el.appendChild(ctrl);
      }
      $comments.appendChild(el);
    });
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  $btnPost.addEventListener('click', ()=>{
    const sess = loadSession();
    if(!sess){ 
      alert('Silakan login terlebih dahulu untuk mengirim pesan.'); 
      authModal.setAttribute('aria-hidden','false'); 
      authLoginBox.style.display='block'; 
      authRegisterBox.style.display='none'; 
      authFeedback.textContent=''; 
      return; 
    }
    
    const name = sess.username;
    const message = $message.value.trim();
    if(!message){ alert('Masukkan pesan terlebih dahulu.'); return; }

    const list = loadComments();
    list.push({ name, message, time: Date.now() });
    saveComments(list);
    $message.value = '';
    renderComments();
  });

  $btnClear.addEventListener('click', ()=>{
    if(!confirm('Hapus semua komentar dari localStorage?')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderComments();
  });

  renderComments();
  // render saved sim history on load
  renderHistory();
});
