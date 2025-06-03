# Spirit Animal Creator - My Design Patterns Test

This is a project I built to experiment with design patterns and test out some ideas for a spirit animal app I'm working on. I decided to use TypeScript because I'm trying to get better at it.

## 🔄 How They Work Together

It's pretty straightforward:

1. The **Facade** is the main way I interact with the system.
2. When I ask the Facade to create an animal, it uses the **Factory** pattern.
3. Any action I take through the Facade (like creating an animal or completing a task) gets wrapped up in a **Command** object so it can be undone.

They all play nicely together to keep things organized and easy to manage.

## 🚀 Running the Demo

If you want to see it in action:

```bash
# First, install the stuff it needs
npm install

# Then, build the TypeScript code
npm run build

# And finally, run the demo script
npm run demo
```

This demo will show:

- The Factory making different animal types.
- The Command pattern generating AI tasks, marking them complete, and then undoing those actions.
- All of this happening through the simple Facade interface.
