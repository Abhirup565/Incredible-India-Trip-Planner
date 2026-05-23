/**
 * Next.js API Route – Bridge to Python recommender service.
 * POST /api/recommend
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return Response.json(
        { error: "Python API error", details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: "Failed to connect to recommendation service", details: err.message },
      { status: 503 }
    );
  }
}
