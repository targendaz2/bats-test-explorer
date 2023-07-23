import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Discovers Bats test files', async () => {
		// Given a workspace with 2 bats test files
		let testFiles = await vscode.workspace.findFiles('**/*.bats');
		assert.equal(testFiles.length, 2);

		// When the extension is activated
		const extension = <vscode.Extension<any>>(
			vscode.extensions.getExtension("dgrdev.bats-test-explorer")
		);
		await extension.activate();

		// Both files are loaded into the test controller
		const file1 = extension.exports['items'].get('0');
		const file2 = extension.exports['items'].get('1');
		assert.equal(testFiles[0].path, file1.label);
		assert.equal(testFiles[1].path, file2.label);
	});
});
