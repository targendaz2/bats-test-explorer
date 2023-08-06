import { Uri, commands } from 'vscode';

export async function openWorkspaceFolder(uri: Uri) {
    await commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: true });
}
