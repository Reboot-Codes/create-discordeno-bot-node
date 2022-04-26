import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { exec } from 'child_process';
import { exit } from 'process';

program
  .name('create-discordeno-bot')
  .description('A quick CLI to create a Discordeno Bot.')
  .version('1.0.0')
  .action(() => {
    console.log(`${chalk.blue(`>`)} Hey there 👋, thanks for using ${chalk.cyan('discordeno')}.\n`);
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'botType',
          message: 'What type of bot do you want to create?',
          choices: ['Gateway Bot', 'HTTP Bot']
        },
        {
          type: 'list',
          name: 'approach',
          message: 'Do you prefer a functional or Object-Oriented approach?',
          choices: ['Functional', 'Object-Oriented']
        }
      ])
      .then(async (answers) => {
        let framework = 'none';
        if (answers['approach'] == 'Object-Oriented') {
          await inquirer
            .prompt([
              {
                type: 'list',
                name: 'framework',
                message: 'Which Object-Oriented framework would you like to use?',
                choices: ['Natico', 'Amethyst']
              }
            ])
            .then((answers) => {
              if (answers['framework'] == 'Natico') {
                framework = 'Natico';
              }
              if (answers['framework'] == 'Amethyst') {
                framework = 'Amethyst';
              }
            });
        }

        console.log(
          `\n${chalk.blue(`>`)} Okay, we're going to create a ${chalk.cyan(answers['botType'])}.\n${
            framework == 'none'
              ? `${chalk.blue(`>`)} Without a framework.`
              : `${chalk.blue(`>`)} With the ${chalk.cyan(framework)} framework.`
          }`
        );

        await exec('deno --version', (error, stdout, stderr) => {
          if (error) {
            console.error(`${chalk.red(`!`)} Aww shnap! There was a problem:`);
            console.error(error);
            exit(1);
          }
          if (stderr) {
            console.error(`${chalk.red(`!`)} Aww shnap! There was a problem:`);
            console.error(stderr);
            exit(1);
          }
          console.log(
            `\n${chalk.blue(`>`)} It looks like you have ${chalk.cyan(
              stdout.split('\n')[0].split(' ').slice(0, 2).join(' ')
            )}!`
          );
        });
      });
  });

program.parse();
