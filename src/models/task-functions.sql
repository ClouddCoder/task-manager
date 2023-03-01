-- Creates a new task
CREATE OR REPLACE PROCEDURE create_task (id INTEGER, new_title VARCHAR(25), new_description VARCHAR(100), new_status VARCHAR(25))
AS $$
    BEGIN
        INSERT INTO task(user_id, task_title, task_description, task_status)
        VALUES (id, new_title, new_description, new_status);
    END;
$$ LANGUAGE plpgsql;

-- Updates the title of the task
CREATE OR REPLACE PROCEDURE update_task_title (id INTEGER, new_title VARCHAR(25))
AS $$
    BEGIN
        UPDATE task SET task_title = new_title  WHERE task_id = id;
    END;
$$ LANGUAGE plpgsql;

-- Updates the description of the task
CREATE OR REPLACE PROCEDURE update_task_description (id INTEGER, new_description VARCHAR(100))
AS $$
    BEGIN
        UPDATE task SET task_description = new_description  WHERE task_id = id;
    END;
$$ LANGUAGE plpgsql;

-- Updates the description of the task
CREATE OR REPLACE PROCEDURE update_task_status (id INTEGER, new_status VARCHAR(25))
AS $$
    BEGIN
        UPDATE task SET task_status = new_status  WHERE task_id = id;
    END;
$$ LANGUAGE plpgsql;

-- Saves the deleted task in the old_task table
CREATE OR REPLACE FUNCTION set_old_task() RETURNS trigger
AS $$
    BEGIN
        INSERT INTO old_task(user_id, task_title, task_description, task_status)
        VALUES (OLD.user_id, OLD.task_title, OLD.task_description, OLD.task_status);
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_old_task_trigger
    AFTER DELETE ON task
    FOR EACH ROW
    EXECUTE FUNCTION set_old_task();
