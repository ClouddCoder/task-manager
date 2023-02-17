-- Register a new user
CREATE OR REPLACE FUNCTION register (new_username VARCHAR(25), new_email VARCHAR(40), new_password VARCHAR(100))
RETURNS integer
AS $$
DECLARE
    id integer;
BEGIN
    INSERT INTO user_data (username, user_email, user_password) VALUES (new_username, new_email, new_password)
        RETURNING user_id INTO id;

    RETURN id;
END;
$$ LANGUAGE plpgsql;