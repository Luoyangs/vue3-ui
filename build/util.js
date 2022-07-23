const { execSync } = require("child_process");

const execSyncHandler = (command) => {
  console.log("\n\x1b[32m$ " + command + "\x1b[0m");
  try {
    return execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`${command} error: `, e);
  }
};

function updateMdByPath(event, path) {
  if (event === 'change' && /\/components\/([a-z]+[a-z-]*)\/README.md$/.test(path)) {
    const [_, componentName] = path.match(
      /\/components\/([a-z]+[a-z-]*)\/README.md$/
    );
    return updateMdByComponentName(componentName);
  }
  if (/\/([a-z]+[a-z-]*)\/demo\/([a-z]+[a-z-]*).[vue|.md]/.test(path)) {
    const [_, componentName] = path.match(
      /\/([a-z]+[a-z-]*)\/demo\/([a-z]+[a-z-]*).[vue|.md]/
    );
    return updateMdByComponentName(componentName);
  }

  return Promise.resolve();
}

function lowerHyphenate(s) {
  return s.replace(/([A-Z])/g, '-$1').replace(/(\/|^)-/, '$1').toLowerCase();
};

module.exports = {
  updateMdByPath,
  execSyncHandler,
  lowerHyphenate,
};
