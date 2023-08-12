import * as vscode from 'vscode';

import * as cp from 'child_process';

import * as utilities from './utilities';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('bats-test-explorer.installBats', installBats);
	context.subscriptions.push(disposable);

	// const controller = tests.createTestController('batsTests', 'Bats Tests');
	// context.subscriptions.push(controller);

	/* eslint-disable @typescript-eslint/naming-convention */
	return context;
	/* eslint-enable */
}

// This method is called when your extension is deactivated
export function deactivate() { }

function installBats() {
	cp.spawnSync('npm install --save-dev bats', {
		'cwd': utilities.getWorkspaceFolderPath(),
		'shell': true
	});
	vscode.window.showInformationMessage('Bats has been installed');
}

export function discoverTests(controller: vscode.TestController) {
	['unit_tests', 'functional_tests'].forEach(value => {
		let testItem = controller.createTestItem(value, value);
		controller.items.add(testItem);
	});
}
