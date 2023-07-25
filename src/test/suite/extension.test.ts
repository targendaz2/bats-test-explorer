import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { workspace, WorkspaceFolder } from 'vscode';
import { Utils } from 'vscode-uri';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('discoverTestFiles() discovers Bats test files', async () => {

		// Given a workspace with 2 bats test files
		const workspaceFolder = (workspace.workspaceFolders as WorkspaceFolder[])[0].uri;
		const testFile1 = Utils.joinPath(workspaceFolder, 'test/file1.bats');
		const testFile2 = Utils.joinPath(workspaceFolder, 'test/file2.bats');

		await Promise.all([
			workspace.fs.stat(testFile1),
			workspace.fs.stat(testFile2)
		]);

		// When the extension is activated
		const extension = <vscode.Extension<any>>(
			vscode.extensions.getExtension("dgrdev.bats-test-explorer")
		);
		await extension.activate();

		// Both files are loaded into the test controller
		const testItem1 = extension.exports['items'].get(testFile1.path);
		const testItem2 = extension.exports['items'].get(testFile2.path);
		assert.equal(testFile1.path, testItem1.label);
		assert.equal(testFile2.path, testItem2.label);
	});

	test.skip('Discovers Bats tests in a single test file', async () => {
		// Given a workspace with a bat test file...
		const foundFiles = await vscode.workspace.findFiles('**/file1.bats', null, 1);
		const testFile = foundFiles[0];

		// ...containing 3 tests
		const textDocument = (await vscode.workspace.openTextDocument(testFile)).getText();
		const actualMatches = textDocument.matchAll(new RegExp('@test "([A-z0-9 ]+)"', 'g'));
		const expectedMatches = ['test 1', 'test 2', 'test 3'];

		let count = 0;
		for (const actualMatch of actualMatches) {
			assert.ok(expectedMatches.includes(actualMatch[1]));
			count++;
		}
		assert.equal(count, 3);

		// When the extension is activated
		// const extension = <vscode.Extension<any>>(
		// 	vscode.extensions.getExtension("dgrdev.bats-test-explorer")
		// );
		// await extension.activate();

		// // Both files are loaded into the test controller
		// const file1 = extension.exports['items'].get('0');
		// const file2 = extension.exports['items'].get('1');
		// assert.equal(testFiles[0].path, file1.label);
		// assert.equal(testFiles[1].path, file2.label);
	});
});
