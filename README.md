# Gacha Test V3

[![Netlify Status](https://api.netlify.com/api/v1/badges/3679aa29-600c-43b0-afda-93a6155dab27/deploy-status)](https://app.netlify.com/sites/gacha-test-v3/deploys)

**Deployed web**: [https://gacha-test-v3.netlify.app](https://gacha-test-v3.netlify.app)

## HCI Test Website

This environment has been set up to adjust the probabilities in a "gacha" game mechanism and collect participant responses using a Likert 7-point scale.

## Terminology

1. **Pulling**: The process of drawing items in the gacha game. Participants perform ten pulls per case study.
2. **Item**: Objects received from each pull. Each item is assigned a rank.
3. **Rank**: Items are categorized into three ranks based on rarity: S (Super), R (Rare), and C (Common).

## Screenshots

### Rank Overview

![Example Rank](./img/example_rank.png)

- **S rank**: Super
- **R rank**: Rare
- **C rank**: Common

### Interface 1: Index

![Interface 1 Index](./img/interface_1_index.png)
Participants can set their name and choose between a trial run and the main experiment. The trial run allows the selection from one of nine cases, while the main experiment randomly assigns one of the cases.

### Interface 2: Gacha Ready

![Interface 2 Gacha Ready](./img/interface_2_gacha_ready.png)
Press the 'Start' button once ready.

### Interface 3: Gacha Pulling

![Interface 3 Gacha Pulling](./img/interface_3_gacha_pulling.png)
Pressing the 'Pull' button decreases the remaining count by one and presents a new array of items.

### Interface 4: Evaluation

![Interface 4 Evaluation](./img/interface_4_evaluation.png)
Evaluation screen. Participants rate the perceived number of S rank items using a Likert 7-point scale. Results can be viewed on the dashboard.

### Interface 5: Dashboard

![Dashboard](./img/interface_6_dashboard.png)
After completing nine trials, results can be viewed on this screen and downloaded as a log file named `log_피험자명.csv`.

![Log Table](./img/interface_7_logtable.png)
Log table example.

### Additional Images

![Evaluation Complete](./img/interface_5_evaluation_complete.png)
Screen displayed upon completing an evaluation session.

This information will be used in the project's README.md file.
