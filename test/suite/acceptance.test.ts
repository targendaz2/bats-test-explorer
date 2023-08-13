import { afterEach } from 'mocha';
import { assert } from 'chai';

import * as vscode from 'vscode';

import * as batsTestExplorer from '../../src/extension';
import * as fixtures from './fixtures';

suite('A Bash developer can see Bats tests in VS Code', function () {
	/* As a developer 
	I want to see my project's Bats tests in VS Code
	So that I can track the tests visually */

	let controller: vscode.TestController;

	afterEach(function () {
		controller.dispose();
	});

	test('A project already contains Bats tests', async function () {
		// Given a project already containing Bats tests
		try {
			await vscode.workspace.fs.stat(fixtures.acceptanceTestsFile);
		} catch (err) {
			assert.fail('The project does not contain Bats tests');
		}

		// When that project is opened in VS Code

		// Then those Bats files and tests should appear in the Testing view
		controller = await vscode.commands.executeCommand('bats-test-explorer.getTestController');
		const expectedTests = ['test_always_succeeds_always_succeeds', 
		'test_always_fails_always_fails'];

		expectedTests.forEach(testName => {
			// assert.deepProperty(controller.items, testName);
			assert.deepNestedPropertyVal(controller.items, 'id', testName);
		});

		// And their structure in that view should match their directory and file structure
		expectedTests.forEach(testName => {
			assert.exists(controller.items.get('unit_tests')?.children.get('script_tests')?.children.get(testName));
		});
	});

	test('New Bats test files are added to a project', function () {
		// Given a project already containing Bats tests
		
		// And already open in VS Code

		// When a new file containing Bats tests is saved to that project

		// Then that file and the Bats tests in it should appear in the Testing view

		// And their placement in that view should match their directory and file structure

		// And the same should be true for all previously existing Bats files and tests
	});

	test('New Bats tests are added to a project', function () {
		// Given a project already containing Bats tests

		// And already open in VS Code

		// When a new test is added to an existing Bats test file

		// Then that new Bats test should appear in the Testing view

		// And its placement in that view should match its directory and file structure

		// And the same should be true for all previously existing Bats files and tests
	});

	test('Existing Bats test files are removed from a project', function () {
		// Given a project already containing Bats tests

		// And already open in VS Code

		// When an existing file containing Bats tests is removed from that project

		// Then that file and the Bats tests in it should not appear in the Testing view

		// And all other existing Bats files and tests should still appear, matching their directory and file structure
	});

	test('Existing Bats tests are removed from a project', function () {
		// Given a project already containing Bats tests

		// And already open in VS Code

		// When an existing test is removed from an existing Bats test file

		// Then that test should not appear in the Testing view

		// And all other existing Bats files and tests should still appear, matching their directory and file structure
	});
});
