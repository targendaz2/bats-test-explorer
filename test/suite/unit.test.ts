import { afterEach } from 'mocha';
import { assert } from 'chai';

import * as vscode from 'vscode';

suite('Testing command tests', function () {

    let controller: vscode.TestController;

    afterEach(function () {
        controller.dispose();
    });

    test('Can get the test controller', async function () {
        // Given this extension is activated

        // When the command to get the test controller is run
        controller = await vscode.commands.executeCommand('bats-test-explorer.getTestController');

        // Then the test controller should be returned
        assert.property(controller, 'createTestItem');
        assert.property(controller, 'createTestRun');
    });
});

suite.skip('Test discovery tests', function () {

    let controller: vscode.TestController;

    afterEach(function () {
        controller.dispose();
    });

    test('Can get the test controller', async function () {
        // Given this extension is activated

        // When the command to get the test controller is run
        controller = await vscode.commands.executeCommand('bats-test-explorer.getTestController');

        // Then the test controller should be returned
        assert.property(controller, 'createTestItem');
        assert.property(controller, 'createTestRun');
    });
});
