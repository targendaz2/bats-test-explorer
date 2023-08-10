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

	suite('Public API Tests', () => {
		test('Extension exposes object representing discovered tests', async () => {
			// Given a workspace containing Bats test files
			await vscode.workspace.fs.stat(functionalTestsFile);

			// When that workspace is opened

			// The extension should expose a tests object representing the discovered tests
			assert.deepEqual(extension?.exports['tests'], expectedTests);
		});
	});

	suite('Test Discovery Tests', () => {
		test.skip('Can discover Bats test files in a workspace', async () => {
			// Given a workspace containing Bats test files...
			await vscode.workspace.fs.stat(functionalTestsFile);

			// ...and a test controller
			const controller = vscode.tests.createTestController('testController1', 'Test Controller 1');

			// When discoverTests() is run
			batsTestExplorer.discoverTests(controller);

			// The test controller should contain the Bats test file names
			['unit_tests', 'functional_tests'].forEach(function (value, index, array) {
				assert.exists(controller.items.get(value));
			});
		});
	});
});
