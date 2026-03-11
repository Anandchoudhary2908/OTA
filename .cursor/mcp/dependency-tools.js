#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

const input = JSON.parse(fs.readFileSync(0, "utf8"));
const { tool } = input;

function run(cmd) {
  try {
    const output = execSync(cmd, { stdio: "pipe", encoding: "utf8" });
    console.log(JSON.stringify({ result: output }));
  } catch (err) {
    console.log(
      JSON.stringify({
        error: err.message,
        stdout: err.stdout?.toString(),
        stderr: err.stderr?.toString(),
      }),
    );
  }
}

switch (tool) {
  case "expoDoctor":
    run("npx expo doctor");
    break;

  case "expoUpgrade":
    run("npx expo upgrade");
    break;

  case "checkNodeDeps":
    run("npm ls --depth=0");
    break;

  case "fixDependencies":
    run("rm -rf node_modules package-lock.json && npm install");
    break;

  case "expoInstallFix":
    run("npx expo install --fix");
    break;

  default:
    console.log(JSON.stringify({ error: "Unknown tool requested" }));
}
