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

## 🔍 **Current Environment Check**

**Always check which branch you're on before making changes:**

```bash
git status
```

- If you see `On branch test` → You're in development mode (safe to make changes)
- If you see `On branch master` → You're in production mode (be careful!)

**Quick branch switching:**
```bash
git checkout test    # Switch to development
git checkout master  # Switch to production
```

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

### **Test vs Production Environments**

- **`test` branch**: Development/testing environment
  - Make all changes here first
  - Preview changes locally before deploying
  - Safe to experiment and iterate

- **`master` branch**: Production environment  
  - Live website at https://www.mouplands.org
  - Only merge tested changes from `test` branch
  - Never make direct changes to master

### **Development Workflow**

1. **Start on test branch:**
   ```bash
   git checkout test
   ```

2. **Make your changes and preview locally:**
   - Use `start-server.ps1` or `start-server.bat` to run a local server
   - Open `http://localhost:8088/` in your browser to preview
   - Test all functionality before proceeding

3. **Commit and push your changes to test branch:**
   - Use `git-commit-push.bat` to stage, commit, and push
   - Or use `git-commands.bat quick` for automatic commit

4. **When satisfied, deploy to production:**
   ```bash
   git checkout master
   git merge test
   git push origin master
   ```

5. **⚠️ Never push directly to master without testing on test branch first**

### **Available Git Commands**

#### **Quick Commands:**
- `git-commit-push.bat` - Prompts for commit message, then add/commit/push
- `git-commands.bat quick` - Automatic add/commit/push with timestamp

#### **Individual Commands:**
- `git-commands.bat status` - Show current git status
- `git-commands.bat add` - Add all changes to staging
- `git-commands.bat commit "message"` - Commit with custom message
- `git-commands.bat push` - Push to remote repository
- `git-commands.bat pull` - Pull latest changes
- `git-commands.bat log` - Show recent commits
- `git-commands.bat diff` - Show current changes

### **Example Workflow:**
```bash
# 1. Make changes on test branch
git checkout test
# ... edit files ...

# 2. Preview locally
start-server.bat
# ... test in browser ...

# 3. Commit changes
git-commit-push.bat
# Enter commit message when prompted

# 4. Deploy to production
git checkout master
git merge test
git push origin master
```

This ensures all changes are reviewed and tested before going live.