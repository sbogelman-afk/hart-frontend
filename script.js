const API_URL = "https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate";
const AUTH_TOKEN = "hart-backend-secret-2025";

document.getElementById("intakeForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  document.getElementById("loading").style.display = "block";

  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    age: Number(formData.get("age")),
    gender: formData.get("gender"),
    phone: formData.get("phone") || null,
    email: formData.get("email") || null,
    emergency: formData.getAll("emergency"),
    symptoms: formData.getAll("symptoms"),
    otherComplaints: formData.get("otherComplaints") || "",
    history: formData.getAll("history"),
    medications: formData.get("medications") || "",
    allergies: formData.get("allergies") || "",
    smoking: formData.get("smoking") || "",
    alcohol: formData.get("alcohol") || "",
    exercise: formData.get("exercise") || "",
    notes: formData.get("notes") || ""
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const result = await response.json();
    document.getElementById("result").textContent = JSON.stringify(result, null, 2);
    document.getElementById("loading").style.display = "none";
    document.getElementById("exportPdf").style.display = "inline-block";
  } catch (error) {
    document.getElementById("result").textContent = "Error: " + error.message;
    document.getElementById("loading").style.display = "none";
  }
});

// PDF export
document.getElementById("exportPdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("HART Intake Evaluation", 10, 10);
  doc.text(document.getElementById("result").textContent, 10, 20);
  doc.save("HART_Evaluation.pdf");
});

// Speech recognition
function startDictation(fieldName) {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition not supported in this browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.querySelector(`[name=${fieldName}]`).value += " " + transcript;
  };
}
