CREATE TABLE user_data (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    user_email VARCHAR(40) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    task_title VARCHAR(25) NOT NULL,
    task_description VARCHAR(100) NOT NULL,
    task_status VARCHAR(25) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
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