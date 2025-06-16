create table analyses (
  id uuid default gen_random_uuid() primary key,
  pupuh text not null,
  lyrics text not null,
  ruleAnalysis text not null,
  performanceTip text not null,
  created_at timestamp with time zone default now()
);
