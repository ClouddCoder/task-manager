CREATE TABLE user_data (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    user_email VARCHAR(40) UNIQUE,
    user_password VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_not_null_username CHECK (username IS NOT NULL),
    CONSTRAINT check_not_empty_username CHECK (username <> ''),
    CONSTRAINT check_not_null_user_email CHECK (user_email IS NOT NULL),
    CONSTRAINT check_not_empty_user_email CHECK (user_email <> ''),
    CONSTRAINT check_not_null_user_password CHECK (user_password IS NOT NULL),
    CONSTRAINT check_not_empty_user_password CHECK (user_password <> '')
);

CREATE TABLE task (
    task_id SERIAL,
    user_id INTEGER,
    task_title VARCHAR(25),
    task_description VARCHAR(30),
    task_status VARCHAR(25),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id, user_id),
    FOREIGN KEY (user_id) REFERENCES user_data(user_id),
    CONSTRAINT check_not_null_user_id CHECK (user_id IS NOT NULL),
    CONSTRAINT check_not_null_task_title CHECK (task_title IS NOT NULL),
    CONSTRAINT check_not_empty_task_title CHECK (task_title <> ''),
    CONSTRAINT check_not_null_task_status CHECK (task_status IS NOT NULL),
    CONSTRAINT check_not_empty_task_status CHECK (task_status <> '')
);

-- Contains the tasks that have been deleted
CREATE TABLE old_task (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    task_title VARCHAR(25) NOT NULL,
    task_description VARCHAR(100) NOT NULL,
    task_status VARCHAR(25) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
);