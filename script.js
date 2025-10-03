const form = document.getElementById("intakeForm");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

// Backend endpoint
const API_URL = "https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate";
const API_TOKEN = "hart-backend-secret-2025";

// Form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loading.style.display = "block";
  result.textContent = "";

  const formData = new FormData(form);
  const symptoms = formData.getAll("symptoms");
  if (formData.get("symptoms_other")) {
    symptoms.push(formData.get("symptoms_other"));
  }

  const payload = {
    name: formData.get("name"),
    age: parseInt(formData.get("age")),
    gender: formData.get("gender"),
    symptoms: symptoms,
    history: formData.get("history"),
    medications: formData.get("medications")
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Backend error: ${res.status}`);
    }

    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Error: " + err.message;
  } finally {
    loading.style.display = "none";
  }
});

// Voice recording (basic speech-to-text using browser API)
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    document.getElementById("voiceNotes").value = transcript;
  };

  document.getElementById("start-recording").onclick = () => recognition.start();
  document.getElementById("stop-recording").onclick = () => recognition.stop();
} else {
  document.getElementById("voiceNotes").value =
    "Speech recognition not supported in this browser.";
}
