/**
 * Next.js API Route – Bridge to Python places-by-state service.
 * GET /api/places-by-state?state=West+Bengal
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");

    if (!state) {
      return Response.json(
        { error: "Missing 'state' query parameter" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://localhost:8000/places-by-state?state=${encodeURIComponent(state)}`,
      { method: "GET" }
    );

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
