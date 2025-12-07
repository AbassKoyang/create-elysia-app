"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");
var import_chalk = __toESM(require("chalk"), 1);
var fs = __toESM(require("fs-extra"), 1);
var import_ora = __toESM(require("ora"), 1);
var import_prompts = __toESM(require("prompts"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_execa = require("execa");
var program = new import_commander.Command();
program.action(async () => {
  const response = await (0, import_prompts.default)({
    type: "text",
    name: "projectName",
    message: "What's your project name?"
  });
  const spinner = (0, import_ora.default)("Creating project...").start();
  const name = response.projectName;
  const templatePath = import_node_path.default.join(__dirname, "../templates/default");
  const targetPath = import_node_path.default.join(process.cwd(), name);
  try {
    await fs.ensureDir(name);
    await fs.copy(templatePath, targetPath);
    await fs.rename(
      import_node_path.default.join(targetPath, "gitignore"),
      import_node_path.default.join(targetPath, ".gitignore")
    );
    spinner.succeed("Project created!");
  } catch (err) {
    spinner.fail("Something went wrong.");
    console.log(import_chalk.default.red(String(err)));
  }
  ;
  const dependencySpinner = (0, import_ora.default)("Installing dependencies...").start();
  try {
    await (0, import_execa.execa)("bun", ["install"], { cwd: targetPath, stdio: "inherit" });
    dependencySpinner.succeed("Dependencies installed!");
    console.log(import_chalk.default.green(`Done!`));
    console.log(import_chalk.default.green(`cd ${name}`));
  } catch (error) {
    dependencySpinner.fail("Failed to install dependencies");
  }
});
program.parse();
