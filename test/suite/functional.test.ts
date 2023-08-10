import { assert } from 'chai';
import { afterEach } from 'mocha';

import { extensions, workspace } from 'vscode';
import { Utils } from 'vscode-uri';

// import * as batsTestExplorer from '../../src/extension';

suite('Functional Tests', () => {
	const textEncoder = new TextEncoder();
	const workspaceFolder = (workspace.workspaceFolders || [])[0];
	const newTestFile = Utils.joinPath(workspaceFolder.uri, 'test/unit_tests/new_tests.bats');

	afterEach( () => {
		workspace.fs.delete(newTestFile);
	});

	test.skip('Can see and update discovered Bats tests', async () => {
		// Setup
		/* eslint-disable @typescript-eslint/naming-convention */
		const expectedInitialTests = {
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

		const expectedUpdatedTests = {
			...expectedInitialTests,
			"unit_tests": {
				"new_tests": [
					"1 equals 1",
					"1 equals 0"
				]
			}
		};
		/* eslint-enable */

		// I open an existing project that already contains Bats tests in VS Code.

		// I go to the Testing tab and see the Bats tests, structured to match their directory structure.
		const extension = extensions.getExtension('dgrdev.bats-test-explorer');
		assert.deepEqual(extension?.exports['tests'], expectedInitialTests);

		// I have new tests I want to create so I go back to the Editor tab and write a new Bats test file.
		const newTestFileContents = textEncoder.encode(
			`#!/usr/bin/env bats

			@test "1 equals 1" {
				[ 1 = 1 ]
			}

			@test "1 equals 0" {
				[ 1 = 0 ]
			}`
		);

		workspace.fs.writeFile(newTestFile, newTestFileContents);

		// I go back to the Testing tab and see that the tests from the file I just created are there.
		assert.deepEqual(extension?.exports['tests'], expectedUpdatedTests);
	});
});
