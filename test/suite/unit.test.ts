import { assert } from 'chai';

import { extensions, workspace } from 'vscode';
import { Utils } from 'vscode-uri';

// import * as batsTestExplorer from '../../src/extension';

suite('Unit Tests', () => {
	test('Extension activates when opening a workspace with existing Bats tests', async () => {
		// Setup
		const workspaceFolder = (workspace.workspaceFolders || [])[0];
		const testFile = Utils.joinPath(workspaceFolder.uri, 'test/functional_tests.bats');

		// Given a workspace containing Bats test files
		await workspace.fs.stat(testFile);

		// When that workspace is opened

		// The extension should activate
		const extension = extensions.getExtension('dgrdev.bats-test-explorer');
		assert(extension?.isActive);
	});
});
