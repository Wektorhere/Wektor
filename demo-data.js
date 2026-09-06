// Wektor AI — Demo Mode static datasets
// Generated from real computed statistics over the actual CSV files
// (TelcoCustomerChurn.csv, NHANES_Weight_and_Height.csv, LondonBikeJourneyAug2023.csv).
// No AI call, no network request — works fully offline. See WEKTOR_PRELAUNCH_CHECKLIST.md Section 3.
//
// NOTE on "data_quality" blocks (added for the Data Roast feature): the
// churn dataset's TotalCharges missing-value figure (11/7043 ≈ 0.2%) is a
// well-known, verifiable property of that public dataset. The health and
// bikes data_quality figures are reasonable representative estimates, not
// recomputed from the source CSVs — swap in exact numbers here if you
// want them to be fully precise rather than illustrative.
window.WEKTOR_DEMO_DATASETS = {
  "churn": {
    "label": "Customer Churn",
    "icon": "📉",
    "rows": "7,043 rows",
    "metrics": {
      "margin": "Overall churn rate: 26.5% of 7,043 customers (1,869 churned)",
      "margin_signal": "Overall churn rate: 26.5% of 7,043 customers (1,869 churned)",
      "executiveSummary": "This telecom dataset tracks 7,043 customers across contract types, payment methods, and service subscriptions. Churn sits at 26.5% overall, but it is heavily concentrated: month-to-month customers churn at 42.7% compared to just 2.8% for two-year contracts. Fiber optic subscribers churn at nearly double the rate of DSL customers (41.9% vs 19.0%), and churn risk falls sharply the longer a customer stays — from 47.4% in the first year to 6.6% after five years. Churned customers pay higher average monthly bills ($74.44) than retained customers ($61.27), suggesting price sensitivity plays a real role alongside contract flexibility.",
      "executive_summary": "This telecom dataset tracks 7,043 customers across contract types, payment methods, and service subscriptions. Churn sits at 26.5% overall, but it is heavily concentrated: month-to-month customers churn at 42.7% compared to just 2.8% for two-year contracts. Fiber optic subscribers churn at nearly double the rate of DSL customers (41.9% vs 19.0%), and churn risk falls sharply the longer a customer stays — from 47.4% in the first year to 6.6% after five years. Churned customers pay higher average monthly bills ($74.44) than retained customers ($61.27), suggesting price sensitivity plays a real role alongside contract flexibility.",
      "exec_summary": "This telecom dataset tracks 7,043 customers across contract types, payment methods, and service subscriptions. Churn sits at 26.5% overall, but it is heavily concentrated: month-to-month customers churn at 42.7% compared to just 2.8% for two-year contracts. Fiber optic subscribers churn at nearly double the rate of DSL customers (41.9% vs 19.0%), and churn risk falls sharply the longer a customer stays — from 47.4% in the first year to 6.6% after five years. Churned customers pay higher average monthly bills ($74.44) than retained customers ($61.27), suggesting price sensitivity plays a real role alongside contract flexibility.",
      "risk_statement": "The month-to-month segment (3,875 customers, 55% of the base) drives the overwhelming majority of churn exposure, and Electronic check payers churn at 45.3% — the highest of any payment method. Customers in their first year of tenure are more than 7x more likely to leave than those past year five, meaning early-tenure retention is the single biggest lever.",
      "risk": "The month-to-month segment (3,875 customers, 55% of the base) drives the overwhelming majority of churn exposure, and Electronic check payers churn at 45.3% — the highest of any payment method. Customers in their first year of tenure are more than 7x more likely to leave than those past year five, meaning early-tenure retention is the single biggest lever.",
      "risk_text": "The month-to-month segment (3,875 customers, 55% of the base) drives the overwhelming majority of churn exposure, and Electronic check payers churn at 45.3% — the highest of any payment method. Customers in their first year of tenure are more than 7x more likely to leave than those past year five, meaning early-tenure retention is the single biggest lever.",
      "opportunity_statement": "Converting even a fraction of month-to-month subscribers to one- or two-year contracts could meaningfully cut churn, given the 15-40 point gap in churn rate between contract tiers. Targeted retention outreach in months 0-12 — where churn peaks at 47.4% — offers the highest-leverage intervention window.",
      "opportunity": "Converting even a fraction of month-to-month subscribers to one- or two-year contracts could meaningfully cut churn, given the 15-40 point gap in churn rate between contract tiers. Targeted retention outreach in months 0-12 — where churn peaks at 47.4% — offers the highest-leverage intervention window.",
      "opp_text": "Converting even a fraction of month-to-month subscribers to one- or two-year contracts could meaningfully cut churn, given the 15-40 point gap in churn rate between contract tiers. Targeted retention outreach in months 0-12 — where churn peaks at 47.4% — offers the highest-leverage intervention window.",
      "revenueEfficiency": "$2,283 avg total revenue per customer",
      "what_changed": "Churn risk is not evenly distributed: it concentrates in month-to-month contracts (42.7% churn), fiber optic subscribers (41.9%), and customers paying by electronic check (45.3%) — all well above the 26.5% baseline.",
      "why_changed": "Tenure and total spend are strongly correlated (r=0.83), and shorter-tenure customers are disproportionately on flexible, higher-cost plans without long-term commitment — consistent with a segment that hasn't yet found enough value to lock in.",
      "action_playbook": "Prioritize contract-upgrade incentives for month-to-month, fiber-optic customers inside their first 12 months, and review pricing or perks for the Electronic check payment segment specifically, since it churns at nearly double the overall rate.",
      "chart_data": {
        "time_series_data": [
          {
            "time": "0-12 mo",
            "value": 47.4
          },
          {
            "time": "13-24 mo",
            "value": 28.7
          },
          {
            "time": "25-36 mo",
            "value": 21.6
          },
          {
            "time": "37-48 mo",
            "value": 19.0
          },
          {
            "time": "49-60 mo",
            "value": 14.4
          },
          {
            "time": "61-72 mo",
            "value": 6.6
          }
        ],
        "category_data": [
          {
            "category": "Month-to-month",
            "count": 1655
          },
          {
            "category": "One year",
            "count": 166
          },
          {
            "category": "Two year",
            "count": 48
          }
        ],
        "distribution_data": [
          {
            "name": "Low",
            "value": 1899
          },
          {
            "name": "Medium",
            "value": 1377
          },
          {
            "name": "High",
            "value": 2290
          },
          {
            "name": "Very High",
            "value": 1477
          }
        ]
      },
      "chart_explanations": {
        "time_series_explanation": "Churn rate (%) by tenure bucket — new customers (0-12 months) churn at 47.4%, falling steadily to 6.6% for customers with 5+ years on the books.",
        "category_explanation": "Churned customers grouped by contract type — month-to-month customers account for 1,655 of the 1,869 total churned accounts (89%).",
        "distribution_explanation": "Customer count across four Monthly Charges bands — the base skews toward higher-priced plans."
      },
      "deep_dive_data": {
        "outliers": [
          {
            "x": 0,
            "y": 62.65,
            "is_outlier": false,
            "label": "Value: 62.65"
          },
          {
            "x": 1,
            "y": 85.45,
            "is_outlier": false,
            "label": "Value: 85.45"
          },
          {
            "x": 2,
            "y": 98.3,
            "is_outlier": false,
            "label": "Value: 98.30"
          },
          {
            "x": 3,
            "y": 106.8,
            "is_outlier": false,
            "label": "Value: 106.80"
          },
          {
            "x": 4,
            "y": 108.3,
            "is_outlier": false,
            "label": "Value: 108.30"
          },
          {
            "x": 5,
            "y": 58.6,
            "is_outlier": false,
            "label": "Value: 58.60"
          },
          {
            "x": 6,
            "y": 80.6,
            "is_outlier": false,
            "label": "Value: 80.60"
          },
          {
            "x": 7,
            "y": 79.55,
            "is_outlier": false,
            "label": "Value: 79.55"
          },
          {
            "x": 8,
            "y": 19.45,
            "is_outlier": false,
            "label": "Value: 19.45"
          },
          {
            "x": 9,
            "y": 95.7,
            "is_outlier": false,
            "label": "Value: 95.70"
          },
          {
            "x": 10,
            "y": 19.7,
            "is_outlier": false,
            "label": "Value: 19.70"
          },
          {
            "x": 11,
            "y": 85.5,
            "is_outlier": false,
            "label": "Value: 85.50"
          },
          {
            "x": 12,
            "y": 45.05,
            "is_outlier": false,
            "label": "Value: 45.05"
          },
          {
            "x": 13,
            "y": 75.5,
            "is_outlier": false,
            "label": "Value: 75.50"
          },
          {
            "x": 14,
            "y": 79.35,
            "is_outlier": false,
            "label": "Value: 79.35"
          },
          {
            "x": 15,
            "y": 69.55,
            "is_outlier": false,
            "label": "Value: 69.55"
          },
          {
            "x": 16,
            "y": 70.1,
            "is_outlier": false,
            "label": "Value: 70.10"
          },
          {
            "x": 17,
            "y": 65.25,
            "is_outlier": false,
            "label": "Value: 65.25"
          },
          {
            "x": 18,
            "y": 94.9,
            "is_outlier": false,
            "label": "Value: 94.90"
          },
          {
            "x": 19,
            "y": 34.85,
            "is_outlier": false,
            "label": "Value: 34.85"
          },
          {
            "x": 20,
            "y": 93.8,
            "is_outlier": false,
            "label": "Value: 93.80"
          },
          {
            "x": 21,
            "y": 93.65,
            "is_outlier": false,
            "label": "Value: 93.65"
          },
          {
            "x": 22,
            "y": 39.1,
            "is_outlier": false,
            "label": "Value: 39.10"
          },
          {
            "x": 23,
            "y": 79.25,
            "is_outlier": false,
            "label": "Value: 79.25"
          },
          {
            "x": 24,
            "y": 116.1,
            "is_outlier": false,
            "label": "Value: 116.10"
          },
          {
            "x": 25,
            "y": 24.8,
            "is_outlier": false,
            "label": "Value: 24.80"
          },
          {
            "x": 26,
            "y": 68.7,
            "is_outlier": false,
            "label": "Value: 68.70"
          },
          {
            "x": 27,
            "y": 20.05,
            "is_outlier": false,
            "label": "Value: 20.05"
          },
          {
            "x": 28,
            "y": 50.55,
            "is_outlier": false,
            "label": "Value: 50.55"
          },
          {
            "x": 29,
            "y": 69.7,
            "is_outlier": false,
            "label": "Value: 69.70"
          },
          {
            "x": 30,
            "y": 102.6,
            "is_outlier": false,
            "label": "Value: 102.60"
          },
          {
            "x": 31,
            "y": 90.6,
            "is_outlier": false,
            "label": "Value: 90.60"
          },
          {
            "x": 32,
            "y": 20.85,
            "is_outlier": false,
            "label": "Value: 20.85"
          },
          {
            "x": 33,
            "y": 69.15,
            "is_outlier": false,
            "label": "Value: 69.15"
          },
          {
            "x": 34,
            "y": 84.8,
            "is_outlier": false,
            "label": "Value: 84.80"
          },
          {
            "x": 35,
            "y": 26.3,
            "is_outlier": false,
            "label": "Value: 26.30"
          },
          {
            "x": 36,
            "y": 104.7,
            "is_outlier": false,
            "label": "Value: 104.70"
          },
          {
            "x": 37,
            "y": 19.55,
            "is_outlier": false,
            "label": "Value: 19.55"
          },
          {
            "x": 38,
            "y": 105.2,
            "is_outlier": false,
            "label": "Value: 105.20"
          },
          {
            "x": 39,
            "y": 75.5,
            "is_outlier": false,
            "label": "Value: 75.50"
          },
          {
            "x": 40,
            "y": 115.8,
            "is_outlier": false,
            "label": "Value: 115.80"
          },
          {
            "x": 41,
            "y": 80.55,
            "is_outlier": false,
            "label": "Value: 80.55"
          },
          {
            "x": 42,
            "y": 110.75,
            "is_outlier": false,
            "label": "Value: 110.75"
          },
          {
            "x": 43,
            "y": 49.65,
            "is_outlier": false,
            "label": "Value: 49.65"
          },
          {
            "x": 44,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 45,
            "y": 25.35,
            "is_outlier": false,
            "label": "Value: 25.35"
          },
          {
            "x": 46,
            "y": 65.65,
            "is_outlier": false,
            "label": "Value: 65.65"
          },
          {
            "x": 47,
            "y": 74.9,
            "is_outlier": false,
            "label": "Value: 74.90"
          },
          {
            "x": 48,
            "y": 80.45,
            "is_outlier": false,
            "label": "Value: 80.45"
          },
          {
            "x": 49,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 50,
            "y": 24.95,
            "is_outlier": false,
            "label": "Value: 24.95"
          },
          {
            "x": 51,
            "y": 89.35,
            "is_outlier": false,
            "label": "Value: 89.35"
          },
          {
            "x": 52,
            "y": 59.75,
            "is_outlier": false,
            "label": "Value: 59.75"
          },
          {
            "x": 53,
            "y": 79.55,
            "is_outlier": false,
            "label": "Value: 79.55"
          },
          {
            "x": 54,
            "y": 85.55,
            "is_outlier": false,
            "label": "Value: 85.55"
          },
          {
            "x": 55,
            "y": 75.55,
            "is_outlier": false,
            "label": "Value: 75.55"
          },
          {
            "x": 56,
            "y": 104.9,
            "is_outlier": false,
            "label": "Value: 104.90"
          },
          {
            "x": 57,
            "y": 82.3,
            "is_outlier": false,
            "label": "Value: 82.30"
          },
          {
            "x": 58,
            "y": 73.5,
            "is_outlier": false,
            "label": "Value: 73.50"
          },
          {
            "x": 59,
            "y": 98.0,
            "is_outlier": false,
            "label": "Value: 98.00"
          },
          {
            "x": 60,
            "y": 24.0,
            "is_outlier": false,
            "label": "Value: 24.00"
          },
          {
            "x": 61,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 62,
            "y": 46.0,
            "is_outlier": false,
            "label": "Value: 46.00"
          },
          {
            "x": 63,
            "y": 60.65,
            "is_outlier": false,
            "label": "Value: 60.65"
          },
          {
            "x": 64,
            "y": 95.35,
            "is_outlier": false,
            "label": "Value: 95.35"
          },
          {
            "x": 65,
            "y": 61.5,
            "is_outlier": false,
            "label": "Value: 61.50"
          },
          {
            "x": 66,
            "y": 24.7,
            "is_outlier": false,
            "label": "Value: 24.70"
          },
          {
            "x": 67,
            "y": 25.75,
            "is_outlier": false,
            "label": "Value: 25.75"
          },
          {
            "x": 68,
            "y": 20.55,
            "is_outlier": false,
            "label": "Value: 20.55"
          },
          {
            "x": 69,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 70,
            "y": 104.4,
            "is_outlier": false,
            "label": "Value: 104.40"
          },
          {
            "x": 71,
            "y": 23.6,
            "is_outlier": false,
            "label": "Value: 23.60"
          },
          {
            "x": 72,
            "y": 78.95,
            "is_outlier": false,
            "label": "Value: 78.95"
          },
          {
            "x": 73,
            "y": 70.5,
            "is_outlier": false,
            "label": "Value: 70.50"
          },
          {
            "x": 74,
            "y": 25.2,
            "is_outlier": false,
            "label": "Value: 25.20"
          },
          {
            "x": 75,
            "y": 19.85,
            "is_outlier": false,
            "label": "Value: 19.85"
          },
          {
            "x": 76,
            "y": 55.25,
            "is_outlier": false,
            "label": "Value: 55.25"
          },
          {
            "x": 77,
            "y": 95.5,
            "is_outlier": false,
            "label": "Value: 95.50"
          },
          {
            "x": 78,
            "y": 70.4,
            "is_outlier": false,
            "label": "Value: 70.40"
          },
          {
            "x": 79,
            "y": 73.2,
            "is_outlier": false,
            "label": "Value: 73.20"
          },
          {
            "x": 80,
            "y": 19.35,
            "is_outlier": false,
            "label": "Value: 19.35"
          },
          {
            "x": 81,
            "y": 20.05,
            "is_outlier": false,
            "label": "Value: 20.05"
          },
          {
            "x": 82,
            "y": 49.25,
            "is_outlier": false,
            "label": "Value: 49.25"
          },
          {
            "x": 83,
            "y": 75.95,
            "is_outlier": false,
            "label": "Value: 75.95"
          },
          {
            "x": 84,
            "y": 55.6,
            "is_outlier": false,
            "label": "Value: 55.60"
          },
          {
            "x": 85,
            "y": 98.05,
            "is_outlier": false,
            "label": "Value: 98.05"
          },
          {
            "x": 86,
            "y": 58.4,
            "is_outlier": false,
            "label": "Value: 58.40"
          },
          {
            "x": 87,
            "y": 45.15,
            "is_outlier": false,
            "label": "Value: 45.15"
          },
          {
            "x": 88,
            "y": 94.9,
            "is_outlier": false,
            "label": "Value: 94.90"
          },
          {
            "x": 89,
            "y": 51.55,
            "is_outlier": false,
            "label": "Value: 51.55"
          },
          {
            "x": 90,
            "y": 20.5,
            "is_outlier": false,
            "label": "Value: 20.50"
          },
          {
            "x": 91,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 92,
            "y": 49.15,
            "is_outlier": false,
            "label": "Value: 49.15"
          },
          {
            "x": 93,
            "y": 105.2,
            "is_outlier": false,
            "label": "Value: 105.20"
          },
          {
            "x": 94,
            "y": 20.55,
            "is_outlier": false,
            "label": "Value: 20.55"
          },
          {
            "x": 95,
            "y": 94.2,
            "is_outlier": false,
            "label": "Value: 94.20"
          },
          {
            "x": 96,
            "y": 19.6,
            "is_outlier": false,
            "label": "Value: 19.60"
          },
          {
            "x": 97,
            "y": 104.05,
            "is_outlier": false,
            "label": "Value: 104.05"
          },
          {
            "x": 98,
            "y": 104.8,
            "is_outlier": false,
            "label": "Value: 104.80"
          },
          {
            "x": 99,
            "y": 19.25,
            "is_outlier": false,
            "label": "Value: 19.25"
          },
          {
            "x": 100,
            "y": 112.35,
            "is_outlier": false,
            "label": "Value: 112.35"
          },
          {
            "x": 101,
            "y": 69.6,
            "is_outlier": false,
            "label": "Value: 69.60"
          },
          {
            "x": 102,
            "y": 104.05,
            "is_outlier": false,
            "label": "Value: 104.05"
          },
          {
            "x": 103,
            "y": 96.05,
            "is_outlier": false,
            "label": "Value: 96.05"
          },
          {
            "x": 104,
            "y": 50.55,
            "is_outlier": false,
            "label": "Value: 50.55"
          },
          {
            "x": 105,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 106,
            "y": 19.85,
            "is_outlier": false,
            "label": "Value: 19.85"
          },
          {
            "x": 107,
            "y": 54.45,
            "is_outlier": false,
            "label": "Value: 54.45"
          },
          {
            "x": 108,
            "y": 92.2,
            "is_outlier": false,
            "label": "Value: 92.20"
          },
          {
            "x": 109,
            "y": 86.1,
            "is_outlier": false,
            "label": "Value: 86.10"
          },
          {
            "x": 110,
            "y": 19.15,
            "is_outlier": false,
            "label": "Value: 19.15"
          },
          {
            "x": 111,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 112,
            "y": 40.65,
            "is_outlier": false,
            "label": "Value: 40.65"
          },
          {
            "x": 113,
            "y": 55.7,
            "is_outlier": false,
            "label": "Value: 55.70"
          },
          {
            "x": 114,
            "y": 82.85,
            "is_outlier": false,
            "label": "Value: 82.85"
          },
          {
            "x": 115,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 116,
            "y": 59.85,
            "is_outlier": false,
            "label": "Value: 59.85"
          },
          {
            "x": 117,
            "y": 74.35,
            "is_outlier": false,
            "label": "Value: 74.35"
          },
          {
            "x": 118,
            "y": 81.8,
            "is_outlier": false,
            "label": "Value: 81.80"
          },
          {
            "x": 119,
            "y": 20.05,
            "is_outlier": false,
            "label": "Value: 20.05"
          },
          {
            "x": 120,
            "y": 54.5,
            "is_outlier": false,
            "label": "Value: 54.50"
          },
          {
            "x": 121,
            "y": 49.4,
            "is_outlier": false,
            "label": "Value: 49.40"
          },
          {
            "x": 122,
            "y": 19.3,
            "is_outlier": false,
            "label": "Value: 19.30"
          },
          {
            "x": 123,
            "y": 99.2,
            "is_outlier": false,
            "label": "Value: 99.20"
          },
          {
            "x": 124,
            "y": 35.0,
            "is_outlier": false,
            "label": "Value: 35.00"
          },
          {
            "x": 125,
            "y": 89.9,
            "is_outlier": false,
            "label": "Value: 89.90"
          },
          {
            "x": 126,
            "y": 85.65,
            "is_outlier": false,
            "label": "Value: 85.65"
          },
          {
            "x": 127,
            "y": 25.4,
            "is_outlier": false,
            "label": "Value: 25.40"
          },
          {
            "x": 128,
            "y": 106.6,
            "is_outlier": false,
            "label": "Value: 106.60"
          },
          {
            "x": 129,
            "y": 78.45,
            "is_outlier": false,
            "label": "Value: 78.45"
          },
          {
            "x": 130,
            "y": 65.0,
            "is_outlier": false,
            "label": "Value: 65.00"
          },
          {
            "x": 131,
            "y": 29.2,
            "is_outlier": false,
            "label": "Value: 29.20"
          },
          {
            "x": 132,
            "y": 98.5,
            "is_outlier": false,
            "label": "Value: 98.50"
          },
          {
            "x": 133,
            "y": 104.8,
            "is_outlier": false,
            "label": "Value: 104.80"
          },
          {
            "x": 134,
            "y": 73.85,
            "is_outlier": false,
            "label": "Value: 73.85"
          },
          {
            "x": 135,
            "y": 48.85,
            "is_outlier": false,
            "label": "Value: 48.85"
          },
          {
            "x": 136,
            "y": 66.15,
            "is_outlier": false,
            "label": "Value: 66.15"
          },
          {
            "x": 137,
            "y": 97.95,
            "is_outlier": false,
            "label": "Value: 97.95"
          },
          {
            "x": 138,
            "y": 24.75,
            "is_outlier": false,
            "label": "Value: 24.75"
          },
          {
            "x": 139,
            "y": 74.95,
            "is_outlier": false,
            "label": "Value: 74.95"
          },
          {
            "x": 140,
            "y": 38.5,
            "is_outlier": false,
            "label": "Value: 38.50"
          },
          {
            "x": 141,
            "y": 87.1,
            "is_outlier": false,
            "label": "Value: 87.10"
          },
          {
            "x": 142,
            "y": 56.15,
            "is_outlier": false,
            "label": "Value: 56.15"
          },
          {
            "x": 143,
            "y": 81.9,
            "is_outlier": false,
            "label": "Value: 81.90"
          },
          {
            "x": 144,
            "y": 45.9,
            "is_outlier": false,
            "label": "Value: 45.90"
          },
          {
            "x": 145,
            "y": 115.65,
            "is_outlier": false,
            "label": "Value: 115.65"
          },
          {
            "x": 146,
            "y": 99.95,
            "is_outlier": false,
            "label": "Value: 99.95"
          },
          {
            "x": 147,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 148,
            "y": 59.45,
            "is_outlier": false,
            "label": "Value: 59.45"
          },
          {
            "x": 149,
            "y": 108.1,
            "is_outlier": false,
            "label": "Value: 108.10"
          },
          {
            "x": 150,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 151,
            "y": 102.45,
            "is_outlier": false,
            "label": "Value: 102.45"
          },
          {
            "x": 152,
            "y": 85.05,
            "is_outlier": false,
            "label": "Value: 85.05"
          },
          {
            "x": 153,
            "y": 74.75,
            "is_outlier": false,
            "label": "Value: 74.75"
          },
          {
            "x": 154,
            "y": 20.25,
            "is_outlier": false,
            "label": "Value: 20.25"
          },
          {
            "x": 155,
            "y": 19.45,
            "is_outlier": false,
            "label": "Value: 19.45"
          },
          {
            "x": 156,
            "y": 96.75,
            "is_outlier": false,
            "label": "Value: 96.75"
          },
          {
            "x": 157,
            "y": 53.5,
            "is_outlier": false,
            "label": "Value: 53.50"
          },
          {
            "x": 158,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 159,
            "y": 77.15,
            "is_outlier": false,
            "label": "Value: 77.15"
          },
          {
            "x": 160,
            "y": 96.6,
            "is_outlier": false,
            "label": "Value: 96.60"
          },
          {
            "x": 161,
            "y": 94.4,
            "is_outlier": false,
            "label": "Value: 94.40"
          },
          {
            "x": 162,
            "y": 74.6,
            "is_outlier": false,
            "label": "Value: 74.60"
          },
          {
            "x": 163,
            "y": 110.05,
            "is_outlier": false,
            "label": "Value: 110.05"
          },
          {
            "x": 164,
            "y": 105.3,
            "is_outlier": false,
            "label": "Value: 105.30"
          },
          {
            "x": 165,
            "y": 69.75,
            "is_outlier": false,
            "label": "Value: 69.75"
          },
          {
            "x": 166,
            "y": 78.9,
            "is_outlier": false,
            "label": "Value: 78.90"
          },
          {
            "x": 167,
            "y": 100.05,
            "is_outlier": false,
            "label": "Value: 100.05"
          },
          {
            "x": 168,
            "y": 54.8,
            "is_outlier": false,
            "label": "Value: 54.80"
          },
          {
            "x": 169,
            "y": 113.4,
            "is_outlier": false,
            "label": "Value: 113.40"
          },
          {
            "x": 170,
            "y": 85.0,
            "is_outlier": false,
            "label": "Value: 85.00"
          },
          {
            "x": 171,
            "y": 59.45,
            "is_outlier": false,
            "label": "Value: 59.45"
          },
          {
            "x": 172,
            "y": 91.35,
            "is_outlier": false,
            "label": "Value: 91.35"
          },
          {
            "x": 173,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 174,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 175,
            "y": 103.7,
            "is_outlier": false,
            "label": "Value: 103.70"
          },
          {
            "x": 176,
            "y": 69.0,
            "is_outlier": false,
            "label": "Value: 69.00"
          },
          {
            "x": 177,
            "y": 86.9,
            "is_outlier": false,
            "label": "Value: 86.90"
          },
          {
            "x": 178,
            "y": 70.5,
            "is_outlier": false,
            "label": "Value: 70.50"
          },
          {
            "x": 179,
            "y": 20.0,
            "is_outlier": false,
            "label": "Value: 20.00"
          },
          {
            "x": 180,
            "y": 95.1,
            "is_outlier": false,
            "label": "Value: 95.10"
          },
          {
            "x": 181,
            "y": 88.05,
            "is_outlier": false,
            "label": "Value: 88.05"
          },
          {
            "x": 182,
            "y": 19.5,
            "is_outlier": false,
            "label": "Value: 19.50"
          },
          {
            "x": 183,
            "y": 70.3,
            "is_outlier": false,
            "label": "Value: 70.30"
          },
          {
            "x": 184,
            "y": 46.0,
            "is_outlier": false,
            "label": "Value: 46.00"
          },
          {
            "x": 185,
            "y": 84.95,
            "is_outlier": false,
            "label": "Value: 84.95"
          },
          {
            "x": 186,
            "y": 35.2,
            "is_outlier": false,
            "label": "Value: 35.20"
          },
          {
            "x": 187,
            "y": 94.0,
            "is_outlier": false,
            "label": "Value: 94.00"
          },
          {
            "x": 188,
            "y": 44.95,
            "is_outlier": false,
            "label": "Value: 44.95"
          },
          {
            "x": 189,
            "y": 29.85,
            "is_outlier": false,
            "label": "Value: 29.85"
          },
          {
            "x": 190,
            "y": 50.75,
            "is_outlier": false,
            "label": "Value: 50.75"
          },
          {
            "x": 191,
            "y": 84.4,
            "is_outlier": false,
            "label": "Value: 84.40"
          },
          {
            "x": 192,
            "y": 65.5,
            "is_outlier": false,
            "label": "Value: 65.50"
          },
          {
            "x": 193,
            "y": 59.6,
            "is_outlier": false,
            "label": "Value: 59.60"
          },
          {
            "x": 194,
            "y": 74.75,
            "is_outlier": false,
            "label": "Value: 74.75"
          },
          {
            "x": 195,
            "y": 89.85,
            "is_outlier": false,
            "label": "Value: 89.85"
          },
          {
            "x": 196,
            "y": 24.3,
            "is_outlier": false,
            "label": "Value: 24.30"
          },
          {
            "x": 197,
            "y": 53.65,
            "is_outlier": false,
            "label": "Value: 53.65"
          },
          {
            "x": 198,
            "y": 55.8,
            "is_outlier": false,
            "label": "Value: 55.80"
          },
          {
            "x": 199,
            "y": 69.95,
            "is_outlier": false,
            "label": "Value: 69.95"
          },
          {
            "x": 200,
            "y": 79.2,
            "is_outlier": false,
            "label": "Value: 79.20"
          },
          {
            "x": 201,
            "y": 24.9,
            "is_outlier": false,
            "label": "Value: 24.90"
          },
          {
            "x": 202,
            "y": 59.95,
            "is_outlier": false,
            "label": "Value: 59.95"
          },
          {
            "x": 203,
            "y": 31.0,
            "is_outlier": false,
            "label": "Value: 31.00"
          },
          {
            "x": 204,
            "y": 98.35,
            "is_outlier": false,
            "label": "Value: 98.35"
          },
          {
            "x": 205,
            "y": 92.05,
            "is_outlier": false,
            "label": "Value: 92.05"
          },
          {
            "x": 206,
            "y": 20.4,
            "is_outlier": false,
            "label": "Value: 20.40"
          },
          {
            "x": 207,
            "y": 19.7,
            "is_outlier": false,
            "label": "Value: 19.70"
          },
          {
            "x": 208,
            "y": 25.3,
            "is_outlier": false,
            "label": "Value: 25.30"
          },
          {
            "x": 209,
            "y": 55.8,
            "is_outlier": false,
            "label": "Value: 55.80"
          },
          {
            "x": 210,
            "y": 105.3,
            "is_outlier": false,
            "label": "Value: 105.30"
          },
          {
            "x": 211,
            "y": 93.4,
            "is_outlier": false,
            "label": "Value: 93.40"
          },
          {
            "x": 212,
            "y": 64.4,
            "is_outlier": false,
            "label": "Value: 64.40"
          },
          {
            "x": 213,
            "y": 97.45,
            "is_outlier": false,
            "label": "Value: 97.45"
          },
          {
            "x": 214,
            "y": 19.85,
            "is_outlier": false,
            "label": "Value: 19.85"
          },
          {
            "x": 215,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 216,
            "y": 106.5,
            "is_outlier": false,
            "label": "Value: 106.50"
          },
          {
            "x": 217,
            "y": 116.25,
            "is_outlier": false,
            "label": "Value: 116.25"
          },
          {
            "x": 218,
            "y": 100.55,
            "is_outlier": false,
            "label": "Value: 100.55"
          },
          {
            "x": 219,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 220,
            "y": 54.15,
            "is_outlier": false,
            "label": "Value: 54.15"
          },
          {
            "x": 221,
            "y": 95.85,
            "is_outlier": false,
            "label": "Value: 95.85"
          },
          {
            "x": 222,
            "y": 75.35,
            "is_outlier": false,
            "label": "Value: 75.35"
          },
          {
            "x": 223,
            "y": 81.85,
            "is_outlier": false,
            "label": "Value: 81.85"
          },
          {
            "x": 224,
            "y": 88.05,
            "is_outlier": false,
            "label": "Value: 88.05"
          },
          {
            "x": 225,
            "y": 80.45,
            "is_outlier": false,
            "label": "Value: 80.45"
          },
          {
            "x": 226,
            "y": 84.2,
            "is_outlier": false,
            "label": "Value: 84.20"
          },
          {
            "x": 227,
            "y": 105.9,
            "is_outlier": false,
            "label": "Value: 105.90"
          },
          {
            "x": 228,
            "y": 19.3,
            "is_outlier": false,
            "label": "Value: 19.30"
          },
          {
            "x": 229,
            "y": 35.15,
            "is_outlier": false,
            "label": "Value: 35.15"
          },
          {
            "x": 230,
            "y": 45.3,
            "is_outlier": false,
            "label": "Value: 45.30"
          },
          {
            "x": 231,
            "y": 38.55,
            "is_outlier": false,
            "label": "Value: 38.55"
          },
          {
            "x": 232,
            "y": 94.15,
            "is_outlier": false,
            "label": "Value: 94.15"
          },
          {
            "x": 233,
            "y": 80.65,
            "is_outlier": false,
            "label": "Value: 80.65"
          },
          {
            "x": 234,
            "y": 24.35,
            "is_outlier": false,
            "label": "Value: 24.35"
          },
          {
            "x": 235,
            "y": 73.8,
            "is_outlier": false,
            "label": "Value: 73.80"
          },
          {
            "x": 236,
            "y": 87.1,
            "is_outlier": false,
            "label": "Value: 87.10"
          },
          {
            "x": 237,
            "y": 35.8,
            "is_outlier": false,
            "label": "Value: 35.80"
          },
          {
            "x": 238,
            "y": 69.6,
            "is_outlier": false,
            "label": "Value: 69.60"
          },
          {
            "x": 239,
            "y": 95.0,
            "is_outlier": false,
            "label": "Value: 95.00"
          },
          {
            "x": 240,
            "y": 19.65,
            "is_outlier": false,
            "label": "Value: 19.65"
          },
          {
            "x": 241,
            "y": 107.5,
            "is_outlier": false,
            "label": "Value: 107.50"
          },
          {
            "x": 242,
            "y": 96.0,
            "is_outlier": false,
            "label": "Value: 96.00"
          },
          {
            "x": 243,
            "y": 66.3,
            "is_outlier": false,
            "label": "Value: 66.30"
          },
          {
            "x": 244,
            "y": 80.35,
            "is_outlier": false,
            "label": "Value: 80.35"
          },
          {
            "x": 245,
            "y": 51.0,
            "is_outlier": false,
            "label": "Value: 51.00"
          },
          {
            "x": 246,
            "y": 75.05,
            "is_outlier": false,
            "label": "Value: 75.05"
          },
          {
            "x": 247,
            "y": 30.5,
            "is_outlier": false,
            "label": "Value: 30.50"
          },
          {
            "x": 248,
            "y": 59.6,
            "is_outlier": false,
            "label": "Value: 59.60"
          },
          {
            "x": 249,
            "y": 54.55,
            "is_outlier": false,
            "label": "Value: 54.55"
          },
          {
            "x": 250,
            "y": 23.3,
            "is_outlier": false,
            "label": "Value: 23.30"
          },
          {
            "x": 251,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 252,
            "y": 44.85,
            "is_outlier": false,
            "label": "Value: 44.85"
          },
          {
            "x": 253,
            "y": 95.1,
            "is_outlier": false,
            "label": "Value: 95.10"
          },
          {
            "x": 254,
            "y": 55.1,
            "is_outlier": false,
            "label": "Value: 55.10"
          },
          {
            "x": 255,
            "y": 90.25,
            "is_outlier": false,
            "label": "Value: 90.25"
          },
          {
            "x": 256,
            "y": 25.6,
            "is_outlier": false,
            "label": "Value: 25.60"
          },
          {
            "x": 257,
            "y": 92.65,
            "is_outlier": false,
            "label": "Value: 92.65"
          },
          {
            "x": 258,
            "y": 94.55,
            "is_outlier": false,
            "label": "Value: 94.55"
          },
          {
            "x": 259,
            "y": 109.9,
            "is_outlier": false,
            "label": "Value: 109.90"
          },
          {
            "x": 260,
            "y": 75.75,
            "is_outlier": false,
            "label": "Value: 75.75"
          },
          {
            "x": 261,
            "y": 84.45,
            "is_outlier": false,
            "label": "Value: 84.45"
          },
          {
            "x": 262,
            "y": 62.15,
            "is_outlier": false,
            "label": "Value: 62.15"
          },
          {
            "x": 263,
            "y": 26.0,
            "is_outlier": false,
            "label": "Value: 26.00"
          },
          {
            "x": 264,
            "y": 50.95,
            "is_outlier": false,
            "label": "Value: 50.95"
          },
          {
            "x": 265,
            "y": 76.1,
            "is_outlier": false,
            "label": "Value: 76.10"
          },
          {
            "x": 266,
            "y": 69.25,
            "is_outlier": false,
            "label": "Value: 69.25"
          },
          {
            "x": 267,
            "y": 85.4,
            "is_outlier": false,
            "label": "Value: 85.40"
          },
          {
            "x": 268,
            "y": 104.5,
            "is_outlier": false,
            "label": "Value: 104.50"
          },
          {
            "x": 269,
            "y": 56.15,
            "is_outlier": false,
            "label": "Value: 56.15"
          },
          {
            "x": 270,
            "y": 19.2,
            "is_outlier": false,
            "label": "Value: 19.20"
          },
          {
            "x": 271,
            "y": 93.85,
            "is_outlier": false,
            "label": "Value: 93.85"
          },
          {
            "x": 272,
            "y": 79.7,
            "is_outlier": false,
            "label": "Value: 79.70"
          },
          {
            "x": 273,
            "y": 24.95,
            "is_outlier": false,
            "label": "Value: 24.95"
          },
          {
            "x": 274,
            "y": 35.6,
            "is_outlier": false,
            "label": "Value: 35.60"
          },
          {
            "x": 275,
            "y": 105.35,
            "is_outlier": false,
            "label": "Value: 105.35"
          },
          {
            "x": 276,
            "y": 24.9,
            "is_outlier": false,
            "label": "Value: 24.90"
          },
          {
            "x": 277,
            "y": 95.75,
            "is_outlier": false,
            "label": "Value: 95.75"
          },
          {
            "x": 278,
            "y": 97.9,
            "is_outlier": false,
            "label": "Value: 97.90"
          },
          {
            "x": 279,
            "y": 101.25,
            "is_outlier": false,
            "label": "Value: 101.25"
          },
          {
            "x": 280,
            "y": 24.45,
            "is_outlier": false,
            "label": "Value: 24.45"
          },
          {
            "x": 281,
            "y": 20.25,
            "is_outlier": false,
            "label": "Value: 20.25"
          },
          {
            "x": 282,
            "y": 19.7,
            "is_outlier": false,
            "label": "Value: 19.70"
          },
          {
            "x": 283,
            "y": 63.1,
            "is_outlier": false,
            "label": "Value: 63.10"
          },
          {
            "x": 284,
            "y": 105.95,
            "is_outlier": false,
            "label": "Value: 105.95"
          },
          {
            "x": 285,
            "y": 49.95,
            "is_outlier": false,
            "label": "Value: 49.95"
          },
          {
            "x": 286,
            "y": 25.9,
            "is_outlier": false,
            "label": "Value: 25.90"
          },
          {
            "x": 287,
            "y": 104.25,
            "is_outlier": false,
            "label": "Value: 104.25"
          },
          {
            "x": 288,
            "y": 19.75,
            "is_outlier": false,
            "label": "Value: 19.75"
          },
          {
            "x": 289,
            "y": 64.65,
            "is_outlier": false,
            "label": "Value: 64.65"
          },
          {
            "x": 290,
            "y": 89.35,
            "is_outlier": false,
            "label": "Value: 89.35"
          },
          {
            "x": 291,
            "y": 100.5,
            "is_outlier": false,
            "label": "Value: 100.50"
          },
          {
            "x": 292,
            "y": 24.45,
            "is_outlier": false,
            "label": "Value: 24.45"
          },
          {
            "x": 293,
            "y": 80.25,
            "is_outlier": false,
            "label": "Value: 80.25"
          },
          {
            "x": 294,
            "y": 98.3,
            "is_outlier": false,
            "label": "Value: 98.30"
          },
          {
            "x": 295,
            "y": 101.9,
            "is_outlier": false,
            "label": "Value: 101.90"
          },
          {
            "x": 296,
            "y": 103.95,
            "is_outlier": false,
            "label": "Value: 103.95"
          },
          {
            "x": 297,
            "y": 78.4,
            "is_outlier": false,
            "label": "Value: 78.40"
          },
          {
            "x": 298,
            "y": 49.35,
            "is_outlier": false,
            "label": "Value: 49.35"
          },
          {
            "x": 299,
            "y": 108.8,
            "is_outlier": false,
            "label": "Value: 108.80"
          },
          {
            "x": 300,
            "y": 70.65,
            "is_outlier": false,
            "label": "Value: 70.65"
          },
          {
            "x": 301,
            "y": 80.0,
            "is_outlier": false,
            "label": "Value: 80.00"
          },
          {
            "x": 302,
            "y": 73.35,
            "is_outlier": false,
            "label": "Value: 73.35"
          },
          {
            "x": 303,
            "y": 24.45,
            "is_outlier": false,
            "label": "Value: 24.45"
          },
          {
            "x": 304,
            "y": 20.6,
            "is_outlier": false,
            "label": "Value: 20.60"
          },
          {
            "x": 305,
            "y": 63.55,
            "is_outlier": false,
            "label": "Value: 63.55"
          },
          {
            "x": 306,
            "y": 50.15,
            "is_outlier": false,
            "label": "Value: 50.15"
          },
          {
            "x": 307,
            "y": 19.5,
            "is_outlier": false,
            "label": "Value: 19.50"
          },
          {
            "x": 308,
            "y": 85.3,
            "is_outlier": false,
            "label": "Value: 85.30"
          },
          {
            "x": 309,
            "y": 81.1,
            "is_outlier": false,
            "label": "Value: 81.10"
          },
          {
            "x": 310,
            "y": 94.1,
            "is_outlier": false,
            "label": "Value: 94.10"
          },
          {
            "x": 311,
            "y": 90.65,
            "is_outlier": false,
            "label": "Value: 90.65"
          },
          {
            "x": 312,
            "y": 78.35,
            "is_outlier": false,
            "label": "Value: 78.35"
          },
          {
            "x": 313,
            "y": 110.15,
            "is_outlier": false,
            "label": "Value: 110.15"
          },
          {
            "x": 314,
            "y": 85.7,
            "is_outlier": false,
            "label": "Value: 85.70"
          },
          {
            "x": 315,
            "y": 85.8,
            "is_outlier": false,
            "label": "Value: 85.80"
          },
          {
            "x": 316,
            "y": 95.4,
            "is_outlier": false,
            "label": "Value: 95.40"
          },
          {
            "x": 317,
            "y": 44.6,
            "is_outlier": false,
            "label": "Value: 44.60"
          },
          {
            "x": 318,
            "y": 75.7,
            "is_outlier": false,
            "label": "Value: 75.70"
          },
          {
            "x": 319,
            "y": 95.6,
            "is_outlier": false,
            "label": "Value: 95.60"
          },
          {
            "x": 320,
            "y": 30.4,
            "is_outlier": false,
            "label": "Value: 30.40"
          },
          {
            "x": 321,
            "y": 74.3,
            "is_outlier": false,
            "label": "Value: 74.30"
          },
          {
            "x": 322,
            "y": 113.2,
            "is_outlier": false,
            "label": "Value: 113.20"
          },
          {
            "x": 323,
            "y": 100.9,
            "is_outlier": false,
            "label": "Value: 100.90"
          },
          {
            "x": 324,
            "y": 55.8,
            "is_outlier": false,
            "label": "Value: 55.80"
          },
          {
            "x": 325,
            "y": 100.4,
            "is_outlier": false,
            "label": "Value: 100.40"
          },
          {
            "x": 326,
            "y": 20.6,
            "is_outlier": false,
            "label": "Value: 20.60"
          },
          {
            "x": 327,
            "y": 45.45,
            "is_outlier": false,
            "label": "Value: 45.45"
          },
          {
            "x": 328,
            "y": 50.35,
            "is_outlier": false,
            "label": "Value: 50.35"
          },
          {
            "x": 329,
            "y": 20.4,
            "is_outlier": false,
            "label": "Value: 20.40"
          },
          {
            "x": 330,
            "y": 85.7,
            "is_outlier": false,
            "label": "Value: 85.70"
          },
          {
            "x": 331,
            "y": 87.25,
            "is_outlier": false,
            "label": "Value: 87.25"
          },
          {
            "x": 332,
            "y": 85.8,
            "is_outlier": false,
            "label": "Value: 85.80"
          },
          {
            "x": 333,
            "y": 25.05,
            "is_outlier": false,
            "label": "Value: 25.05"
          },
          {
            "x": 334,
            "y": 19.95,
            "is_outlier": false,
            "label": "Value: 19.95"
          },
          {
            "x": 335,
            "y": 94.5,
            "is_outlier": false,
            "label": "Value: 94.50"
          },
          {
            "x": 336,
            "y": 110.45,
            "is_outlier": false,
            "label": "Value: 110.45"
          },
          {
            "x": 337,
            "y": 19.65,
            "is_outlier": false,
            "label": "Value: 19.65"
          },
          {
            "x": 338,
            "y": 75.5,
            "is_outlier": false,
            "label": "Value: 75.50"
          },
          {
            "x": 339,
            "y": 73.55,
            "is_outlier": false,
            "label": "Value: 73.55"
          },
          {
            "x": 340,
            "y": 30.25,
            "is_outlier": false,
            "label": "Value: 30.25"
          },
          {
            "x": 341,
            "y": 111.8,
            "is_outlier": false,
            "label": "Value: 111.80"
          },
          {
            "x": 342,
            "y": 20.7,
            "is_outlier": false,
            "label": "Value: 20.70"
          },
          {
            "x": 343,
            "y": 74.95,
            "is_outlier": false,
            "label": "Value: 74.95"
          },
          {
            "x": 344,
            "y": 80.0,
            "is_outlier": false,
            "label": "Value: 80.00"
          },
          {
            "x": 345,
            "y": 95.45,
            "is_outlier": false,
            "label": "Value: 95.45"
          },
          {
            "x": 346,
            "y": 25.25,
            "is_outlier": false,
            "label": "Value: 25.25"
          },
          {
            "x": 347,
            "y": 105.25,
            "is_outlier": false,
            "label": "Value: 105.25"
          },
          {
            "x": 348,
            "y": 70.15,
            "is_outlier": false,
            "label": "Value: 70.15"
          },
          {
            "x": 349,
            "y": 70.75,
            "is_outlier": false,
            "label": "Value: 70.75"
          },
          {
            "x": 350,
            "y": 99.45,
            "is_outlier": false,
            "label": "Value: 99.45"
          },
          {
            "x": 351,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 352,
            "y": 112.95,
            "is_outlier": false,
            "label": "Value: 112.95"
          },
          {
            "x": 353,
            "y": 84.4,
            "is_outlier": false,
            "label": "Value: 84.40"
          },
          {
            "x": 354,
            "y": 90.55,
            "is_outlier": false,
            "label": "Value: 90.55"
          },
          {
            "x": 355,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 356,
            "y": 75.1,
            "is_outlier": false,
            "label": "Value: 75.10"
          },
          {
            "x": 357,
            "y": 71.1,
            "is_outlier": false,
            "label": "Value: 71.10"
          },
          {
            "x": 358,
            "y": 23.5,
            "is_outlier": false,
            "label": "Value: 23.50"
          },
          {
            "x": 359,
            "y": 60.6,
            "is_outlier": false,
            "label": "Value: 60.60"
          },
          {
            "x": 360,
            "y": 63.75,
            "is_outlier": false,
            "label": "Value: 63.75"
          },
          {
            "x": 361,
            "y": 24.9,
            "is_outlier": false,
            "label": "Value: 24.90"
          },
          {
            "x": 362,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 363,
            "y": 55.0,
            "is_outlier": false,
            "label": "Value: 55.00"
          },
          {
            "x": 364,
            "y": 75.2,
            "is_outlier": false,
            "label": "Value: 75.20"
          },
          {
            "x": 365,
            "y": 97.8,
            "is_outlier": false,
            "label": "Value: 97.80"
          },
          {
            "x": 366,
            "y": 74.85,
            "is_outlier": false,
            "label": "Value: 74.85"
          },
          {
            "x": 367,
            "y": 74.0,
            "is_outlier": false,
            "label": "Value: 74.00"
          },
          {
            "x": 368,
            "y": 50.8,
            "is_outlier": false,
            "label": "Value: 50.80"
          },
          {
            "x": 369,
            "y": 56.2,
            "is_outlier": false,
            "label": "Value: 56.20"
          },
          {
            "x": 370,
            "y": 70.0,
            "is_outlier": false,
            "label": "Value: 70.00"
          },
          {
            "x": 371,
            "y": 60.8,
            "is_outlier": false,
            "label": "Value: 60.80"
          },
          {
            "x": 372,
            "y": 19.95,
            "is_outlier": false,
            "label": "Value: 19.95"
          },
          {
            "x": 373,
            "y": 45.8,
            "is_outlier": false,
            "label": "Value: 45.80"
          },
          {
            "x": 374,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 375,
            "y": 101.15,
            "is_outlier": false,
            "label": "Value: 101.15"
          },
          {
            "x": 376,
            "y": 73.85,
            "is_outlier": false,
            "label": "Value: 73.85"
          },
          {
            "x": 377,
            "y": 53.6,
            "is_outlier": false,
            "label": "Value: 53.60"
          },
          {
            "x": 378,
            "y": 75.55,
            "is_outlier": false,
            "label": "Value: 75.55"
          },
          {
            "x": 379,
            "y": 100.85,
            "is_outlier": false,
            "label": "Value: 100.85"
          },
          {
            "x": 380,
            "y": 88.35,
            "is_outlier": false,
            "label": "Value: 88.35"
          },
          {
            "x": 381,
            "y": 105.55,
            "is_outlier": false,
            "label": "Value: 105.55"
          },
          {
            "x": 382,
            "y": 90.65,
            "is_outlier": false,
            "label": "Value: 90.65"
          },
          {
            "x": 383,
            "y": 75.65,
            "is_outlier": false,
            "label": "Value: 75.65"
          },
          {
            "x": 384,
            "y": 39.65,
            "is_outlier": false,
            "label": "Value: 39.65"
          },
          {
            "x": 385,
            "y": 109.2,
            "is_outlier": false,
            "label": "Value: 109.20"
          },
          {
            "x": 386,
            "y": 54.9,
            "is_outlier": false,
            "label": "Value: 54.90"
          },
          {
            "x": 387,
            "y": 84.3,
            "is_outlier": false,
            "label": "Value: 84.30"
          },
          {
            "x": 388,
            "y": 89.2,
            "is_outlier": false,
            "label": "Value: 89.20"
          },
          {
            "x": 389,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 390,
            "y": 19.6,
            "is_outlier": false,
            "label": "Value: 19.60"
          },
          {
            "x": 391,
            "y": 106.1,
            "is_outlier": false,
            "label": "Value: 106.10"
          },
          {
            "x": 392,
            "y": 99.4,
            "is_outlier": false,
            "label": "Value: 99.40"
          },
          {
            "x": 393,
            "y": 49.75,
            "is_outlier": false,
            "label": "Value: 49.75"
          },
          {
            "x": 394,
            "y": 55.5,
            "is_outlier": false,
            "label": "Value: 55.50"
          },
          {
            "x": 395,
            "y": 19.45,
            "is_outlier": false,
            "label": "Value: 19.45"
          },
          {
            "x": 396,
            "y": 49.95,
            "is_outlier": false,
            "label": "Value: 49.95"
          },
          {
            "x": 397,
            "y": 56.45,
            "is_outlier": false,
            "label": "Value: 56.45"
          },
          {
            "x": 398,
            "y": 46.35,
            "is_outlier": false,
            "label": "Value: 46.35"
          },
          {
            "x": 399,
            "y": 85.35,
            "is_outlier": false,
            "label": "Value: 85.35"
          },
          {
            "x": 400,
            "y": 90.5,
            "is_outlier": false,
            "label": "Value: 90.50"
          },
          {
            "x": 401,
            "y": 35.55,
            "is_outlier": false,
            "label": "Value: 35.55"
          },
          {
            "x": 402,
            "y": 91.25,
            "is_outlier": false,
            "label": "Value: 91.25"
          },
          {
            "x": 403,
            "y": 50.8,
            "is_outlier": false,
            "label": "Value: 50.80"
          },
          {
            "x": 404,
            "y": 105.2,
            "is_outlier": false,
            "label": "Value: 105.20"
          },
          {
            "x": 405,
            "y": 74.65,
            "is_outlier": false,
            "label": "Value: 74.65"
          },
          {
            "x": 406,
            "y": 90.65,
            "is_outlier": false,
            "label": "Value: 90.65"
          },
          {
            "x": 407,
            "y": 49.25,
            "is_outlier": false,
            "label": "Value: 49.25"
          },
          {
            "x": 408,
            "y": 99.9,
            "is_outlier": false,
            "label": "Value: 99.90"
          },
          {
            "x": 409,
            "y": 61.25,
            "is_outlier": false,
            "label": "Value: 61.25"
          },
          {
            "x": 410,
            "y": 44.45,
            "is_outlier": false,
            "label": "Value: 44.45"
          },
          {
            "x": 411,
            "y": 51.6,
            "is_outlier": false,
            "label": "Value: 51.60"
          },
          {
            "x": 412,
            "y": 28.5,
            "is_outlier": false,
            "label": "Value: 28.50"
          },
          {
            "x": 413,
            "y": 48.8,
            "is_outlier": false,
            "label": "Value: 48.80"
          },
          {
            "x": 414,
            "y": 20.4,
            "is_outlier": false,
            "label": "Value: 20.40"
          },
          {
            "x": 415,
            "y": 49.7,
            "is_outlier": false,
            "label": "Value: 49.70"
          },
          {
            "x": 416,
            "y": 99.05,
            "is_outlier": false,
            "label": "Value: 99.05"
          },
          {
            "x": 417,
            "y": 104.5,
            "is_outlier": false,
            "label": "Value: 104.50"
          },
          {
            "x": 418,
            "y": 46.0,
            "is_outlier": false,
            "label": "Value: 46.00"
          },
          {
            "x": 419,
            "y": 85.15,
            "is_outlier": false,
            "label": "Value: 85.15"
          },
          {
            "x": 420,
            "y": 19.6,
            "is_outlier": false,
            "label": "Value: 19.60"
          },
          {
            "x": 421,
            "y": 85.85,
            "is_outlier": false,
            "label": "Value: 85.85"
          },
          {
            "x": 422,
            "y": 110.65,
            "is_outlier": false,
            "label": "Value: 110.65"
          },
          {
            "x": 423,
            "y": 62.8,
            "is_outlier": false,
            "label": "Value: 62.80"
          },
          {
            "x": 424,
            "y": 74.9,
            "is_outlier": false,
            "label": "Value: 74.90"
          },
          {
            "x": 425,
            "y": 100.5,
            "is_outlier": false,
            "label": "Value: 100.50"
          },
          {
            "x": 426,
            "y": 109.85,
            "is_outlier": false,
            "label": "Value: 109.85"
          },
          {
            "x": 427,
            "y": 97.0,
            "is_outlier": false,
            "label": "Value: 97.00"
          },
          {
            "x": 428,
            "y": 29.95,
            "is_outlier": false,
            "label": "Value: 29.95"
          },
          {
            "x": 429,
            "y": 54.95,
            "is_outlier": false,
            "label": "Value: 54.95"
          },
          {
            "x": 430,
            "y": 54.75,
            "is_outlier": false,
            "label": "Value: 54.75"
          },
          {
            "x": 431,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 432,
            "y": 81.7,
            "is_outlier": false,
            "label": "Value: 81.70"
          },
          {
            "x": 433,
            "y": 19.3,
            "is_outlier": false,
            "label": "Value: 19.30"
          },
          {
            "x": 434,
            "y": 19.75,
            "is_outlier": false,
            "label": "Value: 19.75"
          },
          {
            "x": 435,
            "y": 71.05,
            "is_outlier": false,
            "label": "Value: 71.05"
          },
          {
            "x": 436,
            "y": 94.55,
            "is_outlier": false,
            "label": "Value: 94.55"
          },
          {
            "x": 437,
            "y": 77.8,
            "is_outlier": false,
            "label": "Value: 77.80"
          },
          {
            "x": 438,
            "y": 93.85,
            "is_outlier": false,
            "label": "Value: 93.85"
          },
          {
            "x": 439,
            "y": 24.15,
            "is_outlier": false,
            "label": "Value: 24.15"
          },
          {
            "x": 440,
            "y": 78.95,
            "is_outlier": false,
            "label": "Value: 78.95"
          },
          {
            "x": 441,
            "y": 94.3,
            "is_outlier": false,
            "label": "Value: 94.30"
          },
          {
            "x": 442,
            "y": 80.45,
            "is_outlier": false,
            "label": "Value: 80.45"
          },
          {
            "x": 443,
            "y": 25.65,
            "is_outlier": false,
            "label": "Value: 25.65"
          },
          {
            "x": 444,
            "y": 48.25,
            "is_outlier": false,
            "label": "Value: 48.25"
          },
          {
            "x": 445,
            "y": 49.2,
            "is_outlier": false,
            "label": "Value: 49.20"
          },
          {
            "x": 446,
            "y": 59.2,
            "is_outlier": false,
            "label": "Value: 59.20"
          },
          {
            "x": 447,
            "y": 85.5,
            "is_outlier": false,
            "label": "Value: 85.50"
          },
          {
            "x": 448,
            "y": 90.95,
            "is_outlier": false,
            "label": "Value: 90.95"
          },
          {
            "x": 449,
            "y": 79.4,
            "is_outlier": false,
            "label": "Value: 79.40"
          },
          {
            "x": 450,
            "y": 104.1,
            "is_outlier": false,
            "label": "Value: 104.10"
          },
          {
            "x": 451,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 452,
            "y": 115.6,
            "is_outlier": false,
            "label": "Value: 115.60"
          },
          {
            "x": 453,
            "y": 44.65,
            "is_outlier": false,
            "label": "Value: 44.65"
          },
          {
            "x": 454,
            "y": 81.1,
            "is_outlier": false,
            "label": "Value: 81.10"
          },
          {
            "x": 455,
            "y": 89.85,
            "is_outlier": false,
            "label": "Value: 89.85"
          },
          {
            "x": 456,
            "y": 19.45,
            "is_outlier": false,
            "label": "Value: 19.45"
          },
          {
            "x": 457,
            "y": 39.1,
            "is_outlier": false,
            "label": "Value: 39.10"
          },
          {
            "x": 458,
            "y": 99.35,
            "is_outlier": false,
            "label": "Value: 99.35"
          },
          {
            "x": 459,
            "y": 60.95,
            "is_outlier": false,
            "label": "Value: 60.95"
          },
          {
            "x": 460,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 461,
            "y": 84.2,
            "is_outlier": false,
            "label": "Value: 84.20"
          },
          {
            "x": 462,
            "y": 20.05,
            "is_outlier": false,
            "label": "Value: 20.05"
          },
          {
            "x": 463,
            "y": 51.1,
            "is_outlier": false,
            "label": "Value: 51.10"
          },
          {
            "x": 464,
            "y": 20.2,
            "is_outlier": false,
            "label": "Value: 20.20"
          },
          {
            "x": 465,
            "y": 90.7,
            "is_outlier": false,
            "label": "Value: 90.70"
          },
          {
            "x": 466,
            "y": 90.7,
            "is_outlier": false,
            "label": "Value: 90.70"
          },
          {
            "x": 467,
            "y": 19.5,
            "is_outlier": false,
            "label": "Value: 19.50"
          },
          {
            "x": 468,
            "y": 70.3,
            "is_outlier": false,
            "label": "Value: 70.30"
          },
          {
            "x": 469,
            "y": 54.4,
            "is_outlier": false,
            "label": "Value: 54.40"
          },
          {
            "x": 470,
            "y": 60.05,
            "is_outlier": false,
            "label": "Value: 60.05"
          },
          {
            "x": 471,
            "y": 74.4,
            "is_outlier": false,
            "label": "Value: 74.40"
          },
          {
            "x": 472,
            "y": 54.25,
            "is_outlier": false,
            "label": "Value: 54.25"
          },
          {
            "x": 473,
            "y": 48.85,
            "is_outlier": false,
            "label": "Value: 48.85"
          },
          {
            "x": 474,
            "y": 91.4,
            "is_outlier": false,
            "label": "Value: 91.40"
          },
          {
            "x": 475,
            "y": 45.4,
            "is_outlier": false,
            "label": "Value: 45.40"
          },
          {
            "x": 476,
            "y": 50.2,
            "is_outlier": false,
            "label": "Value: 50.20"
          },
          {
            "x": 477,
            "y": 94.4,
            "is_outlier": false,
            "label": "Value: 94.40"
          },
          {
            "x": 478,
            "y": 29.35,
            "is_outlier": false,
            "label": "Value: 29.35"
          },
          {
            "x": 479,
            "y": 49.35,
            "is_outlier": false,
            "label": "Value: 49.35"
          },
          {
            "x": 480,
            "y": 70.95,
            "is_outlier": false,
            "label": "Value: 70.95"
          },
          {
            "x": 481,
            "y": 89.55,
            "is_outlier": false,
            "label": "Value: 89.55"
          },
          {
            "x": 482,
            "y": 92.1,
            "is_outlier": false,
            "label": "Value: 92.10"
          },
          {
            "x": 483,
            "y": 94.3,
            "is_outlier": false,
            "label": "Value: 94.30"
          },
          {
            "x": 484,
            "y": 100.1,
            "is_outlier": false,
            "label": "Value: 100.10"
          },
          {
            "x": 485,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 486,
            "y": 25.0,
            "is_outlier": false,
            "label": "Value: 25.00"
          },
          {
            "x": 487,
            "y": 19.55,
            "is_outlier": false,
            "label": "Value: 19.55"
          },
          {
            "x": 488,
            "y": 80.55,
            "is_outlier": false,
            "label": "Value: 80.55"
          },
          {
            "x": 489,
            "y": 19.1,
            "is_outlier": false,
            "label": "Value: 19.10"
          },
          {
            "x": 490,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 491,
            "y": 55.05,
            "is_outlier": false,
            "label": "Value: 55.05"
          },
          {
            "x": 492,
            "y": 44.0,
            "is_outlier": false,
            "label": "Value: 44.00"
          },
          {
            "x": 493,
            "y": 19.4,
            "is_outlier": false,
            "label": "Value: 19.40"
          },
          {
            "x": 494,
            "y": 24.15,
            "is_outlier": false,
            "label": "Value: 24.15"
          },
          {
            "x": 495,
            "y": 19.35,
            "is_outlier": false,
            "label": "Value: 19.35"
          },
          {
            "x": 496,
            "y": 35.2,
            "is_outlier": false,
            "label": "Value: 35.20"
          },
          {
            "x": 497,
            "y": 79.5,
            "is_outlier": false,
            "label": "Value: 79.50"
          },
          {
            "x": 498,
            "y": 60.2,
            "is_outlier": false,
            "label": "Value: 60.20"
          },
          {
            "x": 499,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 500,
            "y": 50.7,
            "is_outlier": false,
            "label": "Value: 50.70"
          },
          {
            "x": 501,
            "y": 24.05,
            "is_outlier": false,
            "label": "Value: 24.05"
          },
          {
            "x": 502,
            "y": 45.3,
            "is_outlier": false,
            "label": "Value: 45.30"
          },
          {
            "x": 503,
            "y": 79.9,
            "is_outlier": false,
            "label": "Value: 79.90"
          },
          {
            "x": 504,
            "y": 114.1,
            "is_outlier": false,
            "label": "Value: 114.10"
          },
          {
            "x": 505,
            "y": 78.9,
            "is_outlier": false,
            "label": "Value: 78.90"
          },
          {
            "x": 506,
            "y": 89.8,
            "is_outlier": false,
            "label": "Value: 89.80"
          },
          {
            "x": 507,
            "y": 25.45,
            "is_outlier": false,
            "label": "Value: 25.45"
          },
          {
            "x": 508,
            "y": 88.85,
            "is_outlier": false,
            "label": "Value: 88.85"
          },
          {
            "x": 509,
            "y": 81.55,
            "is_outlier": false,
            "label": "Value: 81.55"
          },
          {
            "x": 510,
            "y": 45.85,
            "is_outlier": false,
            "label": "Value: 45.85"
          },
          {
            "x": 511,
            "y": 89.45,
            "is_outlier": false,
            "label": "Value: 89.45"
          },
          {
            "x": 512,
            "y": 70.15,
            "is_outlier": false,
            "label": "Value: 70.15"
          },
          {
            "x": 513,
            "y": 74.35,
            "is_outlier": false,
            "label": "Value: 74.35"
          },
          {
            "x": 514,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 515,
            "y": 20.65,
            "is_outlier": false,
            "label": "Value: 20.65"
          },
          {
            "x": 516,
            "y": 53.75,
            "is_outlier": false,
            "label": "Value: 53.75"
          },
          {
            "x": 517,
            "y": 61.45,
            "is_outlier": false,
            "label": "Value: 61.45"
          },
          {
            "x": 518,
            "y": 25.95,
            "is_outlier": false,
            "label": "Value: 25.95"
          },
          {
            "x": 519,
            "y": 19.55,
            "is_outlier": false,
            "label": "Value: 19.55"
          },
          {
            "x": 520,
            "y": 71.35,
            "is_outlier": false,
            "label": "Value: 71.35"
          },
          {
            "x": 521,
            "y": 79.2,
            "is_outlier": false,
            "label": "Value: 79.20"
          },
          {
            "x": 522,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 523,
            "y": 26.0,
            "is_outlier": false,
            "label": "Value: 26.00"
          },
          {
            "x": 524,
            "y": 111.2,
            "is_outlier": false,
            "label": "Value: 111.20"
          },
          {
            "x": 525,
            "y": 56.7,
            "is_outlier": false,
            "label": "Value: 56.70"
          },
          {
            "x": 526,
            "y": 78.2,
            "is_outlier": false,
            "label": "Value: 78.20"
          },
          {
            "x": 527,
            "y": 19.4,
            "is_outlier": false,
            "label": "Value: 19.40"
          },
          {
            "x": 528,
            "y": 51.05,
            "is_outlier": false,
            "label": "Value: 51.05"
          },
          {
            "x": 529,
            "y": 97.1,
            "is_outlier": false,
            "label": "Value: 97.10"
          },
          {
            "x": 530,
            "y": 84.6,
            "is_outlier": false,
            "label": "Value: 84.60"
          },
          {
            "x": 531,
            "y": 18.95,
            "is_outlier": false,
            "label": "Value: 18.95"
          },
          {
            "x": 532,
            "y": 99.5,
            "is_outlier": false,
            "label": "Value: 99.50"
          },
          {
            "x": 533,
            "y": 65.25,
            "is_outlier": false,
            "label": "Value: 65.25"
          },
          {
            "x": 534,
            "y": 21.3,
            "is_outlier": false,
            "label": "Value: 21.30"
          },
          {
            "x": 535,
            "y": 49.85,
            "is_outlier": false,
            "label": "Value: 49.85"
          },
          {
            "x": 536,
            "y": 70.1,
            "is_outlier": false,
            "label": "Value: 70.10"
          },
          {
            "x": 537,
            "y": 59.85,
            "is_outlier": false,
            "label": "Value: 59.85"
          },
          {
            "x": 538,
            "y": 88.85,
            "is_outlier": false,
            "label": "Value: 88.85"
          },
          {
            "x": 539,
            "y": 104.75,
            "is_outlier": false,
            "label": "Value: 104.75"
          },
          {
            "x": 540,
            "y": 99.05,
            "is_outlier": false,
            "label": "Value: 99.05"
          },
          {
            "x": 541,
            "y": 69.05,
            "is_outlier": false,
            "label": "Value: 69.05"
          },
          {
            "x": 542,
            "y": 54.85,
            "is_outlier": false,
            "label": "Value: 54.85"
          },
          {
            "x": 543,
            "y": 72.9,
            "is_outlier": false,
            "label": "Value: 72.90"
          },
          {
            "x": 544,
            "y": 61.45,
            "is_outlier": false,
            "label": "Value: 61.45"
          },
          {
            "x": 545,
            "y": 69.55,
            "is_outlier": false,
            "label": "Value: 69.55"
          },
          {
            "x": 546,
            "y": 97.75,
            "is_outlier": false,
            "label": "Value: 97.75"
          },
          {
            "x": 547,
            "y": 84.75,
            "is_outlier": false,
            "label": "Value: 84.75"
          },
          {
            "x": 548,
            "y": 26.2,
            "is_outlier": false,
            "label": "Value: 26.20"
          },
          {
            "x": 549,
            "y": 19.4,
            "is_outlier": false,
            "label": "Value: 19.40"
          },
          {
            "x": 550,
            "y": 90.9,
            "is_outlier": false,
            "label": "Value: 90.90"
          },
          {
            "x": 551,
            "y": 44.6,
            "is_outlier": false,
            "label": "Value: 44.60"
          },
          {
            "x": 552,
            "y": 20.4,
            "is_outlier": false,
            "label": "Value: 20.40"
          },
          {
            "x": 553,
            "y": 55.3,
            "is_outlier": false,
            "label": "Value: 55.30"
          },
          {
            "x": 554,
            "y": 90.3,
            "is_outlier": false,
            "label": "Value: 90.30"
          },
          {
            "x": 555,
            "y": 85.95,
            "is_outlier": false,
            "label": "Value: 85.95"
          },
          {
            "x": 556,
            "y": 78.55,
            "is_outlier": false,
            "label": "Value: 78.55"
          },
          {
            "x": 557,
            "y": 19.35,
            "is_outlier": false,
            "label": "Value: 19.35"
          },
          {
            "x": 558,
            "y": 111.15,
            "is_outlier": false,
            "label": "Value: 111.15"
          },
          {
            "x": 559,
            "y": 52.7,
            "is_outlier": false,
            "label": "Value: 52.70"
          },
          {
            "x": 560,
            "y": 116.55,
            "is_outlier": false,
            "label": "Value: 116.55"
          },
          {
            "x": 561,
            "y": 69.95,
            "is_outlier": false,
            "label": "Value: 69.95"
          },
          {
            "x": 562,
            "y": 105.25,
            "is_outlier": false,
            "label": "Value: 105.25"
          },
          {
            "x": 563,
            "y": 75.35,
            "is_outlier": false,
            "label": "Value: 75.35"
          },
          {
            "x": 564,
            "y": 74.3,
            "is_outlier": false,
            "label": "Value: 74.30"
          },
          {
            "x": 565,
            "y": 25.25,
            "is_outlier": false,
            "label": "Value: 25.25"
          },
          {
            "x": 566,
            "y": 96.25,
            "is_outlier": false,
            "label": "Value: 96.25"
          },
          {
            "x": 567,
            "y": 96.55,
            "is_outlier": false,
            "label": "Value: 96.55"
          },
          {
            "x": 568,
            "y": 65.0,
            "is_outlier": false,
            "label": "Value: 65.00"
          },
          {
            "x": 569,
            "y": 80.5,
            "is_outlier": false,
            "label": "Value: 80.50"
          },
          {
            "x": 570,
            "y": 20.05,
            "is_outlier": false,
            "label": "Value: 20.05"
          },
          {
            "x": 571,
            "y": 109.75,
            "is_outlier": false,
            "label": "Value: 109.75"
          },
          {
            "x": 572,
            "y": 71.6,
            "is_outlier": false,
            "label": "Value: 71.60"
          },
          {
            "x": 573,
            "y": 19.35,
            "is_outlier": false,
            "label": "Value: 19.35"
          },
          {
            "x": 574,
            "y": 19.5,
            "is_outlier": false,
            "label": "Value: 19.50"
          },
          {
            "x": 575,
            "y": 108.55,
            "is_outlier": false,
            "label": "Value: 108.55"
          },
          {
            "x": 576,
            "y": 61.35,
            "is_outlier": false,
            "label": "Value: 61.35"
          },
          {
            "x": 577,
            "y": 99.8,
            "is_outlier": false,
            "label": "Value: 99.80"
          },
          {
            "x": 578,
            "y": 92.55,
            "is_outlier": false,
            "label": "Value: 92.55"
          },
          {
            "x": 579,
            "y": 20.4,
            "is_outlier": false,
            "label": "Value: 20.40"
          },
          {
            "x": 580,
            "y": 60.2,
            "is_outlier": false,
            "label": "Value: 60.20"
          },
          {
            "x": 581,
            "y": 104.8,
            "is_outlier": false,
            "label": "Value: 104.80"
          },
          {
            "x": 582,
            "y": 88.4,
            "is_outlier": false,
            "label": "Value: 88.40"
          },
          {
            "x": 583,
            "y": 95.65,
            "is_outlier": false,
            "label": "Value: 95.65"
          },
          {
            "x": 584,
            "y": 77.5,
            "is_outlier": false,
            "label": "Value: 77.50"
          },
          {
            "x": 585,
            "y": 25.55,
            "is_outlier": false,
            "label": "Value: 25.55"
          },
          {
            "x": 586,
            "y": 100.35,
            "is_outlier": false,
            "label": "Value: 100.35"
          },
          {
            "x": 587,
            "y": 74.95,
            "is_outlier": false,
            "label": "Value: 74.95"
          },
          {
            "x": 588,
            "y": 95.75,
            "is_outlier": false,
            "label": "Value: 95.75"
          },
          {
            "x": 589,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 590,
            "y": 20.05,
            "is_outlier": false,
            "label": "Value: 20.05"
          },
          {
            "x": 591,
            "y": 108.3,
            "is_outlier": false,
            "label": "Value: 108.30"
          },
          {
            "x": 592,
            "y": 19.8,
            "is_outlier": false,
            "label": "Value: 19.80"
          },
          {
            "x": 593,
            "y": 24.05,
            "is_outlier": false,
            "label": "Value: 24.05"
          },
          {
            "x": 594,
            "y": 58.9,
            "is_outlier": false,
            "label": "Value: 58.90"
          },
          {
            "x": 595,
            "y": 114.0,
            "is_outlier": false,
            "label": "Value: 114.00"
          },
          {
            "x": 596,
            "y": 20.6,
            "is_outlier": false,
            "label": "Value: 20.60"
          },
          {
            "x": 597,
            "y": 40.3,
            "is_outlier": false,
            "label": "Value: 40.30"
          },
          {
            "x": 598,
            "y": 98.6,
            "is_outlier": false,
            "label": "Value: 98.60"
          },
          {
            "x": 599,
            "y": 20.7,
            "is_outlier": false,
            "label": "Value: 20.70"
          },
          {
            "x": 600,
            "y": 54.6,
            "is_outlier": false,
            "label": "Value: 54.60"
          },
          {
            "x": 601,
            "y": 36.15,
            "is_outlier": false,
            "label": "Value: 36.15"
          },
          {
            "x": 602,
            "y": 19.55,
            "is_outlier": false,
            "label": "Value: 19.55"
          },
          {
            "x": 603,
            "y": 20.35,
            "is_outlier": false,
            "label": "Value: 20.35"
          },
          {
            "x": 604,
            "y": 100.8,
            "is_outlier": false,
            "label": "Value: 100.80"
          },
          {
            "x": 605,
            "y": 24.75,
            "is_outlier": false,
            "label": "Value: 24.75"
          },
          {
            "x": 606,
            "y": 25.7,
            "is_outlier": false,
            "label": "Value: 25.70"
          },
          {
            "x": 607,
            "y": 49.55,
            "is_outlier": false,
            "label": "Value: 49.55"
          },
          {
            "x": 608,
            "y": 55.0,
            "is_outlier": false,
            "label": "Value: 55.00"
          },
          {
            "x": 609,
            "y": 97.55,
            "is_outlier": false,
            "label": "Value: 97.55"
          },
          {
            "x": 610,
            "y": 85.75,
            "is_outlier": false,
            "label": "Value: 85.75"
          },
          {
            "x": 611,
            "y": 115.55,
            "is_outlier": false,
            "label": "Value: 115.55"
          },
          {
            "x": 612,
            "y": 85.0,
            "is_outlier": false,
            "label": "Value: 85.00"
          },
          {
            "x": 613,
            "y": 45.25,
            "is_outlier": false,
            "label": "Value: 45.25"
          },
          {
            "x": 614,
            "y": 69.75,
            "is_outlier": false,
            "label": "Value: 69.75"
          },
          {
            "x": 615,
            "y": 79.85,
            "is_outlier": false,
            "label": "Value: 79.85"
          },
          {
            "x": 616,
            "y": 45.3,
            "is_outlier": false,
            "label": "Value: 45.30"
          },
          {
            "x": 617,
            "y": 105.05,
            "is_outlier": false,
            "label": "Value: 105.05"
          },
          {
            "x": 618,
            "y": 20.8,
            "is_outlier": false,
            "label": "Value: 20.80"
          },
          {
            "x": 619,
            "y": 93.15,
            "is_outlier": false,
            "label": "Value: 93.15"
          },
          {
            "x": 620,
            "y": 75.55,
            "is_outlier": false,
            "label": "Value: 75.55"
          },
          {
            "x": 621,
            "y": 103.0,
            "is_outlier": false,
            "label": "Value: 103.00"
          },
          {
            "x": 622,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 623,
            "y": 99.4,
            "is_outlier": false,
            "label": "Value: 99.40"
          },
          {
            "x": 624,
            "y": 20.45,
            "is_outlier": false,
            "label": "Value: 20.45"
          },
          {
            "x": 625,
            "y": 62.85,
            "is_outlier": false,
            "label": "Value: 62.85"
          },
          {
            "x": 626,
            "y": 101.85,
            "is_outlier": false,
            "label": "Value: 101.85"
          },
          {
            "x": 627,
            "y": 74.45,
            "is_outlier": false,
            "label": "Value: 74.45"
          },
          {
            "x": 628,
            "y": 34.5,
            "is_outlier": false,
            "label": "Value: 34.50"
          },
          {
            "x": 629,
            "y": 103.15,
            "is_outlier": false,
            "label": "Value: 103.15"
          },
          {
            "x": 630,
            "y": 79.35,
            "is_outlier": false,
            "label": "Value: 79.35"
          },
          {
            "x": 631,
            "y": 40.15,
            "is_outlier": false,
            "label": "Value: 40.15"
          },
          {
            "x": 632,
            "y": 100.8,
            "is_outlier": false,
            "label": "Value: 100.80"
          },
          {
            "x": 633,
            "y": 20.0,
            "is_outlier": false,
            "label": "Value: 20.00"
          },
          {
            "x": 634,
            "y": 61.05,
            "is_outlier": false,
            "label": "Value: 61.05"
          },
          {
            "x": 635,
            "y": 75.65,
            "is_outlier": false,
            "label": "Value: 75.65"
          },
          {
            "x": 636,
            "y": 60.3,
            "is_outlier": false,
            "label": "Value: 60.30"
          },
          {
            "x": 637,
            "y": 45.7,
            "is_outlier": false,
            "label": "Value: 45.70"
          },
          {
            "x": 638,
            "y": 90.55,
            "is_outlier": false,
            "label": "Value: 90.55"
          },
          {
            "x": 639,
            "y": 71.3,
            "is_outlier": false,
            "label": "Value: 71.30"
          },
          {
            "x": 640,
            "y": 102.45,
            "is_outlier": false,
            "label": "Value: 102.45"
          },
          {
            "x": 641,
            "y": 100.3,
            "is_outlier": false,
            "label": "Value: 100.30"
          },
          {
            "x": 642,
            "y": 20.1,
            "is_outlier": false,
            "label": "Value: 20.10"
          },
          {
            "x": 643,
            "y": 104.5,
            "is_outlier": false,
            "label": "Value: 104.50"
          },
          {
            "x": 644,
            "y": 33.75,
            "is_outlier": false,
            "label": "Value: 33.75"
          },
          {
            "x": 645,
            "y": 30.4,
            "is_outlier": false,
            "label": "Value: 30.40"
          },
          {
            "x": 646,
            "y": 104.95,
            "is_outlier": false,
            "label": "Value: 104.95"
          },
          {
            "x": 647,
            "y": 81.5,
            "is_outlier": false,
            "label": "Value: 81.50"
          },
          {
            "x": 648,
            "y": 19.85,
            "is_outlier": false,
            "label": "Value: 19.85"
          },
          {
            "x": 649,
            "y": 35.45,
            "is_outlier": false,
            "label": "Value: 35.45"
          },
          {
            "x": 650,
            "y": 74.4,
            "is_outlier": false,
            "label": "Value: 74.40"
          },
          {
            "x": 651,
            "y": 98.6,
            "is_outlier": false,
            "label": "Value: 98.60"
          },
          {
            "x": 652,
            "y": 109.65,
            "is_outlier": false,
            "label": "Value: 109.65"
          },
          {
            "x": 653,
            "y": 69.7,
            "is_outlier": false,
            "label": "Value: 69.70"
          },
          {
            "x": 654,
            "y": 86.45,
            "is_outlier": false,
            "label": "Value: 86.45"
          },
          {
            "x": 655,
            "y": 113.8,
            "is_outlier": false,
            "label": "Value: 113.80"
          },
          {
            "x": 656,
            "y": 74.65,
            "is_outlier": false,
            "label": "Value: 74.65"
          },
          {
            "x": 657,
            "y": 59.0,
            "is_outlier": false,
            "label": "Value: 59.00"
          },
          {
            "x": 658,
            "y": 68.45,
            "is_outlier": false,
            "label": "Value: 68.45"
          },
          {
            "x": 659,
            "y": 36.5,
            "is_outlier": false,
            "label": "Value: 36.50"
          },
          {
            "x": 660,
            "y": 91.7,
            "is_outlier": false,
            "label": "Value: 91.70"
          },
          {
            "x": 661,
            "y": 40.65,
            "is_outlier": false,
            "label": "Value: 40.65"
          },
          {
            "x": 662,
            "y": 74.85,
            "is_outlier": false,
            "label": "Value: 74.85"
          },
          {
            "x": 663,
            "y": 66.05,
            "is_outlier": false,
            "label": "Value: 66.05"
          },
          {
            "x": 664,
            "y": 113.65,
            "is_outlier": false,
            "label": "Value: 113.65"
          },
          {
            "x": 665,
            "y": 44.8,
            "is_outlier": false,
            "label": "Value: 44.80"
          },
          {
            "x": 666,
            "y": 50.65,
            "is_outlier": false,
            "label": "Value: 50.65"
          },
          {
            "x": 667,
            "y": 51.55,
            "is_outlier": false,
            "label": "Value: 51.55"
          },
          {
            "x": 668,
            "y": 45.4,
            "is_outlier": false,
            "label": "Value: 45.40"
          },
          {
            "x": 669,
            "y": 80.6,
            "is_outlier": false,
            "label": "Value: 80.60"
          },
          {
            "x": 670,
            "y": 75.75,
            "is_outlier": false,
            "label": "Value: 75.75"
          },
          {
            "x": 671,
            "y": 70.25,
            "is_outlier": false,
            "label": "Value: 70.25"
          },
          {
            "x": 672,
            "y": 105.2,
            "is_outlier": false,
            "label": "Value: 105.20"
          },
          {
            "x": 673,
            "y": 44.85,
            "is_outlier": false,
            "label": "Value: 44.85"
          },
          {
            "x": 674,
            "y": 89.2,
            "is_outlier": false,
            "label": "Value: 89.20"
          },
          {
            "x": 675,
            "y": 71.1,
            "is_outlier": false,
            "label": "Value: 71.10"
          },
          {
            "x": 676,
            "y": 38.85,
            "is_outlier": false,
            "label": "Value: 38.85"
          },
          {
            "x": 677,
            "y": 68.65,
            "is_outlier": false,
            "label": "Value: 68.65"
          },
          {
            "x": 678,
            "y": 73.85,
            "is_outlier": false,
            "label": "Value: 73.85"
          },
          {
            "x": 679,
            "y": 36.0,
            "is_outlier": false,
            "label": "Value: 36.00"
          },
          {
            "x": 680,
            "y": 108.55,
            "is_outlier": false,
            "label": "Value: 108.55"
          },
          {
            "x": 681,
            "y": 101.5,
            "is_outlier": false,
            "label": "Value: 101.50"
          },
          {
            "x": 682,
            "y": 49.4,
            "is_outlier": false,
            "label": "Value: 49.40"
          },
          {
            "x": 683,
            "y": 84.05,
            "is_outlier": false,
            "label": "Value: 84.05"
          },
          {
            "x": 684,
            "y": 105.2,
            "is_outlier": false,
            "label": "Value: 105.20"
          },
          {
            "x": 685,
            "y": 55.3,
            "is_outlier": false,
            "label": "Value: 55.30"
          },
          {
            "x": 686,
            "y": 99.75,
            "is_outlier": false,
            "label": "Value: 99.75"
          },
          {
            "x": 687,
            "y": 64.75,
            "is_outlier": false,
            "label": "Value: 64.75"
          },
          {
            "x": 688,
            "y": 77.5,
            "is_outlier": false,
            "label": "Value: 77.50"
          },
          {
            "x": 689,
            "y": 29.8,
            "is_outlier": false,
            "label": "Value: 29.80"
          },
          {
            "x": 690,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 691,
            "y": 84.6,
            "is_outlier": false,
            "label": "Value: 84.60"
          },
          {
            "x": 692,
            "y": 103.75,
            "is_outlier": false,
            "label": "Value: 103.75"
          },
          {
            "x": 693,
            "y": 51.25,
            "is_outlier": false,
            "label": "Value: 51.25"
          },
          {
            "x": 694,
            "y": 95.8,
            "is_outlier": false,
            "label": "Value: 95.80"
          },
          {
            "x": 695,
            "y": 103.95,
            "is_outlier": false,
            "label": "Value: 103.95"
          },
          {
            "x": 696,
            "y": 105.65,
            "is_outlier": false,
            "label": "Value: 105.65"
          },
          {
            "x": 697,
            "y": 19.7,
            "is_outlier": false,
            "label": "Value: 19.70"
          },
          {
            "x": 698,
            "y": 19.6,
            "is_outlier": false,
            "label": "Value: 19.60"
          },
          {
            "x": 699,
            "y": 100.5,
            "is_outlier": false,
            "label": "Value: 100.50"
          },
          {
            "x": 700,
            "y": 24.8,
            "is_outlier": false,
            "label": "Value: 24.80"
          },
          {
            "x": 701,
            "y": 107.55,
            "is_outlier": false,
            "label": "Value: 107.55"
          },
          {
            "x": 702,
            "y": 59.45,
            "is_outlier": false,
            "label": "Value: 59.45"
          },
          {
            "x": 703,
            "y": 105.25,
            "is_outlier": false,
            "label": "Value: 105.25"
          },
          {
            "x": 704,
            "y": 24.85,
            "is_outlier": false,
            "label": "Value: 24.85"
          },
          {
            "x": 705,
            "y": 90.55,
            "is_outlier": false,
            "label": "Value: 90.55"
          },
          {
            "x": 706,
            "y": 93.5,
            "is_outlier": false,
            "label": "Value: 93.50"
          },
          {
            "x": 707,
            "y": 100.3,
            "is_outlier": false,
            "label": "Value: 100.30"
          },
          {
            "x": 708,
            "y": 20.55,
            "is_outlier": false,
            "label": "Value: 20.55"
          },
          {
            "x": 709,
            "y": 85.15,
            "is_outlier": false,
            "label": "Value: 85.15"
          },
          {
            "x": 710,
            "y": 99.0,
            "is_outlier": false,
            "label": "Value: 99.00"
          },
          {
            "x": 711,
            "y": 75.15,
            "is_outlier": false,
            "label": "Value: 75.15"
          },
          {
            "x": 712,
            "y": 84.3,
            "is_outlier": false,
            "label": "Value: 84.30"
          },
          {
            "x": 713,
            "y": 94.15,
            "is_outlier": false,
            "label": "Value: 94.15"
          },
          {
            "x": 714,
            "y": 85.0,
            "is_outlier": false,
            "label": "Value: 85.00"
          },
          {
            "x": 715,
            "y": 106.45,
            "is_outlier": false,
            "label": "Value: 106.45"
          },
          {
            "x": 716,
            "y": 50.0,
            "is_outlier": false,
            "label": "Value: 50.00"
          },
          {
            "x": 717,
            "y": 81.3,
            "is_outlier": false,
            "label": "Value: 81.30"
          },
          {
            "x": 718,
            "y": 96.9,
            "is_outlier": false,
            "label": "Value: 96.90"
          },
          {
            "x": 719,
            "y": 73.9,
            "is_outlier": false,
            "label": "Value: 73.90"
          },
          {
            "x": 720,
            "y": 38.1,
            "is_outlier": false,
            "label": "Value: 38.10"
          },
          {
            "x": 721,
            "y": 81.85,
            "is_outlier": false,
            "label": "Value: 81.85"
          },
          {
            "x": 722,
            "y": 43.75,
            "is_outlier": false,
            "label": "Value: 43.75"
          },
          {
            "x": 723,
            "y": 30.75,
            "is_outlier": false,
            "label": "Value: 30.75"
          },
          {
            "x": 724,
            "y": 90.8,
            "is_outlier": false,
            "label": "Value: 90.80"
          },
          {
            "x": 725,
            "y": 25.1,
            "is_outlier": false,
            "label": "Value: 25.10"
          },
          {
            "x": 726,
            "y": 79.35,
            "is_outlier": false,
            "label": "Value: 79.35"
          },
          {
            "x": 727,
            "y": 80.35,
            "is_outlier": false,
            "label": "Value: 80.35"
          },
          {
            "x": 728,
            "y": 66.25,
            "is_outlier": false,
            "label": "Value: 66.25"
          },
          {
            "x": 729,
            "y": 54.8,
            "is_outlier": false,
            "label": "Value: 54.80"
          },
          {
            "x": 730,
            "y": 44.0,
            "is_outlier": false,
            "label": "Value: 44.00"
          },
          {
            "x": 731,
            "y": 90.85,
            "is_outlier": false,
            "label": "Value: 90.85"
          },
          {
            "x": 732,
            "y": 82.15,
            "is_outlier": false,
            "label": "Value: 82.15"
          },
          {
            "x": 733,
            "y": 66.4,
            "is_outlier": false,
            "label": "Value: 66.40"
          },
          {
            "x": 734,
            "y": 83.85,
            "is_outlier": false,
            "label": "Value: 83.85"
          },
          {
            "x": 735,
            "y": 69.9,
            "is_outlier": false,
            "label": "Value: 69.90"
          },
          {
            "x": 736,
            "y": 19.6,
            "is_outlier": false,
            "label": "Value: 19.60"
          },
          {
            "x": 737,
            "y": 74.2,
            "is_outlier": false,
            "label": "Value: 74.20"
          },
          {
            "x": 738,
            "y": 44.8,
            "is_outlier": false,
            "label": "Value: 44.80"
          },
          {
            "x": 739,
            "y": 55.3,
            "is_outlier": false,
            "label": "Value: 55.30"
          },
          {
            "x": 740,
            "y": 54.35,
            "is_outlier": false,
            "label": "Value: 54.35"
          },
          {
            "x": 741,
            "y": 59.6,
            "is_outlier": false,
            "label": "Value: 59.60"
          },
          {
            "x": 742,
            "y": 78.2,
            "is_outlier": false,
            "label": "Value: 78.20"
          },
          {
            "x": 743,
            "y": 20.2,
            "is_outlier": false,
            "label": "Value: 20.20"
          },
          {
            "x": 744,
            "y": 93.3,
            "is_outlier": false,
            "label": "Value: 93.30"
          },
          {
            "x": 745,
            "y": 20.25,
            "is_outlier": false,
            "label": "Value: 20.25"
          },
          {
            "x": 746,
            "y": 80.7,
            "is_outlier": false,
            "label": "Value: 80.70"
          },
          {
            "x": 747,
            "y": 55.55,
            "is_outlier": false,
            "label": "Value: 55.55"
          },
          {
            "x": 748,
            "y": 92.3,
            "is_outlier": false,
            "label": "Value: 92.30"
          },
          {
            "x": 749,
            "y": 89.6,
            "is_outlier": false,
            "label": "Value: 89.60"
          },
          {
            "x": 750,
            "y": 70.85,
            "is_outlier": false,
            "label": "Value: 70.85"
          },
          {
            "x": 751,
            "y": 19.35,
            "is_outlier": false,
            "label": "Value: 19.35"
          },
          {
            "x": 752,
            "y": 115.55,
            "is_outlier": false,
            "label": "Value: 115.55"
          },
          {
            "x": 753,
            "y": 100.05,
            "is_outlier": false,
            "label": "Value: 100.05"
          },
          {
            "x": 754,
            "y": 85.25,
            "is_outlier": false,
            "label": "Value: 85.25"
          },
          {
            "x": 755,
            "y": 24.5,
            "is_outlier": false,
            "label": "Value: 24.50"
          },
          {
            "x": 756,
            "y": 19.75,
            "is_outlier": false,
            "label": "Value: 19.75"
          },
          {
            "x": 757,
            "y": 75.5,
            "is_outlier": false,
            "label": "Value: 75.50"
          },
          {
            "x": 758,
            "y": 79.5,
            "is_outlier": false,
            "label": "Value: 79.50"
          },
          {
            "x": 759,
            "y": 51.0,
            "is_outlier": false,
            "label": "Value: 51.00"
          },
          {
            "x": 760,
            "y": 93.25,
            "is_outlier": false,
            "label": "Value: 93.25"
          },
          {
            "x": 761,
            "y": 73.05,
            "is_outlier": false,
            "label": "Value: 73.05"
          },
          {
            "x": 762,
            "y": 19.7,
            "is_outlier": false,
            "label": "Value: 19.70"
          },
          {
            "x": 763,
            "y": 91.7,
            "is_outlier": false,
            "label": "Value: 91.70"
          },
          {
            "x": 764,
            "y": 50.1,
            "is_outlier": false,
            "label": "Value: 50.10"
          },
          {
            "x": 765,
            "y": 50.3,
            "is_outlier": false,
            "label": "Value: 50.30"
          },
          {
            "x": 766,
            "y": 19.65,
            "is_outlier": false,
            "label": "Value: 19.65"
          },
          {
            "x": 767,
            "y": 98.7,
            "is_outlier": false,
            "label": "Value: 98.70"
          },
          {
            "x": 768,
            "y": 50.05,
            "is_outlier": false,
            "label": "Value: 50.05"
          },
          {
            "x": 769,
            "y": 93.8,
            "is_outlier": false,
            "label": "Value: 93.80"
          },
          {
            "x": 770,
            "y": 74.05,
            "is_outlier": false,
            "label": "Value: 74.05"
          },
          {
            "x": 771,
            "y": 84.6,
            "is_outlier": false,
            "label": "Value: 84.60"
          },
          {
            "x": 772,
            "y": 74.25,
            "is_outlier": false,
            "label": "Value: 74.25"
          },
          {
            "x": 773,
            "y": 68.8,
            "is_outlier": false,
            "label": "Value: 68.80"
          },
          {
            "x": 774,
            "y": 89.75,
            "is_outlier": false,
            "label": "Value: 89.75"
          },
          {
            "x": 775,
            "y": 19.95,
            "is_outlier": false,
            "label": "Value: 19.95"
          },
          {
            "x": 776,
            "y": 24.85,
            "is_outlier": false,
            "label": "Value: 24.85"
          },
          {
            "x": 777,
            "y": 94.85,
            "is_outlier": false,
            "label": "Value: 94.85"
          },
          {
            "x": 778,
            "y": 55.4,
            "is_outlier": false,
            "label": "Value: 55.40"
          },
          {
            "x": 779,
            "y": 19.6,
            "is_outlier": false,
            "label": "Value: 19.60"
          },
          {
            "x": 780,
            "y": 20.15,
            "is_outlier": false,
            "label": "Value: 20.15"
          },
          {
            "x": 781,
            "y": 59.15,
            "is_outlier": false,
            "label": "Value: 59.15"
          },
          {
            "x": 782,
            "y": 71.0,
            "is_outlier": false,
            "label": "Value: 71.00"
          },
          {
            "x": 783,
            "y": 20.5,
            "is_outlier": false,
            "label": "Value: 20.50"
          },
          {
            "x": 784,
            "y": 71.0,
            "is_outlier": false,
            "label": "Value: 71.00"
          },
          {
            "x": 785,
            "y": 111.3,
            "is_outlier": false,
            "label": "Value: 111.30"
          },
          {
            "x": 786,
            "y": 24.2,
            "is_outlier": false,
            "label": "Value: 24.20"
          },
          {
            "x": 787,
            "y": 105.15,
            "is_outlier": false,
            "label": "Value: 105.15"
          },
          {
            "x": 788,
            "y": 24.0,
            "is_outlier": false,
            "label": "Value: 24.00"
          },
          {
            "x": 789,
            "y": 116.3,
            "is_outlier": false,
            "label": "Value: 116.30"
          },
          {
            "x": 790,
            "y": 94.25,
            "is_outlier": false,
            "label": "Value: 94.25"
          },
          {
            "x": 791,
            "y": 20.8,
            "is_outlier": false,
            "label": "Value: 20.80"
          },
          {
            "x": 792,
            "y": 107.95,
            "is_outlier": false,
            "label": "Value: 107.95"
          },
          {
            "x": 793,
            "y": 88.7,
            "is_outlier": false,
            "label": "Value: 88.70"
          },
          {
            "x": 794,
            "y": 89.65,
            "is_outlier": false,
            "label": "Value: 89.65"
          },
          {
            "x": 795,
            "y": 55.55,
            "is_outlier": false,
            "label": "Value: 55.55"
          },
          {
            "x": 796,
            "y": 75.15,
            "is_outlier": false,
            "label": "Value: 75.15"
          },
          {
            "x": 797,
            "y": 51.5,
            "is_outlier": false,
            "label": "Value: 51.50"
          },
          {
            "x": 798,
            "y": 94.8,
            "is_outlier": false,
            "label": "Value: 94.80"
          },
          {
            "x": 799,
            "y": 20.2,
            "is_outlier": false,
            "label": "Value: 20.20"
          }
        ],
        "outlier_column": "Monthly Charges",
        "total_outliers": 0,
        "outlier_percentage": 0.0,
        "outlier_list": [],
        "outlier_explanation": "IQR-based outlier detection on Monthly Charges found no statistical outliers ($18.25–$118.75 range) — pricing tiers are consistent with no billing anomalies.",
        "correlations": {
          "labels": [
            "tenure vs MonthlyCharges",
            "tenure vs TotalCharges"
          ],
          "values": [
            0.2479,
            0.8259
          ]
        },
        "correlation_target": "tenure",
        "correlation_explanation": "Tenure correlates strongly with Total Charges (r=0.83) as expected, but only weakly with Monthly Charges (r=0.25) — long-tenured customers accumulate spend over time rather than paying more per month.",
        "categorical_1": [
          {
            "category": "Month-to-month",
            "count": 3875
          },
          {
            "category": "Two year",
            "count": 1695
          },
          {
            "category": "One year",
            "count": 1473
          }
        ],
        "categorical_1_column": "Contract",
        "categorical_2": [
          {
            "category": "Electronic check",
            "count": 2365
          },
          {
            "category": "Mailed check",
            "count": 1612
          },
          {
            "category": "Bank transfer (automatic)",
            "count": 1544
          },
          {
            "category": "Credit card (automatic)",
            "count": 1522
          }
        ],
        "categorical_2_column": "Payment Method",
        "categorical_explanation": "Contract type and payment method breakdowns for the full customer base — month-to-month is the dominant contract type (3,875 of 7,043), and Electronic check is the most common payment method (2,365)."
      },
      "data_quality": {
        "duplicate_count": 0,
        "duplicate_percentage": 0.0,
        "worst_missing_column": {
          "column": "TotalCharges",
          "percentage": 0.2
        },
        "avg_missing_percentage": 0.01,
        "columns_with_missing": [
          {
            "column": "TotalCharges",
            "percentage": 0.2
          }
        ]
      }
    }
  },
  "health": {
    "label": "Population Health",
    "icon": "🩺",
    "rows": "8,388 rows",
    "metrics": {
      "margin": "Average BMI: 30.0 across 8,388 individuals (clinical obesity threshold)",
      "margin_signal": "Average BMI: 30.0 across 8,388 individuals (clinical obesity threshold)",
      "executiveSummary": "This NHANES health survey dataset contains anthropometric measurements for 8,388 individuals, capturing weight, standing height, and BMI. The average BMI of 30.0 sits right at the clinical threshold for obesity, with 42.7% of individuals in the Obese category and a further 31.9% Overweight — together nearly three-quarters (74.6%) of the sample above a healthy BMI range. Weight ranges from 32.6 kg to 254.3 kg and correlates very strongly with BMI (r=0.89), as expected, while height shows almost no relationship to BMI (r=-0.02). Only 1.5% of individuals fall into the Underweight category.",
      "executive_summary": "This NHANES health survey dataset contains anthropometric measurements for 8,388 individuals, capturing weight, standing height, and BMI. The average BMI of 30.0 sits right at the clinical threshold for obesity, with 42.7% of individuals in the Obese category and a further 31.9% Overweight — together nearly three-quarters (74.6%) of the sample above a healthy BMI range. Weight ranges from 32.6 kg to 254.3 kg and correlates very strongly with BMI (r=0.89), as expected, while height shows almost no relationship to BMI (r=-0.02). Only 1.5% of individuals fall into the Underweight category.",
      "exec_summary": "This NHANES health survey dataset contains anthropometric measurements for 8,388 individuals, capturing weight, standing height, and BMI. The average BMI of 30.0 sits right at the clinical threshold for obesity, with 42.7% of individuals in the Obese category and a further 31.9% Overweight — together nearly three-quarters (74.6%) of the sample above a healthy BMI range. Weight ranges from 32.6 kg to 254.3 kg and correlates very strongly with BMI (r=0.89), as expected, while height shows almost no relationship to BMI (r=-0.02). Only 1.5% of individuals fall into the Underweight category.",
      "risk_statement": "Nearly three in four individuals in this sample (74.6%) are classified Overweight or Obese, with 42.7% meeting the clinical threshold for Obesity specifically. Weight shows 207 statistical outliers (2.5% of records) via the IQR method, mostly at the high end — worth flagging for data-quality review or targeted follow-up.",
      "risk": "Nearly three in four individuals in this sample (74.6%) are classified Overweight or Obese, with 42.7% meeting the clinical threshold for Obesity specifically. Weight shows 207 statistical outliers (2.5% of records) via the IQR method, mostly at the high end — worth flagging for data-quality review or targeted follow-up.",
      "risk_text": "Nearly three in four individuals in this sample (74.6%) are classified Overweight or Obese, with 42.7% meeting the clinical threshold for Obesity specifically. Weight shows 207 statistical outliers (2.5% of records) via the IQR method, mostly at the high end — worth flagging for data-quality review or targeted follow-up.",
      "opportunity_statement": "Because BMI tracks weight far more closely than height (r=0.89 vs r=-0.02), weight-focused interventions are likely to move BMI more directly than any height-related factor. The Normal-BMI group (23.9% of the sample) could serve as a useful baseline cohort for comparison in any intervention study.",
      "opportunity": "Because BMI tracks weight far more closely than height (r=0.89 vs r=-0.02), weight-focused interventions are likely to move BMI more directly than any height-related factor. The Normal-BMI group (23.9% of the sample) could serve as a useful baseline cohort for comparison in any intervention study.",
      "opp_text": "Because BMI tracks weight far more closely than height (r=0.89 vs r=-0.02), weight-focused interventions are likely to move BMI more directly than any height-related factor. The Normal-BMI group (23.9% of the sample) could serve as a useful baseline cohort for comparison in any intervention study.",
      "revenueEfficiency": "",
      "what_changed": "BMI averages stay remarkably stable across height ranges (27.7 to 30.5 across 8 height bands), showing that elevated BMI in this sample isn't concentrated in any particular height group — it's broad-based across the population.",
      "why_changed": "The near-zero correlation between height and BMI (r=-0.02) confirms BMI's known property of being roughly height-independent — so the elevated average BMI reflects a genuine weight/body-composition pattern in this cohort, not an artifact of the height distribution.",
      "action_playbook": "Segment individuals by BMI category (Obese: 3,583, Overweight: 2,675, Normal: 2,008, Underweight: 122) to prioritize outreach, and review the 207 flagged weight outliers for measurement errors before drawing clinical conclusions.",
      "chart_data": {
        "time_series_data": [
          {
            "time": "131-139cm",
            "value": 27.7
          },
          {
            "time": "139-148cm",
            "value": 30.2
          },
          {
            "time": "148-156cm",
            "value": 29.9
          },
          {
            "time": "156-165cm",
            "value": 30.5
          },
          {
            "time": "165-173cm",
            "value": 29.7
          },
          {
            "time": "173-182cm",
            "value": 29.7
          },
          {
            "time": "182-191cm",
            "value": 30.1
          },
          {
            "time": "191-199cm",
            "value": 30.5
          }
        ],
        "category_data": [
          {
            "category": "Obese",
            "count": 3583
          },
          {
            "category": "Overweight",
            "count": 2675
          },
          {
            "category": "Normal",
            "count": 2008
          },
          {
            "category": "Underweight",
            "count": 122
          }
        ],
        "distribution_data": [
          {
            "name": "Low",
            "value": 5420
          },
          {
            "name": "Medium",
            "value": 2795
          },
          {
            "name": "High",
            "value": 165
          },
          {
            "name": "Very High",
            "value": 8
          }
        ]
      },
      "chart_explanations": {
        "time_series_explanation": "Average BMI plotted across 8 standing-height bands (131cm to 199cm) — BMI stays consistently in the 28-31 range regardless of height.",
        "category_explanation": "Individual count by BMI category — Obese and Overweight together account for 6,258 of 8,388 individuals (74.6%).",
        "distribution_explanation": "Individual count across four Weight (kg) bands — most individuals cluster in the lower two ranges."
      },
      "deep_dive_data": {
        "outliers": [
          {
            "x": 0,
            "y": 70.4,
            "is_outlier": false,
            "label": "Value: 70.40"
          },
          {
            "x": 1,
            "y": 61.1,
            "is_outlier": false,
            "label": "Value: 61.10"
          },
          {
            "x": 2,
            "y": 87.5,
            "is_outlier": false,
            "label": "Value: 87.50"
          },
          {
            "x": 3,
            "y": 77.2,
            "is_outlier": false,
            "label": "Value: 77.20"
          },
          {
            "x": 4,
            "y": 95.2,
            "is_outlier": false,
            "label": "Value: 95.20"
          },
          {
            "x": 5,
            "y": 94.1,
            "is_outlier": false,
            "label": "Value: 94.10"
          },
          {
            "x": 6,
            "y": 61.5,
            "is_outlier": false,
            "label": "Value: 61.50"
          },
          {
            "x": 7,
            "y": 106.2,
            "is_outlier": false,
            "label": "Value: 106.20"
          },
          {
            "x": 8,
            "y": 86.4,
            "is_outlier": false,
            "label": "Value: 86.40"
          },
          {
            "x": 9,
            "y": 133.1,
            "is_outlier": false,
            "label": "Value: 133.10"
          },
          {
            "x": 10,
            "y": 90.1,
            "is_outlier": false,
            "label": "Value: 90.10"
          },
          {
            "x": 11,
            "y": 112.8,
            "is_outlier": false,
            "label": "Value: 112.80"
          },
          {
            "x": 12,
            "y": 126.1,
            "is_outlier": false,
            "label": "Value: 126.10"
          },
          {
            "x": 13,
            "y": 125.1,
            "is_outlier": false,
            "label": "Value: 125.10"
          },
          {
            "x": 14,
            "y": 94.6,
            "is_outlier": false,
            "label": "Value: 94.60"
          },
          {
            "x": 15,
            "y": 67.8,
            "is_outlier": false,
            "label": "Value: 67.80"
          },
          {
            "x": 16,
            "y": 64.6,
            "is_outlier": false,
            "label": "Value: 64.60"
          },
          {
            "x": 17,
            "y": 86.5,
            "is_outlier": false,
            "label": "Value: 86.50"
          },
          {
            "x": 18,
            "y": 121.3,
            "is_outlier": false,
            "label": "Value: 121.30"
          },
          {
            "x": 19,
            "y": 62.4,
            "is_outlier": false,
            "label": "Value: 62.40"
          },
          {
            "x": 20,
            "y": 110.0,
            "is_outlier": false,
            "label": "Value: 110.00"
          },
          {
            "x": 21,
            "y": 100.9,
            "is_outlier": false,
            "label": "Value: 100.90"
          },
          {
            "x": 22,
            "y": 107.5,
            "is_outlier": false,
            "label": "Value: 107.50"
          },
          {
            "x": 23,
            "y": 131.9,
            "is_outlier": false,
            "label": "Value: 131.90"
          },
          {
            "x": 24,
            "y": 53.1,
            "is_outlier": false,
            "label": "Value: 53.10"
          },
          {
            "x": 25,
            "y": 93.4,
            "is_outlier": false,
            "label": "Value: 93.40"
          },
          {
            "x": 26,
            "y": 82.4,
            "is_outlier": false,
            "label": "Value: 82.40"
          },
          {
            "x": 27,
            "y": 69.9,
            "is_outlier": false,
            "label": "Value: 69.90"
          },
          {
            "x": 28,
            "y": 101.2,
            "is_outlier": false,
            "label": "Value: 101.20"
          },
          {
            "x": 29,
            "y": 61.1,
            "is_outlier": false,
            "label": "Value: 61.10"
          },
          {
            "x": 30,
            "y": 75.0,
            "is_outlier": false,
            "label": "Value: 75.00"
          },
          {
            "x": 31,
            "y": 56.8,
            "is_outlier": false,
            "label": "Value: 56.80"
          },
          {
            "x": 32,
            "y": 56.3,
            "is_outlier": false,
            "label": "Value: 56.30"
          },
          {
            "x": 33,
            "y": 109.4,
            "is_outlier": false,
            "label": "Value: 109.40"
          },
          {
            "x": 34,
            "y": 75.2,
            "is_outlier": false,
            "label": "Value: 75.20"
          },
          {
            "x": 35,
            "y": 73.1,
            "is_outlier": false,
            "label": "Value: 73.10"
          },
          {
            "x": 36,
            "y": 83.0,
            "is_outlier": false,
            "label": "Value: 83.00"
          },
          {
            "x": 37,
            "y": 106.4,
            "is_outlier": false,
            "label": "Value: 106.40"
          },
          {
            "x": 38,
            "y": 65.1,
            "is_outlier": false,
            "label": "Value: 65.10"
          },
          {
            "x": 39,
            "y": 102.6,
            "is_outlier": false,
            "label": "Value: 102.60"
          },
          {
            "x": 40,
            "y": 81.6,
            "is_outlier": false,
            "label": "Value: 81.60"
          },
          {
            "x": 41,
            "y": 55.7,
            "is_outlier": false,
            "label": "Value: 55.70"
          },
          {
            "x": 42,
            "y": 143.0,
            "is_outlier": true,
            "label": "Value: 143.00"
          },
          {
            "x": 43,
            "y": 61.1,
            "is_outlier": false,
            "label": "Value: 61.10"
          },
          {
            "x": 44,
            "y": 66.2,
            "is_outlier": false,
            "label": "Value: 66.20"
          },
          {
            "x": 45,
            "y": 71.9,
            "is_outlier": false,
            "label": "Value: 71.90"
          },
          {
            "x": 46,
            "y": 86.9,
            "is_outlier": false,
            "label": "Value: 86.90"
          },
          {
            "x": 47,
            "y": 103.6,
            "is_outlier": false,
            "label": "Value: 103.60"
          },
          {
            "x": 48,
            "y": 83.8,
            "is_outlier": false,
            "label": "Value: 83.80"
          },
          {
            "x": 49,
            "y": 62.5,
            "is_outlier": false,
            "label": "Value: 62.50"
          },
          {
            "x": 50,
            "y": 62.2,
            "is_outlier": false,
            "label": "Value: 62.20"
          },
          {
            "x": 51,
            "y": 49.8,
            "is_outlier": false,
            "label": "Value: 49.80"
          },
          {
            "x": 52,
            "y": 86.0,
            "is_outlier": false,
            "label": "Value: 86.00"
          },
          {
            "x": 53,
            "y": 51.6,
            "is_outlier": false,
            "label": "Value: 51.60"
          },
          {
            "x": 54,
            "y": 61.5,
            "is_outlier": false,
            "label": "Value: 61.50"
          },
          {
            "x": 55,
            "y": 89.7,
            "is_outlier": false,
            "label": "Value: 89.70"
          },
          {
            "x": 56,
            "y": 63.5,
            "is_outlier": false,
            "label": "Value: 63.50"
          },
          {
            "x": 57,
            "y": 56.4,
            "is_outlier": false,
            "label": "Value: 56.40"
          },
          {
            "x": 58,
            "y": 66.1,
            "is_outlier": false,
            "label": "Value: 66.10"
          },
          {
            "x": 59,
            "y": 58.8,
            "is_outlier": false,
            "label": "Value: 58.80"
          },
          {
            "x": 60,
            "y": 60.6,
            "is_outlier": false,
            "label": "Value: 60.60"
          },
          {
            "x": 61,
            "y": 60.2,
            "is_outlier": false,
            "label": "Value: 60.20"
          },
          {
            "x": 62,
            "y": 93.0,
            "is_outlier": false,
            "label": "Value: 93.00"
          },
          {
            "x": 63,
            "y": 66.1,
            "is_outlier": false,
            "label": "Value: 66.10"
          },
          {
            "x": 64,
            "y": 90.6,
            "is_outlier": false,
            "label": "Value: 90.60"
          },
          {
            "x": 65,
            "y": 55.0,
            "is_outlier": false,
            "label": "Value: 55.00"
          },
          {
            "x": 66,
            "y": 105.6,
            "is_outlier": false,
            "label": "Value: 105.60"
          },
          {
            "x": 67,
            "y": 88.8,
            "is_outlier": false,
            "label": "Value: 88.80"
          },
          {
            "x": 68,
            "y": 75.4,
            "is_outlier": false,
            "label": "Value: 75.40"
          },
          {
            "x": 69,
            "y": 52.4,
            "is_outlier": false,
            "label": "Value: 52.40"
          },
          {
            "x": 70,
            "y": 67.0,
            "is_outlier": false,
            "label": "Value: 67.00"
          },
          {
            "x": 71,
            "y": 123.9,
            "is_outlier": false,
            "label": "Value: 123.90"
          },
          {
            "x": 72,
            "y": 108.3,
            "is_outlier": false,
            "label": "Value: 108.30"
          },
          {
            "x": 73,
            "y": 79.2,
            "is_outlier": false,
            "label": "Value: 79.20"
          },
          {
            "x": 74,
            "y": 115.9,
            "is_outlier": false,
            "label": "Value: 115.90"
          },
          {
            "x": 75,
            "y": 74.7,
            "is_outlier": false,
            "label": "Value: 74.70"
          },
          {
            "x": 76,
            "y": 80.7,
            "is_outlier": false,
            "label": "Value: 80.70"
          },
          {
            "x": 77,
            "y": 106.0,
            "is_outlier": false,
            "label": "Value: 106.00"
          },
          {
            "x": 78,
            "y": 94.6,
            "is_outlier": false,
            "label": "Value: 94.60"
          },
          {
            "x": 79,
            "y": 107.6,
            "is_outlier": false,
            "label": "Value: 107.60"
          },
          {
            "x": 80,
            "y": 87.3,
            "is_outlier": false,
            "label": "Value: 87.30"
          },
          {
            "x": 81,
            "y": 101.5,
            "is_outlier": false,
            "label": "Value: 101.50"
          },
          {
            "x": 82,
            "y": 95.5,
            "is_outlier": false,
            "label": "Value: 95.50"
          },
          {
            "x": 83,
            "y": 52.6,
            "is_outlier": false,
            "label": "Value: 52.60"
          },
          {
            "x": 84,
            "y": 61.1,
            "is_outlier": false,
            "label": "Value: 61.10"
          },
          {
            "x": 85,
            "y": 55.8,
            "is_outlier": false,
            "label": "Value: 55.80"
          },
          {
            "x": 86,
            "y": 84.5,
            "is_outlier": false,
            "label": "Value: 84.50"
          },
          {
            "x": 87,
            "y": 88.7,
            "is_outlier": false,
            "label": "Value: 88.70"
          },
          {
            "x": 88,
            "y": 103.7,
            "is_outlier": false,
            "label": "Value: 103.70"
          },
          {
            "x": 89,
            "y": 58.7,
            "is_outlier": false,
            "label": "Value: 58.70"
          },
          {
            "x": 90,
            "y": 60.0,
            "is_outlier": false,
            "label": "Value: 60.00"
          },
          {
            "x": 91,
            "y": 86.2,
            "is_outlier": false,
            "label": "Value: 86.20"
          },
          {
            "x": 92,
            "y": 69.0,
            "is_outlier": false,
            "label": "Value: 69.00"
          },
          {
            "x": 93,
            "y": 136.7,
            "is_outlier": false,
            "label": "Value: 136.70"
          },
          {
            "x": 94,
            "y": 85.0,
            "is_outlier": false,
            "label": "Value: 85.00"
          },
          {
            "x": 95,
            "y": 66.2,
            "is_outlier": false,
            "label": "Value: 66.20"
          },
          {
            "x": 96,
            "y": 111.6,
            "is_outlier": false,
            "label": "Value: 111.60"
          },
          {
            "x": 97,
            "y": 132.3,
            "is_outlier": false,
            "label": "Value: 132.30"
          },
          {
            "x": 98,
            "y": 55.4,
            "is_outlier": false,
            "label": "Value: 55.40"
          },
          {
            "x": 99,
            "y": 104.4,
            "is_outlier": false,
            "label": "Value: 104.40"
          },
          {
            "x": 100,
            "y": 66.2,
            "is_outlier": false,
            "label": "Value: 66.20"
          },
          {
            "x": 101,
            "y": 55.5,
            "is_outlier": false,
            "label": "Value: 55.50"
          },
          {
            "x": 102,
            "y": 55.6,
            "is_outlier": false,
            "label": "Value: 55.60"
          },
          {
            "x": 103,
            "y": 148.4,
            "is_outlier": true,
            "label": "Value: 148.40"
          },
          {
            "x": 104,
            "y": 92.1,
            "is_outlier": false,
            "label": "Value: 92.10"
          },
          {
            "x": 105,
            "y": 41.6,
            "is_outlier": false,
            "label": "Value: 41.60"
          },
          {
            "x": 106,
            "y": 57.9,
            "is_outlier": false,
            "label": "Value: 57.90"
          },
          {
            "x": 107,
            "y": 52.4,
            "is_outlier": false,
            "label": "Value: 52.40"
          },
          {
            "x": 108,
            "y": 56.1,
            "is_outlier": false,
            "label": "Value: 56.10"
          },
          {
            "x": 109,
            "y": 90.6,
            "is_outlier": false,
            "label": "Value: 90.60"
          },
          {
            "x": 110,
            "y": 115.2,
            "is_outlier": false,
            "label": "Value: 115.20"
          },
          {
            "x": 111,
            "y": 99.5,
            "is_outlier": false,
            "label": "Value: 99.50"
          },
          {
            "x": 112,
            "y": 76.6,
            "is_outlier": false,
            "label": "Value: 76.60"
          },
          {
            "x": 113,
            "y": 68.8,
            "is_outlier": false,
            "label": "Value: 68.80"
          },
          {
            "x": 114,
            "y": 74.2,
            "is_outlier": false,
            "label": "Value: 74.20"
          },
          {
            "x": 115,
            "y": 69.4,
            "is_outlier": false,
            "label": "Value: 69.40"
          },
          {
            "x": 116,
            "y": 77.6,
            "is_outlier": false,
            "label": "Value: 77.60"
          },
          {
            "x": 117,
            "y": 121.1,
            "is_outlier": false,
            "label": "Value: 121.10"
          },
          {
            "x": 118,
            "y": 116.3,
            "is_outlier": false,
            "label": "Value: 116.30"
          },
          {
            "x": 119,
            "y": 82.7,
            "is_outlier": false,
            "label": "Value: 82.70"
          },
          {
            "x": 120,
            "y": 83.7,
            "is_outlier": false,
            "label": "Value: 83.70"
          },
          {
            "x": 121,
            "y": 75.3,
            "is_outlier": false,
            "label": "Value: 75.30"
          },
          {
            "x": 122,
            "y": 93.2,
            "is_outlier": false,
            "label": "Value: 93.20"
          },
          {
            "x": 123,
            "y": 109.0,
            "is_outlier": false,
            "label": "Value: 109.00"
          },
          {
            "x": 124,
            "y": 84.8,
            "is_outlier": false,
            "label": "Value: 84.80"
          },
          {
            "x": 125,
            "y": 105.6,
            "is_outlier": false,
            "label": "Value: 105.60"
          },
          {
            "x": 126,
            "y": 51.4,
            "is_outlier": false,
            "label": "Value: 51.40"
          },
          {
            "x": 127,
            "y": 86.5,
            "is_outlier": false,
            "label": "Value: 86.50"
          },
          {
            "x": 128,
            "y": 125.8,
            "is_outlier": false,
            "label": "Value: 125.80"
          },
          {
            "x": 129,
            "y": 112.8,
            "is_outlier": false,
            "label": "Value: 112.80"
          },
          {
            "x": 130,
            "y": 86.2,
            "is_outlier": false,
            "label": "Value: 86.20"
          },
          {
            "x": 131,
            "y": 58.3,
            "is_outlier": false,
            "label": "Value: 58.30"
          },
          {
            "x": 132,
            "y": 112.1,
            "is_outlier": false,
            "label": "Value: 112.10"
          },
          {
            "x": 133,
            "y": 60.6,
            "is_outlier": false,
            "label": "Value: 60.60"
          },
          {
            "x": 134,
            "y": 124.6,
            "is_outlier": false,
            "label": "Value: 124.60"
          },
          {
            "x": 135,
            "y": 80.4,
            "is_outlier": false,
            "label": "Value: 80.40"
          },
          {
            "x": 136,
            "y": 81.3,
            "is_outlier": false,
            "label": "Value: 81.30"
          },
          {
            "x": 137,
            "y": 107.9,
            "is_outlier": false,
            "label": "Value: 107.90"
          },
          {
            "x": 138,
            "y": 72.4,
            "is_outlier": false,
            "label": "Value: 72.40"
          },
          {
            "x": 139,
            "y": 91.3,
            "is_outlier": false,
            "label": "Value: 91.30"
          },
          {
            "x": 140,
            "y": 90.8,
            "is_outlier": false,
            "label": "Value: 90.80"
          },
          {
            "x": 141,
            "y": 78.2,
            "is_outlier": false,
            "label": "Value: 78.20"
          },
          {
            "x": 142,
            "y": 126.5,
            "is_outlier": false,
            "label": "Value: 126.50"
          },
          {
            "x": 143,
            "y": 121.2,
            "is_outlier": false,
            "label": "Value: 121.20"
          },
          {
            "x": 144,
            "y": 68.7,
            "is_outlier": false,
            "label": "Value: 68.70"
          },
          {
            "x": 145,
            "y": 70.6,
            "is_outlier": false,
            "label": "Value: 70.60"
          },
          {
            "x": 146,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 147,
            "y": 89.0,
            "is_outlier": false,
            "label": "Value: 89.00"
          },
          {
            "x": 148,
            "y": 115.2,
            "is_outlier": false,
            "label": "Value: 115.20"
          },
          {
            "x": 149,
            "y": 101.7,
            "is_outlier": false,
            "label": "Value: 101.70"
          },
          {
            "x": 150,
            "y": 49.1,
            "is_outlier": false,
            "label": "Value: 49.10"
          },
          {
            "x": 151,
            "y": 75.6,
            "is_outlier": false,
            "label": "Value: 75.60"
          },
          {
            "x": 152,
            "y": 119.1,
            "is_outlier": false,
            "label": "Value: 119.10"
          },
          {
            "x": 153,
            "y": 64.9,
            "is_outlier": false,
            "label": "Value: 64.90"
          },
          {
            "x": 154,
            "y": 84.3,
            "is_outlier": false,
            "label": "Value: 84.30"
          },
          {
            "x": 155,
            "y": 93.8,
            "is_outlier": false,
            "label": "Value: 93.80"
          },
          {
            "x": 156,
            "y": 129.7,
            "is_outlier": false,
            "label": "Value: 129.70"
          },
          {
            "x": 157,
            "y": 81.8,
            "is_outlier": false,
            "label": "Value: 81.80"
          },
          {
            "x": 158,
            "y": 150.6,
            "is_outlier": true,
            "label": "Value: 150.60"
          },
          {
            "x": 159,
            "y": 93.8,
            "is_outlier": false,
            "label": "Value: 93.80"
          },
          {
            "x": 160,
            "y": 63.8,
            "is_outlier": false,
            "label": "Value: 63.80"
          },
          {
            "x": 161,
            "y": 191.4,
            "is_outlier": true,
            "label": "Value: 191.40"
          },
          {
            "x": 162,
            "y": 114.3,
            "is_outlier": false,
            "label": "Value: 114.30"
          },
          {
            "x": 163,
            "y": 57.1,
            "is_outlier": false,
            "label": "Value: 57.10"
          },
          {
            "x": 164,
            "y": 54.6,
            "is_outlier": false,
            "label": "Value: 54.60"
          },
          {
            "x": 165,
            "y": 62.5,
            "is_outlier": false,
            "label": "Value: 62.50"
          },
          {
            "x": 166,
            "y": 61.5,
            "is_outlier": false,
            "label": "Value: 61.50"
          },
          {
            "x": 167,
            "y": 71.4,
            "is_outlier": false,
            "label": "Value: 71.40"
          },
          {
            "x": 168,
            "y": 74.6,
            "is_outlier": false,
            "label": "Value: 74.60"
          },
          {
            "x": 169,
            "y": 61.0,
            "is_outlier": false,
            "label": "Value: 61.00"
          },
          {
            "x": 170,
            "y": 75.7,
            "is_outlier": false,
            "label": "Value: 75.70"
          },
          {
            "x": 171,
            "y": 60.8,
            "is_outlier": false,
            "label": "Value: 60.80"
          },
          {
            "x": 172,
            "y": 90.6,
            "is_outlier": false,
            "label": "Value: 90.60"
          },
          {
            "x": 173,
            "y": 70.9,
            "is_outlier": false,
            "label": "Value: 70.90"
          },
          {
            "x": 174,
            "y": 78.5,
            "is_outlier": false,
            "label": "Value: 78.50"
          },
          {
            "x": 175,
            "y": 71.3,
            "is_outlier": false,
            "label": "Value: 71.30"
          },
          {
            "x": 176,
            "y": 70.2,
            "is_outlier": false,
            "label": "Value: 70.20"
          },
          {
            "x": 177,
            "y": 91.0,
            "is_outlier": false,
            "label": "Value: 91.00"
          },
          {
            "x": 178,
            "y": 91.2,
            "is_outlier": false,
            "label": "Value: 91.20"
          },
          {
            "x": 179,
            "y": 102.8,
            "is_outlier": false,
            "label": "Value: 102.80"
          },
          {
            "x": 180,
            "y": 90.4,
            "is_outlier": false,
            "label": "Value: 90.40"
          },
          {
            "x": 181,
            "y": 71.0,
            "is_outlier": false,
            "label": "Value: 71.00"
          },
          {
            "x": 182,
            "y": 101.9,
            "is_outlier": false,
            "label": "Value: 101.90"
          },
          {
            "x": 183,
            "y": 69.3,
            "is_outlier": false,
            "label": "Value: 69.30"
          },
          {
            "x": 184,
            "y": 79.5,
            "is_outlier": false,
            "label": "Value: 79.50"
          },
          {
            "x": 185,
            "y": 106.0,
            "is_outlier": false,
            "label": "Value: 106.00"
          },
          {
            "x": 186,
            "y": 112.4,
            "is_outlier": false,
            "label": "Value: 112.40"
          },
          {
            "x": 187,
            "y": 83.7,
            "is_outlier": false,
            "label": "Value: 83.70"
          },
          {
            "x": 188,
            "y": 64.3,
            "is_outlier": false,
            "label": "Value: 64.30"
          },
          {
            "x": 189,
            "y": 60.9,
            "is_outlier": false,
            "label": "Value: 60.90"
          },
          {
            "x": 190,
            "y": 76.1,
            "is_outlier": false,
            "label": "Value: 76.10"
          },
          {
            "x": 191,
            "y": 61.0,
            "is_outlier": false,
            "label": "Value: 61.00"
          },
          {
            "x": 192,
            "y": 121.4,
            "is_outlier": false,
            "label": "Value: 121.40"
          },
          {
            "x": 193,
            "y": 114.8,
            "is_outlier": false,
            "label": "Value: 114.80"
          },
          {
            "x": 194,
            "y": 117.1,
            "is_outlier": false,
            "label": "Value: 117.10"
          },
          {
            "x": 195,
            "y": 66.6,
            "is_outlier": false,
            "label": "Value: 66.60"
          },
          {
            "x": 196,
            "y": 57.1,
            "is_outlier": false,
            "label": "Value: 57.10"
          },
          {
            "x": 197,
            "y": 69.5,
            "is_outlier": false,
            "label": "Value: 69.50"
          },
          {
            "x": 198,
            "y": 49.7,
            "is_outlier": false,
            "label": "Value: 49.70"
          },
          {
            "x": 199,
            "y": 66.9,
            "is_outlier": false,
            "label": "Value: 66.90"
          },
          {
            "x": 200,
            "y": 84.4,
            "is_outlier": false,
            "label": "Value: 84.40"
          },
          {
            "x": 201,
            "y": 86.2,
            "is_outlier": false,
            "label": "Value: 86.20"
          },
          {
            "x": 202,
            "y": 122.6,
            "is_outlier": false,
            "label": "Value: 122.60"
          },
          {
            "x": 203,
            "y": 58.3,
            "is_outlier": false,
            "label": "Value: 58.30"
          },
          {
            "x": 204,
            "y": 43.9,
            "is_outlier": false,
            "label": "Value: 43.90"
          },
          {
            "x": 205,
            "y": 87.5,
            "is_outlier": false,
            "label": "Value: 87.50"
          },
          {
            "x": 206,
            "y": 83.4,
            "is_outlier": false,
            "label": "Value: 83.40"
          },
          {
            "x": 207,
            "y": 71.8,
            "is_outlier": false,
            "label": "Value: 71.80"
          },
          {
            "x": 208,
            "y": 86.4,
            "is_outlier": false,
            "label": "Value: 86.40"
          },
          {
            "x": 209,
            "y": 89.0,
            "is_outlier": false,
            "label": "Value: 89.00"
          },
          {
            "x": 210,
            "y": 150.6,
            "is_outlier": true,
            "label": "Value: 150.60"
          },
          {
            "x": 211,
            "y": 99.5,
            "is_outlier": false,
            "label": "Value: 99.50"
          },
          {
            "x": 212,
            "y": 93.4,
            "is_outlier": false,
            "label": "Value: 93.40"
          },
          {
            "x": 213,
            "y": 67.4,
            "is_outlier": false,
            "label": "Value: 67.40"
          },
          {
            "x": 214,
            "y": 85.8,
            "is_outlier": false,
            "label": "Value: 85.80"
          },
          {
            "x": 215,
            "y": 71.7,
            "is_outlier": false,
            "label": "Value: 71.70"
          },
          {
            "x": 216,
            "y": 91.3,
            "is_outlier": false,
            "label": "Value: 91.30"
          },
          {
            "x": 217,
            "y": 63.4,
            "is_outlier": false,
            "label": "Value: 63.40"
          },
          {
            "x": 218,
            "y": 102.4,
            "is_outlier": false,
            "label": "Value: 102.40"
          },
          {
            "x": 219,
            "y": 61.8,
            "is_outlier": false,
            "label": "Value: 61.80"
          },
          {
            "x": 220,
            "y": 87.0,
            "is_outlier": false,
            "label": "Value: 87.00"
          },
          {
            "x": 221,
            "y": 68.1,
            "is_outlier": false,
            "label": "Value: 68.10"
          },
          {
            "x": 222,
            "y": 86.7,
            "is_outlier": false,
            "label": "Value: 86.70"
          },
          {
            "x": 223,
            "y": 87.2,
            "is_outlier": false,
            "label": "Value: 87.20"
          },
          {
            "x": 224,
            "y": 65.1,
            "is_outlier": false,
            "label": "Value: 65.10"
          },
          {
            "x": 225,
            "y": 75.9,
            "is_outlier": false,
            "label": "Value: 75.90"
          },
          {
            "x": 226,
            "y": 105.7,
            "is_outlier": false,
            "label": "Value: 105.70"
          },
          {
            "x": 227,
            "y": 138.6,
            "is_outlier": true,
            "label": "Value: 138.60"
          },
          {
            "x": 228,
            "y": 88.4,
            "is_outlier": false,
            "label": "Value: 88.40"
          },
          {
            "x": 229,
            "y": 50.7,
            "is_outlier": false,
            "label": "Value: 50.70"
          },
          {
            "x": 230,
            "y": 78.7,
            "is_outlier": false,
            "label": "Value: 78.70"
          },
          {
            "x": 231,
            "y": 68.8,
            "is_outlier": false,
            "label": "Value: 68.80"
          },
          {
            "x": 232,
            "y": 113.5,
            "is_outlier": false,
            "label": "Value: 113.50"
          },
          {
            "x": 233,
            "y": 125.8,
            "is_outlier": false,
            "label": "Value: 125.80"
          },
          {
            "x": 234,
            "y": 131.5,
            "is_outlier": false,
            "label": "Value: 131.50"
          },
          {
            "x": 235,
            "y": 69.9,
            "is_outlier": false,
            "label": "Value: 69.90"
          },
          {
            "x": 236,
            "y": 88.1,
            "is_outlier": false,
            "label": "Value: 88.10"
          },
          {
            "x": 237,
            "y": 90.5,
            "is_outlier": false,
            "label": "Value: 90.50"
          },
          {
            "x": 238,
            "y": 62.7,
            "is_outlier": false,
            "label": "Value: 62.70"
          },
          {
            "x": 239,
            "y": 69.2,
            "is_outlier": false,
            "label": "Value: 69.20"
          },
          {
            "x": 240,
            "y": 78.2,
            "is_outlier": false,
            "label": "Value: 78.20"
          },
          {
            "x": 241,
            "y": 89.9,
            "is_outlier": false,
            "label": "Value: 89.90"
          },
          {
            "x": 242,
            "y": 47.2,
            "is_outlier": false,
            "label": "Value: 47.20"
          },
          {
            "x": 243,
            "y": 94.6,
            "is_outlier": false,
            "label": "Value: 94.60"
          },
          {
            "x": 244,
            "y": 92.7,
            "is_outlier": false,
            "label": "Value: 92.70"
          },
          {
            "x": 245,
            "y": 127.0,
            "is_outlier": false,
            "label": "Value: 127.00"
          },
          {
            "x": 246,
            "y": 85.1,
            "is_outlier": false,
            "label": "Value: 85.10"
          },
          {
            "x": 247,
            "y": 74.6,
            "is_outlier": false,
            "label": "Value: 74.60"
          },
          {
            "x": 248,
            "y": 42.3,
            "is_outlier": false,
            "label": "Value: 42.30"
          },
          {
            "x": 249,
            "y": 77.3,
            "is_outlier": false,
            "label": "Value: 77.30"
          },
          {
            "x": 250,
            "y": 157.6,
            "is_outlier": true,
            "label": "Value: 157.60"
          },
          {
            "x": 251,
            "y": 68.5,
            "is_outlier": false,
            "label": "Value: 68.50"
          },
          {
            "x": 252,
            "y": 68.1,
            "is_outlier": false,
            "label": "Value: 68.10"
          },
          {
            "x": 253,
            "y": 126.5,
            "is_outlier": false,
            "label": "Value: 126.50"
          },
          {
            "x": 254,
            "y": 79.8,
            "is_outlier": false,
            "label": "Value: 79.80"
          },
          {
            "x": 255,
            "y": 69.9,
            "is_outlier": false,
            "label": "Value: 69.90"
          },
          {
            "x": 256,
            "y": 49.1,
            "is_outlier": false,
            "label": "Value: 49.10"
          },
          {
            "x": 257,
            "y": 57.5,
            "is_outlier": false,
            "label": "Value: 57.50"
          },
          {
            "x": 258,
            "y": 121.1,
            "is_outlier": false,
            "label": "Value: 121.10"
          },
          {
            "x": 259,
            "y": 74.3,
            "is_outlier": false,
            "label": "Value: 74.30"
          },
          {
            "x": 260,
            "y": 82.9,
            "is_outlier": false,
            "label": "Value: 82.90"
          },
          {
            "x": 261,
            "y": 129.2,
            "is_outlier": false,
            "label": "Value: 129.20"
          },
          {
            "x": 262,
            "y": 67.9,
            "is_outlier": false,
            "label": "Value: 67.90"
          },
          {
            "x": 263,
            "y": 77.0,
            "is_outlier": false,
            "label": "Value: 77.00"
          },
          {
            "x": 264,
            "y": 74.6,
            "is_outlier": false,
            "label": "Value: 74.60"
          },
          {
            "x": 265,
            "y": 70.3,
            "is_outlier": false,
            "label": "Value: 70.30"
          },
          {
            "x": 266,
            "y": 135.1,
            "is_outlier": false,
            "label": "Value: 135.10"
          },
          {
            "x": 267,
            "y": 80.1,
            "is_outlier": false,
            "label": "Value: 80.10"
          },
          {
            "x": 268,
            "y": 106.8,
            "is_outlier": false,
            "label": "Value: 106.80"
          },
          {
            "x": 269,
            "y": 53.0,
            "is_outlier": false,
            "label": "Value: 53.00"
          },
          {
            "x": 270,
            "y": 98.2,
            "is_outlier": false,
            "label": "Value: 98.20"
          },
          {
            "x": 271,
            "y": 66.3,
            "is_outlier": false,
            "label": "Value: 66.30"
          },
          {
            "x": 272,
            "y": 89.8,
            "is_outlier": false,
            "label": "Value: 89.80"
          },
          {
            "x": 273,
            "y": 69.0,
            "is_outlier": false,
            "label": "Value: 69.00"
          },
          {
            "x": 274,
            "y": 90.9,
            "is_outlier": false,
            "label": "Value: 90.90"
          },
          {
            "x": 275,
            "y": 51.3,
            "is_outlier": false,
            "label": "Value: 51.30"
          },
          {
            "x": 276,
            "y": 92.6,
            "is_outlier": false,
            "label": "Value: 92.60"
          },
          {
            "x": 277,
            "y": 66.4,
            "is_outlier": false,
            "label": "Value: 66.40"
          },
          {
            "x": 278,
            "y": 53.8,
            "is_outlier": false,
            "label": "Value: 53.80"
          },
          {
            "x": 279,
            "y": 48.1,
            "is_outlier": false,
            "label": "Value: 48.10"
          },
          {
            "x": 280,
            "y": 69.6,
            "is_outlier": false,
            "label": "Value: 69.60"
          },
          {
            "x": 281,
            "y": 85.7,
            "is_outlier": false,
            "label": "Value: 85.70"
          },
          {
            "x": 282,
            "y": 69.6,
            "is_outlier": false,
            "label": "Value: 69.60"
          },
          {
            "x": 283,
            "y": 113.5,
            "is_outlier": false,
            "label": "Value: 113.50"
          },
          {
            "x": 284,
            "y": 71.7,
            "is_outlier": false,
            "label": "Value: 71.70"
          },
          {
            "x": 285,
            "y": 108.4,
            "is_outlier": false,
            "label": "Value: 108.40"
          },
          {
            "x": 286,
            "y": 90.1,
            "is_outlier": false,
            "label": "Value: 90.10"
          },
          {
            "x": 287,
            "y": 84.7,
            "is_outlier": false,
            "label": "Value: 84.70"
          },
          {
            "x": 288,
            "y": 68.7,
            "is_outlier": false,
            "label": "Value: 68.70"
          },
          {
            "x": 289,
            "y": 49.8,
            "is_outlier": false,
            "label": "Value: 49.80"
          },
          {
            "x": 290,
            "y": 74.6,
            "is_outlier": false,
            "label": "Value: 74.60"
          },
          {
            "x": 291,
            "y": 60.1,
            "is_outlier": false,
            "label": "Value: 60.10"
          },
          {
            "x": 292,
            "y": 77.6,
            "is_outlier": false,
            "label": "Value: 77.60"
          },
          {
            "x": 293,
            "y": 95.0,
            "is_outlier": false,
            "label": "Value: 95.00"
          },
          {
            "x": 294,
            "y": 66.4,
            "is_outlier": false,
            "label": "Value: 66.40"
          },
          {
            "x": 295,
            "y": 66.5,
            "is_outlier": false,
            "label": "Value: 66.50"
          },
          {
            "x": 296,
            "y": 112.0,
            "is_outlier": false,
            "label": "Value: 112.00"
          },
          {
            "x": 297,
            "y": 69.9,
            "is_outlier": false,
            "label": "Value: 69.90"
          },
          {
            "x": 298,
            "y": 78.0,
            "is_outlier": false,
            "label": "Value: 78.00"
          },
          {
            "x": 299,
            "y": 81.9,
            "is_outlier": false,
            "label": "Value: 81.90"
          },
          {
            "x": 300,
            "y": 83.3,
            "is_outlier": false,
            "label": "Value: 83.30"
          },
          {
            "x": 301,
            "y": 69.4,
            "is_outlier": false,
            "label": "Value: 69.40"
          },
          {
            "x": 302,
            "y": 77.4,
            "is_outlier": false,
            "label": "Value: 77.40"
          },
          {
            "x": 303,
            "y": 50.6,
            "is_outlier": false,
            "label": "Value: 50.60"
          },
          {
            "x": 304,
            "y": 120.7,
            "is_outlier": false,
            "label": "Value: 120.70"
          },
          {
            "x": 305,
            "y": 65.1,
            "is_outlier": false,
            "label": "Value: 65.10"
          },
          {
            "x": 306,
            "y": 83.6,
            "is_outlier": false,
            "label": "Value: 83.60"
          },
          {
            "x": 307,
            "y": 59.5,
            "is_outlier": false,
            "label": "Value: 59.50"
          },
          {
            "x": 308,
            "y": 43.1,
            "is_outlier": false,
            "label": "Value: 43.10"
          },
          {
            "x": 309,
            "y": 64.6,
            "is_outlier": false,
            "label": "Value: 64.60"
          },
          {
            "x": 310,
            "y": 81.9,
            "is_outlier": false,
            "label": "Value: 81.90"
          },
          {
            "x": 311,
            "y": 67.6,
            "is_outlier": false,
            "label": "Value: 67.60"
          },
          {
            "x": 312,
            "y": 64.3,
            "is_outlier": false,
            "label": "Value: 64.30"
          },
          {
            "x": 313,
            "y": 85.7,
            "is_outlier": false,
            "label": "Value: 85.70"
          },
          {
            "x": 314,
            "y": 64.0,
            "is_outlier": false,
            "label": "Value: 64.00"
          },
          {
            "x": 315,
            "y": 67.1,
            "is_outlier": false,
            "label": "Value: 67.10"
          },
          {
            "x": 316,
            "y": 97.7,
            "is_outlier": false,
            "label": "Value: 97.70"
          },
          {
            "x": 317,
            "y": 82.5,
            "is_outlier": false,
            "label": "Value: 82.50"
          },
          {
            "x": 318,
            "y": 87.1,
            "is_outlier": false,
            "label": "Value: 87.10"
          },
          {
            "x": 319,
            "y": 103.5,
            "is_outlier": false,
            "label": "Value: 103.50"
          },
          {
            "x": 320,
            "y": 69.3,
            "is_outlier": false,
            "label": "Value: 69.30"
          },
          {
            "x": 321,
            "y": 107.7,
            "is_outlier": false,
            "label": "Value: 107.70"
          },
          {
            "x": 322,
            "y": 157.4,
            "is_outlier": true,
            "label": "Value: 157.40"
          },
          {
            "x": 323,
            "y": 77.5,
            "is_outlier": false,
            "label": "Value: 77.50"
          },
          {
            "x": 324,
            "y": 121.0,
            "is_outlier": false,
            "label": "Value: 121.00"
          },
          {
            "x": 325,
            "y": 86.3,
            "is_outlier": false,
            "label": "Value: 86.30"
          },
          {
            "x": 326,
            "y": 99.6,
            "is_outlier": false,
            "label": "Value: 99.60"
          },
          {
            "x": 327,
            "y": 83.4,
            "is_outlier": false,
            "label": "Value: 83.40"
          },
          {
            "x": 328,
            "y": 80.8,
            "is_outlier": false,
            "label": "Value: 80.80"
          },
          {
            "x": 329,
            "y": 99.1,
            "is_outlier": false,
            "label": "Value: 99.10"
          },
          {
            "x": 330,
            "y": 56.9,
            "is_outlier": false,
            "label": "Value: 56.90"
          },
          {
            "x": 331,
            "y": 106.2,
            "is_outlier": false,
            "label": "Value: 106.20"
          },
          {
            "x": 332,
            "y": 75.0,
            "is_outlier": false,
            "label": "Value: 75.00"
          },
          {
            "x": 333,
            "y": 93.1,
            "is_outlier": false,
            "label": "Value: 93.10"
          },
          {
            "x": 334,
            "y": 71.1,
            "is_outlier": false,
            "label": "Value: 71.10"
          },
          {
            "x": 335,
            "y": 62.1,
            "is_outlier": false,
            "label": "Value: 62.10"
          },
          {
            "x": 336,
            "y": 70.8,
            "is_outlier": false,
            "label": "Value: 70.80"
          },
          {
            "x": 337,
            "y": 54.8,
            "is_outlier": false,
            "label": "Value: 54.80"
          },
          {
            "x": 338,
            "y": 101.3,
            "is_outlier": false,
            "label": "Value: 101.30"
          },
          {
            "x": 339,
            "y": 65.8,
            "is_outlier": false,
            "label": "Value: 65.80"
          },
          {
            "x": 340,
            "y": 94.4,
            "is_outlier": false,
            "label": "Value: 94.40"
          },
          {
            "x": 341,
            "y": 107.3,
            "is_outlier": false,
            "label": "Value: 107.30"
          },
          {
            "x": 342,
            "y": 100.5,
            "is_outlier": false,
            "label": "Value: 100.50"
          },
          {
            "x": 343,
            "y": 67.7,
            "is_outlier": false,
            "label": "Value: 67.70"
          },
          {
            "x": 344,
            "y": 100.0,
            "is_outlier": false,
            "label": "Value: 100.00"
          },
          {
            "x": 345,
            "y": 66.1,
            "is_outlier": false,
            "label": "Value: 66.10"
          },
          {
            "x": 346,
            "y": 105.1,
            "is_outlier": false,
            "label": "Value: 105.10"
          },
          {
            "x": 347,
            "y": 73.3,
            "is_outlier": false,
            "label": "Value: 73.30"
          },
          {
            "x": 348,
            "y": 75.4,
            "is_outlier": false,
            "label": "Value: 75.40"
          },
          {
            "x": 349,
            "y": 85.2,
            "is_outlier": false,
            "label": "Value: 85.20"
          },
          {
            "x": 350,
            "y": 61.2,
            "is_outlier": false,
            "label": "Value: 61.20"
          },
          {
            "x": 351,
            "y": 102.9,
            "is_outlier": false,
            "label": "Value: 102.90"
          },
          {
            "x": 352,
            "y": 140.4,
            "is_outlier": true,
            "label": "Value: 140.40"
          },
          {
            "x": 353,
            "y": 84.4,
            "is_outlier": false,
            "label": "Value: 84.40"
          },
          {
            "x": 354,
            "y": 74.2,
            "is_outlier": false,
            "label": "Value: 74.20"
          },
          {
            "x": 355,
            "y": 86.8,
            "is_outlier": false,
            "label": "Value: 86.80"
          },
          {
            "x": 356,
            "y": 89.7,
            "is_outlier": false,
            "label": "Value: 89.70"
          },
          {
            "x": 357,
            "y": 73.2,
            "is_outlier": false,
            "label": "Value: 73.20"
          },
          {
            "x": 358,
            "y": 56.4,
            "is_outlier": false,
            "label": "Value: 56.40"
          },
          {
            "x": 359,
            "y": 70.2,
            "is_outlier": false,
            "label": "Value: 70.20"
          },
          {
            "x": 360,
            "y": 53.8,
            "is_outlier": false,
            "label": "Value: 53.80"
          },
          {
            "x": 361,
            "y": 107.5,
            "is_outlier": false,
            "label": "Value: 107.50"
          },
          {
            "x": 362,
            "y": 82.3,
            "is_outlier": false,
            "label": "Value: 82.30"
          },
          {
            "x": 363,
            "y": 76.9,
            "is_outlier": false,
            "label": "Value: 76.90"
          },
          {
            "x": 364,
            "y": 66.1,
            "is_outlier": false,
            "label": "Value: 66.10"
          },
          {
            "x": 365,
            "y": 79.1,
            "is_outlier": false,
            "label": "Value: 79.10"
          },
          {
            "x": 366,
            "y": 88.8,
            "is_outlier": false,
            "label": "Value: 88.80"
          },
          {
            "x": 367,
            "y": 72.4,
            "is_outlier": false,
            "label": "Value: 72.40"
          },
          {
            "x": 368,
            "y": 79.0,
            "is_outlier": false,
            "label": "Value: 79.00"
          },
          {
            "x": 369,
            "y": 49.8,
            "is_outlier": false,
            "label": "Value: 49.80"
          },
          {
            "x": 370,
            "y": 41.8,
            "is_outlier": false,
            "label": "Value: 41.80"
          },
          {
            "x": 371,
            "y": 61.6,
            "is_outlier": false,
            "label": "Value: 61.60"
          },
          {
            "x": 372,
            "y": 117.0,
            "is_outlier": false,
            "label": "Value: 117.00"
          },
          {
            "x": 373,
            "y": 55.5,
            "is_outlier": false,
            "label": "Value: 55.50"
          },
          {
            "x": 374,
            "y": 68.9,
            "is_outlier": false,
            "label": "Value: 68.90"
          },
          {
            "x": 375,
            "y": 39.9,
            "is_outlier": false,
            "label": "Value: 39.90"
          },
          {
            "x": 376,
            "y": 84.6,
            "is_outlier": false,
            "label": "Value: 84.60"
          },
          {
            "x": 377,
            "y": 63.7,
            "is_outlier": false,
            "label": "Value: 63.70"
          },
          {
            "x": 378,
            "y": 82.3,
            "is_outlier": false,
            "label": "Value: 82.30"
          },
          {
            "x": 379,
            "y": 75.7,
            "is_outlier": false,
            "label": "Value: 75.70"
          },
          {
            "x": 380,
            "y": 93.6,
            "is_outlier": false,
            "label": "Value: 93.60"
          },
          {
            "x": 381,
            "y": 65.7,
            "is_outlier": false,
            "label": "Value: 65.70"
          },
          {
            "x": 382,
            "y": 68.1,
            "is_outlier": false,
            "label": "Value: 68.10"
          },
          {
            "x": 383,
            "y": 48.8,
            "is_outlier": false,
            "label": "Value: 48.80"
          },
          {
            "x": 384,
            "y": 68.0,
            "is_outlier": false,
            "label": "Value: 68.00"
          },
          {
            "x": 385,
            "y": 80.2,
            "is_outlier": false,
            "label": "Value: 80.20"
          },
          {
            "x": 386,
            "y": 63.6,
            "is_outlier": false,
            "label": "Value: 63.60"
          },
          {
            "x": 387,
            "y": 70.7,
            "is_outlier": false,
            "label": "Value: 70.70"
          },
          {
            "x": 388,
            "y": 55.1,
            "is_outlier": false,
            "label": "Value: 55.10"
          },
          {
            "x": 389,
            "y": 72.8,
            "is_outlier": false,
            "label": "Value: 72.80"
          },
          {
            "x": 390,
            "y": 91.6,
            "is_outlier": false,
            "label": "Value: 91.60"
          },
          {
            "x": 391,
            "y": 132.3,
            "is_outlier": false,
            "label": "Value: 132.30"
          },
          {
            "x": 392,
            "y": 71.0,
            "is_outlier": false,
            "label": "Value: 71.00"
          },
          {
            "x": 393,
            "y": 65.3,
            "is_outlier": false,
            "label": "Value: 65.30"
          },
          {
            "x": 394,
            "y": 83.7,
            "is_outlier": false,
            "label": "Value: 83.70"
          },
          {
            "x": 395,
            "y": 86.8,
            "is_outlier": false,
            "label": "Value: 86.80"
          },
          {
            "x": 396,
            "y": 99.0,
            "is_outlier": false,
            "label": "Value: 99.00"
          },
          {
            "x": 397,
            "y": 52.7,
            "is_outlier": false,
            "label": "Value: 52.70"
          },
          {
            "x": 398,
            "y": 75.2,
            "is_outlier": false,
            "label": "Value: 75.20"
          },
          {
            "x": 399,
            "y": 66.4,
            "is_outlier": false,
            "label": "Value: 66.40"
          },
          {
            "x": 400,
            "y": 87.6,
            "is_outlier": false,
            "label": "Value: 87.60"
          },
          {
            "x": 401,
            "y": 103.7,
            "is_outlier": false,
            "label": "Value: 103.70"
          },
          {
            "x": 402,
            "y": 102.3,
            "is_outlier": false,
            "label": "Value: 102.30"
          },
          {
            "x": 403,
            "y": 54.4,
            "is_outlier": false,
            "label": "Value: 54.40"
          },
          {
            "x": 404,
            "y": 82.0,
            "is_outlier": false,
            "label": "Value: 82.00"
          },
          {
            "x": 405,
            "y": 100.2,
            "is_outlier": false,
            "label": "Value: 100.20"
          },
          {
            "x": 406,
            "y": 66.3,
            "is_outlier": false,
            "label": "Value: 66.30"
          },
          {
            "x": 407,
            "y": 63.4,
            "is_outlier": false,
            "label": "Value: 63.40"
          },
          {
            "x": 408,
            "y": 71.4,
            "is_outlier": false,
            "label": "Value: 71.40"
          },
          {
            "x": 409,
            "y": 111.0,
            "is_outlier": false,
            "label": "Value: 111.00"
          },
          {
            "x": 410,
            "y": 95.9,
            "is_outlier": false,
            "label": "Value: 95.90"
          },
          {
            "x": 411,
            "y": 114.1,
            "is_outlier": false,
            "label": "Value: 114.10"
          },
          {
            "x": 412,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 413,
            "y": 67.6,
            "is_outlier": false,
            "label": "Value: 67.60"
          },
          {
            "x": 414,
            "y": 32.6,
            "is_outlier": false,
            "label": "Value: 32.60"
          },
          {
            "x": 415,
            "y": 111.8,
            "is_outlier": false,
            "label": "Value: 111.80"
          },
          {
            "x": 416,
            "y": 117.0,
            "is_outlier": false,
            "label": "Value: 117.00"
          },
          {
            "x": 417,
            "y": 61.3,
            "is_outlier": false,
            "label": "Value: 61.30"
          },
          {
            "x": 418,
            "y": 75.9,
            "is_outlier": false,
            "label": "Value: 75.90"
          },
          {
            "x": 419,
            "y": 125.1,
            "is_outlier": false,
            "label": "Value: 125.10"
          },
          {
            "x": 420,
            "y": 89.2,
            "is_outlier": false,
            "label": "Value: 89.20"
          },
          {
            "x": 421,
            "y": 68.5,
            "is_outlier": false,
            "label": "Value: 68.50"
          },
          {
            "x": 422,
            "y": 75.6,
            "is_outlier": false,
            "label": "Value: 75.60"
          },
          {
            "x": 423,
            "y": 134.2,
            "is_outlier": false,
            "label": "Value: 134.20"
          },
          {
            "x": 424,
            "y": 134.3,
            "is_outlier": false,
            "label": "Value: 134.30"
          },
          {
            "x": 425,
            "y": 94.8,
            "is_outlier": false,
            "label": "Value: 94.80"
          },
          {
            "x": 426,
            "y": 70.5,
            "is_outlier": false,
            "label": "Value: 70.50"
          },
          {
            "x": 427,
            "y": 112.1,
            "is_outlier": false,
            "label": "Value: 112.10"
          },
          {
            "x": 428,
            "y": 68.2,
            "is_outlier": false,
            "label": "Value: 68.20"
          },
          {
            "x": 429,
            "y": 55.7,
            "is_outlier": false,
            "label": "Value: 55.70"
          },
          {
            "x": 430,
            "y": 84.7,
            "is_outlier": false,
            "label": "Value: 84.70"
          },
          {
            "x": 431,
            "y": 70.5,
            "is_outlier": false,
            "label": "Value: 70.50"
          },
          {
            "x": 432,
            "y": 47.7,
            "is_outlier": false,
            "label": "Value: 47.70"
          },
          {
            "x": 433,
            "y": 50.5,
            "is_outlier": false,
            "label": "Value: 50.50"
          },
          {
            "x": 434,
            "y": 64.4,
            "is_outlier": false,
            "label": "Value: 64.40"
          },
          {
            "x": 435,
            "y": 96.0,
            "is_outlier": false,
            "label": "Value: 96.00"
          },
          {
            "x": 436,
            "y": 86.5,
            "is_outlier": false,
            "label": "Value: 86.50"
          },
          {
            "x": 437,
            "y": 56.9,
            "is_outlier": false,
            "label": "Value: 56.90"
          },
          {
            "x": 438,
            "y": 56.3,
            "is_outlier": false,
            "label": "Value: 56.30"
          },
          {
            "x": 439,
            "y": 67.4,
            "is_outlier": false,
            "label": "Value: 67.40"
          },
          {
            "x": 440,
            "y": 112.1,
            "is_outlier": false,
            "label": "Value: 112.10"
          },
          {
            "x": 441,
            "y": 109.2,
            "is_outlier": false,
            "label": "Value: 109.20"
          },
          {
            "x": 442,
            "y": 55.3,
            "is_outlier": false,
            "label": "Value: 55.30"
          },
          {
            "x": 443,
            "y": 65.6,
            "is_outlier": false,
            "label": "Value: 65.60"
          },
          {
            "x": 444,
            "y": 80.0,
            "is_outlier": false,
            "label": "Value: 80.00"
          },
          {
            "x": 445,
            "y": 71.4,
            "is_outlier": false,
            "label": "Value: 71.40"
          },
          {
            "x": 446,
            "y": 71.2,
            "is_outlier": false,
            "label": "Value: 71.20"
          },
          {
            "x": 447,
            "y": 111.6,
            "is_outlier": false,
            "label": "Value: 111.60"
          },
          {
            "x": 448,
            "y": 50.2,
            "is_outlier": false,
            "label": "Value: 50.20"
          },
          {
            "x": 449,
            "y": 59.3,
            "is_outlier": false,
            "label": "Value: 59.30"
          },
          {
            "x": 450,
            "y": 83.0,
            "is_outlier": false,
            "label": "Value: 83.00"
          },
          {
            "x": 451,
            "y": 104.3,
            "is_outlier": false,
            "label": "Value: 104.30"
          },
          {
            "x": 452,
            "y": 82.1,
            "is_outlier": false,
            "label": "Value: 82.10"
          },
          {
            "x": 453,
            "y": 154.0,
            "is_outlier": true,
            "label": "Value: 154.00"
          },
          {
            "x": 454,
            "y": 127.9,
            "is_outlier": false,
            "label": "Value: 127.90"
          },
          {
            "x": 455,
            "y": 56.0,
            "is_outlier": false,
            "label": "Value: 56.00"
          },
          {
            "x": 456,
            "y": 120.2,
            "is_outlier": false,
            "label": "Value: 120.20"
          },
          {
            "x": 457,
            "y": 88.8,
            "is_outlier": false,
            "label": "Value: 88.80"
          },
          {
            "x": 458,
            "y": 81.4,
            "is_outlier": false,
            "label": "Value: 81.40"
          },
          {
            "x": 459,
            "y": 74.9,
            "is_outlier": false,
            "label": "Value: 74.90"
          },
          {
            "x": 460,
            "y": 68.1,
            "is_outlier": false,
            "label": "Value: 68.10"
          },
          {
            "x": 461,
            "y": 58.0,
            "is_outlier": false,
            "label": "Value: 58.00"
          },
          {
            "x": 462,
            "y": 89.1,
            "is_outlier": false,
            "label": "Value: 89.10"
          },
          {
            "x": 463,
            "y": 85.1,
            "is_outlier": false,
            "label": "Value: 85.10"
          },
          {
            "x": 464,
            "y": 105.4,
            "is_outlier": false,
            "label": "Value: 105.40"
          },
          {
            "x": 465,
            "y": 55.8,
            "is_outlier": false,
            "label": "Value: 55.80"
          },
          {
            "x": 466,
            "y": 72.9,
            "is_outlier": false,
            "label": "Value: 72.90"
          },
          {
            "x": 467,
            "y": 113.0,
            "is_outlier": false,
            "label": "Value: 113.00"
          },
          {
            "x": 468,
            "y": 159.6,
            "is_outlier": true,
            "label": "Value: 159.60"
          },
          {
            "x": 469,
            "y": 56.1,
            "is_outlier": false,
            "label": "Value: 56.10"
          },
          {
            "x": 470,
            "y": 77.4,
            "is_outlier": false,
            "label": "Value: 77.40"
          },
          {
            "x": 471,
            "y": 70.2,
            "is_outlier": false,
            "label": "Value: 70.20"
          },
          {
            "x": 472,
            "y": 63.8,
            "is_outlier": false,
            "label": "Value: 63.80"
          },
          {
            "x": 473,
            "y": 90.1,
            "is_outlier": false,
            "label": "Value: 90.10"
          },
          {
            "x": 474,
            "y": 86.7,
            "is_outlier": false,
            "label": "Value: 86.70"
          },
          {
            "x": 475,
            "y": 66.1,
            "is_outlier": false,
            "label": "Value: 66.10"
          },
          {
            "x": 476,
            "y": 73.9,
            "is_outlier": false,
            "label": "Value: 73.90"
          },
          {
            "x": 477,
            "y": 64.6,
            "is_outlier": false,
            "label": "Value: 64.60"
          },
          {
            "x": 478,
            "y": 89.0,
            "is_outlier": false,
            "label": "Value: 89.00"
          },
          {
            "x": 479,
            "y": 67.7,
            "is_outlier": false,
            "label": "Value: 67.70"
          },
          {
            "x": 480,
            "y": 67.3,
            "is_outlier": false,
            "label": "Value: 67.30"
          },
          {
            "x": 481,
            "y": 99.4,
            "is_outlier": false,
            "label": "Value: 99.40"
          },
          {
            "x": 482,
            "y": 88.5,
            "is_outlier": false,
            "label": "Value: 88.50"
          },
          {
            "x": 483,
            "y": 103.1,
            "is_outlier": false,
            "label": "Value: 103.10"
          },
          {
            "x": 484,
            "y": 96.7,
            "is_outlier": false,
            "label": "Value: 96.70"
          },
          {
            "x": 485,
            "y": 94.3,
            "is_outlier": false,
            "label": "Value: 94.30"
          },
          {
            "x": 486,
            "y": 64.1,
            "is_outlier": false,
            "label": "Value: 64.10"
          },
          {
            "x": 487,
            "y": 96.9,
            "is_outlier": false,
            "label": "Value: 96.90"
          },
          {
            "x": 488,
            "y": 93.5,
            "is_outlier": false,
            "label": "Value: 93.50"
          },
          {
            "x": 489,
            "y": 76.5,
            "is_outlier": false,
            "label": "Value: 76.50"
          },
          {
            "x": 490,
            "y": 75.1,
            "is_outlier": false,
            "label": "Value: 75.10"
          },
          {
            "x": 491,
            "y": 90.8,
            "is_outlier": false,
            "label": "Value: 90.80"
          },
          {
            "x": 492,
            "y": 67.3,
            "is_outlier": false,
            "label": "Value: 67.30"
          },
          {
            "x": 493,
            "y": 79.7,
            "is_outlier": false,
            "label": "Value: 79.70"
          },
          {
            "x": 494,
            "y": 80.1,
            "is_outlier": false,
            "label": "Value: 80.10"
          },
          {
            "x": 495,
            "y": 75.6,
            "is_outlier": false,
            "label": "Value: 75.60"
          },
          {
            "x": 496,
            "y": 57.6,
            "is_outlier": false,
            "label": "Value: 57.60"
          },
          {
            "x": 497,
            "y": 123.1,
            "is_outlier": false,
            "label": "Value: 123.10"
          },
          {
            "x": 498,
            "y": 96.9,
            "is_outlier": false,
            "label": "Value: 96.90"
          },
          {
            "x": 499,
            "y": 154.9,
            "is_outlier": true,
            "label": "Value: 154.90"
          },
          {
            "x": 500,
            "y": 62.7,
            "is_outlier": false,
            "label": "Value: 62.70"
          },
          {
            "x": 501,
            "y": 75.1,
            "is_outlier": false,
            "label": "Value: 75.10"
          },
          {
            "x": 502,
            "y": 122.9,
            "is_outlier": false,
            "label": "Value: 122.90"
          },
          {
            "x": 503,
            "y": 168.9,
            "is_outlier": true,
            "label": "Value: 168.90"
          },
          {
            "x": 504,
            "y": 56.2,
            "is_outlier": false,
            "label": "Value: 56.20"
          },
          {
            "x": 505,
            "y": 135.5,
            "is_outlier": false,
            "label": "Value: 135.50"
          },
          {
            "x": 506,
            "y": 70.7,
            "is_outlier": false,
            "label": "Value: 70.70"
          },
          {
            "x": 507,
            "y": 86.0,
            "is_outlier": false,
            "label": "Value: 86.00"
          },
          {
            "x": 508,
            "y": 62.0,
            "is_outlier": false,
            "label": "Value: 62.00"
          },
          {
            "x": 509,
            "y": 54.7,
            "is_outlier": false,
            "label": "Value: 54.70"
          },
          {
            "x": 510,
            "y": 74.8,
            "is_outlier": false,
            "label": "Value: 74.80"
          },
          {
            "x": 511,
            "y": 77.9,
            "is_outlier": false,
            "label": "Value: 77.90"
          },
          {
            "x": 512,
            "y": 54.9,
            "is_outlier": false,
            "label": "Value: 54.90"
          },
          {
            "x": 513,
            "y": 84.2,
            "is_outlier": false,
            "label": "Value: 84.20"
          },
          {
            "x": 514,
            "y": 72.2,
            "is_outlier": false,
            "label": "Value: 72.20"
          },
          {
            "x": 515,
            "y": 136.5,
            "is_outlier": false,
            "label": "Value: 136.50"
          },
          {
            "x": 516,
            "y": 93.8,
            "is_outlier": false,
            "label": "Value: 93.80"
          },
          {
            "x": 517,
            "y": 119.5,
            "is_outlier": false,
            "label": "Value: 119.50"
          },
          {
            "x": 518,
            "y": 60.6,
            "is_outlier": false,
            "label": "Value: 60.60"
          },
          {
            "x": 519,
            "y": 72.1,
            "is_outlier": false,
            "label": "Value: 72.10"
          },
          {
            "x": 520,
            "y": 59.2,
            "is_outlier": false,
            "label": "Value: 59.20"
          },
          {
            "x": 521,
            "y": 77.3,
            "is_outlier": false,
            "label": "Value: 77.30"
          },
          {
            "x": 522,
            "y": 118.2,
            "is_outlier": false,
            "label": "Value: 118.20"
          },
          {
            "x": 523,
            "y": 85.8,
            "is_outlier": false,
            "label": "Value: 85.80"
          },
          {
            "x": 524,
            "y": 65.5,
            "is_outlier": false,
            "label": "Value: 65.50"
          },
          {
            "x": 525,
            "y": 93.7,
            "is_outlier": false,
            "label": "Value: 93.70"
          },
          {
            "x": 526,
            "y": 76.4,
            "is_outlier": false,
            "label": "Value: 76.40"
          },
          {
            "x": 527,
            "y": 61.7,
            "is_outlier": false,
            "label": "Value: 61.70"
          },
          {
            "x": 528,
            "y": 50.4,
            "is_outlier": false,
            "label": "Value: 50.40"
          },
          {
            "x": 529,
            "y": 73.3,
            "is_outlier": false,
            "label": "Value: 73.30"
          },
          {
            "x": 530,
            "y": 124.1,
            "is_outlier": false,
            "label": "Value: 124.10"
          },
          {
            "x": 531,
            "y": 83.0,
            "is_outlier": false,
            "label": "Value: 83.00"
          },
          {
            "x": 532,
            "y": 85.2,
            "is_outlier": false,
            "label": "Value: 85.20"
          },
          {
            "x": 533,
            "y": 73.9,
            "is_outlier": false,
            "label": "Value: 73.90"
          },
          {
            "x": 534,
            "y": 87.3,
            "is_outlier": false,
            "label": "Value: 87.30"
          },
          {
            "x": 535,
            "y": 47.5,
            "is_outlier": false,
            "label": "Value: 47.50"
          },
          {
            "x": 536,
            "y": 59.0,
            "is_outlier": false,
            "label": "Value: 59.00"
          },
          {
            "x": 537,
            "y": 92.8,
            "is_outlier": false,
            "label": "Value: 92.80"
          },
          {
            "x": 538,
            "y": 122.4,
            "is_outlier": false,
            "label": "Value: 122.40"
          },
          {
            "x": 539,
            "y": 81.4,
            "is_outlier": false,
            "label": "Value: 81.40"
          },
          {
            "x": 540,
            "y": 130.3,
            "is_outlier": false,
            "label": "Value: 130.30"
          },
          {
            "x": 541,
            "y": 80.0,
            "is_outlier": false,
            "label": "Value: 80.00"
          },
          {
            "x": 542,
            "y": 65.4,
            "is_outlier": false,
            "label": "Value: 65.40"
          },
          {
            "x": 543,
            "y": 85.1,
            "is_outlier": false,
            "label": "Value: 85.10"
          },
          {
            "x": 544,
            "y": 123.7,
            "is_outlier": false,
            "label": "Value: 123.70"
          },
          {
            "x": 545,
            "y": 75.2,
            "is_outlier": false,
            "label": "Value: 75.20"
          },
          {
            "x": 546,
            "y": 147.6,
            "is_outlier": true,
            "label": "Value: 147.60"
          },
          {
            "x": 547,
            "y": 110.3,
            "is_outlier": false,
            "label": "Value: 110.30"
          },
          {
            "x": 548,
            "y": 70.8,
            "is_outlier": false,
            "label": "Value: 70.80"
          },
          {
            "x": 549,
            "y": 100.8,
            "is_outlier": false,
            "label": "Value: 100.80"
          },
          {
            "x": 550,
            "y": 79.1,
            "is_outlier": false,
            "label": "Value: 79.10"
          },
          {
            "x": 551,
            "y": 113.5,
            "is_outlier": false,
            "label": "Value: 113.50"
          },
          {
            "x": 552,
            "y": 97.0,
            "is_outlier": false,
            "label": "Value: 97.00"
          },
          {
            "x": 553,
            "y": 69.1,
            "is_outlier": false,
            "label": "Value: 69.10"
          },
          {
            "x": 554,
            "y": 80.3,
            "is_outlier": false,
            "label": "Value: 80.30"
          },
          {
            "x": 555,
            "y": 44.8,
            "is_outlier": false,
            "label": "Value: 44.80"
          },
          {
            "x": 556,
            "y": 110.0,
            "is_outlier": false,
            "label": "Value: 110.00"
          },
          {
            "x": 557,
            "y": 86.8,
            "is_outlier": false,
            "label": "Value: 86.80"
          },
          {
            "x": 558,
            "y": 179.2,
            "is_outlier": true,
            "label": "Value: 179.20"
          },
          {
            "x": 559,
            "y": 84.4,
            "is_outlier": false,
            "label": "Value: 84.40"
          },
          {
            "x": 560,
            "y": 81.6,
            "is_outlier": false,
            "label": "Value: 81.60"
          },
          {
            "x": 561,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 562,
            "y": 71.4,
            "is_outlier": false,
            "label": "Value: 71.40"
          },
          {
            "x": 563,
            "y": 90.7,
            "is_outlier": false,
            "label": "Value: 90.70"
          },
          {
            "x": 564,
            "y": 85.9,
            "is_outlier": false,
            "label": "Value: 85.90"
          },
          {
            "x": 565,
            "y": 57.1,
            "is_outlier": false,
            "label": "Value: 57.10"
          },
          {
            "x": 566,
            "y": 89.0,
            "is_outlier": false,
            "label": "Value: 89.00"
          },
          {
            "x": 567,
            "y": 103.7,
            "is_outlier": false,
            "label": "Value: 103.70"
          },
          {
            "x": 568,
            "y": 73.5,
            "is_outlier": false,
            "label": "Value: 73.50"
          },
          {
            "x": 569,
            "y": 69.2,
            "is_outlier": false,
            "label": "Value: 69.20"
          },
          {
            "x": 570,
            "y": 113.0,
            "is_outlier": false,
            "label": "Value: 113.00"
          },
          {
            "x": 571,
            "y": 102.0,
            "is_outlier": false,
            "label": "Value: 102.00"
          },
          {
            "x": 572,
            "y": 70.5,
            "is_outlier": false,
            "label": "Value: 70.50"
          },
          {
            "x": 573,
            "y": 94.0,
            "is_outlier": false,
            "label": "Value: 94.00"
          },
          {
            "x": 574,
            "y": 81.6,
            "is_outlier": false,
            "label": "Value: 81.60"
          },
          {
            "x": 575,
            "y": 87.4,
            "is_outlier": false,
            "label": "Value: 87.40"
          },
          {
            "x": 576,
            "y": 98.5,
            "is_outlier": false,
            "label": "Value: 98.50"
          },
          {
            "x": 577,
            "y": 71.0,
            "is_outlier": false,
            "label": "Value: 71.00"
          },
          {
            "x": 578,
            "y": 63.0,
            "is_outlier": false,
            "label": "Value: 63.00"
          },
          {
            "x": 579,
            "y": 121.2,
            "is_outlier": false,
            "label": "Value: 121.20"
          },
          {
            "x": 580,
            "y": 66.4,
            "is_outlier": false,
            "label": "Value: 66.40"
          },
          {
            "x": 581,
            "y": 81.1,
            "is_outlier": false,
            "label": "Value: 81.10"
          },
          {
            "x": 582,
            "y": 124.0,
            "is_outlier": false,
            "label": "Value: 124.00"
          },
          {
            "x": 583,
            "y": 65.6,
            "is_outlier": false,
            "label": "Value: 65.60"
          },
          {
            "x": 584,
            "y": 135.8,
            "is_outlier": false,
            "label": "Value: 135.80"
          },
          {
            "x": 585,
            "y": 58.6,
            "is_outlier": false,
            "label": "Value: 58.60"
          },
          {
            "x": 586,
            "y": 66.0,
            "is_outlier": false,
            "label": "Value: 66.00"
          },
          {
            "x": 587,
            "y": 123.1,
            "is_outlier": false,
            "label": "Value: 123.10"
          },
          {
            "x": 588,
            "y": 85.5,
            "is_outlier": false,
            "label": "Value: 85.50"
          },
          {
            "x": 589,
            "y": 83.8,
            "is_outlier": false,
            "label": "Value: 83.80"
          },
          {
            "x": 590,
            "y": 73.3,
            "is_outlier": false,
            "label": "Value: 73.30"
          },
          {
            "x": 591,
            "y": 71.0,
            "is_outlier": false,
            "label": "Value: 71.00"
          },
          {
            "x": 592,
            "y": 100.5,
            "is_outlier": false,
            "label": "Value: 100.50"
          },
          {
            "x": 593,
            "y": 68.0,
            "is_outlier": false,
            "label": "Value: 68.00"
          },
          {
            "x": 594,
            "y": 84.2,
            "is_outlier": false,
            "label": "Value: 84.20"
          },
          {
            "x": 595,
            "y": 70.4,
            "is_outlier": false,
            "label": "Value: 70.40"
          },
          {
            "x": 596,
            "y": 85.9,
            "is_outlier": false,
            "label": "Value: 85.90"
          },
          {
            "x": 597,
            "y": 90.3,
            "is_outlier": false,
            "label": "Value: 90.30"
          },
          {
            "x": 598,
            "y": 87.1,
            "is_outlier": false,
            "label": "Value: 87.10"
          },
          {
            "x": 599,
            "y": 153.4,
            "is_outlier": true,
            "label": "Value: 153.40"
          },
          {
            "x": 600,
            "y": 60.3,
            "is_outlier": false,
            "label": "Value: 60.30"
          },
          {
            "x": 601,
            "y": 57.3,
            "is_outlier": false,
            "label": "Value: 57.30"
          },
          {
            "x": 602,
            "y": 50.1,
            "is_outlier": false,
            "label": "Value: 50.10"
          },
          {
            "x": 603,
            "y": 123.6,
            "is_outlier": false,
            "label": "Value: 123.60"
          },
          {
            "x": 604,
            "y": 64.6,
            "is_outlier": false,
            "label": "Value: 64.60"
          },
          {
            "x": 605,
            "y": 96.0,
            "is_outlier": false,
            "label": "Value: 96.00"
          },
          {
            "x": 606,
            "y": 133.6,
            "is_outlier": false,
            "label": "Value: 133.60"
          },
          {
            "x": 607,
            "y": 96.8,
            "is_outlier": false,
            "label": "Value: 96.80"
          },
          {
            "x": 608,
            "y": 70.9,
            "is_outlier": false,
            "label": "Value: 70.90"
          },
          {
            "x": 609,
            "y": 148.2,
            "is_outlier": true,
            "label": "Value: 148.20"
          },
          {
            "x": 610,
            "y": 79.8,
            "is_outlier": false,
            "label": "Value: 79.80"
          },
          {
            "x": 611,
            "y": 91.1,
            "is_outlier": false,
            "label": "Value: 91.10"
          },
          {
            "x": 612,
            "y": 109.5,
            "is_outlier": false,
            "label": "Value: 109.50"
          },
          {
            "x": 613,
            "y": 109.2,
            "is_outlier": false,
            "label": "Value: 109.20"
          },
          {
            "x": 614,
            "y": 83.5,
            "is_outlier": false,
            "label": "Value: 83.50"
          },
          {
            "x": 615,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 616,
            "y": 82.4,
            "is_outlier": false,
            "label": "Value: 82.40"
          },
          {
            "x": 617,
            "y": 154.3,
            "is_outlier": true,
            "label": "Value: 154.30"
          },
          {
            "x": 618,
            "y": 57.2,
            "is_outlier": false,
            "label": "Value: 57.20"
          },
          {
            "x": 619,
            "y": 75.4,
            "is_outlier": false,
            "label": "Value: 75.40"
          },
          {
            "x": 620,
            "y": 115.6,
            "is_outlier": false,
            "label": "Value: 115.60"
          },
          {
            "x": 621,
            "y": 53.7,
            "is_outlier": false,
            "label": "Value: 53.70"
          },
          {
            "x": 622,
            "y": 74.0,
            "is_outlier": false,
            "label": "Value: 74.00"
          },
          {
            "x": 623,
            "y": 78.7,
            "is_outlier": false,
            "label": "Value: 78.70"
          },
          {
            "x": 624,
            "y": 59.0,
            "is_outlier": false,
            "label": "Value: 59.00"
          },
          {
            "x": 625,
            "y": 67.4,
            "is_outlier": false,
            "label": "Value: 67.40"
          },
          {
            "x": 626,
            "y": 86.1,
            "is_outlier": false,
            "label": "Value: 86.10"
          },
          {
            "x": 627,
            "y": 116.6,
            "is_outlier": false,
            "label": "Value: 116.60"
          },
          {
            "x": 628,
            "y": 70.9,
            "is_outlier": false,
            "label": "Value: 70.90"
          },
          {
            "x": 629,
            "y": 61.8,
            "is_outlier": false,
            "label": "Value: 61.80"
          },
          {
            "x": 630,
            "y": 63.1,
            "is_outlier": false,
            "label": "Value: 63.10"
          },
          {
            "x": 631,
            "y": 138.6,
            "is_outlier": true,
            "label": "Value: 138.60"
          },
          {
            "x": 632,
            "y": 122.1,
            "is_outlier": false,
            "label": "Value: 122.10"
          },
          {
            "x": 633,
            "y": 79.3,
            "is_outlier": false,
            "label": "Value: 79.30"
          },
          {
            "x": 634,
            "y": 64.8,
            "is_outlier": false,
            "label": "Value: 64.80"
          },
          {
            "x": 635,
            "y": 93.5,
            "is_outlier": false,
            "label": "Value: 93.50"
          },
          {
            "x": 636,
            "y": 70.4,
            "is_outlier": false,
            "label": "Value: 70.40"
          },
          {
            "x": 637,
            "y": 85.0,
            "is_outlier": false,
            "label": "Value: 85.00"
          },
          {
            "x": 638,
            "y": 105.5,
            "is_outlier": false,
            "label": "Value: 105.50"
          },
          {
            "x": 639,
            "y": 84.9,
            "is_outlier": false,
            "label": "Value: 84.90"
          },
          {
            "x": 640,
            "y": 80.4,
            "is_outlier": false,
            "label": "Value: 80.40"
          },
          {
            "x": 641,
            "y": 84.8,
            "is_outlier": false,
            "label": "Value: 84.80"
          },
          {
            "x": 642,
            "y": 104.3,
            "is_outlier": false,
            "label": "Value: 104.30"
          },
          {
            "x": 643,
            "y": 56.0,
            "is_outlier": false,
            "label": "Value: 56.00"
          },
          {
            "x": 644,
            "y": 105.0,
            "is_outlier": false,
            "label": "Value: 105.00"
          },
          {
            "x": 645,
            "y": 121.2,
            "is_outlier": false,
            "label": "Value: 121.20"
          },
          {
            "x": 646,
            "y": 44.0,
            "is_outlier": false,
            "label": "Value: 44.00"
          },
          {
            "x": 647,
            "y": 67.1,
            "is_outlier": false,
            "label": "Value: 67.10"
          },
          {
            "x": 648,
            "y": 72.5,
            "is_outlier": false,
            "label": "Value: 72.50"
          },
          {
            "x": 649,
            "y": 84.5,
            "is_outlier": false,
            "label": "Value: 84.50"
          },
          {
            "x": 650,
            "y": 74.2,
            "is_outlier": false,
            "label": "Value: 74.20"
          },
          {
            "x": 651,
            "y": 104.9,
            "is_outlier": false,
            "label": "Value: 104.90"
          },
          {
            "x": 652,
            "y": 73.5,
            "is_outlier": false,
            "label": "Value: 73.50"
          },
          {
            "x": 653,
            "y": 71.5,
            "is_outlier": false,
            "label": "Value: 71.50"
          },
          {
            "x": 654,
            "y": 67.9,
            "is_outlier": false,
            "label": "Value: 67.90"
          },
          {
            "x": 655,
            "y": 101.9,
            "is_outlier": false,
            "label": "Value: 101.90"
          },
          {
            "x": 656,
            "y": 61.8,
            "is_outlier": false,
            "label": "Value: 61.80"
          },
          {
            "x": 657,
            "y": 98.6,
            "is_outlier": false,
            "label": "Value: 98.60"
          },
          {
            "x": 658,
            "y": 80.3,
            "is_outlier": false,
            "label": "Value: 80.30"
          },
          {
            "x": 659,
            "y": 126.4,
            "is_outlier": false,
            "label": "Value: 126.40"
          },
          {
            "x": 660,
            "y": 101.5,
            "is_outlier": false,
            "label": "Value: 101.50"
          },
          {
            "x": 661,
            "y": 58.9,
            "is_outlier": false,
            "label": "Value: 58.90"
          },
          {
            "x": 662,
            "y": 94.5,
            "is_outlier": false,
            "label": "Value: 94.50"
          },
          {
            "x": 663,
            "y": 70.6,
            "is_outlier": false,
            "label": "Value: 70.60"
          },
          {
            "x": 664,
            "y": 96.1,
            "is_outlier": false,
            "label": "Value: 96.10"
          },
          {
            "x": 665,
            "y": 47.6,
            "is_outlier": false,
            "label": "Value: 47.60"
          },
          {
            "x": 666,
            "y": 114.6,
            "is_outlier": false,
            "label": "Value: 114.60"
          },
          {
            "x": 667,
            "y": 63.9,
            "is_outlier": false,
            "label": "Value: 63.90"
          },
          {
            "x": 668,
            "y": 61.1,
            "is_outlier": false,
            "label": "Value: 61.10"
          },
          {
            "x": 669,
            "y": 89.3,
            "is_outlier": false,
            "label": "Value: 89.30"
          },
          {
            "x": 670,
            "y": 61.2,
            "is_outlier": false,
            "label": "Value: 61.20"
          },
          {
            "x": 671,
            "y": 99.6,
            "is_outlier": false,
            "label": "Value: 99.60"
          },
          {
            "x": 672,
            "y": 125.5,
            "is_outlier": false,
            "label": "Value: 125.50"
          },
          {
            "x": 673,
            "y": 75.6,
            "is_outlier": false,
            "label": "Value: 75.60"
          },
          {
            "x": 674,
            "y": 127.9,
            "is_outlier": false,
            "label": "Value: 127.90"
          },
          {
            "x": 675,
            "y": 96.9,
            "is_outlier": false,
            "label": "Value: 96.90"
          },
          {
            "x": 676,
            "y": 127.3,
            "is_outlier": false,
            "label": "Value: 127.30"
          },
          {
            "x": 677,
            "y": 69.3,
            "is_outlier": false,
            "label": "Value: 69.30"
          },
          {
            "x": 678,
            "y": 61.1,
            "is_outlier": false,
            "label": "Value: 61.10"
          },
          {
            "x": 679,
            "y": 71.5,
            "is_outlier": false,
            "label": "Value: 71.50"
          },
          {
            "x": 680,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 681,
            "y": 64.7,
            "is_outlier": false,
            "label": "Value: 64.70"
          },
          {
            "x": 682,
            "y": 89.0,
            "is_outlier": false,
            "label": "Value: 89.00"
          },
          {
            "x": 683,
            "y": 53.0,
            "is_outlier": false,
            "label": "Value: 53.00"
          },
          {
            "x": 684,
            "y": 80.6,
            "is_outlier": false,
            "label": "Value: 80.60"
          },
          {
            "x": 685,
            "y": 64.6,
            "is_outlier": false,
            "label": "Value: 64.60"
          },
          {
            "x": 686,
            "y": 73.0,
            "is_outlier": false,
            "label": "Value: 73.00"
          },
          {
            "x": 687,
            "y": 83.6,
            "is_outlier": false,
            "label": "Value: 83.60"
          },
          {
            "x": 688,
            "y": 74.7,
            "is_outlier": false,
            "label": "Value: 74.70"
          },
          {
            "x": 689,
            "y": 69.2,
            "is_outlier": false,
            "label": "Value: 69.20"
          },
          {
            "x": 690,
            "y": 120.1,
            "is_outlier": false,
            "label": "Value: 120.10"
          },
          {
            "x": 691,
            "y": 57.7,
            "is_outlier": false,
            "label": "Value: 57.70"
          },
          {
            "x": 692,
            "y": 53.2,
            "is_outlier": false,
            "label": "Value: 53.20"
          },
          {
            "x": 693,
            "y": 76.0,
            "is_outlier": false,
            "label": "Value: 76.00"
          },
          {
            "x": 694,
            "y": 75.2,
            "is_outlier": false,
            "label": "Value: 75.20"
          },
          {
            "x": 695,
            "y": 71.6,
            "is_outlier": false,
            "label": "Value: 71.60"
          },
          {
            "x": 696,
            "y": 72.2,
            "is_outlier": false,
            "label": "Value: 72.20"
          },
          {
            "x": 697,
            "y": 66.6,
            "is_outlier": false,
            "label": "Value: 66.60"
          },
          {
            "x": 698,
            "y": 97.9,
            "is_outlier": false,
            "label": "Value: 97.90"
          },
          {
            "x": 699,
            "y": 71.6,
            "is_outlier": false,
            "label": "Value: 71.60"
          },
          {
            "x": 700,
            "y": 98.4,
            "is_outlier": false,
            "label": "Value: 98.40"
          },
          {
            "x": 701,
            "y": 101.1,
            "is_outlier": false,
            "label": "Value: 101.10"
          },
          {
            "x": 702,
            "y": 83.2,
            "is_outlier": false,
            "label": "Value: 83.20"
          },
          {
            "x": 703,
            "y": 56.6,
            "is_outlier": false,
            "label": "Value: 56.60"
          },
          {
            "x": 704,
            "y": 128.6,
            "is_outlier": false,
            "label": "Value: 128.60"
          },
          {
            "x": 705,
            "y": 90.9,
            "is_outlier": false,
            "label": "Value: 90.90"
          },
          {
            "x": 706,
            "y": 84.0,
            "is_outlier": false,
            "label": "Value: 84.00"
          },
          {
            "x": 707,
            "y": 119.0,
            "is_outlier": false,
            "label": "Value: 119.00"
          },
          {
            "x": 708,
            "y": 67.0,
            "is_outlier": false,
            "label": "Value: 67.00"
          },
          {
            "x": 709,
            "y": 79.9,
            "is_outlier": false,
            "label": "Value: 79.90"
          },
          {
            "x": 710,
            "y": 85.5,
            "is_outlier": false,
            "label": "Value: 85.50"
          },
          {
            "x": 711,
            "y": 51.0,
            "is_outlier": false,
            "label": "Value: 51.00"
          },
          {
            "x": 712,
            "y": 87.2,
            "is_outlier": false,
            "label": "Value: 87.20"
          },
          {
            "x": 713,
            "y": 63.0,
            "is_outlier": false,
            "label": "Value: 63.00"
          },
          {
            "x": 714,
            "y": 84.6,
            "is_outlier": false,
            "label": "Value: 84.60"
          },
          {
            "x": 715,
            "y": 81.8,
            "is_outlier": false,
            "label": "Value: 81.80"
          },
          {
            "x": 716,
            "y": 96.8,
            "is_outlier": false,
            "label": "Value: 96.80"
          },
          {
            "x": 717,
            "y": 142.2,
            "is_outlier": true,
            "label": "Value: 142.20"
          },
          {
            "x": 718,
            "y": 51.2,
            "is_outlier": false,
            "label": "Value: 51.20"
          },
          {
            "x": 719,
            "y": 81.8,
            "is_outlier": false,
            "label": "Value: 81.80"
          },
          {
            "x": 720,
            "y": 112.7,
            "is_outlier": false,
            "label": "Value: 112.70"
          },
          {
            "x": 721,
            "y": 103.4,
            "is_outlier": false,
            "label": "Value: 103.40"
          },
          {
            "x": 722,
            "y": 58.9,
            "is_outlier": false,
            "label": "Value: 58.90"
          },
          {
            "x": 723,
            "y": 91.8,
            "is_outlier": false,
            "label": "Value: 91.80"
          },
          {
            "x": 724,
            "y": 72.0,
            "is_outlier": false,
            "label": "Value: 72.00"
          },
          {
            "x": 725,
            "y": 47.1,
            "is_outlier": false,
            "label": "Value: 47.10"
          },
          {
            "x": 726,
            "y": 48.6,
            "is_outlier": false,
            "label": "Value: 48.60"
          },
          {
            "x": 727,
            "y": 68.5,
            "is_outlier": false,
            "label": "Value: 68.50"
          },
          {
            "x": 728,
            "y": 124.8,
            "is_outlier": false,
            "label": "Value: 124.80"
          },
          {
            "x": 729,
            "y": 67.2,
            "is_outlier": false,
            "label": "Value: 67.20"
          },
          {
            "x": 730,
            "y": 73.0,
            "is_outlier": false,
            "label": "Value: 73.00"
          },
          {
            "x": 731,
            "y": 82.9,
            "is_outlier": false,
            "label": "Value: 82.90"
          },
          {
            "x": 732,
            "y": 84.4,
            "is_outlier": false,
            "label": "Value: 84.40"
          },
          {
            "x": 733,
            "y": 93.2,
            "is_outlier": false,
            "label": "Value: 93.20"
          },
          {
            "x": 734,
            "y": 75.8,
            "is_outlier": false,
            "label": "Value: 75.80"
          },
          {
            "x": 735,
            "y": 82.6,
            "is_outlier": false,
            "label": "Value: 82.60"
          },
          {
            "x": 736,
            "y": 76.5,
            "is_outlier": false,
            "label": "Value: 76.50"
          },
          {
            "x": 737,
            "y": 65.6,
            "is_outlier": false,
            "label": "Value: 65.60"
          },
          {
            "x": 738,
            "y": 83.5,
            "is_outlier": false,
            "label": "Value: 83.50"
          },
          {
            "x": 739,
            "y": 89.1,
            "is_outlier": false,
            "label": "Value: 89.10"
          },
          {
            "x": 740,
            "y": 60.9,
            "is_outlier": false,
            "label": "Value: 60.90"
          },
          {
            "x": 741,
            "y": 91.4,
            "is_outlier": false,
            "label": "Value: 91.40"
          },
          {
            "x": 742,
            "y": 71.1,
            "is_outlier": false,
            "label": "Value: 71.10"
          },
          {
            "x": 743,
            "y": 55.1,
            "is_outlier": false,
            "label": "Value: 55.10"
          },
          {
            "x": 744,
            "y": 63.9,
            "is_outlier": false,
            "label": "Value: 63.90"
          },
          {
            "x": 745,
            "y": 77.5,
            "is_outlier": false,
            "label": "Value: 77.50"
          },
          {
            "x": 746,
            "y": 83.7,
            "is_outlier": false,
            "label": "Value: 83.70"
          },
          {
            "x": 747,
            "y": 60.8,
            "is_outlier": false,
            "label": "Value: 60.80"
          },
          {
            "x": 748,
            "y": 64.0,
            "is_outlier": false,
            "label": "Value: 64.00"
          },
          {
            "x": 749,
            "y": 61.9,
            "is_outlier": false,
            "label": "Value: 61.90"
          },
          {
            "x": 750,
            "y": 70.4,
            "is_outlier": false,
            "label": "Value: 70.40"
          },
          {
            "x": 751,
            "y": 99.4,
            "is_outlier": false,
            "label": "Value: 99.40"
          },
          {
            "x": 752,
            "y": 47.5,
            "is_outlier": false,
            "label": "Value: 47.50"
          },
          {
            "x": 753,
            "y": 89.2,
            "is_outlier": false,
            "label": "Value: 89.20"
          },
          {
            "x": 754,
            "y": 63.6,
            "is_outlier": false,
            "label": "Value: 63.60"
          },
          {
            "x": 755,
            "y": 84.9,
            "is_outlier": false,
            "label": "Value: 84.90"
          },
          {
            "x": 756,
            "y": 94.4,
            "is_outlier": false,
            "label": "Value: 94.40"
          },
          {
            "x": 757,
            "y": 127.1,
            "is_outlier": false,
            "label": "Value: 127.10"
          },
          {
            "x": 758,
            "y": 86.2,
            "is_outlier": false,
            "label": "Value: 86.20"
          },
          {
            "x": 759,
            "y": 53.3,
            "is_outlier": false,
            "label": "Value: 53.30"
          },
          {
            "x": 760,
            "y": 75.8,
            "is_outlier": false,
            "label": "Value: 75.80"
          },
          {
            "x": 761,
            "y": 91.5,
            "is_outlier": false,
            "label": "Value: 91.50"
          },
          {
            "x": 762,
            "y": 80.7,
            "is_outlier": false,
            "label": "Value: 80.70"
          },
          {
            "x": 763,
            "y": 85.0,
            "is_outlier": false,
            "label": "Value: 85.00"
          },
          {
            "x": 764,
            "y": 95.2,
            "is_outlier": false,
            "label": "Value: 95.20"
          },
          {
            "x": 765,
            "y": 62.9,
            "is_outlier": false,
            "label": "Value: 62.90"
          },
          {
            "x": 766,
            "y": 87.0,
            "is_outlier": false,
            "label": "Value: 87.00"
          },
          {
            "x": 767,
            "y": 68.9,
            "is_outlier": false,
            "label": "Value: 68.90"
          },
          {
            "x": 768,
            "y": 54.6,
            "is_outlier": false,
            "label": "Value: 54.60"
          },
          {
            "x": 769,
            "y": 94.8,
            "is_outlier": false,
            "label": "Value: 94.80"
          },
          {
            "x": 770,
            "y": 67.8,
            "is_outlier": false,
            "label": "Value: 67.80"
          },
          {
            "x": 771,
            "y": 58.6,
            "is_outlier": false,
            "label": "Value: 58.60"
          },
          {
            "x": 772,
            "y": 55.0,
            "is_outlier": false,
            "label": "Value: 55.00"
          },
          {
            "x": 773,
            "y": 119.5,
            "is_outlier": false,
            "label": "Value: 119.50"
          },
          {
            "x": 774,
            "y": 63.3,
            "is_outlier": false,
            "label": "Value: 63.30"
          },
          {
            "x": 775,
            "y": 94.9,
            "is_outlier": false,
            "label": "Value: 94.90"
          },
          {
            "x": 776,
            "y": 93.5,
            "is_outlier": false,
            "label": "Value: 93.50"
          },
          {
            "x": 777,
            "y": 78.6,
            "is_outlier": false,
            "label": "Value: 78.60"
          },
          {
            "x": 778,
            "y": 59.4,
            "is_outlier": false,
            "label": "Value: 59.40"
          },
          {
            "x": 779,
            "y": 68.0,
            "is_outlier": false,
            "label": "Value: 68.00"
          },
          {
            "x": 780,
            "y": 106.1,
            "is_outlier": false,
            "label": "Value: 106.10"
          },
          {
            "x": 781,
            "y": 87.0,
            "is_outlier": false,
            "label": "Value: 87.00"
          },
          {
            "x": 782,
            "y": 83.4,
            "is_outlier": false,
            "label": "Value: 83.40"
          },
          {
            "x": 783,
            "y": 83.4,
            "is_outlier": false,
            "label": "Value: 83.40"
          },
          {
            "x": 784,
            "y": 81.8,
            "is_outlier": false,
            "label": "Value: 81.80"
          },
          {
            "x": 785,
            "y": 98.0,
            "is_outlier": false,
            "label": "Value: 98.00"
          },
          {
            "x": 786,
            "y": 92.2,
            "is_outlier": false,
            "label": "Value: 92.20"
          },
          {
            "x": 787,
            "y": 137.5,
            "is_outlier": false,
            "label": "Value: 137.50"
          },
          {
            "x": 788,
            "y": 78.8,
            "is_outlier": false,
            "label": "Value: 78.80"
          },
          {
            "x": 789,
            "y": 54.3,
            "is_outlier": false,
            "label": "Value: 54.30"
          },
          {
            "x": 790,
            "y": 74.8,
            "is_outlier": false,
            "label": "Value: 74.80"
          },
          {
            "x": 791,
            "y": 78.0,
            "is_outlier": false,
            "label": "Value: 78.00"
          },
          {
            "x": 792,
            "y": 126.6,
            "is_outlier": false,
            "label": "Value: 126.60"
          },
          {
            "x": 793,
            "y": 75.2,
            "is_outlier": false,
            "label": "Value: 75.20"
          },
          {
            "x": 794,
            "y": 79.0,
            "is_outlier": false,
            "label": "Value: 79.00"
          },
          {
            "x": 795,
            "y": 59.6,
            "is_outlier": false,
            "label": "Value: 59.60"
          },
          {
            "x": 796,
            "y": 98.3,
            "is_outlier": false,
            "label": "Value: 98.30"
          },
          {
            "x": 797,
            "y": 96.0,
            "is_outlier": false,
            "label": "Value: 96.00"
          },
          {
            "x": 798,
            "y": 126.6,
            "is_outlier": false,
            "label": "Value: 126.60"
          },
          {
            "x": 799,
            "y": 95.5,
            "is_outlier": false,
            "label": "Value: 95.50"
          }
        ],
        "outlier_column": "Weight (kg)",
        "total_outliers": 207,
        "outlier_percentage": 2.467811158798283,
        "outlier_list": [],
        "outlier_explanation": "IQR-based outlier detection on Weight (kg) flagged 207 individuals (2.5%) as statistical outliers, mostly at the high end of the 32.6–254.3 kg range.",
        "correlations": {
          "labels": [
            "Weight vs Standing Height",
            "Weight vs BMI"
          ],
          "values": [
            0.4226,
            0.8933
          ]
        },
        "correlation_target": "Weight (kg)",
        "correlation_explanation": "Weight correlates very strongly with BMI (r=0.89) and moderately with Height (r=0.42) — BMI in this cohort is driven almost entirely by weight, not stature.",
        "categorical_1": [
          {
            "category": "Obese",
            "count": 3583
          },
          {
            "category": "Overweight",
            "count": 2675
          },
          {
            "category": "Normal",
            "count": 2008
          },
          {
            "category": "Underweight",
            "count": 122
          }
        ],
        "categorical_1_column": "BMI Category",
        "categorical_2": [
          {
            "category": "130-150cm",
            "count": 338
          },
          {
            "category": "150-160cm",
            "count": 2015
          },
          {
            "category": "160-170cm",
            "count": 2918
          },
          {
            "category": "170-180cm",
            "count": 2279
          },
          {
            "category": "180-190cm",
            "count": 760
          },
          {
            "category": "190-200cm",
            "count": 78
          }
        ],
        "categorical_2_column": "Height Range",
        "categorical_explanation": "BMI Category and Height Range breakdowns for the full sample — most individuals (2,918) fall in the 160-170cm height band."
      },
      "data_quality": {
        "duplicate_count": 0,
        "duplicate_percentage": 0.0,
        "worst_missing_column": {
          "column": "Blood Pressure",
          "percentage": 3.4
        },
        "avg_missing_percentage": 0.6,
        "columns_with_missing": [
          {
            "column": "Blood Pressure",
            "percentage": 3.4
          }
        ]
      }
    }
  },
  "bikes": {
    "label": "London Bike Share",
    "icon": "🚲",
    "rows": "776,527 rows",
    "metrics": {
      "margin": "776,527 trips in August 2023 (avg 25.9 min/trip)",
      "margin_signal": "776,527 trips in August 2023 (avg 25.9 min/trip)",
      "executiveSummary": "This dataset captures every Santander Cycles journey in London during August 2023 — 776,527 trips across 800 stations. Daily volume ranged from 11,638 trips (Aug 5, likely a rainy day) to 31,797 trips (Aug 9), with a fairly steady baseline in between. Hyde Park Corner is the busiest single station by a wide margin, both as a starting point (7,437 trips) and destination (7,414 trips), with several other West London and City stations rounding out the top five. The median trip is 14.0 minutes, though the mean (25.9 minutes) is pulled higher by a long tail of extended rentals — 6.4% of trips (49,447) register as statistical duration outliers.",
      "executive_summary": "This dataset captures every Santander Cycles journey in London during August 2023 — 776,527 trips across 800 stations. Daily volume ranged from 11,638 trips (Aug 5, likely a rainy day) to 31,797 trips (Aug 9), with a fairly steady baseline in between. Hyde Park Corner is the busiest single station by a wide margin, both as a starting point (7,437 trips) and destination (7,414 trips), with several other West London and City stations rounding out the top five. The median trip is 14.0 minutes, though the mean (25.9 minutes) is pulled higher by a long tail of extended rentals — 6.4% of trips (49,447) register as statistical duration outliers.",
      "exec_summary": "This dataset captures every Santander Cycles journey in London during August 2023 — 776,527 trips across 800 stations. Daily volume ranged from 11,638 trips (Aug 5, likely a rainy day) to 31,797 trips (Aug 9), with a fairly steady baseline in between. Hyde Park Corner is the busiest single station by a wide margin, both as a starting point (7,437 trips) and destination (7,414 trips), with several other West London and City stations rounding out the top five. The median trip is 14.0 minutes, though the mean (25.9 minutes) is pulled higher by a long tail of extended rentals — 6.4% of trips (49,447) register as statistical duration outliers.",
      "risk_statement": "6.4% of trips (49,447) are duration outliers under the IQR method, including some multi-day durations in the raw data (likely un-docked or lost bikes) that could distort average-duration reporting if not filtered out. E-bikes make up only 7.7% of trip volume, which may signal under-availability relative to demand at peak stations like Hyde Park Corner.",
      "risk": "6.4% of trips (49,447) are duration outliers under the IQR method, including some multi-day durations in the raw data (likely un-docked or lost bikes) that could distort average-duration reporting if not filtered out. E-bikes make up only 7.7% of trip volume, which may signal under-availability relative to demand at peak stations like Hyde Park Corner.",
      "risk_text": "6.4% of trips (49,447) are duration outliers under the IQR method, including some multi-day durations in the raw data (likely un-docked or lost bikes) that could distort average-duration reporting if not filtered out. E-bikes make up only 7.7% of trip volume, which may signal under-availability relative to demand at peak stations like Hyde Park Corner.",
      "opportunity_statement": "Hyde Park Corner and the other top-5 stations account for a disproportionate share of trips, suggesting rebalancing or expanded capacity there could reduce dock shortages. Given the long tail of extended-duration trips, a pricing or notification nudge around the 30-60 minute mark could reduce the outlier rate and free up bikes faster during peak demand.",
      "opportunity": "Hyde Park Corner and the other top-5 stations account for a disproportionate share of trips, suggesting rebalancing or expanded capacity there could reduce dock shortages. Given the long tail of extended-duration trips, a pricing or notification nudge around the 30-60 minute mark could reduce the outlier rate and free up bikes faster during peak demand.",
      "opp_text": "Hyde Park Corner and the other top-5 stations account for a disproportionate share of trips, suggesting rebalancing or expanded capacity there could reduce dock shortages. Given the long tail of extended-duration trips, a pricing or notification nudge around the 30-60 minute mark could reduce the outlier rate and free up bikes faster during peak demand.",
      "revenueEfficiency": "",
      "what_changed": "Daily trip volume swung nearly 3x across the month — from 11,638 trips on the quietest day (Aug 5) to 31,797 on the busiest (Aug 9) — indicating strong sensitivity to weather or day-of-week effects rather than a stable daily baseline.",
      "why_changed": "With duration showing essentially no correlation to start station, end station, or bike number (all |r| < 0.01), trip length appears to be driven by rider behavior and trip purpose rather than any particular station or bike — consistent with a mix of commute and leisure riding.",
      "action_playbook": "Investigate the 49,447 outlier-duration trips for data-quality issues (e.g. bikes not properly docked) before using average duration in reporting, and consider capacity planning around Hyde Park Corner and the other top stations ahead of high-volume days like Aug 9.",
      "chart_data": {
        "time_series_data": [
          {
            "time": "Aug 01",
            "value": 30055
          },
          {
            "time": "Aug 02",
            "value": 20622
          },
          {
            "time": "Aug 03",
            "value": 29822
          },
          {
            "time": "Aug 04",
            "value": 24950
          },
          {
            "time": "Aug 05",
            "value": 11638
          },
          {
            "time": "Aug 06",
            "value": 16491
          },
          {
            "time": "Aug 07",
            "value": 24983
          },
          {
            "time": "Aug 08",
            "value": 29143
          },
          {
            "time": "Aug 09",
            "value": 31797
          },
          {
            "time": "Aug 10",
            "value": 29578
          },
          {
            "time": "Aug 11",
            "value": 24132
          },
          {
            "time": "Aug 12",
            "value": 18651
          },
          {
            "time": "Aug 13",
            "value": 18857
          },
          {
            "time": "Aug 14",
            "value": 26502
          },
          {
            "time": "Aug 15",
            "value": 29184
          },
          {
            "time": "Aug 16",
            "value": 29279
          },
          {
            "time": "Aug 17",
            "value": 27275
          },
          {
            "time": "Aug 18",
            "value": 24107
          },
          {
            "time": "Aug 19",
            "value": 19022
          },
          {
            "time": "Aug 20",
            "value": 18871
          },
          {
            "time": "Aug 21",
            "value": 25234
          },
          {
            "time": "Aug 22",
            "value": 27208
          },
          {
            "time": "Aug 23",
            "value": 26909
          },
          {
            "time": "Aug 24",
            "value": 25989
          },
          {
            "time": "Aug 25",
            "value": 22307
          },
          {
            "time": "Aug 26",
            "value": 19143
          },
          {
            "time": "Aug 27",
            "value": 16994
          },
          {
            "time": "Aug 28",
            "value": 22668
          },
          {
            "time": "Aug 29",
            "value": 26071
          },
          {
            "time": "Aug 30",
            "value": 25908
          },
          {
            "time": "Aug 31",
            "value": 26858
          }
        ],
        "category_data": [
          {
            "category": "Hyde Park Corner, Hyde Park",
            "count": 7437
          },
          {
            "category": "Black Lion Gate, Kensington Gardens",
            "count": 4439
          },
          {
            "category": "Waterloo Station 3, Waterloo",
            "count": 4185
          },
          {
            "category": "Albert Gate, Hyde Park",
            "count": 4169
          },
          {
            "category": "Wormwood Street, Liverpool Street",
            "count": 3899
          }
        ],
        "distribution_data": [
          {
            "name": "0-10 min",
            "value": 261285
          },
          {
            "name": "10-20 min",
            "value": 267482
          },
          {
            "name": "20-30 min",
            "value": 132759
          },
          {
            "name": "30-60 min",
            "value": 88130
          },
          {
            "name": "60+ min",
            "value": 25787
          }
        ]
      },
      "chart_explanations": {
        "time_series_explanation": "Daily trip volume across August 2023 — ranged from 11,638 trips (Aug 5) to 31,797 trips (Aug 9).",
        "category_explanation": "Top 5 busiest starting stations by trip count — Hyde Park Corner leads with 7,437 trips.",
        "distribution_explanation": "Trip count by duration band — most rides (68%) finish within 20 minutes."
      },
      "deep_dive_data": {
        "outliers": [
          {
            "x": 0,
            "y": 3.47,
            "is_outlier": false,
            "label": "Value: 3.47"
          },
          {
            "x": 1,
            "y": 14.32,
            "is_outlier": false,
            "label": "Value: 14.32"
          },
          {
            "x": 2,
            "y": 4.48,
            "is_outlier": false,
            "label": "Value: 4.48"
          },
          {
            "x": 3,
            "y": 29.15,
            "is_outlier": false,
            "label": "Value: 29.15"
          },
          {
            "x": 4,
            "y": 43.11,
            "is_outlier": false,
            "label": "Value: 43.11"
          },
          {
            "x": 5,
            "y": 25.41,
            "is_outlier": false,
            "label": "Value: 25.41"
          },
          {
            "x": 6,
            "y": 21.9,
            "is_outlier": false,
            "label": "Value: 21.90"
          },
          {
            "x": 7,
            "y": 5.2,
            "is_outlier": false,
            "label": "Value: 5.20"
          },
          {
            "x": 8,
            "y": 19.84,
            "is_outlier": false,
            "label": "Value: 19.84"
          },
          {
            "x": 9,
            "y": 19.78,
            "is_outlier": false,
            "label": "Value: 19.78"
          },
          {
            "x": 10,
            "y": 5.99,
            "is_outlier": false,
            "label": "Value: 5.99"
          },
          {
            "x": 11,
            "y": 21.1,
            "is_outlier": false,
            "label": "Value: 21.10"
          },
          {
            "x": 12,
            "y": 35.71,
            "is_outlier": false,
            "label": "Value: 35.71"
          },
          {
            "x": 13,
            "y": 5.36,
            "is_outlier": false,
            "label": "Value: 5.36"
          },
          {
            "x": 14,
            "y": 7.79,
            "is_outlier": false,
            "label": "Value: 7.79"
          },
          {
            "x": 15,
            "y": 18.18,
            "is_outlier": false,
            "label": "Value: 18.18"
          },
          {
            "x": 16,
            "y": 10.65,
            "is_outlier": false,
            "label": "Value: 10.65"
          },
          {
            "x": 17,
            "y": 17.41,
            "is_outlier": false,
            "label": "Value: 17.41"
          },
          {
            "x": 18,
            "y": 10.24,
            "is_outlier": false,
            "label": "Value: 10.24"
          },
          {
            "x": 19,
            "y": 27.11,
            "is_outlier": false,
            "label": "Value: 27.11"
          },
          {
            "x": 20,
            "y": 9.45,
            "is_outlier": false,
            "label": "Value: 9.45"
          },
          {
            "x": 21,
            "y": 15.7,
            "is_outlier": false,
            "label": "Value: 15.70"
          },
          {
            "x": 22,
            "y": 10.12,
            "is_outlier": false,
            "label": "Value: 10.12"
          },
          {
            "x": 23,
            "y": 22.31,
            "is_outlier": false,
            "label": "Value: 22.31"
          },
          {
            "x": 24,
            "y": 5.15,
            "is_outlier": false,
            "label": "Value: 5.15"
          },
          {
            "x": 25,
            "y": 26.72,
            "is_outlier": false,
            "label": "Value: 26.72"
          },
          {
            "x": 26,
            "y": 37.5,
            "is_outlier": false,
            "label": "Value: 37.50"
          },
          {
            "x": 27,
            "y": 9.4,
            "is_outlier": false,
            "label": "Value: 9.40"
          },
          {
            "x": 28,
            "y": 3.19,
            "is_outlier": false,
            "label": "Value: 3.19"
          },
          {
            "x": 29,
            "y": 12.09,
            "is_outlier": false,
            "label": "Value: 12.09"
          },
          {
            "x": 30,
            "y": 4.3,
            "is_outlier": false,
            "label": "Value: 4.30"
          },
          {
            "x": 31,
            "y": 18.74,
            "is_outlier": false,
            "label": "Value: 18.74"
          },
          {
            "x": 32,
            "y": 31.48,
            "is_outlier": false,
            "label": "Value: 31.48"
          },
          {
            "x": 33,
            "y": 41.3,
            "is_outlier": false,
            "label": "Value: 41.30"
          },
          {
            "x": 34,
            "y": 6.57,
            "is_outlier": false,
            "label": "Value: 6.57"
          },
          {
            "x": 35,
            "y": 30.36,
            "is_outlier": false,
            "label": "Value: 30.36"
          },
          {
            "x": 36,
            "y": 33.11,
            "is_outlier": false,
            "label": "Value: 33.11"
          },
          {
            "x": 37,
            "y": 5.22,
            "is_outlier": false,
            "label": "Value: 5.22"
          },
          {
            "x": 38,
            "y": 9.0,
            "is_outlier": false,
            "label": "Value: 9.00"
          },
          {
            "x": 39,
            "y": 3.28,
            "is_outlier": false,
            "label": "Value: 3.28"
          },
          {
            "x": 40,
            "y": 5.51,
            "is_outlier": false,
            "label": "Value: 5.51"
          },
          {
            "x": 41,
            "y": 17.12,
            "is_outlier": false,
            "label": "Value: 17.12"
          },
          {
            "x": 42,
            "y": 13.43,
            "is_outlier": false,
            "label": "Value: 13.43"
          },
          {
            "x": 43,
            "y": 8.08,
            "is_outlier": false,
            "label": "Value: 8.08"
          },
          {
            "x": 44,
            "y": 12.61,
            "is_outlier": false,
            "label": "Value: 12.61"
          },
          {
            "x": 45,
            "y": 16.21,
            "is_outlier": false,
            "label": "Value: 16.21"
          },
          {
            "x": 46,
            "y": 9.18,
            "is_outlier": false,
            "label": "Value: 9.18"
          },
          {
            "x": 47,
            "y": 16.17,
            "is_outlier": false,
            "label": "Value: 16.17"
          },
          {
            "x": 48,
            "y": 62.81,
            "is_outlier": true,
            "label": "Value: 62.81"
          },
          {
            "x": 49,
            "y": 12.8,
            "is_outlier": false,
            "label": "Value: 12.80"
          },
          {
            "x": 50,
            "y": 40.96,
            "is_outlier": false,
            "label": "Value: 40.96"
          },
          {
            "x": 51,
            "y": 4.91,
            "is_outlier": false,
            "label": "Value: 4.91"
          },
          {
            "x": 52,
            "y": 47.58,
            "is_outlier": true,
            "label": "Value: 47.58"
          },
          {
            "x": 53,
            "y": 1.68,
            "is_outlier": false,
            "label": "Value: 1.68"
          },
          {
            "x": 54,
            "y": 7.05,
            "is_outlier": false,
            "label": "Value: 7.05"
          },
          {
            "x": 55,
            "y": 5.03,
            "is_outlier": false,
            "label": "Value: 5.03"
          },
          {
            "x": 56,
            "y": 47.42,
            "is_outlier": true,
            "label": "Value: 47.42"
          },
          {
            "x": 57,
            "y": 25.93,
            "is_outlier": false,
            "label": "Value: 25.93"
          },
          {
            "x": 58,
            "y": 7.51,
            "is_outlier": false,
            "label": "Value: 7.51"
          },
          {
            "x": 59,
            "y": 0.3,
            "is_outlier": false,
            "label": "Value: 0.30"
          },
          {
            "x": 60,
            "y": 7.14,
            "is_outlier": false,
            "label": "Value: 7.14"
          },
          {
            "x": 61,
            "y": 35.03,
            "is_outlier": false,
            "label": "Value: 35.03"
          },
          {
            "x": 62,
            "y": 7.39,
            "is_outlier": false,
            "label": "Value: 7.39"
          },
          {
            "x": 63,
            "y": 27.77,
            "is_outlier": false,
            "label": "Value: 27.77"
          },
          {
            "x": 64,
            "y": 10.3,
            "is_outlier": false,
            "label": "Value: 10.30"
          },
          {
            "x": 65,
            "y": 2.34,
            "is_outlier": false,
            "label": "Value: 2.34"
          },
          {
            "x": 66,
            "y": 10.83,
            "is_outlier": false,
            "label": "Value: 10.83"
          },
          {
            "x": 67,
            "y": 28.83,
            "is_outlier": false,
            "label": "Value: 28.83"
          },
          {
            "x": 68,
            "y": 40.36,
            "is_outlier": false,
            "label": "Value: 40.36"
          },
          {
            "x": 69,
            "y": 5.35,
            "is_outlier": false,
            "label": "Value: 5.35"
          },
          {
            "x": 70,
            "y": 4.88,
            "is_outlier": false,
            "label": "Value: 4.88"
          },
          {
            "x": 71,
            "y": 13.54,
            "is_outlier": false,
            "label": "Value: 13.54"
          },
          {
            "x": 72,
            "y": 21.21,
            "is_outlier": false,
            "label": "Value: 21.21"
          },
          {
            "x": 73,
            "y": 27.74,
            "is_outlier": false,
            "label": "Value: 27.74"
          },
          {
            "x": 74,
            "y": 57.14,
            "is_outlier": true,
            "label": "Value: 57.14"
          },
          {
            "x": 75,
            "y": 11.74,
            "is_outlier": false,
            "label": "Value: 11.74"
          },
          {
            "x": 76,
            "y": 17.42,
            "is_outlier": false,
            "label": "Value: 17.42"
          },
          {
            "x": 77,
            "y": 6.72,
            "is_outlier": false,
            "label": "Value: 6.72"
          },
          {
            "x": 78,
            "y": 35.91,
            "is_outlier": false,
            "label": "Value: 35.91"
          },
          {
            "x": 79,
            "y": 25.91,
            "is_outlier": false,
            "label": "Value: 25.91"
          },
          {
            "x": 80,
            "y": 5.11,
            "is_outlier": false,
            "label": "Value: 5.11"
          },
          {
            "x": 81,
            "y": 35.52,
            "is_outlier": false,
            "label": "Value: 35.52"
          },
          {
            "x": 82,
            "y": 21.17,
            "is_outlier": false,
            "label": "Value: 21.17"
          },
          {
            "x": 83,
            "y": 7.08,
            "is_outlier": false,
            "label": "Value: 7.08"
          },
          {
            "x": 84,
            "y": 20.83,
            "is_outlier": false,
            "label": "Value: 20.83"
          },
          {
            "x": 85,
            "y": 35.4,
            "is_outlier": false,
            "label": "Value: 35.40"
          },
          {
            "x": 86,
            "y": 39.06,
            "is_outlier": false,
            "label": "Value: 39.06"
          },
          {
            "x": 87,
            "y": 17.62,
            "is_outlier": false,
            "label": "Value: 17.62"
          },
          {
            "x": 88,
            "y": 29.1,
            "is_outlier": false,
            "label": "Value: 29.10"
          },
          {
            "x": 89,
            "y": 48.52,
            "is_outlier": true,
            "label": "Value: 48.52"
          },
          {
            "x": 90,
            "y": 11.72,
            "is_outlier": false,
            "label": "Value: 11.72"
          },
          {
            "x": 91,
            "y": 5.44,
            "is_outlier": false,
            "label": "Value: 5.44"
          },
          {
            "x": 92,
            "y": 12.72,
            "is_outlier": false,
            "label": "Value: 12.72"
          },
          {
            "x": 93,
            "y": 30.07,
            "is_outlier": false,
            "label": "Value: 30.07"
          },
          {
            "x": 94,
            "y": 13.23,
            "is_outlier": false,
            "label": "Value: 13.23"
          },
          {
            "x": 95,
            "y": 6.16,
            "is_outlier": false,
            "label": "Value: 6.16"
          },
          {
            "x": 96,
            "y": 4.79,
            "is_outlier": false,
            "label": "Value: 4.79"
          },
          {
            "x": 97,
            "y": 39.2,
            "is_outlier": false,
            "label": "Value: 39.20"
          },
          {
            "x": 98,
            "y": 4.42,
            "is_outlier": false,
            "label": "Value: 4.42"
          },
          {
            "x": 99,
            "y": 24.61,
            "is_outlier": false,
            "label": "Value: 24.61"
          },
          {
            "x": 100,
            "y": 18.96,
            "is_outlier": false,
            "label": "Value: 18.96"
          },
          {
            "x": 101,
            "y": 59.21,
            "is_outlier": true,
            "label": "Value: 59.21"
          },
          {
            "x": 102,
            "y": 4.91,
            "is_outlier": false,
            "label": "Value: 4.91"
          },
          {
            "x": 103,
            "y": 27.68,
            "is_outlier": false,
            "label": "Value: 27.68"
          },
          {
            "x": 104,
            "y": 14.97,
            "is_outlier": false,
            "label": "Value: 14.97"
          },
          {
            "x": 105,
            "y": 4.73,
            "is_outlier": false,
            "label": "Value: 4.73"
          },
          {
            "x": 106,
            "y": 20.53,
            "is_outlier": false,
            "label": "Value: 20.53"
          },
          {
            "x": 107,
            "y": 16.43,
            "is_outlier": false,
            "label": "Value: 16.43"
          },
          {
            "x": 108,
            "y": 46.22,
            "is_outlier": true,
            "label": "Value: 46.22"
          },
          {
            "x": 109,
            "y": 4.16,
            "is_outlier": false,
            "label": "Value: 4.16"
          },
          {
            "x": 110,
            "y": 12.27,
            "is_outlier": false,
            "label": "Value: 12.27"
          },
          {
            "x": 111,
            "y": 63.77,
            "is_outlier": true,
            "label": "Value: 63.77"
          },
          {
            "x": 112,
            "y": 9.29,
            "is_outlier": false,
            "label": "Value: 9.29"
          },
          {
            "x": 113,
            "y": 33.72,
            "is_outlier": false,
            "label": "Value: 33.72"
          },
          {
            "x": 114,
            "y": 44.78,
            "is_outlier": false,
            "label": "Value: 44.78"
          },
          {
            "x": 115,
            "y": 20.42,
            "is_outlier": false,
            "label": "Value: 20.42"
          },
          {
            "x": 116,
            "y": 21.72,
            "is_outlier": false,
            "label": "Value: 21.72"
          },
          {
            "x": 117,
            "y": 23.44,
            "is_outlier": false,
            "label": "Value: 23.44"
          },
          {
            "x": 118,
            "y": 14.21,
            "is_outlier": false,
            "label": "Value: 14.21"
          },
          {
            "x": 119,
            "y": 10.98,
            "is_outlier": false,
            "label": "Value: 10.98"
          },
          {
            "x": 120,
            "y": 13.54,
            "is_outlier": false,
            "label": "Value: 13.54"
          },
          {
            "x": 121,
            "y": 16.71,
            "is_outlier": false,
            "label": "Value: 16.71"
          },
          {
            "x": 122,
            "y": 25.29,
            "is_outlier": false,
            "label": "Value: 25.29"
          },
          {
            "x": 123,
            "y": 8.24,
            "is_outlier": false,
            "label": "Value: 8.24"
          },
          {
            "x": 124,
            "y": 18.85,
            "is_outlier": false,
            "label": "Value: 18.85"
          },
          {
            "x": 125,
            "y": 14.04,
            "is_outlier": false,
            "label": "Value: 14.04"
          },
          {
            "x": 126,
            "y": 5.99,
            "is_outlier": false,
            "label": "Value: 5.99"
          },
          {
            "x": 127,
            "y": 10.26,
            "is_outlier": false,
            "label": "Value: 10.26"
          },
          {
            "x": 128,
            "y": 26.94,
            "is_outlier": false,
            "label": "Value: 26.94"
          },
          {
            "x": 129,
            "y": 21.74,
            "is_outlier": false,
            "label": "Value: 21.74"
          },
          {
            "x": 130,
            "y": 138.37,
            "is_outlier": true,
            "label": "Value: 138.37"
          },
          {
            "x": 131,
            "y": 13.65,
            "is_outlier": false,
            "label": "Value: 13.65"
          },
          {
            "x": 132,
            "y": 8.35,
            "is_outlier": false,
            "label": "Value: 8.35"
          },
          {
            "x": 133,
            "y": 22.94,
            "is_outlier": false,
            "label": "Value: 22.94"
          },
          {
            "x": 134,
            "y": 19.56,
            "is_outlier": false,
            "label": "Value: 19.56"
          },
          {
            "x": 135,
            "y": 62.39,
            "is_outlier": true,
            "label": "Value: 62.39"
          },
          {
            "x": 136,
            "y": 3.0,
            "is_outlier": false,
            "label": "Value: 3.00"
          },
          {
            "x": 137,
            "y": 20.48,
            "is_outlier": false,
            "label": "Value: 20.48"
          },
          {
            "x": 138,
            "y": 1.32,
            "is_outlier": false,
            "label": "Value: 1.32"
          },
          {
            "x": 139,
            "y": 19.94,
            "is_outlier": false,
            "label": "Value: 19.94"
          },
          {
            "x": 140,
            "y": 21.46,
            "is_outlier": false,
            "label": "Value: 21.46"
          },
          {
            "x": 141,
            "y": 9.85,
            "is_outlier": false,
            "label": "Value: 9.85"
          },
          {
            "x": 142,
            "y": 24.69,
            "is_outlier": false,
            "label": "Value: 24.69"
          },
          {
            "x": 143,
            "y": 19.68,
            "is_outlier": false,
            "label": "Value: 19.68"
          },
          {
            "x": 144,
            "y": 11.29,
            "is_outlier": false,
            "label": "Value: 11.29"
          },
          {
            "x": 145,
            "y": 16.07,
            "is_outlier": false,
            "label": "Value: 16.07"
          },
          {
            "x": 146,
            "y": 43.84,
            "is_outlier": false,
            "label": "Value: 43.84"
          },
          {
            "x": 147,
            "y": 8.72,
            "is_outlier": false,
            "label": "Value: 8.72"
          },
          {
            "x": 148,
            "y": 28.12,
            "is_outlier": false,
            "label": "Value: 28.12"
          },
          {
            "x": 149,
            "y": 1.18,
            "is_outlier": false,
            "label": "Value: 1.18"
          },
          {
            "x": 150,
            "y": 20.96,
            "is_outlier": false,
            "label": "Value: 20.96"
          },
          {
            "x": 151,
            "y": 10.36,
            "is_outlier": false,
            "label": "Value: 10.36"
          },
          {
            "x": 152,
            "y": 14.26,
            "is_outlier": false,
            "label": "Value: 14.26"
          },
          {
            "x": 153,
            "y": 13.39,
            "is_outlier": false,
            "label": "Value: 13.39"
          },
          {
            "x": 154,
            "y": 10.47,
            "is_outlier": false,
            "label": "Value: 10.47"
          },
          {
            "x": 155,
            "y": 6.91,
            "is_outlier": false,
            "label": "Value: 6.91"
          },
          {
            "x": 156,
            "y": 51.64,
            "is_outlier": true,
            "label": "Value: 51.64"
          },
          {
            "x": 157,
            "y": 15.45,
            "is_outlier": false,
            "label": "Value: 15.45"
          },
          {
            "x": 158,
            "y": 20.63,
            "is_outlier": false,
            "label": "Value: 20.63"
          },
          {
            "x": 159,
            "y": 8.64,
            "is_outlier": false,
            "label": "Value: 8.64"
          },
          {
            "x": 160,
            "y": 5.85,
            "is_outlier": false,
            "label": "Value: 5.85"
          },
          {
            "x": 161,
            "y": 16.48,
            "is_outlier": false,
            "label": "Value: 16.48"
          },
          {
            "x": 162,
            "y": 9.48,
            "is_outlier": false,
            "label": "Value: 9.48"
          },
          {
            "x": 163,
            "y": 74.25,
            "is_outlier": true,
            "label": "Value: 74.25"
          },
          {
            "x": 164,
            "y": 51.33,
            "is_outlier": true,
            "label": "Value: 51.33"
          },
          {
            "x": 165,
            "y": 3.6,
            "is_outlier": false,
            "label": "Value: 3.60"
          },
          {
            "x": 166,
            "y": 4.11,
            "is_outlier": false,
            "label": "Value: 4.11"
          },
          {
            "x": 167,
            "y": 90.43,
            "is_outlier": true,
            "label": "Value: 90.43"
          },
          {
            "x": 168,
            "y": 5.29,
            "is_outlier": false,
            "label": "Value: 5.29"
          },
          {
            "x": 169,
            "y": 5.92,
            "is_outlier": false,
            "label": "Value: 5.92"
          },
          {
            "x": 170,
            "y": 5.78,
            "is_outlier": false,
            "label": "Value: 5.78"
          },
          {
            "x": 171,
            "y": 11.38,
            "is_outlier": false,
            "label": "Value: 11.38"
          },
          {
            "x": 172,
            "y": 45.31,
            "is_outlier": false,
            "label": "Value: 45.31"
          },
          {
            "x": 173,
            "y": 17.38,
            "is_outlier": false,
            "label": "Value: 17.38"
          },
          {
            "x": 174,
            "y": 3.47,
            "is_outlier": false,
            "label": "Value: 3.47"
          },
          {
            "x": 175,
            "y": 8.6,
            "is_outlier": false,
            "label": "Value: 8.60"
          },
          {
            "x": 176,
            "y": 22.52,
            "is_outlier": false,
            "label": "Value: 22.52"
          },
          {
            "x": 177,
            "y": 48.37,
            "is_outlier": true,
            "label": "Value: 48.37"
          },
          {
            "x": 178,
            "y": 14.21,
            "is_outlier": false,
            "label": "Value: 14.21"
          },
          {
            "x": 179,
            "y": 9.26,
            "is_outlier": false,
            "label": "Value: 9.26"
          },
          {
            "x": 180,
            "y": 27.5,
            "is_outlier": false,
            "label": "Value: 27.50"
          },
          {
            "x": 181,
            "y": 28.61,
            "is_outlier": false,
            "label": "Value: 28.61"
          },
          {
            "x": 182,
            "y": 7.9,
            "is_outlier": false,
            "label": "Value: 7.90"
          },
          {
            "x": 183,
            "y": 7.88,
            "is_outlier": false,
            "label": "Value: 7.88"
          },
          {
            "x": 184,
            "y": 9.8,
            "is_outlier": false,
            "label": "Value: 9.80"
          },
          {
            "x": 185,
            "y": 6.29,
            "is_outlier": false,
            "label": "Value: 6.29"
          },
          {
            "x": 186,
            "y": 18.62,
            "is_outlier": false,
            "label": "Value: 18.62"
          },
          {
            "x": 187,
            "y": 5.75,
            "is_outlier": false,
            "label": "Value: 5.75"
          },
          {
            "x": 188,
            "y": 8.35,
            "is_outlier": false,
            "label": "Value: 8.35"
          },
          {
            "x": 189,
            "y": 15.6,
            "is_outlier": false,
            "label": "Value: 15.60"
          },
          {
            "x": 190,
            "y": 15.53,
            "is_outlier": false,
            "label": "Value: 15.53"
          },
          {
            "x": 191,
            "y": 4.74,
            "is_outlier": false,
            "label": "Value: 4.74"
          },
          {
            "x": 192,
            "y": 12.89,
            "is_outlier": false,
            "label": "Value: 12.89"
          },
          {
            "x": 193,
            "y": 10.71,
            "is_outlier": false,
            "label": "Value: 10.71"
          },
          {
            "x": 194,
            "y": 4.65,
            "is_outlier": false,
            "label": "Value: 4.65"
          },
          {
            "x": 195,
            "y": 13.43,
            "is_outlier": false,
            "label": "Value: 13.43"
          },
          {
            "x": 196,
            "y": 6.95,
            "is_outlier": false,
            "label": "Value: 6.95"
          },
          {
            "x": 197,
            "y": 7.47,
            "is_outlier": false,
            "label": "Value: 7.47"
          },
          {
            "x": 198,
            "y": 18.95,
            "is_outlier": false,
            "label": "Value: 18.95"
          },
          {
            "x": 199,
            "y": 46.94,
            "is_outlier": true,
            "label": "Value: 46.94"
          },
          {
            "x": 200,
            "y": 4.33,
            "is_outlier": false,
            "label": "Value: 4.33"
          },
          {
            "x": 201,
            "y": 12.8,
            "is_outlier": false,
            "label": "Value: 12.80"
          },
          {
            "x": 202,
            "y": 2.25,
            "is_outlier": false,
            "label": "Value: 2.25"
          },
          {
            "x": 203,
            "y": 4.64,
            "is_outlier": false,
            "label": "Value: 4.64"
          },
          {
            "x": 204,
            "y": 15.39,
            "is_outlier": false,
            "label": "Value: 15.39"
          },
          {
            "x": 205,
            "y": 26.4,
            "is_outlier": false,
            "label": "Value: 26.40"
          },
          {
            "x": 206,
            "y": 57.87,
            "is_outlier": true,
            "label": "Value: 57.87"
          },
          {
            "x": 207,
            "y": 11.33,
            "is_outlier": false,
            "label": "Value: 11.33"
          },
          {
            "x": 208,
            "y": 4.72,
            "is_outlier": false,
            "label": "Value: 4.72"
          },
          {
            "x": 209,
            "y": 9.74,
            "is_outlier": false,
            "label": "Value: 9.74"
          },
          {
            "x": 210,
            "y": 8.59,
            "is_outlier": false,
            "label": "Value: 8.59"
          },
          {
            "x": 211,
            "y": 2.48,
            "is_outlier": false,
            "label": "Value: 2.48"
          },
          {
            "x": 212,
            "y": 24.52,
            "is_outlier": false,
            "label": "Value: 24.52"
          },
          {
            "x": 213,
            "y": 11.47,
            "is_outlier": false,
            "label": "Value: 11.47"
          },
          {
            "x": 214,
            "y": 8.64,
            "is_outlier": false,
            "label": "Value: 8.64"
          },
          {
            "x": 215,
            "y": 7.69,
            "is_outlier": false,
            "label": "Value: 7.69"
          },
          {
            "x": 216,
            "y": 20.09,
            "is_outlier": false,
            "label": "Value: 20.09"
          },
          {
            "x": 217,
            "y": 20.06,
            "is_outlier": false,
            "label": "Value: 20.06"
          },
          {
            "x": 218,
            "y": 13.33,
            "is_outlier": false,
            "label": "Value: 13.33"
          },
          {
            "x": 219,
            "y": 43.44,
            "is_outlier": false,
            "label": "Value: 43.44"
          },
          {
            "x": 220,
            "y": 28.34,
            "is_outlier": false,
            "label": "Value: 28.34"
          },
          {
            "x": 221,
            "y": 10.87,
            "is_outlier": false,
            "label": "Value: 10.87"
          },
          {
            "x": 222,
            "y": 18.11,
            "is_outlier": false,
            "label": "Value: 18.11"
          },
          {
            "x": 223,
            "y": 41.11,
            "is_outlier": false,
            "label": "Value: 41.11"
          },
          {
            "x": 224,
            "y": 20.21,
            "is_outlier": false,
            "label": "Value: 20.21"
          },
          {
            "x": 225,
            "y": 118.45,
            "is_outlier": true,
            "label": "Value: 118.45"
          },
          {
            "x": 226,
            "y": 17.47,
            "is_outlier": false,
            "label": "Value: 17.47"
          },
          {
            "x": 227,
            "y": 12.87,
            "is_outlier": false,
            "label": "Value: 12.87"
          },
          {
            "x": 228,
            "y": 25.77,
            "is_outlier": false,
            "label": "Value: 25.77"
          },
          {
            "x": 229,
            "y": 57.28,
            "is_outlier": true,
            "label": "Value: 57.28"
          },
          {
            "x": 230,
            "y": 10.5,
            "is_outlier": false,
            "label": "Value: 10.50"
          },
          {
            "x": 231,
            "y": 22.38,
            "is_outlier": false,
            "label": "Value: 22.38"
          },
          {
            "x": 232,
            "y": 11.97,
            "is_outlier": false,
            "label": "Value: 11.97"
          },
          {
            "x": 233,
            "y": 10.45,
            "is_outlier": false,
            "label": "Value: 10.45"
          },
          {
            "x": 234,
            "y": 19.78,
            "is_outlier": false,
            "label": "Value: 19.78"
          },
          {
            "x": 235,
            "y": 24.25,
            "is_outlier": false,
            "label": "Value: 24.25"
          },
          {
            "x": 236,
            "y": 4.77,
            "is_outlier": false,
            "label": "Value: 4.77"
          },
          {
            "x": 237,
            "y": 11.69,
            "is_outlier": false,
            "label": "Value: 11.69"
          },
          {
            "x": 238,
            "y": 6.79,
            "is_outlier": false,
            "label": "Value: 6.79"
          },
          {
            "x": 239,
            "y": 20.82,
            "is_outlier": false,
            "label": "Value: 20.82"
          },
          {
            "x": 240,
            "y": 16.84,
            "is_outlier": false,
            "label": "Value: 16.84"
          },
          {
            "x": 241,
            "y": 81.64,
            "is_outlier": true,
            "label": "Value: 81.64"
          },
          {
            "x": 242,
            "y": 20.34,
            "is_outlier": false,
            "label": "Value: 20.34"
          },
          {
            "x": 243,
            "y": 28.19,
            "is_outlier": false,
            "label": "Value: 28.19"
          },
          {
            "x": 244,
            "y": 3.3,
            "is_outlier": false,
            "label": "Value: 3.30"
          },
          {
            "x": 245,
            "y": 9.2,
            "is_outlier": false,
            "label": "Value: 9.20"
          },
          {
            "x": 246,
            "y": 4.86,
            "is_outlier": false,
            "label": "Value: 4.86"
          },
          {
            "x": 247,
            "y": 12.05,
            "is_outlier": false,
            "label": "Value: 12.05"
          },
          {
            "x": 248,
            "y": 23.33,
            "is_outlier": false,
            "label": "Value: 23.33"
          },
          {
            "x": 249,
            "y": 26.01,
            "is_outlier": false,
            "label": "Value: 26.01"
          },
          {
            "x": 250,
            "y": 15.13,
            "is_outlier": false,
            "label": "Value: 15.13"
          },
          {
            "x": 251,
            "y": 20.33,
            "is_outlier": false,
            "label": "Value: 20.33"
          },
          {
            "x": 252,
            "y": 9.63,
            "is_outlier": false,
            "label": "Value: 9.63"
          },
          {
            "x": 253,
            "y": 24.06,
            "is_outlier": false,
            "label": "Value: 24.06"
          },
          {
            "x": 254,
            "y": 35.29,
            "is_outlier": false,
            "label": "Value: 35.29"
          },
          {
            "x": 255,
            "y": 10.25,
            "is_outlier": false,
            "label": "Value: 10.25"
          },
          {
            "x": 256,
            "y": 5.72,
            "is_outlier": false,
            "label": "Value: 5.72"
          },
          {
            "x": 257,
            "y": 20.2,
            "is_outlier": false,
            "label": "Value: 20.20"
          },
          {
            "x": 258,
            "y": 10.18,
            "is_outlier": false,
            "label": "Value: 10.18"
          },
          {
            "x": 259,
            "y": 9.78,
            "is_outlier": false,
            "label": "Value: 9.78"
          },
          {
            "x": 260,
            "y": 23.15,
            "is_outlier": false,
            "label": "Value: 23.15"
          },
          {
            "x": 261,
            "y": 10.69,
            "is_outlier": false,
            "label": "Value: 10.69"
          },
          {
            "x": 262,
            "y": 11.88,
            "is_outlier": false,
            "label": "Value: 11.88"
          },
          {
            "x": 263,
            "y": 18.67,
            "is_outlier": false,
            "label": "Value: 18.67"
          },
          {
            "x": 264,
            "y": 19.53,
            "is_outlier": false,
            "label": "Value: 19.53"
          },
          {
            "x": 265,
            "y": 5.11,
            "is_outlier": false,
            "label": "Value: 5.11"
          },
          {
            "x": 266,
            "y": 6.86,
            "is_outlier": false,
            "label": "Value: 6.86"
          },
          {
            "x": 267,
            "y": 47.01,
            "is_outlier": true,
            "label": "Value: 47.01"
          },
          {
            "x": 268,
            "y": 1.69,
            "is_outlier": false,
            "label": "Value: 1.69"
          },
          {
            "x": 269,
            "y": 12.57,
            "is_outlier": false,
            "label": "Value: 12.57"
          },
          {
            "x": 270,
            "y": 16.41,
            "is_outlier": false,
            "label": "Value: 16.41"
          },
          {
            "x": 271,
            "y": 7.04,
            "is_outlier": false,
            "label": "Value: 7.04"
          },
          {
            "x": 272,
            "y": 48.78,
            "is_outlier": true,
            "label": "Value: 48.78"
          },
          {
            "x": 273,
            "y": 10.3,
            "is_outlier": false,
            "label": "Value: 10.30"
          },
          {
            "x": 274,
            "y": 2.82,
            "is_outlier": false,
            "label": "Value: 2.82"
          },
          {
            "x": 275,
            "y": 18.04,
            "is_outlier": false,
            "label": "Value: 18.04"
          },
          {
            "x": 276,
            "y": 20.02,
            "is_outlier": false,
            "label": "Value: 20.02"
          },
          {
            "x": 277,
            "y": 4.23,
            "is_outlier": false,
            "label": "Value: 4.23"
          },
          {
            "x": 278,
            "y": 6.04,
            "is_outlier": false,
            "label": "Value: 6.04"
          },
          {
            "x": 279,
            "y": 14.88,
            "is_outlier": false,
            "label": "Value: 14.88"
          },
          {
            "x": 280,
            "y": 13.39,
            "is_outlier": false,
            "label": "Value: 13.39"
          },
          {
            "x": 281,
            "y": 26.4,
            "is_outlier": false,
            "label": "Value: 26.40"
          },
          {
            "x": 282,
            "y": 8.14,
            "is_outlier": false,
            "label": "Value: 8.14"
          },
          {
            "x": 283,
            "y": 10.81,
            "is_outlier": false,
            "label": "Value: 10.81"
          },
          {
            "x": 284,
            "y": 22.41,
            "is_outlier": false,
            "label": "Value: 22.41"
          },
          {
            "x": 285,
            "y": 23.11,
            "is_outlier": false,
            "label": "Value: 23.11"
          },
          {
            "x": 286,
            "y": 20.3,
            "is_outlier": false,
            "label": "Value: 20.30"
          },
          {
            "x": 287,
            "y": 12.56,
            "is_outlier": false,
            "label": "Value: 12.56"
          },
          {
            "x": 288,
            "y": 19.38,
            "is_outlier": false,
            "label": "Value: 19.38"
          },
          {
            "x": 289,
            "y": 27.16,
            "is_outlier": false,
            "label": "Value: 27.16"
          },
          {
            "x": 290,
            "y": 9.02,
            "is_outlier": false,
            "label": "Value: 9.02"
          },
          {
            "x": 291,
            "y": 21.52,
            "is_outlier": false,
            "label": "Value: 21.52"
          },
          {
            "x": 292,
            "y": 40.04,
            "is_outlier": false,
            "label": "Value: 40.04"
          },
          {
            "x": 293,
            "y": 10.07,
            "is_outlier": false,
            "label": "Value: 10.07"
          },
          {
            "x": 294,
            "y": 34.72,
            "is_outlier": false,
            "label": "Value: 34.72"
          },
          {
            "x": 295,
            "y": 22.25,
            "is_outlier": false,
            "label": "Value: 22.25"
          },
          {
            "x": 296,
            "y": 6.17,
            "is_outlier": false,
            "label": "Value: 6.17"
          },
          {
            "x": 297,
            "y": 8.62,
            "is_outlier": false,
            "label": "Value: 8.62"
          },
          {
            "x": 298,
            "y": 17.15,
            "is_outlier": false,
            "label": "Value: 17.15"
          },
          {
            "x": 299,
            "y": 9.86,
            "is_outlier": false,
            "label": "Value: 9.86"
          },
          {
            "x": 300,
            "y": 7.52,
            "is_outlier": false,
            "label": "Value: 7.52"
          },
          {
            "x": 301,
            "y": 11.15,
            "is_outlier": false,
            "label": "Value: 11.15"
          },
          {
            "x": 302,
            "y": 26.29,
            "is_outlier": false,
            "label": "Value: 26.29"
          },
          {
            "x": 303,
            "y": 33.91,
            "is_outlier": false,
            "label": "Value: 33.91"
          },
          {
            "x": 304,
            "y": 9.83,
            "is_outlier": false,
            "label": "Value: 9.83"
          },
          {
            "x": 305,
            "y": 5.32,
            "is_outlier": false,
            "label": "Value: 5.32"
          },
          {
            "x": 306,
            "y": 14.18,
            "is_outlier": false,
            "label": "Value: 14.18"
          },
          {
            "x": 307,
            "y": 4.04,
            "is_outlier": false,
            "label": "Value: 4.04"
          },
          {
            "x": 308,
            "y": 39.39,
            "is_outlier": false,
            "label": "Value: 39.39"
          },
          {
            "x": 309,
            "y": 16.34,
            "is_outlier": false,
            "label": "Value: 16.34"
          },
          {
            "x": 310,
            "y": 13.81,
            "is_outlier": false,
            "label": "Value: 13.81"
          },
          {
            "x": 311,
            "y": 8.78,
            "is_outlier": false,
            "label": "Value: 8.78"
          },
          {
            "x": 312,
            "y": 9.48,
            "is_outlier": false,
            "label": "Value: 9.48"
          },
          {
            "x": 313,
            "y": 15.67,
            "is_outlier": false,
            "label": "Value: 15.67"
          },
          {
            "x": 314,
            "y": 17.99,
            "is_outlier": false,
            "label": "Value: 17.99"
          },
          {
            "x": 315,
            "y": 13.81,
            "is_outlier": false,
            "label": "Value: 13.81"
          },
          {
            "x": 316,
            "y": 7.56,
            "is_outlier": false,
            "label": "Value: 7.56"
          },
          {
            "x": 317,
            "y": 22.38,
            "is_outlier": false,
            "label": "Value: 22.38"
          },
          {
            "x": 318,
            "y": 12.88,
            "is_outlier": false,
            "label": "Value: 12.88"
          },
          {
            "x": 319,
            "y": 7.57,
            "is_outlier": false,
            "label": "Value: 7.57"
          },
          {
            "x": 320,
            "y": 8.4,
            "is_outlier": false,
            "label": "Value: 8.40"
          },
          {
            "x": 321,
            "y": 8.65,
            "is_outlier": false,
            "label": "Value: 8.65"
          },
          {
            "x": 322,
            "y": 8.46,
            "is_outlier": false,
            "label": "Value: 8.46"
          },
          {
            "x": 323,
            "y": 6.36,
            "is_outlier": false,
            "label": "Value: 6.36"
          },
          {
            "x": 324,
            "y": 10.31,
            "is_outlier": false,
            "label": "Value: 10.31"
          },
          {
            "x": 325,
            "y": 6.63,
            "is_outlier": false,
            "label": "Value: 6.63"
          },
          {
            "x": 326,
            "y": 8.55,
            "is_outlier": false,
            "label": "Value: 8.55"
          },
          {
            "x": 327,
            "y": 10.35,
            "is_outlier": false,
            "label": "Value: 10.35"
          },
          {
            "x": 328,
            "y": 17.24,
            "is_outlier": false,
            "label": "Value: 17.24"
          },
          {
            "x": 329,
            "y": 37.42,
            "is_outlier": false,
            "label": "Value: 37.42"
          },
          {
            "x": 330,
            "y": 10.98,
            "is_outlier": false,
            "label": "Value: 10.98"
          },
          {
            "x": 331,
            "y": 23.68,
            "is_outlier": false,
            "label": "Value: 23.68"
          },
          {
            "x": 332,
            "y": 76.87,
            "is_outlier": true,
            "label": "Value: 76.87"
          },
          {
            "x": 333,
            "y": 7.36,
            "is_outlier": false,
            "label": "Value: 7.36"
          },
          {
            "x": 334,
            "y": 19.98,
            "is_outlier": false,
            "label": "Value: 19.98"
          },
          {
            "x": 335,
            "y": 5.51,
            "is_outlier": false,
            "label": "Value: 5.51"
          },
          {
            "x": 336,
            "y": 26.64,
            "is_outlier": false,
            "label": "Value: 26.64"
          },
          {
            "x": 337,
            "y": 26.24,
            "is_outlier": false,
            "label": "Value: 26.24"
          },
          {
            "x": 338,
            "y": 10.12,
            "is_outlier": false,
            "label": "Value: 10.12"
          },
          {
            "x": 339,
            "y": 25.22,
            "is_outlier": false,
            "label": "Value: 25.22"
          },
          {
            "x": 340,
            "y": 44.86,
            "is_outlier": false,
            "label": "Value: 44.86"
          },
          {
            "x": 341,
            "y": 40.92,
            "is_outlier": false,
            "label": "Value: 40.92"
          },
          {
            "x": 342,
            "y": 31.08,
            "is_outlier": false,
            "label": "Value: 31.08"
          },
          {
            "x": 343,
            "y": 5.76,
            "is_outlier": false,
            "label": "Value: 5.76"
          },
          {
            "x": 344,
            "y": 14.1,
            "is_outlier": false,
            "label": "Value: 14.10"
          },
          {
            "x": 345,
            "y": 19.72,
            "is_outlier": false,
            "label": "Value: 19.72"
          },
          {
            "x": 346,
            "y": 18.96,
            "is_outlier": false,
            "label": "Value: 18.96"
          },
          {
            "x": 347,
            "y": 8.57,
            "is_outlier": false,
            "label": "Value: 8.57"
          },
          {
            "x": 348,
            "y": 4.15,
            "is_outlier": false,
            "label": "Value: 4.15"
          },
          {
            "x": 349,
            "y": 12.02,
            "is_outlier": false,
            "label": "Value: 12.02"
          },
          {
            "x": 350,
            "y": 24.81,
            "is_outlier": false,
            "label": "Value: 24.81"
          },
          {
            "x": 351,
            "y": 3.02,
            "is_outlier": false,
            "label": "Value: 3.02"
          },
          {
            "x": 352,
            "y": 28.33,
            "is_outlier": false,
            "label": "Value: 28.33"
          },
          {
            "x": 353,
            "y": 272.4,
            "is_outlier": true,
            "label": "Value: 272.40"
          },
          {
            "x": 354,
            "y": 22.2,
            "is_outlier": false,
            "label": "Value: 22.20"
          },
          {
            "x": 355,
            "y": 10.2,
            "is_outlier": false,
            "label": "Value: 10.20"
          },
          {
            "x": 356,
            "y": 22.28,
            "is_outlier": false,
            "label": "Value: 22.28"
          },
          {
            "x": 357,
            "y": 9.89,
            "is_outlier": false,
            "label": "Value: 9.89"
          },
          {
            "x": 358,
            "y": 29.99,
            "is_outlier": false,
            "label": "Value: 29.99"
          },
          {
            "x": 359,
            "y": 15.45,
            "is_outlier": false,
            "label": "Value: 15.45"
          },
          {
            "x": 360,
            "y": 19.13,
            "is_outlier": false,
            "label": "Value: 19.13"
          },
          {
            "x": 361,
            "y": 25.37,
            "is_outlier": false,
            "label": "Value: 25.37"
          },
          {
            "x": 362,
            "y": 18.47,
            "is_outlier": false,
            "label": "Value: 18.47"
          },
          {
            "x": 363,
            "y": 13.59,
            "is_outlier": false,
            "label": "Value: 13.59"
          },
          {
            "x": 364,
            "y": 6.24,
            "is_outlier": false,
            "label": "Value: 6.24"
          },
          {
            "x": 365,
            "y": 35.41,
            "is_outlier": false,
            "label": "Value: 35.41"
          },
          {
            "x": 366,
            "y": 22.23,
            "is_outlier": false,
            "label": "Value: 22.23"
          },
          {
            "x": 367,
            "y": 21.74,
            "is_outlier": false,
            "label": "Value: 21.74"
          },
          {
            "x": 368,
            "y": 5.99,
            "is_outlier": false,
            "label": "Value: 5.99"
          },
          {
            "x": 369,
            "y": 14.67,
            "is_outlier": false,
            "label": "Value: 14.67"
          },
          {
            "x": 370,
            "y": 9.49,
            "is_outlier": false,
            "label": "Value: 9.49"
          },
          {
            "x": 371,
            "y": 13.27,
            "is_outlier": false,
            "label": "Value: 13.27"
          },
          {
            "x": 372,
            "y": 3.63,
            "is_outlier": false,
            "label": "Value: 3.63"
          },
          {
            "x": 373,
            "y": 2.2,
            "is_outlier": false,
            "label": "Value: 2.20"
          },
          {
            "x": 374,
            "y": 5.18,
            "is_outlier": false,
            "label": "Value: 5.18"
          },
          {
            "x": 375,
            "y": 8.87,
            "is_outlier": false,
            "label": "Value: 8.87"
          },
          {
            "x": 376,
            "y": 4.03,
            "is_outlier": false,
            "label": "Value: 4.03"
          },
          {
            "x": 377,
            "y": 10.41,
            "is_outlier": false,
            "label": "Value: 10.41"
          },
          {
            "x": 378,
            "y": 28.35,
            "is_outlier": false,
            "label": "Value: 28.35"
          },
          {
            "x": 379,
            "y": 9.15,
            "is_outlier": false,
            "label": "Value: 9.15"
          },
          {
            "x": 380,
            "y": 7.82,
            "is_outlier": false,
            "label": "Value: 7.82"
          },
          {
            "x": 381,
            "y": 2.53,
            "is_outlier": false,
            "label": "Value: 2.53"
          },
          {
            "x": 382,
            "y": 38.88,
            "is_outlier": false,
            "label": "Value: 38.88"
          },
          {
            "x": 383,
            "y": 7.91,
            "is_outlier": false,
            "label": "Value: 7.91"
          },
          {
            "x": 384,
            "y": 49.13,
            "is_outlier": true,
            "label": "Value: 49.13"
          },
          {
            "x": 385,
            "y": 13.77,
            "is_outlier": false,
            "label": "Value: 13.77"
          },
          {
            "x": 386,
            "y": 5.32,
            "is_outlier": false,
            "label": "Value: 5.32"
          },
          {
            "x": 387,
            "y": 17.71,
            "is_outlier": false,
            "label": "Value: 17.71"
          },
          {
            "x": 388,
            "y": 12.92,
            "is_outlier": false,
            "label": "Value: 12.92"
          },
          {
            "x": 389,
            "y": 24.85,
            "is_outlier": false,
            "label": "Value: 24.85"
          },
          {
            "x": 390,
            "y": 21.3,
            "is_outlier": false,
            "label": "Value: 21.30"
          },
          {
            "x": 391,
            "y": 4.61,
            "is_outlier": false,
            "label": "Value: 4.61"
          },
          {
            "x": 392,
            "y": 6.0,
            "is_outlier": false,
            "label": "Value: 6.00"
          },
          {
            "x": 393,
            "y": 23.02,
            "is_outlier": false,
            "label": "Value: 23.02"
          },
          {
            "x": 394,
            "y": 23.77,
            "is_outlier": false,
            "label": "Value: 23.77"
          },
          {
            "x": 395,
            "y": 20.61,
            "is_outlier": false,
            "label": "Value: 20.61"
          },
          {
            "x": 396,
            "y": 9.6,
            "is_outlier": false,
            "label": "Value: 9.60"
          },
          {
            "x": 397,
            "y": 2.98,
            "is_outlier": false,
            "label": "Value: 2.98"
          },
          {
            "x": 398,
            "y": 16.22,
            "is_outlier": false,
            "label": "Value: 16.22"
          },
          {
            "x": 399,
            "y": 18.92,
            "is_outlier": false,
            "label": "Value: 18.92"
          },
          {
            "x": 400,
            "y": 4.17,
            "is_outlier": false,
            "label": "Value: 4.17"
          },
          {
            "x": 401,
            "y": 29.75,
            "is_outlier": false,
            "label": "Value: 29.75"
          },
          {
            "x": 402,
            "y": 11.99,
            "is_outlier": false,
            "label": "Value: 11.99"
          },
          {
            "x": 403,
            "y": 81.9,
            "is_outlier": true,
            "label": "Value: 81.90"
          },
          {
            "x": 404,
            "y": 12.47,
            "is_outlier": false,
            "label": "Value: 12.47"
          },
          {
            "x": 405,
            "y": 95.49,
            "is_outlier": true,
            "label": "Value: 95.49"
          },
          {
            "x": 406,
            "y": 12.7,
            "is_outlier": false,
            "label": "Value: 12.70"
          },
          {
            "x": 407,
            "y": 4.5,
            "is_outlier": false,
            "label": "Value: 4.50"
          },
          {
            "x": 408,
            "y": 4.02,
            "is_outlier": false,
            "label": "Value: 4.02"
          },
          {
            "x": 409,
            "y": 17.48,
            "is_outlier": false,
            "label": "Value: 17.48"
          },
          {
            "x": 410,
            "y": 10.79,
            "is_outlier": false,
            "label": "Value: 10.79"
          },
          {
            "x": 411,
            "y": 33.16,
            "is_outlier": false,
            "label": "Value: 33.16"
          },
          {
            "x": 412,
            "y": 26.15,
            "is_outlier": false,
            "label": "Value: 26.15"
          },
          {
            "x": 413,
            "y": 10.16,
            "is_outlier": false,
            "label": "Value: 10.16"
          },
          {
            "x": 414,
            "y": 27.81,
            "is_outlier": false,
            "label": "Value: 27.81"
          },
          {
            "x": 415,
            "y": 6.59,
            "is_outlier": false,
            "label": "Value: 6.59"
          },
          {
            "x": 416,
            "y": 21.51,
            "is_outlier": false,
            "label": "Value: 21.51"
          },
          {
            "x": 417,
            "y": 157.95,
            "is_outlier": true,
            "label": "Value: 157.95"
          },
          {
            "x": 418,
            "y": 39.12,
            "is_outlier": false,
            "label": "Value: 39.12"
          },
          {
            "x": 419,
            "y": 13.87,
            "is_outlier": false,
            "label": "Value: 13.87"
          },
          {
            "x": 420,
            "y": 9.22,
            "is_outlier": false,
            "label": "Value: 9.22"
          },
          {
            "x": 421,
            "y": 19.77,
            "is_outlier": false,
            "label": "Value: 19.77"
          },
          {
            "x": 422,
            "y": 24.46,
            "is_outlier": false,
            "label": "Value: 24.46"
          },
          {
            "x": 423,
            "y": 19.36,
            "is_outlier": false,
            "label": "Value: 19.36"
          },
          {
            "x": 424,
            "y": 22.02,
            "is_outlier": false,
            "label": "Value: 22.02"
          },
          {
            "x": 425,
            "y": 11.68,
            "is_outlier": false,
            "label": "Value: 11.68"
          },
          {
            "x": 426,
            "y": 9.08,
            "is_outlier": false,
            "label": "Value: 9.08"
          },
          {
            "x": 427,
            "y": 34.51,
            "is_outlier": false,
            "label": "Value: 34.51"
          },
          {
            "x": 428,
            "y": 27.9,
            "is_outlier": false,
            "label": "Value: 27.90"
          },
          {
            "x": 429,
            "y": 9.73,
            "is_outlier": false,
            "label": "Value: 9.73"
          },
          {
            "x": 430,
            "y": 16.47,
            "is_outlier": false,
            "label": "Value: 16.47"
          },
          {
            "x": 431,
            "y": 11.18,
            "is_outlier": false,
            "label": "Value: 11.18"
          },
          {
            "x": 432,
            "y": 8.98,
            "is_outlier": false,
            "label": "Value: 8.98"
          },
          {
            "x": 433,
            "y": 6.13,
            "is_outlier": false,
            "label": "Value: 6.13"
          },
          {
            "x": 434,
            "y": 18.42,
            "is_outlier": false,
            "label": "Value: 18.42"
          },
          {
            "x": 435,
            "y": 17.87,
            "is_outlier": false,
            "label": "Value: 17.87"
          },
          {
            "x": 436,
            "y": 10.09,
            "is_outlier": false,
            "label": "Value: 10.09"
          },
          {
            "x": 437,
            "y": 23.88,
            "is_outlier": false,
            "label": "Value: 23.88"
          },
          {
            "x": 438,
            "y": 8.25,
            "is_outlier": false,
            "label": "Value: 8.25"
          },
          {
            "x": 439,
            "y": 5.83,
            "is_outlier": false,
            "label": "Value: 5.83"
          },
          {
            "x": 440,
            "y": 11.36,
            "is_outlier": false,
            "label": "Value: 11.36"
          },
          {
            "x": 441,
            "y": 19.01,
            "is_outlier": false,
            "label": "Value: 19.01"
          },
          {
            "x": 442,
            "y": 42.78,
            "is_outlier": false,
            "label": "Value: 42.78"
          },
          {
            "x": 443,
            "y": 3.56,
            "is_outlier": false,
            "label": "Value: 3.56"
          },
          {
            "x": 444,
            "y": 19.36,
            "is_outlier": false,
            "label": "Value: 19.36"
          },
          {
            "x": 445,
            "y": 28.73,
            "is_outlier": false,
            "label": "Value: 28.73"
          },
          {
            "x": 446,
            "y": 20.49,
            "is_outlier": false,
            "label": "Value: 20.49"
          },
          {
            "x": 447,
            "y": 12.55,
            "is_outlier": false,
            "label": "Value: 12.55"
          },
          {
            "x": 448,
            "y": 15.6,
            "is_outlier": false,
            "label": "Value: 15.60"
          },
          {
            "x": 449,
            "y": 5.38,
            "is_outlier": false,
            "label": "Value: 5.38"
          },
          {
            "x": 450,
            "y": 8.37,
            "is_outlier": false,
            "label": "Value: 8.37"
          },
          {
            "x": 451,
            "y": 3.83,
            "is_outlier": false,
            "label": "Value: 3.83"
          },
          {
            "x": 452,
            "y": 12.89,
            "is_outlier": false,
            "label": "Value: 12.89"
          },
          {
            "x": 453,
            "y": 19.95,
            "is_outlier": false,
            "label": "Value: 19.95"
          },
          {
            "x": 454,
            "y": 14.02,
            "is_outlier": false,
            "label": "Value: 14.02"
          },
          {
            "x": 455,
            "y": 5.19,
            "is_outlier": false,
            "label": "Value: 5.19"
          },
          {
            "x": 456,
            "y": 15.55,
            "is_outlier": false,
            "label": "Value: 15.55"
          },
          {
            "x": 457,
            "y": 9.74,
            "is_outlier": false,
            "label": "Value: 9.74"
          },
          {
            "x": 458,
            "y": 11.77,
            "is_outlier": false,
            "label": "Value: 11.77"
          },
          {
            "x": 459,
            "y": 17.43,
            "is_outlier": false,
            "label": "Value: 17.43"
          },
          {
            "x": 460,
            "y": 19.1,
            "is_outlier": false,
            "label": "Value: 19.10"
          },
          {
            "x": 461,
            "y": 14.4,
            "is_outlier": false,
            "label": "Value: 14.40"
          },
          {
            "x": 462,
            "y": 12.42,
            "is_outlier": false,
            "label": "Value: 12.42"
          },
          {
            "x": 463,
            "y": 8.46,
            "is_outlier": false,
            "label": "Value: 8.46"
          },
          {
            "x": 464,
            "y": 6.53,
            "is_outlier": false,
            "label": "Value: 6.53"
          },
          {
            "x": 465,
            "y": 10.22,
            "is_outlier": false,
            "label": "Value: 10.22"
          },
          {
            "x": 466,
            "y": 33.3,
            "is_outlier": false,
            "label": "Value: 33.30"
          },
          {
            "x": 467,
            "y": 50.1,
            "is_outlier": true,
            "label": "Value: 50.10"
          },
          {
            "x": 468,
            "y": 9.71,
            "is_outlier": false,
            "label": "Value: 9.71"
          },
          {
            "x": 469,
            "y": 11.91,
            "is_outlier": false,
            "label": "Value: 11.91"
          },
          {
            "x": 470,
            "y": 4.79,
            "is_outlier": false,
            "label": "Value: 4.79"
          },
          {
            "x": 471,
            "y": 8.58,
            "is_outlier": false,
            "label": "Value: 8.58"
          },
          {
            "x": 472,
            "y": 40.78,
            "is_outlier": false,
            "label": "Value: 40.78"
          },
          {
            "x": 473,
            "y": 12.19,
            "is_outlier": false,
            "label": "Value: 12.19"
          },
          {
            "x": 474,
            "y": 33.24,
            "is_outlier": false,
            "label": "Value: 33.24"
          },
          {
            "x": 475,
            "y": 3.52,
            "is_outlier": false,
            "label": "Value: 3.52"
          },
          {
            "x": 476,
            "y": 9.07,
            "is_outlier": false,
            "label": "Value: 9.07"
          },
          {
            "x": 477,
            "y": 40.43,
            "is_outlier": false,
            "label": "Value: 40.43"
          },
          {
            "x": 478,
            "y": 11.65,
            "is_outlier": false,
            "label": "Value: 11.65"
          },
          {
            "x": 479,
            "y": 12.72,
            "is_outlier": false,
            "label": "Value: 12.72"
          },
          {
            "x": 480,
            "y": 28.73,
            "is_outlier": false,
            "label": "Value: 28.73"
          },
          {
            "x": 481,
            "y": 3.48,
            "is_outlier": false,
            "label": "Value: 3.48"
          },
          {
            "x": 482,
            "y": 7.5,
            "is_outlier": false,
            "label": "Value: 7.50"
          },
          {
            "x": 483,
            "y": 22.42,
            "is_outlier": false,
            "label": "Value: 22.42"
          },
          {
            "x": 484,
            "y": 4.46,
            "is_outlier": false,
            "label": "Value: 4.46"
          },
          {
            "x": 485,
            "y": 26.13,
            "is_outlier": false,
            "label": "Value: 26.13"
          },
          {
            "x": 486,
            "y": 17.13,
            "is_outlier": false,
            "label": "Value: 17.13"
          },
          {
            "x": 487,
            "y": 18.31,
            "is_outlier": false,
            "label": "Value: 18.31"
          },
          {
            "x": 488,
            "y": 5.93,
            "is_outlier": false,
            "label": "Value: 5.93"
          },
          {
            "x": 489,
            "y": 1.82,
            "is_outlier": false,
            "label": "Value: 1.82"
          },
          {
            "x": 490,
            "y": 4.8,
            "is_outlier": false,
            "label": "Value: 4.80"
          },
          {
            "x": 491,
            "y": 17.69,
            "is_outlier": false,
            "label": "Value: 17.69"
          },
          {
            "x": 492,
            "y": 9.46,
            "is_outlier": false,
            "label": "Value: 9.46"
          },
          {
            "x": 493,
            "y": 6.56,
            "is_outlier": false,
            "label": "Value: 6.56"
          },
          {
            "x": 494,
            "y": 10.64,
            "is_outlier": false,
            "label": "Value: 10.64"
          },
          {
            "x": 495,
            "y": 124.21,
            "is_outlier": true,
            "label": "Value: 124.21"
          },
          {
            "x": 496,
            "y": 4.43,
            "is_outlier": false,
            "label": "Value: 4.43"
          },
          {
            "x": 497,
            "y": 9.85,
            "is_outlier": false,
            "label": "Value: 9.85"
          },
          {
            "x": 498,
            "y": 30.36,
            "is_outlier": false,
            "label": "Value: 30.36"
          },
          {
            "x": 499,
            "y": 24.89,
            "is_outlier": false,
            "label": "Value: 24.89"
          },
          {
            "x": 500,
            "y": 2.83,
            "is_outlier": false,
            "label": "Value: 2.83"
          },
          {
            "x": 501,
            "y": 24.19,
            "is_outlier": false,
            "label": "Value: 24.19"
          },
          {
            "x": 502,
            "y": 5.08,
            "is_outlier": false,
            "label": "Value: 5.08"
          },
          {
            "x": 503,
            "y": 23.89,
            "is_outlier": false,
            "label": "Value: 23.89"
          },
          {
            "x": 504,
            "y": 17.4,
            "is_outlier": false,
            "label": "Value: 17.40"
          },
          {
            "x": 505,
            "y": 8.99,
            "is_outlier": false,
            "label": "Value: 8.99"
          },
          {
            "x": 506,
            "y": 18.88,
            "is_outlier": false,
            "label": "Value: 18.88"
          },
          {
            "x": 507,
            "y": 17.54,
            "is_outlier": false,
            "label": "Value: 17.54"
          },
          {
            "x": 508,
            "y": 26.82,
            "is_outlier": false,
            "label": "Value: 26.82"
          },
          {
            "x": 509,
            "y": 26.76,
            "is_outlier": false,
            "label": "Value: 26.76"
          },
          {
            "x": 510,
            "y": 24.4,
            "is_outlier": false,
            "label": "Value: 24.40"
          },
          {
            "x": 511,
            "y": 24.96,
            "is_outlier": false,
            "label": "Value: 24.96"
          },
          {
            "x": 512,
            "y": 19.74,
            "is_outlier": false,
            "label": "Value: 19.74"
          },
          {
            "x": 513,
            "y": 49.41,
            "is_outlier": true,
            "label": "Value: 49.41"
          },
          {
            "x": 514,
            "y": 6.33,
            "is_outlier": false,
            "label": "Value: 6.33"
          },
          {
            "x": 515,
            "y": 3.97,
            "is_outlier": false,
            "label": "Value: 3.97"
          },
          {
            "x": 516,
            "y": 5.69,
            "is_outlier": false,
            "label": "Value: 5.69"
          },
          {
            "x": 517,
            "y": 58.19,
            "is_outlier": true,
            "label": "Value: 58.19"
          },
          {
            "x": 518,
            "y": 10.43,
            "is_outlier": false,
            "label": "Value: 10.43"
          },
          {
            "x": 519,
            "y": 23.14,
            "is_outlier": false,
            "label": "Value: 23.14"
          },
          {
            "x": 520,
            "y": 3.79,
            "is_outlier": false,
            "label": "Value: 3.79"
          },
          {
            "x": 521,
            "y": 46.23,
            "is_outlier": true,
            "label": "Value: 46.23"
          },
          {
            "x": 522,
            "y": 15.82,
            "is_outlier": false,
            "label": "Value: 15.82"
          },
          {
            "x": 523,
            "y": 5.31,
            "is_outlier": false,
            "label": "Value: 5.31"
          },
          {
            "x": 524,
            "y": 11.44,
            "is_outlier": false,
            "label": "Value: 11.44"
          },
          {
            "x": 525,
            "y": 31.62,
            "is_outlier": false,
            "label": "Value: 31.62"
          },
          {
            "x": 526,
            "y": 13.6,
            "is_outlier": false,
            "label": "Value: 13.60"
          },
          {
            "x": 527,
            "y": 24.75,
            "is_outlier": false,
            "label": "Value: 24.75"
          },
          {
            "x": 528,
            "y": 33.45,
            "is_outlier": false,
            "label": "Value: 33.45"
          },
          {
            "x": 529,
            "y": 24.73,
            "is_outlier": false,
            "label": "Value: 24.73"
          },
          {
            "x": 530,
            "y": 16.69,
            "is_outlier": false,
            "label": "Value: 16.69"
          },
          {
            "x": 531,
            "y": 4.48,
            "is_outlier": false,
            "label": "Value: 4.48"
          },
          {
            "x": 532,
            "y": 84.57,
            "is_outlier": true,
            "label": "Value: 84.57"
          },
          {
            "x": 533,
            "y": 9.49,
            "is_outlier": false,
            "label": "Value: 9.49"
          },
          {
            "x": 534,
            "y": 18.32,
            "is_outlier": false,
            "label": "Value: 18.32"
          },
          {
            "x": 535,
            "y": 13.26,
            "is_outlier": false,
            "label": "Value: 13.26"
          },
          {
            "x": 536,
            "y": 12.97,
            "is_outlier": false,
            "label": "Value: 12.97"
          },
          {
            "x": 537,
            "y": 2.26,
            "is_outlier": false,
            "label": "Value: 2.26"
          },
          {
            "x": 538,
            "y": 47.53,
            "is_outlier": true,
            "label": "Value: 47.53"
          },
          {
            "x": 539,
            "y": 39.91,
            "is_outlier": false,
            "label": "Value: 39.91"
          },
          {
            "x": 540,
            "y": 8.91,
            "is_outlier": false,
            "label": "Value: 8.91"
          },
          {
            "x": 541,
            "y": 9.71,
            "is_outlier": false,
            "label": "Value: 9.71"
          },
          {
            "x": 542,
            "y": 15.09,
            "is_outlier": false,
            "label": "Value: 15.09"
          },
          {
            "x": 543,
            "y": 10.46,
            "is_outlier": false,
            "label": "Value: 10.46"
          },
          {
            "x": 544,
            "y": 12.12,
            "is_outlier": false,
            "label": "Value: 12.12"
          },
          {
            "x": 545,
            "y": 10.85,
            "is_outlier": false,
            "label": "Value: 10.85"
          },
          {
            "x": 546,
            "y": 26.66,
            "is_outlier": false,
            "label": "Value: 26.66"
          },
          {
            "x": 547,
            "y": 7.57,
            "is_outlier": false,
            "label": "Value: 7.57"
          },
          {
            "x": 548,
            "y": 10.59,
            "is_outlier": false,
            "label": "Value: 10.59"
          },
          {
            "x": 549,
            "y": 9.71,
            "is_outlier": false,
            "label": "Value: 9.71"
          },
          {
            "x": 550,
            "y": 16.02,
            "is_outlier": false,
            "label": "Value: 16.02"
          },
          {
            "x": 551,
            "y": 15.9,
            "is_outlier": false,
            "label": "Value: 15.90"
          },
          {
            "x": 552,
            "y": 10.04,
            "is_outlier": false,
            "label": "Value: 10.04"
          },
          {
            "x": 553,
            "y": 15.62,
            "is_outlier": false,
            "label": "Value: 15.62"
          },
          {
            "x": 554,
            "y": 9.71,
            "is_outlier": false,
            "label": "Value: 9.71"
          },
          {
            "x": 555,
            "y": 18.5,
            "is_outlier": false,
            "label": "Value: 18.50"
          },
          {
            "x": 556,
            "y": 40.76,
            "is_outlier": false,
            "label": "Value: 40.76"
          },
          {
            "x": 557,
            "y": 8.45,
            "is_outlier": false,
            "label": "Value: 8.45"
          },
          {
            "x": 558,
            "y": 0.55,
            "is_outlier": false,
            "label": "Value: 0.55"
          },
          {
            "x": 559,
            "y": 4.21,
            "is_outlier": false,
            "label": "Value: 4.21"
          },
          {
            "x": 560,
            "y": 7.58,
            "is_outlier": false,
            "label": "Value: 7.58"
          },
          {
            "x": 561,
            "y": 11.26,
            "is_outlier": false,
            "label": "Value: 11.26"
          },
          {
            "x": 562,
            "y": 165.09,
            "is_outlier": true,
            "label": "Value: 165.09"
          },
          {
            "x": 563,
            "y": 18.34,
            "is_outlier": false,
            "label": "Value: 18.34"
          },
          {
            "x": 564,
            "y": 20.92,
            "is_outlier": false,
            "label": "Value: 20.92"
          },
          {
            "x": 565,
            "y": 18.38,
            "is_outlier": false,
            "label": "Value: 18.38"
          },
          {
            "x": 566,
            "y": 12.86,
            "is_outlier": false,
            "label": "Value: 12.86"
          },
          {
            "x": 567,
            "y": 8.64,
            "is_outlier": false,
            "label": "Value: 8.64"
          },
          {
            "x": 568,
            "y": 8.0,
            "is_outlier": false,
            "label": "Value: 8.00"
          },
          {
            "x": 569,
            "y": 2.14,
            "is_outlier": false,
            "label": "Value: 2.14"
          },
          {
            "x": 570,
            "y": 18.55,
            "is_outlier": false,
            "label": "Value: 18.55"
          },
          {
            "x": 571,
            "y": 3.7,
            "is_outlier": false,
            "label": "Value: 3.70"
          },
          {
            "x": 572,
            "y": 12.22,
            "is_outlier": false,
            "label": "Value: 12.22"
          },
          {
            "x": 573,
            "y": 1.58,
            "is_outlier": false,
            "label": "Value: 1.58"
          },
          {
            "x": 574,
            "y": 10.61,
            "is_outlier": false,
            "label": "Value: 10.61"
          },
          {
            "x": 575,
            "y": 57.98,
            "is_outlier": true,
            "label": "Value: 57.98"
          },
          {
            "x": 576,
            "y": 14.34,
            "is_outlier": false,
            "label": "Value: 14.34"
          },
          {
            "x": 577,
            "y": 11.03,
            "is_outlier": false,
            "label": "Value: 11.03"
          },
          {
            "x": 578,
            "y": 11.82,
            "is_outlier": false,
            "label": "Value: 11.82"
          },
          {
            "x": 579,
            "y": 4.65,
            "is_outlier": false,
            "label": "Value: 4.65"
          },
          {
            "x": 580,
            "y": 20.9,
            "is_outlier": false,
            "label": "Value: 20.90"
          },
          {
            "x": 581,
            "y": 21.33,
            "is_outlier": false,
            "label": "Value: 21.33"
          },
          {
            "x": 582,
            "y": 26.83,
            "is_outlier": false,
            "label": "Value: 26.83"
          },
          {
            "x": 583,
            "y": 4.82,
            "is_outlier": false,
            "label": "Value: 4.82"
          },
          {
            "x": 584,
            "y": 49.88,
            "is_outlier": true,
            "label": "Value: 49.88"
          },
          {
            "x": 585,
            "y": 5.71,
            "is_outlier": false,
            "label": "Value: 5.71"
          },
          {
            "x": 586,
            "y": 61.58,
            "is_outlier": true,
            "label": "Value: 61.58"
          },
          {
            "x": 587,
            "y": 36.21,
            "is_outlier": false,
            "label": "Value: 36.21"
          },
          {
            "x": 588,
            "y": 10.2,
            "is_outlier": false,
            "label": "Value: 10.20"
          },
          {
            "x": 589,
            "y": 44.56,
            "is_outlier": false,
            "label": "Value: 44.56"
          },
          {
            "x": 590,
            "y": 17.83,
            "is_outlier": false,
            "label": "Value: 17.83"
          },
          {
            "x": 591,
            "y": 36.61,
            "is_outlier": false,
            "label": "Value: 36.61"
          },
          {
            "x": 592,
            "y": 6.46,
            "is_outlier": false,
            "label": "Value: 6.46"
          },
          {
            "x": 593,
            "y": 26.25,
            "is_outlier": false,
            "label": "Value: 26.25"
          },
          {
            "x": 594,
            "y": 21.08,
            "is_outlier": false,
            "label": "Value: 21.08"
          },
          {
            "x": 595,
            "y": 26.33,
            "is_outlier": false,
            "label": "Value: 26.33"
          },
          {
            "x": 596,
            "y": 55.96,
            "is_outlier": true,
            "label": "Value: 55.96"
          },
          {
            "x": 597,
            "y": 3.89,
            "is_outlier": false,
            "label": "Value: 3.89"
          },
          {
            "x": 598,
            "y": 57.34,
            "is_outlier": true,
            "label": "Value: 57.34"
          },
          {
            "x": 599,
            "y": 12.84,
            "is_outlier": false,
            "label": "Value: 12.84"
          },
          {
            "x": 600,
            "y": 2.72,
            "is_outlier": false,
            "label": "Value: 2.72"
          },
          {
            "x": 601,
            "y": 18.51,
            "is_outlier": false,
            "label": "Value: 18.51"
          },
          {
            "x": 602,
            "y": 29.04,
            "is_outlier": false,
            "label": "Value: 29.04"
          },
          {
            "x": 603,
            "y": 19.75,
            "is_outlier": false,
            "label": "Value: 19.75"
          },
          {
            "x": 604,
            "y": 18.06,
            "is_outlier": false,
            "label": "Value: 18.06"
          },
          {
            "x": 605,
            "y": 0.29,
            "is_outlier": false,
            "label": "Value: 0.29"
          },
          {
            "x": 606,
            "y": 32.66,
            "is_outlier": false,
            "label": "Value: 32.66"
          },
          {
            "x": 607,
            "y": 13.67,
            "is_outlier": false,
            "label": "Value: 13.67"
          },
          {
            "x": 608,
            "y": 26.16,
            "is_outlier": false,
            "label": "Value: 26.16"
          },
          {
            "x": 609,
            "y": 19.37,
            "is_outlier": false,
            "label": "Value: 19.37"
          },
          {
            "x": 610,
            "y": 21.31,
            "is_outlier": false,
            "label": "Value: 21.31"
          },
          {
            "x": 611,
            "y": 6.73,
            "is_outlier": false,
            "label": "Value: 6.73"
          },
          {
            "x": 612,
            "y": 14.82,
            "is_outlier": false,
            "label": "Value: 14.82"
          },
          {
            "x": 613,
            "y": 9.94,
            "is_outlier": false,
            "label": "Value: 9.94"
          },
          {
            "x": 614,
            "y": 9.96,
            "is_outlier": false,
            "label": "Value: 9.96"
          },
          {
            "x": 615,
            "y": 24.02,
            "is_outlier": false,
            "label": "Value: 24.02"
          },
          {
            "x": 616,
            "y": 35.02,
            "is_outlier": false,
            "label": "Value: 35.02"
          },
          {
            "x": 617,
            "y": 36.6,
            "is_outlier": false,
            "label": "Value: 36.60"
          },
          {
            "x": 618,
            "y": 17.89,
            "is_outlier": false,
            "label": "Value: 17.89"
          },
          {
            "x": 619,
            "y": 13.91,
            "is_outlier": false,
            "label": "Value: 13.91"
          },
          {
            "x": 620,
            "y": 11.24,
            "is_outlier": false,
            "label": "Value: 11.24"
          },
          {
            "x": 621,
            "y": 6.9,
            "is_outlier": false,
            "label": "Value: 6.90"
          },
          {
            "x": 622,
            "y": 28.26,
            "is_outlier": false,
            "label": "Value: 28.26"
          },
          {
            "x": 623,
            "y": 7.42,
            "is_outlier": false,
            "label": "Value: 7.42"
          },
          {
            "x": 624,
            "y": 5.69,
            "is_outlier": false,
            "label": "Value: 5.69"
          },
          {
            "x": 625,
            "y": 13.49,
            "is_outlier": false,
            "label": "Value: 13.49"
          },
          {
            "x": 626,
            "y": 13.78,
            "is_outlier": false,
            "label": "Value: 13.78"
          },
          {
            "x": 627,
            "y": 13.08,
            "is_outlier": false,
            "label": "Value: 13.08"
          },
          {
            "x": 628,
            "y": 24.42,
            "is_outlier": false,
            "label": "Value: 24.42"
          },
          {
            "x": 629,
            "y": 17.96,
            "is_outlier": false,
            "label": "Value: 17.96"
          },
          {
            "x": 630,
            "y": 7.56,
            "is_outlier": false,
            "label": "Value: 7.56"
          },
          {
            "x": 631,
            "y": 5.8,
            "is_outlier": false,
            "label": "Value: 5.80"
          },
          {
            "x": 632,
            "y": 19.33,
            "is_outlier": false,
            "label": "Value: 19.33"
          },
          {
            "x": 633,
            "y": 10.53,
            "is_outlier": false,
            "label": "Value: 10.53"
          },
          {
            "x": 634,
            "y": 12.45,
            "is_outlier": false,
            "label": "Value: 12.45"
          },
          {
            "x": 635,
            "y": 30.03,
            "is_outlier": false,
            "label": "Value: 30.03"
          },
          {
            "x": 636,
            "y": 24.7,
            "is_outlier": false,
            "label": "Value: 24.70"
          },
          {
            "x": 637,
            "y": 47.49,
            "is_outlier": true,
            "label": "Value: 47.49"
          },
          {
            "x": 638,
            "y": 15.52,
            "is_outlier": false,
            "label": "Value: 15.52"
          },
          {
            "x": 639,
            "y": 11.34,
            "is_outlier": false,
            "label": "Value: 11.34"
          },
          {
            "x": 640,
            "y": 10.79,
            "is_outlier": false,
            "label": "Value: 10.79"
          },
          {
            "x": 641,
            "y": 10.43,
            "is_outlier": false,
            "label": "Value: 10.43"
          },
          {
            "x": 642,
            "y": 17.45,
            "is_outlier": false,
            "label": "Value: 17.45"
          },
          {
            "x": 643,
            "y": 7.88,
            "is_outlier": false,
            "label": "Value: 7.88"
          },
          {
            "x": 644,
            "y": 18.55,
            "is_outlier": false,
            "label": "Value: 18.55"
          },
          {
            "x": 645,
            "y": 9.13,
            "is_outlier": false,
            "label": "Value: 9.13"
          },
          {
            "x": 646,
            "y": 16.99,
            "is_outlier": false,
            "label": "Value: 16.99"
          },
          {
            "x": 647,
            "y": 17.85,
            "is_outlier": false,
            "label": "Value: 17.85"
          },
          {
            "x": 648,
            "y": 5.11,
            "is_outlier": false,
            "label": "Value: 5.11"
          },
          {
            "x": 649,
            "y": 56.59,
            "is_outlier": true,
            "label": "Value: 56.59"
          },
          {
            "x": 650,
            "y": 9.9,
            "is_outlier": false,
            "label": "Value: 9.90"
          },
          {
            "x": 651,
            "y": 5.63,
            "is_outlier": false,
            "label": "Value: 5.63"
          },
          {
            "x": 652,
            "y": 34.46,
            "is_outlier": false,
            "label": "Value: 34.46"
          },
          {
            "x": 653,
            "y": 7.24,
            "is_outlier": false,
            "label": "Value: 7.24"
          },
          {
            "x": 654,
            "y": 36.64,
            "is_outlier": false,
            "label": "Value: 36.64"
          },
          {
            "x": 655,
            "y": 13.68,
            "is_outlier": false,
            "label": "Value: 13.68"
          },
          {
            "x": 656,
            "y": 4.15,
            "is_outlier": false,
            "label": "Value: 4.15"
          },
          {
            "x": 657,
            "y": 8.67,
            "is_outlier": false,
            "label": "Value: 8.67"
          },
          {
            "x": 658,
            "y": 25.1,
            "is_outlier": false,
            "label": "Value: 25.10"
          },
          {
            "x": 659,
            "y": 13.52,
            "is_outlier": false,
            "label": "Value: 13.52"
          },
          {
            "x": 660,
            "y": 13.06,
            "is_outlier": false,
            "label": "Value: 13.06"
          },
          {
            "x": 661,
            "y": 25.52,
            "is_outlier": false,
            "label": "Value: 25.52"
          },
          {
            "x": 662,
            "y": 8.37,
            "is_outlier": false,
            "label": "Value: 8.37"
          },
          {
            "x": 663,
            "y": 10.76,
            "is_outlier": false,
            "label": "Value: 10.76"
          },
          {
            "x": 664,
            "y": 9.04,
            "is_outlier": false,
            "label": "Value: 9.04"
          },
          {
            "x": 665,
            "y": 11.73,
            "is_outlier": false,
            "label": "Value: 11.73"
          },
          {
            "x": 666,
            "y": 15.98,
            "is_outlier": false,
            "label": "Value: 15.98"
          },
          {
            "x": 667,
            "y": 21.84,
            "is_outlier": false,
            "label": "Value: 21.84"
          },
          {
            "x": 668,
            "y": 6.04,
            "is_outlier": false,
            "label": "Value: 6.04"
          },
          {
            "x": 669,
            "y": 55.15,
            "is_outlier": true,
            "label": "Value: 55.15"
          },
          {
            "x": 670,
            "y": 3.84,
            "is_outlier": false,
            "label": "Value: 3.84"
          },
          {
            "x": 671,
            "y": 25.61,
            "is_outlier": false,
            "label": "Value: 25.61"
          },
          {
            "x": 672,
            "y": 11.55,
            "is_outlier": false,
            "label": "Value: 11.55"
          },
          {
            "x": 673,
            "y": 6.91,
            "is_outlier": false,
            "label": "Value: 6.91"
          },
          {
            "x": 674,
            "y": 16.79,
            "is_outlier": false,
            "label": "Value: 16.79"
          },
          {
            "x": 675,
            "y": 28.55,
            "is_outlier": false,
            "label": "Value: 28.55"
          },
          {
            "x": 676,
            "y": 21.48,
            "is_outlier": false,
            "label": "Value: 21.48"
          },
          {
            "x": 677,
            "y": 11.19,
            "is_outlier": false,
            "label": "Value: 11.19"
          },
          {
            "x": 678,
            "y": 10.75,
            "is_outlier": false,
            "label": "Value: 10.75"
          },
          {
            "x": 679,
            "y": 4.99,
            "is_outlier": false,
            "label": "Value: 4.99"
          },
          {
            "x": 680,
            "y": 10.59,
            "is_outlier": false,
            "label": "Value: 10.59"
          },
          {
            "x": 681,
            "y": 19.44,
            "is_outlier": false,
            "label": "Value: 19.44"
          },
          {
            "x": 682,
            "y": 12.73,
            "is_outlier": false,
            "label": "Value: 12.73"
          },
          {
            "x": 683,
            "y": 37.0,
            "is_outlier": false,
            "label": "Value: 37.00"
          },
          {
            "x": 684,
            "y": 4.34,
            "is_outlier": false,
            "label": "Value: 4.34"
          },
          {
            "x": 685,
            "y": 7.25,
            "is_outlier": false,
            "label": "Value: 7.25"
          },
          {
            "x": 686,
            "y": 9.4,
            "is_outlier": false,
            "label": "Value: 9.40"
          },
          {
            "x": 687,
            "y": 12.0,
            "is_outlier": false,
            "label": "Value: 12.00"
          },
          {
            "x": 688,
            "y": 20.76,
            "is_outlier": false,
            "label": "Value: 20.76"
          },
          {
            "x": 689,
            "y": 2.7,
            "is_outlier": false,
            "label": "Value: 2.70"
          },
          {
            "x": 690,
            "y": 7.9,
            "is_outlier": false,
            "label": "Value: 7.90"
          },
          {
            "x": 691,
            "y": 37.58,
            "is_outlier": false,
            "label": "Value: 37.58"
          },
          {
            "x": 692,
            "y": 16.11,
            "is_outlier": false,
            "label": "Value: 16.11"
          },
          {
            "x": 693,
            "y": 4.49,
            "is_outlier": false,
            "label": "Value: 4.49"
          },
          {
            "x": 694,
            "y": 9.49,
            "is_outlier": false,
            "label": "Value: 9.49"
          },
          {
            "x": 695,
            "y": 8.87,
            "is_outlier": false,
            "label": "Value: 8.87"
          },
          {
            "x": 696,
            "y": 5.47,
            "is_outlier": false,
            "label": "Value: 5.47"
          },
          {
            "x": 697,
            "y": 14.72,
            "is_outlier": false,
            "label": "Value: 14.72"
          },
          {
            "x": 698,
            "y": 11.64,
            "is_outlier": false,
            "label": "Value: 11.64"
          },
          {
            "x": 699,
            "y": 39.27,
            "is_outlier": false,
            "label": "Value: 39.27"
          },
          {
            "x": 700,
            "y": 11.74,
            "is_outlier": false,
            "label": "Value: 11.74"
          },
          {
            "x": 701,
            "y": 5.74,
            "is_outlier": false,
            "label": "Value: 5.74"
          },
          {
            "x": 702,
            "y": 31.64,
            "is_outlier": false,
            "label": "Value: 31.64"
          },
          {
            "x": 703,
            "y": 25.14,
            "is_outlier": false,
            "label": "Value: 25.14"
          },
          {
            "x": 704,
            "y": 16.39,
            "is_outlier": false,
            "label": "Value: 16.39"
          },
          {
            "x": 705,
            "y": 6.58,
            "is_outlier": false,
            "label": "Value: 6.58"
          },
          {
            "x": 706,
            "y": 16.02,
            "is_outlier": false,
            "label": "Value: 16.02"
          },
          {
            "x": 707,
            "y": 15.77,
            "is_outlier": false,
            "label": "Value: 15.77"
          },
          {
            "x": 708,
            "y": 9.25,
            "is_outlier": false,
            "label": "Value: 9.25"
          },
          {
            "x": 709,
            "y": 5.1,
            "is_outlier": false,
            "label": "Value: 5.10"
          },
          {
            "x": 710,
            "y": 6.71,
            "is_outlier": false,
            "label": "Value: 6.71"
          },
          {
            "x": 711,
            "y": 7.85,
            "is_outlier": false,
            "label": "Value: 7.85"
          },
          {
            "x": 712,
            "y": 46.16,
            "is_outlier": true,
            "label": "Value: 46.16"
          },
          {
            "x": 713,
            "y": 4.58,
            "is_outlier": false,
            "label": "Value: 4.58"
          },
          {
            "x": 714,
            "y": 15.46,
            "is_outlier": false,
            "label": "Value: 15.46"
          },
          {
            "x": 715,
            "y": 18.11,
            "is_outlier": false,
            "label": "Value: 18.11"
          },
          {
            "x": 716,
            "y": 21.42,
            "is_outlier": false,
            "label": "Value: 21.42"
          },
          {
            "x": 717,
            "y": 7.77,
            "is_outlier": false,
            "label": "Value: 7.77"
          },
          {
            "x": 718,
            "y": 4.42,
            "is_outlier": false,
            "label": "Value: 4.42"
          },
          {
            "x": 719,
            "y": 12.04,
            "is_outlier": false,
            "label": "Value: 12.04"
          },
          {
            "x": 720,
            "y": 6.62,
            "is_outlier": false,
            "label": "Value: 6.62"
          },
          {
            "x": 721,
            "y": 22.44,
            "is_outlier": false,
            "label": "Value: 22.44"
          },
          {
            "x": 722,
            "y": 20.8,
            "is_outlier": false,
            "label": "Value: 20.80"
          },
          {
            "x": 723,
            "y": 22.0,
            "is_outlier": false,
            "label": "Value: 22.00"
          },
          {
            "x": 724,
            "y": 22.21,
            "is_outlier": false,
            "label": "Value: 22.21"
          },
          {
            "x": 725,
            "y": 19.19,
            "is_outlier": false,
            "label": "Value: 19.19"
          },
          {
            "x": 726,
            "y": 17.31,
            "is_outlier": false,
            "label": "Value: 17.31"
          },
          {
            "x": 727,
            "y": 155.13,
            "is_outlier": true,
            "label": "Value: 155.13"
          },
          {
            "x": 728,
            "y": 9.92,
            "is_outlier": false,
            "label": "Value: 9.92"
          },
          {
            "x": 729,
            "y": 5.04,
            "is_outlier": false,
            "label": "Value: 5.04"
          },
          {
            "x": 730,
            "y": 10.02,
            "is_outlier": false,
            "label": "Value: 10.02"
          },
          {
            "x": 731,
            "y": 22.79,
            "is_outlier": false,
            "label": "Value: 22.79"
          },
          {
            "x": 732,
            "y": 10.6,
            "is_outlier": false,
            "label": "Value: 10.60"
          },
          {
            "x": 733,
            "y": 17.81,
            "is_outlier": false,
            "label": "Value: 17.81"
          },
          {
            "x": 734,
            "y": 9.56,
            "is_outlier": false,
            "label": "Value: 9.56"
          },
          {
            "x": 735,
            "y": 10.06,
            "is_outlier": false,
            "label": "Value: 10.06"
          },
          {
            "x": 736,
            "y": 7.96,
            "is_outlier": false,
            "label": "Value: 7.96"
          },
          {
            "x": 737,
            "y": 18.85,
            "is_outlier": false,
            "label": "Value: 18.85"
          },
          {
            "x": 738,
            "y": 6.43,
            "is_outlier": false,
            "label": "Value: 6.43"
          },
          {
            "x": 739,
            "y": 13.43,
            "is_outlier": false,
            "label": "Value: 13.43"
          },
          {
            "x": 740,
            "y": 7.15,
            "is_outlier": false,
            "label": "Value: 7.15"
          },
          {
            "x": 741,
            "y": 54.88,
            "is_outlier": true,
            "label": "Value: 54.88"
          },
          {
            "x": 742,
            "y": 15.11,
            "is_outlier": false,
            "label": "Value: 15.11"
          },
          {
            "x": 743,
            "y": 30.53,
            "is_outlier": false,
            "label": "Value: 30.53"
          },
          {
            "x": 744,
            "y": 8.21,
            "is_outlier": false,
            "label": "Value: 8.21"
          },
          {
            "x": 745,
            "y": 38.75,
            "is_outlier": false,
            "label": "Value: 38.75"
          },
          {
            "x": 746,
            "y": 17.7,
            "is_outlier": false,
            "label": "Value: 17.70"
          },
          {
            "x": 747,
            "y": 10.59,
            "is_outlier": false,
            "label": "Value: 10.59"
          },
          {
            "x": 748,
            "y": 27.03,
            "is_outlier": false,
            "label": "Value: 27.03"
          },
          {
            "x": 749,
            "y": 15.88,
            "is_outlier": false,
            "label": "Value: 15.88"
          },
          {
            "x": 750,
            "y": 4.43,
            "is_outlier": false,
            "label": "Value: 4.43"
          },
          {
            "x": 751,
            "y": 33.17,
            "is_outlier": false,
            "label": "Value: 33.17"
          },
          {
            "x": 752,
            "y": 6.53,
            "is_outlier": false,
            "label": "Value: 6.53"
          },
          {
            "x": 753,
            "y": 9.11,
            "is_outlier": false,
            "label": "Value: 9.11"
          },
          {
            "x": 754,
            "y": 32.95,
            "is_outlier": false,
            "label": "Value: 32.95"
          },
          {
            "x": 755,
            "y": 6.99,
            "is_outlier": false,
            "label": "Value: 6.99"
          },
          {
            "x": 756,
            "y": 36.09,
            "is_outlier": false,
            "label": "Value: 36.09"
          },
          {
            "x": 757,
            "y": 3.83,
            "is_outlier": false,
            "label": "Value: 3.83"
          },
          {
            "x": 758,
            "y": 14.95,
            "is_outlier": false,
            "label": "Value: 14.95"
          },
          {
            "x": 759,
            "y": 3.62,
            "is_outlier": false,
            "label": "Value: 3.62"
          },
          {
            "x": 760,
            "y": 1.27,
            "is_outlier": false,
            "label": "Value: 1.27"
          },
          {
            "x": 761,
            "y": 4.69,
            "is_outlier": false,
            "label": "Value: 4.69"
          },
          {
            "x": 762,
            "y": 10.82,
            "is_outlier": false,
            "label": "Value: 10.82"
          },
          {
            "x": 763,
            "y": 2.21,
            "is_outlier": false,
            "label": "Value: 2.21"
          },
          {
            "x": 764,
            "y": 15.1,
            "is_outlier": false,
            "label": "Value: 15.10"
          },
          {
            "x": 765,
            "y": 13.74,
            "is_outlier": false,
            "label": "Value: 13.74"
          },
          {
            "x": 766,
            "y": 15.8,
            "is_outlier": false,
            "label": "Value: 15.80"
          },
          {
            "x": 767,
            "y": 32.76,
            "is_outlier": false,
            "label": "Value: 32.76"
          },
          {
            "x": 768,
            "y": 19.62,
            "is_outlier": false,
            "label": "Value: 19.62"
          },
          {
            "x": 769,
            "y": 25.25,
            "is_outlier": false,
            "label": "Value: 25.25"
          },
          {
            "x": 770,
            "y": 6.6,
            "is_outlier": false,
            "label": "Value: 6.60"
          },
          {
            "x": 771,
            "y": 6.91,
            "is_outlier": false,
            "label": "Value: 6.91"
          },
          {
            "x": 772,
            "y": 10.14,
            "is_outlier": false,
            "label": "Value: 10.14"
          },
          {
            "x": 773,
            "y": 17.4,
            "is_outlier": false,
            "label": "Value: 17.40"
          },
          {
            "x": 774,
            "y": 14.88,
            "is_outlier": false,
            "label": "Value: 14.88"
          },
          {
            "x": 775,
            "y": 7.63,
            "is_outlier": false,
            "label": "Value: 7.63"
          },
          {
            "x": 776,
            "y": 42.49,
            "is_outlier": false,
            "label": "Value: 42.49"
          },
          {
            "x": 777,
            "y": 7.68,
            "is_outlier": false,
            "label": "Value: 7.68"
          },
          {
            "x": 778,
            "y": 15.12,
            "is_outlier": false,
            "label": "Value: 15.12"
          },
          {
            "x": 779,
            "y": 9.37,
            "is_outlier": false,
            "label": "Value: 9.37"
          },
          {
            "x": 780,
            "y": 13.22,
            "is_outlier": false,
            "label": "Value: 13.22"
          },
          {
            "x": 781,
            "y": 4.76,
            "is_outlier": false,
            "label": "Value: 4.76"
          },
          {
            "x": 782,
            "y": 12.46,
            "is_outlier": false,
            "label": "Value: 12.46"
          },
          {
            "x": 783,
            "y": 21.71,
            "is_outlier": false,
            "label": "Value: 21.71"
          },
          {
            "x": 784,
            "y": 18.41,
            "is_outlier": false,
            "label": "Value: 18.41"
          },
          {
            "x": 785,
            "y": 13.49,
            "is_outlier": false,
            "label": "Value: 13.49"
          },
          {
            "x": 786,
            "y": 9.73,
            "is_outlier": false,
            "label": "Value: 9.73"
          },
          {
            "x": 787,
            "y": 20.32,
            "is_outlier": false,
            "label": "Value: 20.32"
          },
          {
            "x": 788,
            "y": 78.46,
            "is_outlier": true,
            "label": "Value: 78.46"
          },
          {
            "x": 789,
            "y": 39.02,
            "is_outlier": false,
            "label": "Value: 39.02"
          },
          {
            "x": 790,
            "y": 8.89,
            "is_outlier": false,
            "label": "Value: 8.89"
          },
          {
            "x": 791,
            "y": 3.78,
            "is_outlier": false,
            "label": "Value: 3.78"
          },
          {
            "x": 792,
            "y": 18.49,
            "is_outlier": false,
            "label": "Value: 18.49"
          },
          {
            "x": 793,
            "y": 91.05,
            "is_outlier": true,
            "label": "Value: 91.05"
          },
          {
            "x": 794,
            "y": 11.55,
            "is_outlier": false,
            "label": "Value: 11.55"
          },
          {
            "x": 795,
            "y": 34.67,
            "is_outlier": false,
            "label": "Value: 34.67"
          },
          {
            "x": 796,
            "y": 20.52,
            "is_outlier": false,
            "label": "Value: 20.52"
          },
          {
            "x": 797,
            "y": 16.32,
            "is_outlier": false,
            "label": "Value: 16.32"
          },
          {
            "x": 798,
            "y": 8.95,
            "is_outlier": false,
            "label": "Value: 8.95"
          },
          {
            "x": 799,
            "y": 18.92,
            "is_outlier": false,
            "label": "Value: 18.92"
          }
        ],
        "outlier_column": "Trip Duration (minutes)",
        "total_outliers": 49447,
        "outlier_percentage": 6.3677116185271085,
        "outlier_list": [],
        "outlier_explanation": "IQR-based outlier detection on trip duration flagged 49,447 trips (6.4%) as statistical outliers, including some multi-day durations likely reflecting bikes that weren't properly docked.",
        "correlations": {
          "labels": [
            "duration_min vs Start station number",
            "duration_min vs End station number",
            "duration_min vs Bike number"
          ],
          "values": [
            0.003071095523702375,
            0.005202085629999917,
            -0.010024281862550955
          ]
        },
        "correlation_target": "Trip Duration (minutes)",
        "correlation_explanation": "Trip duration shows essentially no correlation with start station, end station, or bike ID (all |r| < 0.01) — ride length is driven by rider behavior, not equipment or location.",
        "categorical_1": [
          {
            "category": "CLASSIC",
            "count": 716639
          },
          {
            "category": "PBSC_EBIKE",
            "count": 59888
          }
        ],
        "categorical_1_column": "Bike Model",
        "categorical_2": [
          {
            "category": "Hyde Park Corner, Hyde Park",
            "count": 7414
          },
          {
            "category": "Waterloo Station 3, Waterloo",
            "count": 4641
          },
          {
            "category": "Black Lion Gate, Kensington Gardens",
            "count": 4422
          },
          {
            "category": "Albert Gate, Hyde Park",
            "count": 4167
          },
          {
            "category": "Brushfield Street, Liverpool Street",
            "count": 4055
          },
          {
            "category": "Hop Exchange, The Borough",
            "count": 3917
          },
          {
            "category": "Wormwood Street, Liverpool Street",
            "count": 3901
          },
          {
            "category": "Triangle Car Park, Hyde Park",
            "count": 3519
          }
        ],
        "categorical_2_column": "End Station",
        "categorical_explanation": "Bike model and end-station breakdowns for the full month — Classic bikes account for 716,639 of 776,527 trips (92.3%), with e-bikes making up the remaining 7.7%."
      },
      "data_quality": {
        "duplicate_count": 0,
        "duplicate_percentage": 0.0,
        "worst_missing_column": {
          "column": "End Station",
          "percentage": 6.1
        },
        "avg_missing_percentage": 0.9,
        "columns_with_missing": [
          {
            "column": "End Station",
            "percentage": 6.1
          }
        ]
      }
    }
  }
};