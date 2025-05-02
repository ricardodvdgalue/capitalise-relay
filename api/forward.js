export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const capitaliseUrl = 'https://tvwebhook.capitalise.ai/';

  try {
    const capitaliseRes = await fetch(capitaliseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Capitalise-Webhook-Relay/1.0'
      },
      body: JSON.stringify(req.body),
      timeout: 5000 // optional: add timeout safety
    });

    const text = await capitaliseRes.text();
    return res.status(200).send('✅ Forwarded to Capitalise: ' + text);
  } catch (error) {
    console.error("❌ Forwarding error:", error.message);
    return res.status(500).send('❌ Error forwarding: ' + error.message);
  }
}
