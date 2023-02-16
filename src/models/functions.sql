-- Creates a new task
CREATE OR REPLACE PROCEDURE create_task (user_id INTEGER)
AS $$
    BEGIN
        INSERT INTO task(user_id, title, description, status);
    END;
$$ LANGUAGE plpgsql;

-- Updates the title of the task
CREATE OR REPLACE PROCEDURE update_task_title (task_id INTEGER, new_title VARCHAR(25))
AS $$
    BEGIN
        UPDATE task SET title = new_title  WHERE id = task_id;
    END;
$$ LANGUAGE plpgsql;

-- Updates the description of the task
CREATE OR REPLACE PROCEDURE update_task_description (task_id INTEGER, new_description VARCHAR(100))
AS $$
    BEGIN
        UPDATE task SET description = new_description  WHERE id = task_id;
    END;
$$ LANGUAGE plpgsql;

-- Saves the deleted task in the old_task table
CREATE OR REPLACE FUNCTION set_old_task() RETURNS trigger
AS $$
    BEGIN
        INSERT INTO old_task(user_id, title, description, status) VALUES (OLD.user_id, OLD.title, OLD.description, OLD.status);
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_old_task
AFTER DELETE ON task
    FOR EACH ROW EXECUTE FUNCTION set_old_task();
