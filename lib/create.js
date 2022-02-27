// lib/create.js
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora')
const child = require('child_process');
// const download = require('download-git-repo');

module.exports = async function (name, options) {
  // 获取当前命令行所在目录
  const cwd = process.cwd();
  // 项目目录为 当前目录+项目名
  const project = path.join(cwd, name);

  // 判断目录是否存在
  if (fs.existsSync(project)) {
    if (options.force) {
      await fs.remove(project)
    } else {
      // 询问用户是否确定要覆盖
      let action = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '目录已存在 请选择:',
          choices: [
            {
              name: ' overwrite',
              value: 'overwrite',
            }, {
              name: 'cancel',
              value: 'cancel'
            }
          ]
        }
      ]);

      if (!action) {
        return;
      } else if (action.action === 'overwrite') {
        await fs.remove(project);
        console.log(chalk.red('remove success'));
      }
    }
  }

  inquirer.prompt({
    name: 'temp',
    type: 'list',
    choices: ['react', 'vue', 'black-blog'],
    message: '请选择模板'
  }).then(({ temp }) => {
    if (temp === 'black-blog') {
      const loadingOra = ora('wating fetch template');
      loadingOra.start();
      // download 下载不成功
      // download('github:yyt520/egg-mailer', project, function (err) {
      //   console.log(err ? 'Error' : 'Success');
      //   console.log(err);
      // });
      child.exec(`git clone https://gitee.com/yutaoj/black-blog.git`, (err) => {
        if (!err) {
          loadingOra.succeed('succeed!!!')
        }
      });
    }
  });
}
