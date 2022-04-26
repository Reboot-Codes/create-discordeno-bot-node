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
    console.log(`Hey there 👋, thanks for using ${chalk.underline('discordeno')}.\n`);
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
          `\nOkay, we're going to create a ${chalk.underline(answers['botType'])}.\n${
            framework == 'none' ? `Without a framework` : `With the ${chalk.underline(framework)} framework.`
          }`
        );

        await exec('deno --version', (error, stdout, stderr) => {
          if (error) {
            console.error('Aww shnap! There was a problem:');
            console.error(error);
            exit(1);
          }
          if (stderr) {
            console.error('Aww shnap! There was a problem:');
            console.error(stderr);
            exit(1);
          }
          console.log(`\nIt looks like you have ${chalk.underline(stdout.split('\n')[0])}!`);
        });
      });
  });

program.parse();
