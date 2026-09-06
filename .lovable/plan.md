# Add a "Source" column to the leads dashboard

Show, for every lead in the admin dashboard, which form on the site it came from.

## Good news

Each form on the site already records where it was opened from, and that value is saved with every lead — including the 32 leads already collected. So this is a display change only: no new data collection, no migration.

## What you'll see

The leads table gets a new **Source** column between Email/City and Received, showing a friendly label:

| Recorded value | Shown as |
| --- | --- |
| welcome | Popup |
| hero, hero-card | Hero |
| sticky-panel, call-back, site-visit | Side Form |
| cost-sheet-*, complete-costing, 2/3/4 BHK entries | Pricing |
| brochure, mobile-brochure, nav-brochure, overview-brochure | Request Brochure |
| floor-plan-*, jodi, master layout | Floor Plan |
| location-map | Location Map |
| sample-apartment, virtual tour | Experience |
| anything else / blank | Other |

Plus a small **Leads by source** breakdown card (label + count + share %) above the table, and the source shown in the search filter so you can type "Pricing" and see only those leads.

## Technical notes

- `leads.intent` already stores the origin; `listLeads` in `src/lib/admin.functions.ts` already selects it, so no server or schema change is needed.
- Add a `sourceLabel(intent)` mapping helper in `src/routes/admin.tsx` (prefix-based matching so per-unit values like `cost-sheet-4 BHK Grand` collapse into "Pricing").
- Render the new `<th>`/`<td>`, include the mapped label in the existing search predicate, and add a source tally card reusing the existing card/table styling.
- No changes to any lead form, email, or tracking code.
