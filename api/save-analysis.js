import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Hanya menerima POST' });
  }

  const { pupuh, lyrics, ruleAnalysis, performanceTip } = req.body;

  if (!pupuh || !lyrics || !ruleAnalysis || !performanceTip) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  try {
    const { data, error } = await supabase
      .from('analyses')
      .insert([{ pupuh, lyrics, ruleAnalysis, performanceTip }]);

    if (error) throw error;

    return res.status(200).json({ success: true, id: data[0].id });
  } catch (err) {
    console.error('Gagal menyimpan:', err);
    return res.status(500).json({ error: 'Gagal menyimpan data' });
  }
}
