import * as vscode from 'vscode';

export function getWorkspaceFolder(): vscode.WorkspaceFolder {
    return (vscode.workspace.workspaceFolders || [])[0];
}
