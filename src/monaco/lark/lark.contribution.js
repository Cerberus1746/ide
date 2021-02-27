/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { registerLanguage } from 'monaco-editor/esm/vs/basic-languages/_.contribution.js';

registerLanguage({
    id: 'lark',
    extensions: ['.lark'],
    aliases: ['Lark', 'lark'],
    firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
    loader: function () { return import('./lark.js'); }
});
