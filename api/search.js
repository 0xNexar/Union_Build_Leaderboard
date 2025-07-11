export default async function handler(req, res) {
  const API_KEY = process.env.UNION_API_KEY;
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const url = `https://api.dashboard.union.build/rest/v1/user_levels?select=*&display_name=ilike.*${encodeURIComponent(name)}*&order=total_xp.desc,user_id.asc`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: API_KEY,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ error: 'Search failed' });
  }
}
