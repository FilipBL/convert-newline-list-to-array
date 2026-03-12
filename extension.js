const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand(
        'convert-newline-list-to-array.convertNewLineToArray',
        function () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const selections =
                editor.selections && editor.selections.length
                    ? editor.selections
                    : [
                          new vscode.Selection(
                              0,
                              0,
                              editor.document.lineCount - 1,
                              editor.document.lineAt(editor.document.lineCount - 1).text.length
                          )
                      ];

            const config = vscode.workspace.getConfiguration('convert-newline-list-to-array');
            const bracketType = config.get('bracketType', 'square');
            const quoteStyle = config.get('quoteStyle', 'double');

            const { open, close } = getBrackets(bracketType);
            const quote = quoteStyle === 'single' ? '\'' : '"';
            const escapeRe = quote === '"' ? /"/g : /'/g;
            const escapeRepl = '\\' + quote;

            editor.edit((editBuilder) => {
                selections.forEach((selection) => {
                    const text = editor.document.getText(selection);
                    const lines = text.split(/\r?\n/);

                    const repl = lines.map((line) => {
                        if (line.trim() === '') return `${quote}${quote}`;
                        return `${quote}${line.replace(escapeRe, escapeRepl)}${quote}`;
                    });

                    const strRepl = `${open}${repl.join(', ')}${close}`;
                    editBuilder.replace(selection, strRepl);
                });
            });
        }
    );

    context.subscriptions.push(disposable);
}

function getBrackets(type) {
    switch (type) {
        case 'curly':
            return { open: '{', close: '}' };
        case 'paren':
            return { open: '(', close: ')' };
        default:
            return { open: '[', close: ']' };
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};