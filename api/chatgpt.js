export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal memanggil ChatGPT", detail: err.message });
  }
}
