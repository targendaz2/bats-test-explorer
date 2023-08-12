import { afterEach, beforeEach } from 'mocha';
import { assert } from 'chai';

import * as vscode from 'vscode';
import { Utils } from 'vscode-uri';

import { isPackageInstalled } from './helpers';
import * as batsTestExplorer from '../../src/extension';

suite('Unit Tests', () => {
	const workspaceFolder = (vscode.workspace.workspaceFolders || [])[0];
	const extension = vscode.extensions.getExtension('dgrdev.bats-test-explorer');
	const functionalTestsFile = Utils.joinPath(workspaceFolder.uri, 'test/functional_tests.bats');

	/* eslint-disable @typescript-eslint/naming-convention */
	const expectedTests = {
		"unit_tests": {
			"script_tests": [
				"always_succeeds() always succeeds",
				"always_fails() always fails"
			],
			"standalone_tests": [
				"this test always passes",
				"this test always fails"
			]
		},
		"functional_tests": []
	};
	/* eslint-enable */

	suite('Activation Tests', () => {
		test('Extension activates when opening a workspace with existing Bats tests', async () => {
			// Given a workspace containing Bats test files
			await vscode.workspace.fs.stat(functionalTestsFile);

			// When that workspace is opened

			// The extension should be active
			assert(extension?.isActive);
		});

		test('Extension exposes its context on activation', async () => {
			// Given a workspace containing Bats test files
			await vscode.workspace.fs.stat(functionalTestsFile);

			// When this extension is activated
			const context = await extension?.activate() as vscode.ExtensionContext;

			// The extension should expose its context
			assert.equal(context.extension.id, 'dgrdev.bats-test-explorer');
		});
	});

	suite('Command Tests', () => {
		test('Can install Bats to project with command', async () => {
			// Given a project that doesn't have Bats installed
			assert.isFalse(isPackageInstalled("bats"));

			// When the command to install Bats is run
			await vscode.commands.executeCommand("bats-test-explorer.installBats");

			// Bats should be installed as a dev dependency
			assert.isTrue(isPackageInstalled("bats", ["dev"]));
		});
	});

	suite('Test Discovery Tests', () => {

		let controller: vscode.TestController;

		beforeEach(async () => {
			await vscode.commands.executeCommand("bats-test-explorer.installBats");
			controller = vscode.tests.createTestController('testController', 'Test Controller');
		});

		afterEach(async () => {
			// Cleanup
			controller.dispose();
		});

		test('Can discover Bats test files in a workspace', async () => {
			// Given a workspace containing Bats test files
			await vscode.workspace.fs.stat(functionalTestsFile);

			// When discoverTests() is run
			batsTestExplorer.discoverTests(controller);

			// The test controller should contain the Bats test file names
			['unit_tests', 'functional_tests'].forEach(value => {
				assert.exists(controller.items.get(value));
			});
		});

		test.skip('Discovers new Bats test files in a workspace', async () => {
			// Given a workspace containing Bats test files
			await vscode.workspace.fs.stat(functionalTestsFile);

			// When discoverTests() is run
			batsTestExplorer.discoverTests(controller);

			// The test controller should contain the Bats test file names
			['unit_tests', 'functional_tests'].forEach(value => {
				assert.exists(controller.items.get(value));
			});
		});
	});
});
