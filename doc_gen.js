import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function callAi() {
    const content = fs.readFileSync("output.txt", "utf8");

    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content:
                    "Você é um assistente para a geração de documentações para projetos javascript, dado uma entrada de texto contendo todos os códigos do projeto organizados por arquivo e diretório você deve responder com um texto em formato de markdown fazendo a documentação de toda a aplicação, com as principais rotas de api e as funções de cada arquivo, quais parametros recebem e o que fazem. Faça a documentação mais completa possível, com exemplos de uso e descrições detalhadas.",
            },
            { role: "user", content: content },
        ],
        stream: true,
        temperature: 1,
        max_tokens: 16384,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const outputFile = fs.createWriteStream("output.md");

    for await (const chunk of stream) {
        const response = chunk.choices[0]?.delta?.content || "";
        // process.stdout.write(response);
        outputFile.write(response);
    }
    console.log("Processo concluído.");
    outputFile.end();
}

