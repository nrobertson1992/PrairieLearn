CREATE TABLE IF NOT EXISTS
  lti13_users (
    user_id BIGINT REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    lti13_instance_id BIGINT REFERENCES lti13_instances ON DELETE CASCADE ON UPDATE CASCADE,
    sub text NOT NULL,
    UNIQUE (user_id, lti13_instance_id)
  );
