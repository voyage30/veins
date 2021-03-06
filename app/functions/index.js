const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const logic = require('./cli-logic');
const program = require('./program');

const run = async () => {

  // console.log(
  //   chalk.red(
  //     figlet.textSync('Veins', {horizontalLayout: 'full'})
  //   )
  // )
  const action = await logic.questions.action();
  switch (action.value) {
    case 'List':
      logic.actions.list();
      break;
    case 'Add':
      const addSelect = await logic.questions.pickDatabase();
      console.log(addSelect);
      logic.init.createFiles(addSelect.value, true);
      break;
    case 'Remove':
      const removeDB = await logic.questions.pickDatabase();
      const deleteConfirm = await logic.init.confirm();
      deleteConfirm && logic.init.createFiles(removeDB.value, false);
      console.log("Deleting");
      break;
    case 'Full':
      console.log("Installing all databases. Please Wait...");
      logic.init.createFiles(null, true);
      break;
    case 'Reset':
      const resetConfirm = await logic.init.confirm();
      resetConfirm && logic.init.createFiles(null, false);
      break;
    case 'Destroy':
      const destroyConfirm = await logic.init.confirm();
      if(destroyConfirm){
        logic.actions.destroy();
      } 
      break;
    case 'Exit':
      console.log("Exiting" + chalk.red('!!'));
      break;
    default:
      console.log("default");
      break;
  }
}

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[larfsd]/.test(process.argv.slice(2))) {
  //program.outputHelp();
  console.log("No parameters.. Running CLI....")
  setTimeout(() => {
    clear();
    run();
  }, 600);
}

program.parse(process.argv)