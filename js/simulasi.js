document.addEventListener('DOMContentLoaded', () => {
  const MAT_KEY = 'bizlearn_full_sim_v1';
  const $title = document.getElementById('sim-title');
  const $desc = document.getElementById('sim-desc');
  const $notes = document.getElementById('sim-notes');
  const $matName = document.getElementById('mat-name');
  const $matQty = document.getElementById('mat-qty');
  const $matPrice = document.getElementById('mat-price');
  const $add = document.getElementById('add-material');
  const $list = document.getElementById('materials-list');
  const $total = document.getElementById('total-material');
  const $save = document.getElementById('save-sim');
  const $print = document.getElementById('print-sim');
  const $units = document.getElementById('sim-units');
  const $margin = document.getElementById('sim-margin');
  const $fixed = document.getElementById('sim-fixed-cost');
  const $ppu = document.getElementById('price-per-unit');
  const $rec = document.getElementById('recommended-price');
  const $estProfit = document.getElementById('estimated-profit');
  const $finalTotal = document.getElementById('final-total');

  function toRp(n){ return 'Rp ' + Number(n).toLocaleString('id-ID'); }
  function escapeHtml(s){ return String(s).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

  function loadState(){ try{ return JSON.parse(localStorage.getItem(MAT_KEY) || '{}'); }catch(e){ return {}; } }
  function saveState(s){ localStorage.setItem(MAT_KEY, JSON.stringify(s)); }

  let state = loadState();
  state.materials = state.materials || [];

  function renderMaterials(){
    if(!$list) return;
    $list.innerHTML = '';
    if(state.materials.length === 0){ $list.innerHTML = '<p class="muted">Belum ada bahan.</p>'; if($total) $total.textContent = toRp(0); return; }
    const table = document.createElement('table'); table.style.width='100%'; table.style.borderCollapse='collapse';
    table.innerHTML = `<thead><tr><th>Nama</th><th style="width:80px">Qty</th><th style="width:140px">Harga/unit</th><th style="width:140px">Subtotal</th><th style="width:90px"></th></tr></thead>`;
    const tbody = document.createElement('tbody');
    let tot = 0;
    state.materials.forEach((m, idx)=>{
      const sub = (Number(m.qty)||0) * (Number(m.price)||0);
      tot += sub;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(m.name)}</td><td style="text-align:right">${m.qty}</td><td style="text-align:right">${toRp(m.price)}</td><td style="text-align:right">${toRp(sub)}</td><td style="text-align:right"><button class="btn small btn-delete" data-idx="${idx}">Hapus</button></td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    $list.appendChild(table);
    if($total) $total.textContent = toRp(tot);

    // update price per unit and recommended price
    const units = Number($units?.value || 1);
    const marginPct = Number($margin?.value || 0);
    const perUnit = units > 0 ? Math.round(tot / units) : 0;
    const recPrice = Math.round(perUnit + (marginPct/100) * perUnit);
    if($ppu) $ppu.textContent = toRp(perUnit);
    if($rec) $rec.textContent = toRp(recPrice);
    // estimated profit and final total
    const estimatedProfit = Math.round((recPrice - perUnit) * units);
    const finalTotalVal = Math.round(recPrice * units);
    if($estProfit) $estProfit.textContent = toRp(estimatedProfit);
    if($finalTotal) $finalTotal.textContent = toRp(finalTotalVal);
    // apply color classes based on sign
    if($estProfit){
      $estProfit.classList.remove('text-danger','text-success');
      if(estimatedProfit < 0) $estProfit.classList.add('text-danger'); else $estProfit.classList.add('text-success');
      $estProfit.title = estimatedProfit < 0 ? 'Kerugian diperkirakan' : 'Keuntungan diperkirakan';
    }
    if($finalTotal){ $finalTotal.title = 'Total pendapatan yang diharapkan'; }

    $list.querySelectorAll('.btn-delete').forEach(b => b.addEventListener('click', (e)=>{ const i = Number(e.target.dataset.idx); state.materials.splice(i,1); saveState(state); renderMaterials(); }));
      // update BEP display
      try{ if(typeof computeBEP === 'function') computeBEP(); }catch(e){ /* ignore */ }
  }

  $add?.addEventListener('click', ()=>{
    const name = $matName.value.trim(); const qty = Number($matQty.value||0); const price = Number($matPrice.value||0);
    if(!name || qty <= 0 || price < 0){ alert('Isi nama, qty (>0), dan harga (>=0).'); return; }
    state.materials.push({ name, qty, price }); saveState(state); $matName.value=''; $matQty.value=''; $matPrice.value=''; renderMaterials();
  });

  [$units, $margin]?.forEach(el=> el && el.addEventListener('input', ()=> renderMaterials()));
  $fixed?.addEventListener('input', () => renderMaterials());

  $save?.addEventListener('click', ()=>{
    const units = Number($units?.value || 1);
    const marginPct = Number($margin?.value || 0);
    const tot = (state.materials||[]).reduce((s,m)=>s + (Number(m.qty)||0)*(Number(m.price)||0), 0);
    const perUnit = units > 0 ? Math.round(tot / units) : 0;
    const recPrice = Math.round(perUnit + (marginPct/100) * perUnit);
    const entry = {
      title: $title?.value.trim(), desc: $desc?.value.trim(), notes: $notes?.value.trim(), materials: state.materials.slice(), time: Date.now(), units, marginPct, perUnit, recPrice
    };
    const arr = JSON.parse(localStorage.getItem(MAT_KEY + '_list') || '[]');
    arr.push(entry); localStorage.setItem(MAT_KEY + '_list', JSON.stringify(arr));
    alert('Simulasi disimpan. Kamu bisa mencetaknya dari tombol Cetak.');
    renderHistory();
  });

  async function generatePdfFromHtml(html, filenameBase){
    const container = document.createElement('div');
    container.style.position = 'fixed'; container.style.left = '-9999px'; container.style.top = '0';
    container.style.width = '794px';
    container.innerHTML = html;
    document.body.appendChild(container);
    try{
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 40;
      const scale = imgWidth / canvas.width;
      const imgHeight = canvas.height * scale;
      if(imgHeight <= pageHeight - 40){
        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
      } else {
        const sliceHeight = Math.floor((pageHeight - 40) / scale);
        let y = 0; let page = 0;
        while(y < canvas.height){
          const slice = document.createElement('canvas');
          slice.width = canvas.width; slice.height = Math.min(sliceHeight, canvas.height - y);
          const ctx = slice.getContext('2d');
          ctx.drawImage(canvas, 0, y, slice.width, slice.height, 0, 0, slice.width, slice.height);
          const sliceData = slice.toDataURL('image/png');
          const h = slice.height * scale;
          if(page > 0) pdf.addPage();
          pdf.addImage(sliceData, 'PNG', 20, 20, imgWidth, h);
          y += sliceHeight; page++;
        }
      }
      const fname = (String(filenameBase || 'simulasi').trim() || 'simulasi').replace(/[^a-z0-9_-]/ig,'_') + '.pdf';
      pdf.save(fname);
    } finally { document.body.removeChild(container); }
  }

  // Print: generate PDF from the minimal printable HTML (only filled input/results)
  $print?.addEventListener('click', async ()=>{
    try{
      const html = buildPrintable();
      const filenameBase = String($title?.value || 'simulasi').trim() || 'simulasi';
      await generatePdfFromHtml(html, filenameBase);
    }catch(e){ console.error(e); alert('Gagal membuat PDF: '+ (e && e.message)); }
  });

  function buildPrintable(){
    const rows = (state.materials||[]).map(m => `<tr><td>${escapeHtml(m.name)}</td><td style="text-align:right">${m.qty}</td><td style="text-align:right">${toRp(m.price)}</td><td style="text-align:right">${toRp(m.qty*m.price)}</td></tr>`).join('');
    const total = (state.materials||[]).reduce((s,m)=>s + (Number(m.qty)||0)*(Number(m.price)||0), 0);
    const title = escapeHtml($title?.value.trim() || 'Ide Bisnis');
    const desc = escapeHtml($desc?.value.trim() || '');
    const notes = escapeHtml($notes?.value.trim() || '');
    const unitsVal = Number($units?.value || 1);
    const marginVal = Number($margin?.value || 0);
    const perUnit = unitsVal > 0 ? Math.round(total / unitsVal) : 0;
    const recPrice = Math.round(perUnit + (marginVal/100) * perUnit);
    const estimatedProfitTpl = Math.round((recPrice - perUnit) * unitsVal);
    const finalTotalTpl = Math.round(recPrice * unitsVal);
    const tpl = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="css/style.css"></head><body><div class="container"><h1>${title}</h1><p class="muted">${desc}</p><h3>Bahan & Biaya</h3><table style="width:100%;border-collapse:collapse"><thead><tr><th>Nama</th><th style="width:80px">Qty</th><th style="width:120px">Harga/unit</th><th style="width:120px">Subtotal</th></tr></thead><tbody>${rows}</tbody></table><p><strong>Total:</strong> ${toRp(total)}</p><h3>Ringkasan Produksi</h3><ul><li>Perkiraan unit dibuat: ${unitsVal}</li><li>Biaya per unit (estimasi): ${toRp(perUnit)}</li><li>Rekomendasi harga (margin ${marginVal}%): ${toRp(recPrice)}</li></ul><ul><li>Perkiraan total keuntungan ( (Harga jual - Biaya per unit) × Jumlah unit ): ${toRp(estimatedProfitTpl)}</li><li>Total akhir (Harga jual × Jumlah unit): ${toRp(finalTotalTpl)}</li></ul><h3>Catatan</h3><div style="white-space:pre-line">${notes}</div><p class="muted" style="margin-top:24px">Dicetak dari BizLearn</p></div></body></html>`;
    return tpl;
  }

  // Break-even point calculation (simple): BEP units = ceil(fixed / (price - variable_per_unit))
  function computeBEP(){
    try{
      const fixed = Number($fixed?.value || 0);
      const tot = (state.materials||[]).reduce((s,m)=>s + (Number(m.qty)||0)*(Number(m.price)||0), 0);
      const units = Number($units?.value || 1);
      const variablePerUnit = units > 0 ? tot / units : 0; // not rounded here
      const price = Number($rec?.textContent.replace(/[^0-9]/g,'')) || 0;
      const $bepU = document.getElementById('bep-units-mini');
      const $bepO = document.getElementById('bep-omzet-mini');
      if(!price || price <= variablePerUnit){
        if($bepU) $bepU.textContent = '—';
        if($bepO) $bepO.textContent = '—';
        return null;
      }
      const marginPerUnit = price - variablePerUnit;
      const bepUnits = Math.ceil(fixed / marginPerUnit) || 0;
      const bepOmzet = Math.round(bepUnits * price);
      if($bepU) $bepU.textContent = bepUnits;
      if($bepO) $bepO.textContent = toRp(bepOmzet);
      return { units: bepUnits, omzet: bepOmzet, variablePerUnit, price };
    }catch(e){ console.error('BEP compute error', e); return null; }
  }

  // --- history functions ---
  const $historyList = document.getElementById('sim-history-list');
  const $btnClearAll = document.getElementById('btn-clear-all-sim');

  function loadHistory(){ return JSON.parse(localStorage.getItem(MAT_KEY + '_list') || '[]'); }
  function saveHistory(arr){ localStorage.setItem(MAT_KEY + '_list', JSON.stringify(arr)); }

  function renderHistory(){
    if(!$historyList) return;
    const arr = loadHistory();
    $historyList.innerHTML = '';
    if(arr.length === 0){ $historyList.innerHTML = '<p class="muted">Belum ada simulasi tersimpan.</p>'; return; }
    arr.slice().reverse().forEach((entry, revIdx)=>{
      const idx = arr.length - 1 - revIdx; // original index
      const div = document.createElement('div'); div.className='card'; div.style.marginBottom='8px';
      const ts = new Date(entry.time).toLocaleString();
      div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${escapeHtml(entry.title||'(tanpa judul)')}</strong><div class="muted">${escapeHtml(ts)}</div></div><div style="text-align:right"><button class="btn small" data-load="${idx}">Muat</button> <button class="btn small" data-print="${idx}">Cetak</button> <button class="btn small btn-delete" data-del="${idx}">Hapus</button></div></div>`;
      $historyList.appendChild(div);
    });

    // attach handlers
    $historyList.querySelectorAll('[data-load]').forEach(b=> b.addEventListener('click', (e)=>{ const i = Number(e.target.dataset.load); loadEntry(i); }));
    $historyList.querySelectorAll('[data-print]').forEach(b=> b.addEventListener('click', (e)=>{ const i = Number(e.target.dataset.print); printEntry(i); }));
    $historyList.querySelectorAll('[data-del]').forEach(b=> b.addEventListener('click', (e)=>{ const i = Number(e.target.dataset.del); deleteEntry(i); }));
  }

  function loadEntry(i){ const arr = loadHistory(); const e = arr[i]; if(!e) return; $title.value = e.title||''; $desc.value = e.desc||''; $notes.value = e.notes||''; state.materials = (e.materials||[]).slice(); saveState(state); renderMaterials(); alert('Simulasi dimuat ke form.'); }

  function deleteEntry(i){ if(!confirm('Hapus simulasi ini?')) return; const arr = loadHistory(); arr.splice(i,1); saveHistory(arr); renderHistory(); }

  function clearHistory(){ if(!confirm('Bersihkan seluruh riwayat simulasi?')) return; saveHistory([]); renderHistory(); }

  function printEntry(i){ const arr = loadHistory(); const e = arr[i]; if(!e) return; // temporarily set form + state then call PDF generator
    const prevState = { title: $title?.value, desc: $desc?.value, notes: $notes?.value, materials: state.materials.slice() };
    $title.value = e.title||''; $desc.value = e.desc||''; $notes.value = e.notes||''; state.materials = (e.materials||[]).slice(); renderMaterials();
    (async ()=>{ try{ const html = buildPrintable(); await generatePdfFromHtml(html, (String(e.title||'simulasi').trim()||'simulasi')); }catch(err){ console.error(err); alert('Gagal membuat PDF: '+ (err && err.message)); } })();
    // restore previous
    $title.value = prevState.title; $desc.value = prevState.desc; $notes.value = prevState.notes; state.materials = prevState.materials; renderMaterials();
  }

  if($btnClearAll) $btnClearAll.addEventListener('click', clearHistory);
  renderMaterials();
  renderHistory();
});
