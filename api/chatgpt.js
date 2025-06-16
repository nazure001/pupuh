export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o", // 🔁 Ganti ke model terbaru
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah ahli karawitan Sunda. Jawablah hanya dalam format JSON tanpa penjelasan tambahan.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
      }),
    });

    const data = await openaiRes.json();
    const message = data?.choices?.[0]?.message?.content?.trim();

    if (!message) {
      throw new Error("Respons kosong dari OpenAI.");
    }

    // Coba parse isi respon sebagai JSON
    try {
      const parsed = JSON.parse(message);
      return res.status(200).json(parsed);
    } catch (e) {
      // Kalau tidak bisa di-parse, kirim mentah agar frontend bisa tampilkan raw text
      return res.status(200).json({ raw: message });
    }
  } catch (err) {
    console.error("❌ ChatGPT API error:", err);
    res.status(500).json({ error: "Gagal memanggil ChatGPT", detail: err.message });
  }
}
