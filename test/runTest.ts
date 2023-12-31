import { runTests } from '@vscode/test-electron';

import * as fs from 'fs';
import * as path from 'path';

import * as tmp from 'tmp-promise';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		const workspaceFolder = path.resolve(__dirname, '../../fixtures/workspaces/existing-tests-workspace/');

		await tmp.withDir(async tmpDir => {
			fs.cpSync(workspaceFolder, tmpDir.path, { force: true, recursive: true });

			// Download VS Code, unzip it and run the integration test
			await runTests({
				extensionDevelopmentPath,
				extensionTestsPath,
				launchArgs: [tmpDir.path]
			});
		}, { unsafeCleanup: true });
	} catch (err) {
		console.error('Failed to run tests', err);
		process.exit(1);
	}
}

main();
