// Switch language (basic framework)
function switchLanguage() {
  const lang = document.getElementById("lang").value;
  document.body.setAttribute("data-lang", lang);
  // Later: plug translations dictionary here
}

// Handle form submission
document.getElementById("intakeForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    age: parseInt(formData.get("age")),
    gender: formData.get("gender"),
    symptoms: [...formData.getAll("symptoms"), formData.get("other_symptom")].filter(Boolean),
    history: formData.get("history"),
    medications: formData.get("medications"),
    lifestyle: {
      smoking: formData.get("smoking"),
      alcohol: formData.get("alcohol")
    }
  };

  try {
    const res = await fetch("https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer hart-backend-secret-2025"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    const result = await res.json();

    // Show polished evaluation
    document.getElementById("evaluation-container").style.display = "block";
    document.getElementById("report").innerHTML = `
      <h3>Chief Complaint</h3><p>${result.chief_complaint}</p>
      <h3>History Summary</h3><p>${result.history_summary}</p>
      <h3>Risk Flags</h3><ul>${Object.entries(result.risk_flags).map(([k,v]) => `<li><b>${k}:</b> ${v}</li>`).join("")}</ul>
      <h3>Recommended Follow-ups</h3><ul>${result.recommended_followups.map(f => `<li>${f}</li>`).join("")}</ul>
      <h3>Differential Considerations</h3><ul>${result.differential_considerations.map(f => `<li>${f}</li>`).join("")}</ul>
      <h3>Patient-Friendly Summary</h3><p>${result.patient_friendly_summary}</p>
      <h3 style="color:red;">Emergency Guidance</h3><p><b>${result.emergency_guidance}</b></p>
    `;
  } catch (err) {
    alert(err);
  }
});

