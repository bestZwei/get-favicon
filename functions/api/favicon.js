// Define Google Favicon API base URL
const GOOGLE_FAVICON_API = "https://www.google.com/s2/favicons";

export async function onRequest(context) {
  try {
    // Parse request parameters
    const { request } = context;
    const url = new URL(request.url);
    const domain = url.searchParams.get("domain");
    const size = url.searchParams.get("sz"); // Get size parameter (optional)

    if (!domain) {
      return new Response("Missing 'domain' parameter", { status: 400 });
    }

    // Construct complete Google Favicon API URL
    const googleFaviconUrl = new URL(GOOGLE_FAVICON_API);
    googleFaviconUrl.searchParams.set("domain", domain);

    // Add size parameter if provided
    if (size) {
      googleFaviconUrl.searchParams.set("sz", size);
    }

    // Request from Google Favicon API
    const response = await fetch(googleFaviconUrl.toString());

    // Check if response is successful
    if (!response.ok) {
      return new Response("Failed to fetch favicon", { status: 500 });
    }

    // Get favicon data
    const faviconData = await response.arrayBuffer();
    const contentType = response.headers.get("Content-Type") || "image/x-icon";

    // Return favicon data to client
    return new Response(faviconData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for one day
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
