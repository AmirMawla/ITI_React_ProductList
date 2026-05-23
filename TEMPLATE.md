# React Template Guide

This repository is meant to become a real starter template for future React projects.

That means the new project should begin from this base directly, instead of you manually copying files and pasting them into a fresh folder.

## Best way to use it

The cleanest option is to turn this repository into a GitHub template repository.

When you create a new project from a GitHub template, GitHub gives you a fresh repo that already starts with this codebase.

## How to make this repo a template

1. Push this project to GitHub.
2. Open the repository settings.
3. Enable the option that allows this repository to be used as a template.
4. Save the settings.

After that, GitHub will show a `Use this template` button.

## How to start a new project from this template

1. Click `Use this template` on GitHub.
2. Create a new repository name for the project.
3. Choose whether the new repo should be public or private.
4. Create the repository.
5. Clone the new repository to your computer.
6. Run `npm install`.
7. Run `npm run dev`.

The new project will already contain the same starter structure, UI components, and Vite setup.

## What you change in the new project

After creating the new repo from the template, update these things:

1. `package.json` project name.
2. `src/App.jsx` starter content.
3. README text and project title.
4. Any branding, colors, or layout you want to change.

## Available scripts

- `npm install` installs dependencies.
- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build.
- `npm run lint` checks code quality.

## Important note

This repo is not a command-line generator yet.

So if you want the exact experience of running a command like `npm create ...` and getting this template automatically, this project would need to be turned into a custom scaffolding tool later.

For now, the GitHub template workflow is the simplest way to start a new project with this base already included.

## Local-only workflow in VS Code

If you do not want to use GitHub at all, you can still use this project as a local starter folder in VS Code.

### How it works locally

1. Keep this project in one folder on your computer.
2. Open that folder in VS Code whenever you want to reuse it.
3. Use it as the base for a new React project.
4. For a new project, make a new folder and open that folder in a new VS Code window.
5. Bring over the starter structure from this template folder into the new project folder.

### Important limitation

VS Code by itself does not have a built-in feature that says "create a new project from this local folder template" the same way GitHub templates do.

So for a fully local setup, you usually need one of these approaches:

1. Copy the folder manually into a new project folder.
2. Create your own small script or scaffolding tool.
3. Use a project generator extension if you want a more automated workflow.

### Practical local setup in VS Code

If you want the simplest local method:

1. Keep this repo as your master starter project.
2. When you need a new app, duplicate the folder outside VS Code.
3. Open the duplicated folder in VS Code.
4. Change the project name and starter content.
5. Run `npm install` and then `npm run dev`.

That is the easiest local-only way to reuse this template without GitHub.