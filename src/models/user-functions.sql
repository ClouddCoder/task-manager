-- Register a new user
CREATE OR REPLACE PROCEDURE register ( new_username VARCHAR(25), new_email VARCHAR(40), new_password VARCHAR(100))
AS $$
BEGIN
    INSERT INTO user_data (username, user_email, user_password) VALUES (new_username, new_email, new_password);
END;
$$ LANGUAGE plpgsql;