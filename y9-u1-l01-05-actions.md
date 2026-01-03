## Year 9 Unit 1 Lessons 01–05: Fixes & Engagement Upgrades

### Must-fix bugs (blocking)
- L01–L04: `missionSelect` needs `feedback.misconceptions` map for each option (per tier) to match `MissionSelectActivity` type. Add misconceptions for every option index.
- L05: `missionSelect` shape is wrong (uses free-response options). Convert to proper `tiers` array with MCQ options + feedback/misconceptions.
- L01–L04: `skillRating` uses old shape (`prompt`/`skills`). Swap to new shape: `skillName`, `criteria` (S/A/B/C/D/F), `reflection` string.
- L05: Stage names include `Apply`/`Consolidate` (not in `StageName` union) and only 4 stages. Align to 5-stage flow (`Introduction`/`Explore`/`Learn`/`Practice`/`Summary`) or update type if intentional.

### Engagement upgrades (non-blocking)
- Add a short `simulation` to L01 or L02 to let students tweak feedback strength (e.g., sweat rate toggle, vasodilation slider, receptor sensitivity) with observables/revealPattern about stability limits.
- Enrich mission selects with targeted coaching: misconceptions per distractor, and short success blurbs tied to narrative (“Bio-Defense Agency”).
- Insert quick micro-checks between notes: small `fillInBlank` or `scenario` items to break up reading load.
- Pair the self-assessment with a brief `copyToBook` or “key takeaways” summary to reinforce reflection.
