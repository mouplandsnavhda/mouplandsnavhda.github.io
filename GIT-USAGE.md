# Git Usage Guide - Missouri Uplands NAVHDA Website

## 🚀 Quick Git Commands (No GitHub Desktop Needed!)

You can now use Git directly from the command line using the `git-commands.bat` file.

## 📋 Available Commands

### **Basic Commands**
```bash
# Check what files have changed
.\git-commands.bat status

# Add all changes to staging
.\git-commands.bat add

# Commit changes with a message
.\git-commands.bat commit "Your commit message here"

# Push changes to GitHub
.\git-commands.bat push

# Pull latest changes from GitHub
.\git-commands.bat pull
```

### **Quick Actions**
```bash
# Do everything at once (add, commit, push)
.\git-commands.bat quick

# View recent commits
.\git-commands.bat log

# See what changed
.\git-commands.bat diff
```

## 🎯 Common Workflows

### **After Making Changes:**
```bash
# 1. Check what changed
.\git-commands.bat status

# 2. Add and commit with a message
.\git-commands.bat commit "Updated website with new features"

# 3. Push to GitHub
.\git-commands.bat push
```

### **Quick Update (All in One):**
```bash
# Add, commit, and push all changes
.\git-commands.bat quick
```

### **Get Latest Changes:**
```bash
# Pull latest from GitHub
.\git-commands.bat pull
```

## 💡 Tips

- **Always check status first** to see what changed
- **Use descriptive commit messages** like "Added security headers" or "Updated 404 page"
- **Use `quick` command** for simple updates
- **Use `pull`** before making changes if working with others

## 🔧 Troubleshooting

If you get errors:
1. Make sure you're in the website folder
2. Check your internet connection
3. Try `.\git-commands.bat pull` first
4. Contact your web developer if issues persist

## 📁 File Location

The `git-commands.bat` file is in your website root folder:
```
C:\Users\teach\mouplandsnavhda.github.io\git-commands.bat
```

---

**No more GitHub Desktop needed!** 🎉 