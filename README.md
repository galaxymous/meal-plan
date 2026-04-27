# Meal plan website

Static page that turns a 5-week meal plan PDF into a clean, scannable web view.

## Local preview

```bash
cd /fsx/loubna/projects_v2/meal-plan
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

```bash
cd /fsx/loubna/projects_v2/meal-plan
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create a new repo on GitHub (e.g. meal-plan), then:
git remote add origin git@github.com:<your-user>/meal-plan.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: `main` / `/ (root)` → Save**.
Site will be live at `https://<your-user>.github.io/meal-plan/` after a minute.

## Editing the menu

- Menu content lives in [`data/menu.js`](data/menu.js). Each cell is an array of bullet items.
- Plan start date: edit `START_DATE` at the top of [`script.js`](script.js).
- Off-plan days (travel etc.): edit `OFF_PLAN_DATES` in [`script.js`](script.js).
- Sauce recipes and food rules: bottom of [`data/menu.js`](data/menu.js).

## Files

| File              | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `index.html`      | Page structure                                         |
| `style.css`       | Design system + print stylesheet                       |
| `script.js`       | Rendering, week tabs, today highlight, sauce modals    |
| `data/menu.js`    | All menu content (the file you edit to fix typos)      |
| `VERIFY.md`       | Cell-by-cell transcription checklist vs the PDF        |
| `.nojekyll`       | Tell GH Pages not to run Jekyll                        |
