export async function POST(req) {
  const { text, instrument } = await req.json();
  // TODO: call your AI backend here
  return new Response(JSON.stringify({
    ok: true,
    title: text.slice(0, 24) || `New ${instrument} piece`,
    bars: 16
  }), { headers: { "Content-Type": "application/json" } });
}
