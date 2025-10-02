export async function handler(event, context) {
  try {
    const res = await fetch("https://hart-eval-backend-48887cb98881.herokuapp.com/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_TOKEN}`
      },
      body: event.body
    });

    const data = await res.json();

    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: "Proxy error: " + err.message };
  }
}
