CREATE DATABASE core;

CREATE TABLE abilities(
    ability_id TEXT PRIMARY KEY,
    ability_name TEXT,
    description TEXT,
    tags TEXT[],
    attribute TEXT[],
    character_choice TEXT[],
    trait TEXT[],
    damage TEXT,
    damage_type TEXT,
    range TEXT,
    duration TEXT,
    action_type TEXT,
    action_cost int
);