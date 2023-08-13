import { Utils } from 'vscode-uri';

import * as utils from '../../src/utils';

export const workspaceFolder = utils.getWorkspaceFolder();
export const acceptanceTestsFile = Utils.joinPath(workspaceFolder.uri, 'test/acceptance_tests.bats');
