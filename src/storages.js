import { writable } from 'svelte/store';

export const loadingConsole = writable("");
export const editContents = {
  "parserEditor": writable(""),
  "customEditor": writable(""),
};
