export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  try {
    const response = await fetch("https://tvwebhook.capitalise.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.status(200).send("✅ Forwarded to Capitalise: " + text);
  } catch (err) {
    res.status(500).send("❌ Error forwarding: " + err.message);
  }
}
