async function submitIntakeForm(formData) {
  const loadingEl = document.getElementById("loading");
  const summaryEl = document.getElementById("ai-summary");

  try {
    // Show loading message
    loadingEl.style.display = "flex";
    summaryEl.textContent = "";

    const response = await fetch("/.netlify/functions/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reportId: "HART-" + Date.now(),
        language: "en",
        answers: formData
      })
    });

    if (!response.ok) {
      throw new Error("Backend error: " + response.statusText);
    }

    const result = await response.json();
    const evalData = result.evaluation;

    // Hide loading message
    loadingEl.style.display = "none";

    summaryEl.innerHTML = `
      <strong>Chief Complaint:</strong> ${evalData.chief_complaint}<br>
      <strong>Summary:</strong> ${evalData.history_summary}<br>
      <strong>Risk Flags:</strong> ${JSON.stringify(evalData.risk_flags)}<br>
      <strong>Recommendations:</strong> ${evalData.recommended_followups}<br>
      <strong>Patient Summary:</strong> ${evalData.patient_friendly_summary}<br>
      <strong>Emergency:</strong> ${evalData.emergency_guidance}
    `;
  } catch (err) {
    // Hide loading if error
    loadingEl.style.display = "none";
    summaryEl.textContent = "Error: " + err.message;
  }
}

document.getElementById("intakeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = {};
  const inputs = document.querySelectorAll("#intakeForm input, #intakeForm textarea, #intakeForm select");
  inputs.forEach(input => {
    formData[input.name] = input.type === "checkbox" ? input.checked : input.value;
  });

  submitIntakeForm(formData);
});
