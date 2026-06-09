# pandas rolling()

Input Type: Time-Series
Loss Level: Medium-High
Notes: Summary stats
Optimal Input / Best Practices: BP: Window size 5-100 events; 5-10 for real-time, 50-100 for hourly/daily aggregates; use min_periods to handle gaps
Philosophy of Design: Windowed aggregation; statistics over intervals
Reduction Max %: 99
Reduction Min %: 80
Semantic Blind: Yes
Size Reduction Description: 80-99% reduction
Tier: Tier 4: Time-Series