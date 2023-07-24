// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExtensionContext, TestController } from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {

	const controller = vscode.tests.createTestController('batsTests', 'Bats Tests');
	context.subscriptions.push(controller);

	await discoverTests(controller);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bats-test-explorer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Bats Test Explorer!');
	});

	context.subscriptions.push(disposable);

	return {'items': controller.items};
}

// This method is called when your extension is deactivated
export function deactivate() {}

export async function discoverTests(controller: TestController) {
	const testFiles = await vscode.workspace.findFiles('**/*.bats');
	testFiles.forEach(function (value, index, array) {
		const testItem = controller.createTestItem(index.toString(), value.path);
		controller.items.add(testItem);
	});
}