// PDF Export
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const reportElement = document.getElementById("report");

  if (!reportElement.innerHTML.trim()) {
    alert("No report available to export.");
    return;
  }

  const canvas = await html2canvas(reportElement, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  // Add header/logo
  const pageWidth = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(107, 15, 26);
  pdf.rect(0, 0, pageWidth, 20, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.text("HART Evaluation Report", pageWidth / 2, 13, { align: "center" });

  // Add report
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);

  pdf.save("HART_Evaluation_Report.pdf");
}
/* ===== HART: Polished Report + PDF (non-destructive patch) ===== */
(function () {
  // --- Add report styles once (does NOT change your form styles)
  function ensureReportStyles() {
    if (document.getElementById("hart-report-styles")) return;
    const css = `
      #evaluation-container { margin-top: 24px; }
      #report {
        margin-top: 16px; padding: 20px; background: #fff;
        border: 2px solid #6b0f1a; border-radius: 10px;
      }
      .report-section { margin-bottom: 18px; }
      .report-section h3 {
        color: #6b0f1a; margin: 0 0 6px 0; padding-bottom: 4px;
        border-bottom: 1px solid #e2e2e2; font-size: 18px;
      }
      .report-section p { margin: 0; line-height: 1.4; }
      .report-list { margin: 8px 0 0 18px; }
      .report-list li { margin: 4px 0; }
      .emergency-box {
        margin-top: 10px; padding: 10px; border-radius: 8px;
        background: #b00020; color: #fff; font-weight: 700;
      }
      .pdf-button {
        margin-top: 12px; padding: 10px 14px; border: none; border-radius: 6px;
        background: #333; color: #fff; cursor: pointer; font-weight: 600;
      }
      .pdf-button:hover { background: #000; }
    `;
    const style = document.createElement("style");
    style.id = "hart-report-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // --- Make sure there’s a mount for the report + add a PDF button if missing
  function ensureReportMount() {
    let wrap = document.getElementById("evaluation-container");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "evaluation-container";
      document.body.appendChild(wrap);
    }
    let report = document.getElementById("report");
    if (!report) {
      report = document.createElement("div");
      report.id = "report";
      wrap.appendChild(report);
    }
    let pdfBtn = document.getElementById("pdfBtn");
    if (!pdfBtn) {
      pdfBtn = document.createElement("button");
      pdfBtn.id = "pdfBtn";
      pdfBtn.className = "pdf-button";
      pdfBtn.type = "button";
      pdfBtn.textContent = "Download PDF";
      pdfBtn.addEventListener("click", downloadPDF);
      wrap.appendChild(pdfBtn);
    }
  }

  // --- Escape HTML (safety)
  function escapeHTML(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // --- Render polished report (call this after you get `result`)
  window.renderReport = function (result) {
    ensureReportStyles();
    ensureReportMount();

    const cc = escapeHTML(result.chief_complaint);
    const hs = escapeHTML(result.history_summary);
    const pf = escapeHTML(result.patient_friendly_summary);
    const eg = escapeHTML(result.emergency_guidance);

    const riskFlags = Object.entries(result.risk_flags || {})
      .map(([k, v]) => `<li><b>${escapeHTML(k)}:</b> ${escapeHTML(v)}</li>`).join("");

    const recs = (result.recommended_followups || [])
      .map(item => `<li>${escapeHTML(item)}</li>`).join("");

    const diffs = (result.differential_considerations || [])
      .map(item => `<li>${escapeHTML(item)}</li>`).join("");

    const html = `
      <div class="report-section">
        <h3>Chief Complaint</h3>
        <p>${cc}</p>
      </div>
      <div class="report-section">
        <h3>History Summary</h3>
        <p>${hs}</p>
      </div>
      <div class="report-section">
        <h3>Risk Flags</h3>
        <ul class="report-list">${riskFlags}</ul>
      </div>
      <div class="report-section">
        <h3>Recommended Follow-ups</h3>
        <ul class="report-list">${recs}</ul>
      </div>
      <div class="report-section">
        <h3>Differential Considerations</h3>
        <ul class="report-list">${diffs}</ul>
      </div>
      <div class="report-section">
        <h3>Patient-Friendly Summary</h3>
        <p>${pf}</p>
      </div>
      <div class="report-section emergency-box">
        🚨 ${eg} 🚨
      </div>
    `;

    document.getElementById("report").innerHTML = html;
    window.HART_lastResult = result; // keep around for PDF if needed
  };

  // --- Dynamic loader for jsPDF + html2canvas (no HTML edits needed)
  async function ensurePdfLibs() {
    const tasks = [];
    if (!window.jspdf) {
      tasks.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"));
    }
    if (!window.html2canvas) {
      tasks.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"));
    }
    await Promise.all(tasks);
  }
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // --- PDF export with burgundy header + optional logo
  window.downloadPDF = async function () {
    await ensurePdfLibs();
    const report = document.getElementById("report");
    if (!report || !report.innerHTML.trim()) {
      alert("No report available to export.");
      return;
    }

    // Render the report node as an image
    const canvas = await window.html2canvas(report, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Header bar
    pdf.setFillColor(107, 15, 26); // burgundy
    pdf.rect(0, 0, pageWidth, 20, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("HART Evaluation Report", pageWidth / 2, 13, { align: "center" });

    // Optional logo if present on page (id="header-logo" or first .logo)
    const logoEl = document.getElementById("header-logo") || document.querySelector(".logo");
    if (logoEl && logoEl.tagName === "IMG") {
      try {
        // draw the logo in header left
        const tmpCanvas = document.createElement("canvas");
        const ctx = tmpCanvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
          const w = 24, h = (img.height * w) / img.width;
          tmpCanvas.width = w * 4; tmpCanvas.height = h * 4; // oversample
          ctx.drawImage(img, 0, 0, tmpCanvas.width, tmpCanvas.height);
          const dataURL = tmpCanvas.toDataURL("image/png");
          pdf.addImage(dataURL, "PNG", 6, 3, 14, 14);
          // add the main content after header
          addBody();
        };
        img.src = logoEl.src;
        return; // wait for logo load, then add body
      } catch {
        // fall through to add body without logo
      }
    }
    addBody();

    function addBody() {
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);
      pdf.save("HART_Evaluation_Report.pdf");
    }
  };

  // --- Helper to integrate without breaking your existing code:
  // After you parse the backend response (result),
  // call:  renderReport(result);
  //
  // Example patch:
  //   const result = await res.json();
  //   renderReport(result);  // <-- add this line
})();
