import { assert } from 'chai';

import { extensions, workspace } from 'vscode';
import { Utils } from 'vscode-uri';

// import * as batsTestExplorer from '../../src/extension';

suite('Unit Tests', () => {
	const workspaceFolder = (workspace.workspaceFolders || [])[0];
	const extension = extensions.getExtension('dgrdev.bats-test-explorer');
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
			await workspace.fs.stat(functionalTestsFile);

			// When that workspace is opened

			// The extension should be active
			assert(extension?.isActive);
		});
	});

	suite('Public API Tests', () => {
		test('Extension exposes object representing discovered tests', async () => {
			// Given a workspace containing Bats test files
			await workspace.fs.stat(functionalTestsFile);

			// When that workspace is opened

			// The extension should expose a tests object representing the discovered tests
			assert.deepEqual(extension?.exports['tests'], expectedTests);
		});
	});
});
