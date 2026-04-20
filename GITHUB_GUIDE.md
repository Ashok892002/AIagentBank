# 🚀 How to Upload this Project to GitHub

Follow these steps to upload your **AI Agent Bank** project to your personal GitHub account.

### 1. Create a New Repository
1. Go to [github.com/new](https://github.com/new).
2. Name it `AI-Agent-Bank-Loan`.
3. Keep it **Public** so recruiters can see it.
4. Do NOT initialize with a README (you already have one).

### 2. Initialize Git Locally
Open your terminal in the `AIagentBank` folder and run:

```bash
# Initialize git
git init

# Add all files (the .gitignore will exclude node_modules)
git add .

# Create your first commit
git commit -m "Initialize Premium AI Agent Bank Project"

# Rename branch to main
git branch -M main

# Add your GitHub repository as the remote
# REPLACE <your-username> with your actual GitHub username
git remote add origin https://github.com/<your-username>/AI-Agent-Bank-Loan.git

# Push to GitHub
git push -u origin main
```

### 3. (Optional) Deploy your Streamlit App for FREE
If you want a live link you can share, you can use **Streamlit Cloud**:
1. Sign in to [share.streamlit.io](https://share.streamlit.io) using your GitHub account.
2. Click **"New App"**.
3. Select your repository `AI-Agent-Bank-Loan`.
4. Set the "Main file path" to `app_streamlit.py`.
5. Click **"Deploy"**.

### 🌟 Pro-Tip for Evaluation
In your GitHub repo, go to **Settings > General** and add the link of your deployed Streamlit app in the "Website" field. This makes your project look 10x more professional!
