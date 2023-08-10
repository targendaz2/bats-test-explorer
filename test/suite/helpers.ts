import * as vscode from 'vscode';
import * as cp from 'child_process';

type NodeEnvType = "dev" | "optional" | "peer";

function npmList(npmPackage: string, include?: NodeEnvType[] | null, omit?: NodeEnvType[] | null): boolean {
    const workspaceFolder = (vscode.workspace.workspaceFolders || [])[0];

    let command = `npm ls ${npmPackage}`;

    include?.forEach(nodeEnv => {
        command += ` --include ${nodeEnv}`;
    });

    omit?.forEach(nodeEnv => {
        command += ` --omit ${nodeEnv}`;
    });

    const result = cp.spawnSync(command, {
        'cwd': workspaceFolder.uri.fsPath,
        'shell': true
    });

    return (result.status === 0) ? true : false;
}

export function isPackageInstalled(npmPackage: string, nodeEnvs?: NodeEnvType[]): boolean {
    // If the package isn't installed in any env, this should return false
    // We include "dev" since setting NPM_ENV to "prod" omits it
    const installedAll = npmList(npmPackage, ["dev"]);

    if (installedAll && nodeEnvs) {
        // Since the package *is* installed, we need to know if it's installed in the specified envs
        // If this returns true, the package is installed as a prod dependency, and this should return false
        const installedProd = npmList(npmPackage, null, nodeEnvs);
        return !installedProd;
    }

    return installedAll;
}
