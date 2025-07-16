-- For PostgreSQL
-- Users represent the root identity
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credentials for login
CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profile details
CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    initials VARCHAR(10),
    contact_email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group-specific financial profile consisting of multiple financial profiles
CREATE TABLE group_financial_profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-specific financial profiles
CREATE TABLE user_financial_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    group_financial_profile_id INTEGER REFERENCES group_financial_profile(id),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Account-level data per profile
CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    user_financial_profile_id INTEGER REFERENCES user_financial_profile(id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    balance NUMERIC(14,2) DEFAULT 0,
    institution VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions: income, expense, projections
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    account_id INTEGER REFERENCES account(id),
    category_id INTEGER REFERENCES category(id),
    income_source_id INTEGER REFERENCES income_source(id),
    amount NUMERIC(14,2) NOT NULL,
    merchant VARCHAR(100),
    description TEXT,
    date DATE NOT NULL,
    type VARCHAR(20) NOT NULL, -- income or expense
    status VARCHAR(20),
    pretax BOOLEAN DEFAULT false,
    projected BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pretax contributions (e.g. 401k from income to investment)
CREATE TABLE contribution (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    from_source_id INTEGER REFERENCES income_source(id),
    to_source_id INTEGER REFERENCES contribution_source(id),
    amount NUMERIC(14,2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    projected BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Account-to-account transfers
CREATE TABLE transfer (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    from_account_id INTEGER REFERENCES account(id),
    to_account_id INTEGER REFERENCES account(id),
    amount NUMERIC(14,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expense/income category
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_profile_id INTEGER REFERENCES user_profile(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sources of income
CREATE TABLE income_source (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    user_financial_profile_id INTEGER REFERENCES user_financial_profile(id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50), -- salary, hourly, etc.
    pay_frequency VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Predicted income streams
CREATE TABLE projected_income (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES category(id),
    income_source_id INTEGER REFERENCES income_source(id),
    amount NUMERIC(14,2) NOT NULL,
    pretax BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investment or savings contribution channels
CREATE TABLE contribution_source (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    user_financial_profile_id INTEGER REFERENCES user_financial_profile(id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50), -- 401k, HSA, etc.
    contribution_frequency VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projected contributions from income to a source
CREATE TABLE projected_contribution (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    contribution_source_id INTEGER REFERENCES contribution_source(id),
    income_source_id INTEGER REFERENCES income_source(id),
    percent NUMERIC(5,2),
    amount NUMERIC(14,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
