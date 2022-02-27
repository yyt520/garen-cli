#! /usr/bin/env node
// commander文档 https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md#commanderjs
const commander = require('commander');
// 绘制命令行logo
const figlet = require('figlet')
// 美化命令(加颜色)
const chalk = require('chalk')

commander
  // 自定义create命令和参数
  .command('create <app-name>')
  // create命令的描述
  .description('创建项目 如果目录存在则覆盖')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', '如果目录存在则覆盖')
  .action((name, option) => {
    // 处理create
    require('../lib/create')(name, option)
  })

commander
  // 从package.json获取版本信息
  .version(`v${require('../../package.json').version}`)

commander
  .on('--help', () => {
    // 在命令行中使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('garen cli', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 100,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`gr <command> --help`)} show details\r\n`)
  })

commander.parse(process.argv);
