#!/usr/bin/env node
import callAi from './doc_gen.js';
import readFilesInDirectory from './read_files.js';
import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';


async function main() {
    const currentDir = process.cwd(); // Diretório atual

    const readFilesSpinner = ora({
        text: `Lendo arquivos no diretório: ${currentDir}`,
        spinner: 'dots'
    }).start();

    try {
        await readFilesInDirectory(currentDir);
        readFilesSpinner.succeed(chalk.green('Processo de leitura de arquivos concluído.'));
    } catch (error) {
        readFilesSpinner.fail(chalk.red(`Erro ao ler arquivos: ${error.message}`));
        return;
    }

    const callAiSpinner = ora({
        text: 'Gerando sua documentação.',
        spinner: 'dots'
    }).start();
    try {
        await callAi();
        callAiSpinner.succeed(chalk.green('Documentação gerada com sucesso. Acesse no arquivo output.md')); 
    } catch (error) {
        callAiSpinner.fail(chalk.red(`Erro ao enviar para o OpenAI: ${error.message}`));
        return;
    }

    const filePath = './output.txt';

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(chalk.red(`Erro ao apagar o arquivo ${filePath}: ${err}`));
        }
    });
}

// Executa o programa
main();
