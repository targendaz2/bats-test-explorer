// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExtensionContext, TestController, Uri, WorkspaceFolder, workspace } from 'vscode';
import * as cp from 'child_process';
import * as util from 'util';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {

	const controller = vscode.tests.createTestController('batsTests', 'Bats Tests');
	context.subscriptions.push(controller);

	await discoverTestFiles(controller);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bats-test-explorer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Bats Test Explorer!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

export async function discoverTestFiles(controller: TestController) {
	const testFiles = await workspace.findFiles('**/*.bats');
	testFiles.forEach(function (value, index, array) {
		const testItem = controller.createTestItem(value.path, value.path);
		controller.items.add(testItem);
	});
}

export async function generateBatsTestListFile(testsPath: Uri): Promise<Uri> {
	const workspaceFolder = (workspace.workspaceFolders as WorkspaceFolder[])[0].uri;

	const exec = util.promisify(cp.exec);
	const result = await exec(`npx bats --recursive --no-tempdir-cleanup -c ${testsPath.path} 2>&1 | awk '/:/ {print $2}'`, { cwd: workspaceFolder.path });
	const testListFile = result.stdout.trim() + '/test_list_file.txt';
	return Uri.file(testListFile);
}

export async function discoverTestsInFile(controller: TestController, testFile: Uri) {
	const workspaceFolder = (workspace.workspaceFolders as WorkspaceFolder[])[0].uri;

	const testListFile = await generateBatsTestListFile(testFile);
	// command.stdout.on('data', function (data) {
	// 	resolve(data.trim() + '/test_list_file.txt');
	// });
	// command.on('close', function (code) {
	// 	resolve(code);
	// });
	// command.on('error', function (err) { reject(err) });
}
