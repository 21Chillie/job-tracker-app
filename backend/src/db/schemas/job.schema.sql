CREATE TABLE IF NOT EXISTS job
(
    id           TEXT PRIMARY KEY,
    user_id      TEXT NOT NULL,
    job_title    TEXT NOT NULL,
    company      TEXT NOT NULL,
    job_url      TEXT,
    job_status   TEXT     DEFAULT 'applied',
    applied_date TEXT     DEFAULT CURRENT_DATE,
    notes        TEXT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

-- intex for get user id
CREATE INDEX IF NOT EXISTS idx_job_user_id ON job (user_id);

-- Index for search, sorting, and filter
CREATE INDEX IF NOT EXISTS idx_job_user_status ON job (user_id, job_status);
CREATE INDEX IF NOT EXISTS idx_job_applied_date ON job (applied_date);
CREATE INDEX IF NOT EXISTS idx_job_created_at ON job (created_at);
CREATE INDEX IF NOT EXISTS idx_job_job_title ON job (job_title);
