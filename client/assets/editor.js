// Diese Datei bitte ignorieren. Sie ist nicht relevant für das GraphQL Beispiel
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
  monaco.editor.create(document.getElementById('container'), {
    value: [`query Query {
  getAllUsers {
    id_benutzer
    benutzername
    recht_admin
    email
    passwort_hash
  }
}`
    ].join('\n'),
    language: 'graphql',
    theme: 'vs-dark',
    fontSize: 22,
    readOnly: true
  });
});