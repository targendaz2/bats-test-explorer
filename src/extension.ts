// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bats-test-explorer" is now active!');

	/* eslint-disable @typescript-eslint/naming-convention */
	return {
		'tests': {
			'unit_tests': {
				'script_tests': [
					'always_succeeds() always succeeds',
					'always_fails() always fails'
				],
				'standalone_tests': [
					'this test always passes',
					'this test always fails'
				]
			},
			'functional_tests': []
		}
	};
	/* eslint-enable */
}

// This method is called when your extension is deactivated
export function deactivate() { }
