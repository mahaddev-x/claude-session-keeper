# Claude Session Keeper (GitHub Actions)

Automatically sends a keep-alive prompt to Claude Code CLI on a schedule to reset your 5-hour rolling limit window even when your local PC is turned off.

---

## 🚀 Setup Instructions

### Step 1: Get Your Local Claude Credentials

1. Open PowerShell / Command Prompt on your PC (where you already ran `claude login`).
2. Copy the content of your local `.claude.json` file:

```powershell
Get-Content "$env:USERPROFILE\.claude.json" | Set-Clipboard
```
*(On macOS/Linux: `cat ~/.claude.json`)*

---

### Step 2: Add Secret to GitHub

1. Create a **Private Repository** on GitHub (e.g. `claude-cron-keeper`).
2. Go to **Settings** -> **Secrets and variables** -> **Actions**.
3. Click **New repository secret**.
4. Name: `CLAUDE_CONFIG_JSON`
5. Value: Paste the copied JSON content.
6. Click **Add secret**.

---

### Step 3: Push Code & Test

1. Initialize git and push this repo to your private GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit - Claude Session Keeper Workflow"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

2. Go to the **Actions** tab on your GitHub repository.
3. Select **Claude Session Keeper** workflow and click **Run workflow** (Manual trigger test).
4. Verify that the workflow run succeeds!

---

## ⏰ Customizing the Schedule

Edit [.github/workflows/claude-keeper.yml](file:///.github/workflows/claude-keeper.yml) to change the cron schedule:

```yaml
on:
  schedule:
    # Times are in UTC!
    - cron: '0 8,13,18,23 * * *'
```

*Note: GitHub Actions cron schedules use UTC time.*
