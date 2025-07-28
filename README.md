# Missouri Uplands NAVHDA Website - Workflow & Contribution Guide

## 📝 Workflow Overview
This project uses a structured workflow to ensure quality, documentation, and smooth collaboration between humans and AI. Follow these steps for every change:

---

### 1. **Read All Documentation**
- Review all relevant docs: `README.md`, `project-status.md`, `session-notes`, TODOs, bug lists, and knowledge base files.
- Make sure you understand the current state and goals of the project.

### 2. **Check Branch**
- Ensure you are **not** on `main` (or `master`).
- Create a new branch for your work:  
  `git checkout -b feature/your-feature-name`

### 3. **Do the Work**
- Make your code or content changes.
- Test locally as needed.

### 4. **Update Documentation**
- Update all relevant docs:
  - `README.md` (if process or usage changes)
  - `project-status.md` (summary of what was done)
  - `session-notes-YYYY-MM-DD.md` (detailed session log)
  - TODO lists, bug trackers, knowledge base, etc.
- Document:
  - What you did
  - Why you did it (design choices, rationale)
  - Any notes for future AI/human contributors

### 5. **Commit, Merge, and Pull Request**
- Commit your changes with a clear message.
- Push your branch to GitHub.
- Open a Pull Request (PR) to `main`.

### 6. **Squash and Merge Confirmation**
- Reviewer (usually the user) reviews the PR.
- On approval, use **Squash and Merge** to keep history clean.

### 7. **Sync Main and Branch Off**
- Pull the latest `main` locally:  
  `git checkout main && git pull`
- Start your next feature/bugfix branch from the updated `main`.

### 8. **End of Day**
- All work and documentation is up to date.
- Ready to resume tomorrow with a clean, current codebase.

---

## 🧠 Tips for AI & Human Collaboration
- Always update documentation as you go.
- Leave notes for future contributors (AI or human) about design choices, tricky bugs, or TODOs.
- Use session notes to capture context and decisions.
- Keep branches focused and PRs small for easier review.

---

## 📚 Key Files
- `README.md` — This workflow and project overview
- `notes/project-status.md` — High-level project status
- `notes/session-notes-YYYY-MM-DD.md` — Daily session logs
- `TODO.md`, `BUGS.md`, `KB.md` — Task, bug, and knowledge base files (if present)

---

Happy collaborating!

# MoUplands website

## local testing

Use the following command on osx to do local testing 
```
python -m SimpleHTTPServer 8088
```
```
python3 -m http.server 8088
```

## 🚦 Safe Development & Preview Workflow

1. **Create and use a test branch for all changes:**
   - `git checkout -b test`
2. **Make your changes and preview locally:**
   - Use `start-server.ps1` or `start-server.bat` to run a local server.
   - Open `http://localhost:8088/` in your browser to preview.
3. **Commit and push your changes to the test branch:**
   - Use `git-commit-push.bat` to stage, commit, and push.
4. **When satisfied, merge to production:**
   - `git checkout master`
   - `git merge test`
   - `git push`
5. **Never push directly to master without previewing.**

This ensures all changes are reviewed and tested before going live.