import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { workspace, TestItem, WorkspaceFolder } from 'vscode';
import { Utils } from 'vscode-uri';
import { discoverTestFiles, discoverTestsInFile, generateBatsTestListFile } from '../../extension';
import { Test } from 'mocha';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const workspaceFolder = (workspace.workspaceFolders as WorkspaceFolder[])[0].uri;
	const testFile1 = Utils.joinPath(workspaceFolder, 'test/file1.bats');
	const testFile2 = Utils.joinPath(workspaceFolder, 'test/file2.bats');

	test('Discovers Bats test files', async () => {
		const controller = vscode.tests.createTestController('discoverTestFiles', 'discoverTestFiles');

		// Given a workspace with 2 bats test files
		await Promise.all([
			workspace.fs.stat(testFile1),
			workspace.fs.stat(testFile2)
		]);

		// When discoverTestFiles() is called
		await discoverTestFiles(controller);

		// Both files are loaded into the test controller
		controller.items.get(testFile1.path) as TestItem;
		controller.items.get(testFile2.path) as TestItem;
	});

	test('Generates and finds Bats test list file', async () => {
		// Given a workspace with a bats test file containing tests
		await workspace.fs.stat(testFile1);
		const testFileContents = (await workspace.fs.readFile(testFile1)).toString();
		const testCount = (testFileContents.match(/@test/g) || []).length;
		assert(testCount >= 1);

		// When getBatsTestListFile() is called
		const batsTestListFile = await generateBatsTestListFile(testFile1);

		// A Bats test list file is generated and populated
		const textDocument = await workspace.openTextDocument(batsTestListFile);
		assert(textDocument.lineCount > 1);
	});

	test.skip('Discovers tests in a Bats test file', async () => {
		const controller = vscode.tests.createTestController('discoverTestsInFile', 'discoverTestsInFile');

		// Given a bats test file containing 3 tests
		const expectedTests = ['test 1', 'test 2', 'test 3'];
		const fileContents = (await workspace.fs.readFile(testFile1)).toString();
		expectedTests.forEach(function (value, index, array) {
			assert(fileContents.match(value));
		});

		// When discoverTestFiles() is called
		await discoverTestsInFile(controller, testFile1);

		// All 3 tests are loaded into the test controller
		const testFile = controller.items.get(testFile1.path) as TestItem;
		expectedTests.forEach(function (value, index, array) {
			assert(testFile.children.get(value));
		});
	});
});
