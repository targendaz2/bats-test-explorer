import { assert } from 'chai';

import { extensions, workspace } from 'vscode';
import { Utils } from 'vscode-uri';

// import * as batsTestExplorer from '../../src/extension';

suite('Unit Tests', () => {
	const workspaceFolder = (workspace.workspaceFolders || [])[0];
	const extension = extensions.getExtension('dgrdev.bats-test-explorer');
	const functionalTestsFile = Utils.joinPath(workspaceFolder.uri, 'test/functional_tests.bats');

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
		test('Extension exposes tests object', async () => {
			// Given a workspace containing Bats test files
			await workspace.fs.stat(functionalTestsFile);

			// When that workspace is opened

			// The extension should expose a tests object
			assert.nestedProperty(extension?.exports, 'tests');
		});
	});
});
