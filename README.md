# Convert Newline List to Array

Convert a newline-separated list into a quoted array (supports multi-selection, configurable brackets, and quote style).

## Usage

1. Select one or more lines (or leave selection empty to convert the whole document).
2. Invoke **Convert Newline List to Array** from the Command Palette.
3. (Optional) Use the shortcut:
   - macOS: `Cmd+Opt+A`
   - Windows/Linux: `Ctrl+Alt+A`

## Settings

You can configure how the array is rendered in **Settings > Extensions > Convert Newline List To Array**:

- `convert-newline-list-to-array.bracketType`
  - `square` (default) → `[ ... ]`
  - `curly` → `{ ... }`
  - `paren` → `( ... )`

- `convert-newline-list-to-array.quoteStyle`
  - `double` (default) → `"item"`
  - `single` → `'item'`

## License

MIT