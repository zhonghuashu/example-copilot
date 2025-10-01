example-copilot
=================================
Experience github copilot features in [vscode](https://code.visualstudio.com/docs/copilot/getting-started) 

Set up Copilot in VS Code
- Hover over the Copilot icon in the Status Bar and select Set up Copilot.
- Choose a sign-in method and follow the prompts.
- Use a different GitHub account with Copilot, select Accounts menu in the Activity Bar.

Quick start:
- Code completions provide AI suggestions as you type.
- Build complete features with agent mode, enter prompt in chat view (`Ctrl + Alt + I`).
- Make precise adjustments with inline chat (`Ctrl + I`).
- Personalize your AI experience
  - Create custom instructions about your coding preferences and standards (`.github/copilot-instructions.md`)
  - Create custom chat mode for code reviews (`.github/chatmodes/Code Reviewer.md`), start code review in Code Reviewer mode with prompt "Review my full project".
- Use smart actions for pre-build AI assistance
  - Select the sparkle icon to generate a commit message based on your staged changes in source control.

Chat:
- Choose a chat mode, three built-in chat modes: Ask, Edit, and Agent.
- Change the language model using the model picker.
- Add chat context(#), view full list of supported context items in [chat variable section](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features#_chat-tools).
- New Chat (+) button (Ctrl+N) in the Chat view. 
- `Ask` mode: optimized for answering questions about your codebase.
- `Edit` mode: optimized for making code edits across multiple files in your project (refactor, fix bug, write unit test).
- `Agent` mode: uses a combination of code editing and tool invocation to accomplish the task you specified (refactor, plan / implement new features).
- Run Terminal Inline Chat command in the Command Palette.