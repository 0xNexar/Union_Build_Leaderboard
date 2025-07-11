export default async function handler(req, res) {
  const API_KEY = process.env.UNION_API_KEY;
  const page = parseInt(req.query.page || 0);
  const limit = 100;
  const offset = page * limit;

  const url = `https://api.dashboard.union.build/rest/v1/user_levels?select=*&order=total_xp.desc,user_id.asc&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: API_KEY,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch leaderboard failed:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
}
