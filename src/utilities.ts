import * as vscode from 'vscode';

export function getWorkspaceFolderPath(): string {
    return (vscode.workspace.workspaceFolders || [])[0].uri.fsPath;
}
