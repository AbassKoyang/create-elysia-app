// src/index.ts
import { Command } from "commander";
import chalk from "chalk";
import * as fs from "fs-extra";
import ora from "ora";
import prompts from "prompts";
import path from "path";
import { execa } from "execa";
var program = new Command();
program.action(async () => {
  const response = await prompts({
    type: "text",
    name: "projectName",
    message: "What's your project name?"
  });
  const spinner = ora("Creating project...").start();
  const name = response.projectName;
  const templatePath = path.join(__dirname, "../templates/default");
  const targetPath = path.join(process.cwd(), name);
  try {
    await fs.ensureDir(name);
    await fs.copy(templatePath, targetPath);
    await fs.rename(
      path.join(targetPath, "gitignore"),
      path.join(targetPath, ".gitignore")
    );
    spinner.succeed("Project created!");
  } catch (err) {
    spinner.fail("Something went wrong.");
    console.log(chalk.red(String(err)));
  }
  ;
  const dependencySpinner = ora("Installing dependencies...").start();
  try {
    await execa("bun", ["install"], { cwd: targetPath, stdio: "inherit" });
    dependencySpinner.succeed("Dependencies installed!");
    console.log(chalk.green(`Done!`));
    console.log(chalk.green(`cd ${name}`));
  } catch (error) {
    dependencySpinner.fail("Failed to install dependencies");
  }
});
program.parse();
