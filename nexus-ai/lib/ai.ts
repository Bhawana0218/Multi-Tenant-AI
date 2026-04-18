export async function callAI(prompt: string, context: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // safe model
      messages: [
        { role: "system", content: context },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await res.json();

  console.log("AI RAW RESPONSE:", data);

  //  SAFE HANDLING
  if (!data.choices || !data.choices.length) {
    throw new Error(
      data?.error?.message || "AI response format invalid"
    );
  }

  return data.choices[0].message.content;
}