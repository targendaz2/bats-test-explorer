import { assert } from 'chai';

import { Uri, extensions } from 'vscode';

import { openWorkspaceFolder } from './helpers';
import * as batsTestExplorer from '../../src/extension';

suite('Functional Tests', () => {
	test('Can see discovered tests after opening a project containing Bats tests', async () => {
		// Setup
		const workspaceFolder = Uri.file(__dirname + '../../../fixtures/existing-tests-workspace/');

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

		// I open an existing project that already contains Bats tests in VS Code.
		await openWorkspaceFolder(workspaceFolder);

		// I go to the Testing tab and see the Bats tests, structured to match their directory structure.
		const extension = extensions.getExtension('dgrdev.bats-test-explorer');
		assert.deepEqual(extension?.exports['tests'], expectedTests);

		// Satisfied, I go back to the Explorer tab and continue working on my project.
	});
});
