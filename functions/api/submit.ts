interface Ctx {
  request: Request;
}

export async function onRequestPost(context: Ctx) {
  try {
    const input = await context.request.formData();
    const pretty = JSON.stringify([...input], null, 2);
    return new Response(pretty, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  } catch (err) {
    return new Response("Error parsing JSON content", { status: 400 });
  }
}
