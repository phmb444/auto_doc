
import fs from 'fs';
import path from 'path';

export default async function readFilesInDirectory(dir, fileContents = []) {
    const files = fs.readdirSync(dir); // Lê o conteúdo do diretório

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // Verifica se é uma pasta a ser ignorada
            if (file === 'node_modules' || file === '.next') {
                return; // Pula para a próxima iteração do loop
            }

            // Se for um diretório, chama recursivamente
            readFilesInDirectory(filePath, fileContents);
        } else if (stats.isFile() && file !== 'output.txt') {
            // Verifica se é um arquivo de texto
            const isTextFile = ['.txt', '.md', '.csv','.js', '.jsx', '.tsx', '.ts', '.prisma'].includes(path.extname(file).toLowerCase());

            if (!isTextFile) {
                return; // Pula para a próxima iteração do loop
            }

            // Se for um arquivo de texto, lê o conteúdo e guarda no array com caminho relativo
            const relativePath = path.relative(process.cwd(), filePath);
            const content = fs.readFileSync(filePath, 'utf-8');
            
            const output = `Path: ${relativePath}\n\n${content}\n\nx------------------x-------------------x\n\n`;
            fs.appendFileSync('output.txt', output, 'utf-8');
        }
    });

    return fileContents;
}