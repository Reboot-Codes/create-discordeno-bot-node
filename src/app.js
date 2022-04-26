import { program } from 'commander';
import inquirer from 'inquirer';
// import chalk from 'chalk';

program
  .name('create-discordeno-bot')
  .description('A quick CLI to create a Discordeno Bot.')
  .version('1.0.0')
  .action(() => {
    console.log(`Hey there 👋, thanks for using discordeno.`);
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
      .then((answers) => {
        if (answers['approach'] == 'Object-Oriented') {
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'framework',
                message: 'Which Object-Oriented framework would you like to use?',
                choices: ['Natico', 'Amethyst']
              }
            ])
            .then((answers) => {
              console.log(answers);
            });
        }
      });
  });

program.parse();
