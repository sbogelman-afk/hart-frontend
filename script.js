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
