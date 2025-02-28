import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_KEY
});

export async function handleDroneInstructions(instruction) {
  return await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Jesteś asystentem odpowiedzialnym za nawigację drona na podstawie tekstowych instrukcji użytkownika. Twoim zadaniem jest:\n1. Interpretacja instrukcji użytkownika w celu określenia jednoznacznych ruchów drona: 'prawo', 'lewo', 'góra', 'dół'.\n2. Śledzenie ruchu drona na szachownicy 4x4, gdzie:\n   - Startowa pozycja to '1A' (górny lewy róg).\n   - Ruch w prawo (+1 kolumna), lewo (-1 kolumna), w dół (+1 wiersz), w górę (-1 wiersz).\n   - Pozycje na mapie są opisane w tabeli, np. '3C' to 'Skały'.\n3. Jeśli dron wychodzi poza mapę, ignorujesz ten ruch i kończysz na ostatnim możliwym polu.\n4. Zwrotna odpowiedź powinna zawierać tylko pole `description`, np.:\n   ```json\n   {\n     \"description\": \"Skały\"\n   }\n######################################\n\n## **2. Struktura mapy (Szachownica)**  \nDodajemy w sekcji użytkownika lub w promptach:\n\nMapa terenu: 1A - Znacznik lokalizacji 1B - Trawa 1C - Drzewo 1D - Dom 2A - Trawa 2B - Wiatrak 2C - Trawa 2D - Dwa drzewa 3A - Trawa 3B - Trawa 3C - Skały 3D - Dwa drzewa 4A - Góry 4B - Góry 4C - Samochód 4D - Jaskinia\n######################################\n"
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": instruction
          }
        ]
      }
    ],
    response_format: {
      "type": "json_object"
    },
    temperature: 0.2,
    max_completion_tokens: 118,
    top_p: 0.89,
    frequency_penalty: 0,
    presence_penalty: 0
  });
}