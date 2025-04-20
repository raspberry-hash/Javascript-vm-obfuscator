const { transpile } = require("js-virtualizer");
const fs = require("fs");

async function main() {
  // Read the contents of the input.js file
  const code = fs.readFileSync('input.js', 'utf8');

  const result = await transpile(code, {
    // the filename of the code; will be used as the default output filename
    fileName: 'example.js',
    // whether or not the transpiler should directly write the output to a file
    writeOutput: true,
    // the path to write the vm for the transpiled code to
    vmOutputPath: "./vm_output.js",
    // the path to write the transpiled code to
    transpiledOutputPath: "./output.js",
    // the passes apply to the result before returning
    passes: [
      "RemoveUnused", // whether or not to remove unused opcodes from the instruction set
      "ObfuscateVM", // whether or not to obfuscate the VM code through js-confuser
      "ObfuscateTranspiled" // whether or not to obfuscate the transpiled code through js-confuser
    ]
  });

  console.log(`Virtualized code saved to: ${result.transpiledOutputPath}`);
}

main();
